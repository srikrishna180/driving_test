import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
    getBookingOptions,
    getAvailability,
    getViewer,
    formatTime,
    formatDate,
    money,
    monthLabel,
    monthOf,
    shiftMonth,
    WEEKDAYS,
    type BookingOptions,
    type Availability,
    type Viewer,
} from "~/lib/booking-api";

export function meta() {
    return [
        { title: "Book a Driving Lesson | Drive Academy Brisbane" },
        {
            name: "description",
            content:
                "Pick your instructor, lesson length and time. Book online in under a minute.",
        },
    ];
}

/**
 * The booking calendar.
 *
 * Lives here rather than in the booking app so it inherits this customer's
 * theme, navbar and footer — a learner should never feel handed off to a
 * different product mid-booking. All the data, the prices and the slot rules
 * come from the app's API, so the two can't drift apart.
 *
 * Everything is fetched in the browser: the session cookie is what identifies
 * the customer, and it belongs to them, not to this server.
 */
export default function Book() {
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();

    const [options, setOptions] = useState<BookingOptions | null>(null);
    const [viewer, setViewer] = useState<Viewer | null>(null);
    const [availability, setAvailability] = useState<Availability | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const instructorId = params.get("instructor") ?? "";
    const minutes = Number(params.get("minutes") ?? 60);
    const date = params.get("date") ?? "";
    const selected = (params.get("slots") ?? "").split(",").filter(Boolean);
    const locationId = params.get("location") ?? "";
    const thisMonth = monthOf(new Date().toISOString().slice(0, 10));
    const month = params.get("month") || monthOf(date) || thisMonth;
    // Nothing before today is bookable, so there is nowhere to go back to.
    const canGoBack = month > thisMonth;

    // Load the school's setup once, then default to the owner.
    useEffect(() => {
        let cancelled = false;
        Promise.all([getBookingOptions(), getViewer()])
            .then(([opts, who]) => {
                if (cancelled) return;
                setOptions(opts);
                setViewer(who);
                if (!params.get("instructor") && opts.instructors[0]) {
                    const next = new URLSearchParams(params);
                    next.set("instructor", opts.instructors[0].id);
                    setParams(next, { replace: true, preventScrollReset: true });
                }
            })
            .catch((e) => !cancelled && setError(e.message));
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Reload slots whenever the instructor, length or day changes.
    useEffect(() => {
        if (!instructorId) return;
        let cancelled = false;
        setLoadingSlots(true);
        getAvailability({
            instructor: instructorId,
            minutes,
            date: date || undefined,
            month,
            locationId: locationId || undefined,
        })
            .then((a) => {
                if (cancelled) return;
                setAvailability(a);

                // Land on the first day that has something free. Showing a
                // calendar with no times beside it reads as "nothing here",
                // and the customer has to guess which days are worth a click.
                if (!date) {
                    const first = a.days.find((d) => d.available)?.date;
                    if (first) {
                        const next = new URLSearchParams(params);
                        next.set("date", first);
                        setParams(next, { replace: true, preventScrollReset: true });
                    }
                }
            })
            .catch((e) => !cancelled && setError(e.message))
            .finally(() => !cancelled && setLoadingSlots(false));
        return () => {
            cancelled = true;
        };
    }, [instructorId, minutes, date, month, locationId]);

    function update(changes: Record<string, string | null>) {
        const next = new URLSearchParams(params);
        for (const [k, v] of Object.entries(changes)) {
            if (v === null) next.delete(k);
            else next.set(k, v);
        }
        setParams(next, { preventScrollReset: true });
    }

    const instructor = options?.instructors.find((i) => i.id === instructorId);
    const price = instructor?.prices[String(minutes)] ?? 0;
    const service = options?.services.find((sv) => sv.minutes === minutes);
    const isOnline = service?.mode === "online";
    // Only worth asking when there's a choice to make.
    // Only when the customer comes to us. An online consult has no address,
    // and a pickup happens at theirs — offering our sites would be nonsense.
    const sites = service?.mode === "in_person" ? (options?.locations ?? []) : [];

    const multi = options?.rules.allowMultipleSlots ?? false;
    const maxSlots = options?.rules.maxSlotsPerBooking ?? 1;

    function toggleSlot(time: string) {
        const slot = `${date}T${time}`;
        if (!multi) {
            navigate(
                `/book/confirm?instructor=${instructorId}&slots=${slot}&minutes=${minutes}` +
                    (locationId ? `&location=${locationId}` : ""),
            );
            return;
        }
        const next = selected.includes(slot)
            ? selected.filter((s) => s !== slot)
            : selected.length >= maxSlots
                ? selected
                : [...selected, slot].sort();
        update({ slots: next.length ? next.join(",") : null });
    }

    if (error) {
        return (
            <main className="mx-auto max-w-2xl px-4 py-16 text-center">
                <h1 className="font-head text-2xl font-bold text-ink">
                    Booking is unavailable
                </h1>
                <p className="mt-2 text-ink-2">{error}</p>
                <Link to="/contact" className="mt-6 inline-block text-accent-ink underline">
                    Get in touch instead
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
            <header className="mb-6">
                <h1 className="font-head text-3xl font-bold tracking-tight text-ink">
                    Book a lesson
                </h1>
                <p className="mt-1 text-ink-2">
                    Pick an instructor, how long you want, and a time that suits.
                </p>
            </header>

            {viewer?.signedIn && viewer.creditBalance > 0 && (
                <div className="mb-5 rounded-xl border border-good/30 bg-good-soft px-4 py-3 text-[14px] text-ink">
                    You have <strong>{money(viewer.creditBalance)}</strong> of lesson credit —
                    it'll come off automatically at checkout.
                </div>
            )}

            {!options ? (
                <p className="py-16 text-center text-ink-3">Loading…</p>
            ) : (
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
                    <div className="grid gap-5">
                        {/* One quiet strip, not two cards. These are quick
                            settings; the calendar is the thing being used, so
                            it gets the weight and these get out of the way. */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                            {options.instructors.length > 1 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[12px] uppercase tracking-wider text-ink-3">
                                        With
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {options.instructors.map((i) => (
                                            <button
                                                key={i.id}
                                                type="button"
                                                onClick={() =>
                                                    update({ instructor: i.id, slots: null })
                                                }
                                                aria-pressed={i.id === instructorId}
                                                className={`rounded-full px-3 py-1.5 text-[13px] font-medium ${i.id === instructorId
                                                    ? "border border-accent bg-accent text-on-accent"
                                                    : "border border-line bg-surface text-ink-2 hover:border-line-firm hover:text-ink"
                                                    }`}
                                            >
                                                {i.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <span className="text-[12px] uppercase tracking-wider text-ink-3">
                                    For
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {options.services.map((s) => (
                                        <button
                                            key={s.minutes}
                                            type="button"
                                            onClick={() =>
                                                update({ minutes: String(s.minutes), slots: null })
                                            }
                                            aria-pressed={s.minutes === minutes}
                                            className={`rounded-full px-3 py-1.5 text-[13px] font-medium ${s.minutes === minutes
                                                ? "border border-accent bg-accent text-on-accent"
                                                : "border border-line bg-surface text-ink-2 hover:border-line-firm hover:text-ink"
                                                }`}
                                        >
                                            {/* The business named these; a
                                                clinic's "Initial" vs
                                                "Follow-Up" is the whole
                                                distinction, and a bare
                                                duration hides it. */}
                                            {s.name}
                                            <span className="ml-1.5 opacity-70">
                                                {money(instructor?.prices[String(s.minutes)] ?? 0)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {sites.length > 1 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[12px] uppercase tracking-wider text-ink-3">
                                        At
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {sites.map((l) => (
                                            <button
                                                key={l.id}
                                                type="button"
                                                onClick={() =>
                                                    update({ location: l.id, date: null, slots: null })
                                                }
                                                aria-pressed={l.id === locationId}
                                                title={l.address ?? undefined}
                                                className={`rounded-full px-3 py-1.5 text-[13px] font-medium ${l.id === locationId
                                                    ? "border border-accent bg-accent text-on-accent"
                                                    : "border border-line bg-surface text-ink-2 hover:border-line-firm hover:text-ink"
                                                    }`}
                                            >
                                                {l.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {isOnline && (
                            <p className="rounded-xl border border-calm/30 bg-calm-soft px-4 py-2.5 text-[13px] text-ink">
                                This one is held online — you'll choose how at the next step.
                            </p>
                        )}

                        <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h2 className="font-head text-lg font-bold tracking-tight text-ink">
                                    {monthLabel(month)}
                                </h2>
                                {/* No raw date field: it let people type a day
                                    in the past, and duplicated the calendar. */}
                                <div className="flex gap-1">
                                    <button
                                        type="button"
                                        aria-label="Previous month"
                                        disabled={!canGoBack}
                                        onClick={() =>
                                            update({
                                                month: shiftMonth(month, -1),
                                                date: null,
                                                slots: null,
                                            })
                                        }
                                        className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-2 hover:border-line-firm hover:text-ink disabled:pointer-events-none disabled:opacity-35"
                                    >
                                        &lsaquo;
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Next month"
                                        onClick={() =>
                                            update({
                                                month: shiftMonth(month, 1),
                                                date: null,
                                                slots: null,
                                            })
                                        }
                                        className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-2 hover:border-line-firm hover:text-ink"
                                    >
                                        &rsaquo;
                                    </button>
                                </div>
                            </div>

                            {/* Calendar and times sit side by side: picking a
                                day shouldn't hide the month, or choosing
                                becomes guess-and-go-back. */}
                            <div className="grid gap-5 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-7">
                                <div className="w-full max-w-[18rem] self-start">
                                    <div className="mb-1 grid grid-cols-7 gap-1.5">
                                        {WEEKDAYS.map((d, i) => (
                                            <div
                                                key={i}
                                                className="py-1 text-center text-[11px] font-semibold uppercase tracking-wider text-ink-3"
                                            >
                                                {d}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1.5">
                                    {availability?.days.map((d) => {
                                        const isChosen = d.date === date;
                                        return (
                                            <button
                                                key={d.date}
                                                type="button"
                                                disabled={!d.available}
                                                onClick={() =>
                                                    update({ date: d.date, slots: null })
                                                }
                                                aria-pressed={isChosen}
                                                className={`aspect-square rounded-lg border text-[14px] font-medium transition-colors ${isChosen
                                                    ? "border-accent bg-accent text-on-accent"
                                                    : !d.inMonth
                                                        ? "border-transparent text-ink-3/40"
                                                        : d.available
                                                            ? "border-accent-line bg-accent-soft text-accent-ink hover:bg-accent hover:text-on-accent"
                                                            : "border-line bg-surface-3 text-ink-3"
                                                    }`}
                                            >
                                                {d.dayOfMonth}
                                            </button>
                                        );
                                    })}
                                    </div>
                                </div>

                                <div className="min-w-0">
                                    {!date ? (
                                        <p className="py-8 text-center text-[13.5px] text-ink-3">
                                            Pick a day to see what's free.
                                        </p>
                                    ) : loadingSlots ? (
                                        <p className="py-8 text-center text-ink-3">
                                            Checking times…
                                        </p>
                                    ) : (availability?.times.length ?? 0) === 0 ? (
                                        <p className="py-8 text-center text-[13.5px] text-ink-2">
                                            Nothing free on {formatDate(date)}. Try another day.
                                        </p>
                                    ) : (
                                        <>
                                            <p className="mb-1 text-[14px] font-semibold text-ink">
                                                {formatDate(date)}
                                            </p>
                                            <p className="mb-3 text-[12.5px] text-ink-3">
                                                {availability!.times.length} free
                                                {multi && " · pick as many as you like"}
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                                {availability!.times.map((t) => {
                                                    const on = selected.includes(`${date}T${t}`);
                                                    return (
                                                        <button
                                                            key={t}
                                                            type="button"
                                                            onClick={() => toggleSlot(t)}
                                                            aria-pressed={on}
                                                            className={`rounded-lg border px-2 py-3 font-mono text-[14px] font-medium transition-colors ${on
                                                                ? "border-accent bg-accent text-on-accent"
                                                                : "border-accent-line bg-surface text-accent-ink hover:bg-accent-soft"
                                                                }`}
                                                        >
                                                            {formatTime(t)}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:sticky lg:top-6">
                        <div className="rounded-xl border border-line bg-surface p-4">
                            <h2 className="text-sm font-semibold text-ink">Your booking</h2>

                            {selected.length === 0 ? (
                                <p className="mt-2 text-[13px] text-ink-3">
                                    {multi
                                        ? "Choose one or more times to get started."
                                        : "Choose a time to get started."}
                                </p>
                            ) : (
                                <>
                                    <ul className="mt-2.5 grid gap-1.5">
                                        {selected.map((s) => (
                                            <li
                                                key={s}
                                                className="font-mono text-[13px] text-ink-2"
                                            >
                                                {formatDate(s.split("T")[0])}{" "}
                                                {formatTime(s.split("T")[1])}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-3 border-t border-line pt-2.5 text-[15px] font-semibold text-ink">
                                        {money(price * selected.length)}
                                    </p>
                                    <Link
                                        to={
                                            `/book/confirm?instructor=${instructorId}&slots=${selected.join(",")}&minutes=${minutes}` +
                                            (locationId ? `&location=${locationId}` : "")
                                        }
                                        className="mt-3 block rounded-lg bg-accent px-3 py-2.5 text-center text-[14px] font-semibold text-on-accent hover:brightness-110"
                                    >
                                        Continue
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => update({ slots: null })}
                                        className="mt-2 w-full text-[12.5px] text-ink-3 underline"
                                    >
                                        Clear
                                    </button>
                                </>
                            )}
                        </div>
                    </aside>
                </div>
            )}
        </main>
    );
}
