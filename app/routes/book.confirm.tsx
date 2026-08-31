import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { APP_URL, STRIPE_PUBLISHABLE_KEY } from "~/config";
import { checkServiceArea } from "~/lib/service-area";
import {
    getBookingOptions,
    getViewer,
    createBooking,
    formatDateTime,
    money,
    type BookingOptions,
    type Viewer,
} from "~/lib/booking-api";

export function meta() {
    return [{ title: "Confirm your booking | Drive Academy" }];
}

/**
 * Confirming and paying.
 *
 * The totals shown here are advisory — the app recalculates the price from the
 * chosen service and the instructor's own rate before it charges anything, so
 * nothing a visitor edits in this page can change what they pay.
 *
 * Credit is applied first. If it covers the lot there is no card step at all;
 * otherwise Stripe's Payment Element takes the difference, styled from this
 * site's own tokens so it doesn't look bolted on.
 */
export default function BookConfirm() {
    const [params] = useSearchParams();
    const instructorId = params.get("instructor") ?? "";
    const slots = (params.get("slots") ?? "").split(",").filter(Boolean);
    const minutes = Number(params.get("minutes") ?? 60);
    const locationId = params.get("location") ?? "";

    const [options, setOptions] = useState<BookingOptions | null>(null);
    const [viewer, setViewer] = useState<Viewer | null>(null);
    const [useCredit, setUseCredit] = useState(true);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [done, setDone] = useState<{ creditApplied: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
    const [onlineVia, setOnlineVia] = useState("");
    const [serviceAddress, setServiceAddress] = useState("");
    const [phone, setPhone] = useState("");
    // Details we already hold start collapsed. Confirming what's on file is
    // one glance; retyping it is the thing people abandon checkouts over.
    const [editingDetails, setEditingDetails] = useState(false);

    useEffect(() => {
        Promise.all([getBookingOptions(), getViewer()])
            .then(([o, v]) => {
                setOptions(o);
                setViewer(v);
                if (v.signedIn) {
                    if (v.phone) setPhone(v.phone);
                    if (v.address) setServiceAddress(v.address);
                }
            })
            .catch((e) => setError(e.message));
    }, []);

    const instructor = options?.instructors.find((i) => i.id === instructorId);
    const service = options?.services.find((sv) => sv.minutes === minutes);
    const isOnline = service?.mode === "online";
    const atCustomerSite = service?.mode === "customer_site";

    // Reassurance, not a gate. Someone typing an address we cover sees
    // nothing at all; someone outside is told we'll confirm, and can still
    // book — refusing here would lose work the business would have taken.
    const area = atCustomerSite
        ? checkServiceArea(serviceAddress, options?.serviceAreas)
        : { known: false as const };

    // Everything this booking actually needs from them.
    const hasNeededDetails =
        Boolean(phone.trim()) && (!atCustomerSite || Boolean(serviceAddress.trim()));

    const areaNote =
        area.known && area.covered ? (
            <p className="text-[12px] text-good">We cover that area.</p>
        ) : area.known ? (
            <p className="rounded-lg border border-calm/30 bg-calm-soft px-3 py-2 text-[12.5px] text-ink">
                That looks outside where we usually go. You can still book —{" "}
                {options?.serviceAreas.note ??
                    "we'll be in touch to confirm we can get to you."}
            </p>
        ) : null;
    const site = options?.locations.find((l) => l.id === locationId);
    const methods = isOnline ? (options?.onlineMethods ?? []) : [];
    const price = instructor?.prices[String(minutes)] ?? 0;
    const total = price * slots.length;
    const credit = viewer?.signedIn ? viewer.creditBalance : 0;
    const creditApplied = useCredit ? Math.min(credit, total) : 0;
    const dueNow = Math.max(0, total - creditApplied);

    async function start() {
        setError(null);
        setBusy(true);
        try {
            const res = await createBooking({
                instructorId,
                slots,
                minutes,
                useCredit,
                guest: viewer?.signedIn ? undefined : guest,
                locationId: locationId || undefined,
                onlineVia: onlineVia || undefined,
                serviceAddress: serviceAddress || undefined,
                phone: phone || undefined,
            });
            if (res.status === "confirmed") setDone({ creditApplied: res.creditApplied });
            else setClientSecret(res.clientSecret);
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setBusy(false);
        }
    }

    if (slots.length === 0) {
        return (
            <main className="mx-auto max-w-lg px-4 py-16 text-center">
                <p className="text-ink-2">No times chosen.</p>
                <Link to="/book" className="mt-3 inline-block text-accent-ink underline">
                    Back to the calendar
                </Link>
            </main>
        );
    }

    // A missing or unknown instructor would otherwise render a $0.00 total
    // with a live Confirm button — the API would refuse it, but only after
    // the customer had filled the form in.
    if (options && !instructor) {
        return (
            <main className="mx-auto max-w-lg px-4 py-16 text-center">
                <p className="text-ink-2">
                    We couldn't find that instructor. They may no longer be taking
                    bookings.
                </p>
                <Link to="/book" className="mt-3 inline-block text-accent-ink underline">
                    Back to the calendar
                </Link>
            </main>
        );
    }

    if (done) {
        return (
            <main className="mx-auto max-w-lg px-4 py-16 text-center">
                <h1 className="font-head text-2xl font-bold text-ink">You're booked in</h1>
                <p className="mt-2 text-ink-2">
                    We've emailed you the details
                    {done.creditApplied > 0 &&
                        ` — ${money(done.creditApplied)} of credit was used`}
                    .
                </p>
                <div className="mt-6 flex justify-center gap-3">
                    {/* A guest has no account to send them to — pointing them
                        at "my bookings" would just bounce them to a login. */}
                    {viewer?.signedIn && (
                        <a
                            href={`${APP_URL}/my-bookings`}
                            className="rounded-lg bg-accent px-4 py-2.5 text-[14px] font-semibold text-on-accent"
                        >
                            View my bookings
                        </a>
                    )}
                    <Link
                        to="/book"
                        className={
                            viewer?.signedIn
                                ? "rounded-lg border border-line px-4 py-2.5 text-[14px] font-medium text-ink-2"
                                : "rounded-lg bg-accent px-4 py-2.5 text-[14px] font-semibold text-on-accent"
                        }
                    >
                        Book another
                    </Link>
                </div>

                {!viewer?.signedIn && (
                    <p className="mt-4 text-[13px] text-ink-3">
                        Keep the confirmation email — it has everything you need. Give us a
                        ring if you need to change anything.
                    </p>
                )}
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-lg px-4 py-10 sm:py-14">
            <Link to="/book" className="text-[13px] text-ink-2 hover:text-ink">
                &larr; Back to the calendar
            </Link>

            <h1 className="mt-2 font-head text-2xl font-bold tracking-tight text-ink">
                Confirm your booking
            </h1>

            {error && (
                <p className="mt-4 rounded-lg border border-crit/30 bg-crit-soft px-3.5 py-2.5 text-[13.5px] text-crit">
                    {error}
                </p>
            )}

            <section className="mt-5 rounded-xl border border-line bg-surface p-4">
                <p className="text-[13px] text-ink-2">
                    {instructor?.name}
                    {options && ` · ${options.school.name}`}
                </p>
                <ul className="mt-2 grid gap-1">
                    {slots.map((s) => (
                        <li key={s} className="text-[14px] font-medium text-ink">
                            {formatDateTime(s)}
                        </li>
                    ))}
                </ul>
                <p className="mt-2 text-[13px] text-ink-2">
                    {atCustomerSite
                        ? "Pick-up at your address"
                        : isOnline
                        ? "Held online"
                        : site
                            ? site.address
                                ? `${site.name} — ${site.address}`
                                : site.name
                            : null}
                </p>
                <p className="mt-1.5 text-[12px] text-ink-3">{options?.school.timezone}</p>
            </section>

            <section className="mt-4 rounded-xl border border-line bg-surface p-4">
                <Row label={`${slots.length} × ${minutes} min`} value={money(price)} muted />
                <Row
                    label={slots.length === 1 ? "1 lesson" : `${slots.length} lessons`}
                    value={money(total)}
                />

                {credit > 0 && (
                    <label className="mt-2 flex cursor-pointer items-center justify-between gap-3 border-t border-line pt-2.5">
                        <span className="flex items-center gap-2.5 text-[13px] text-ink-2">
                            <input
                                type="checkbox"
                                checked={useCredit}
                                onChange={(e) => setUseCredit(e.target.checked)}
                                disabled={Boolean(clientSecret)}
                                className="size-4 accent-accent"
                            />
                            Use my credit ({money(credit)} available)
                        </span>
                        <span className="font-mono text-[13px] text-good">
                            &minus;{money(creditApplied)}
                        </span>
                    </label>
                )}

                <div className="mt-2.5 flex items-baseline justify-between border-t border-line pt-2.5">
                    <span className="text-[13.5px] font-semibold text-ink">Due now</span>
                    <span className="font-mono text-lg font-semibold text-ink">
                        {money(dueNow)}
                    </span>
                </div>
            </section>

            {/* Signed in, and we already hold what we need: show it back as
                one line with a Change link. This is the pattern every
                checkout worth copying uses — confirming is a glance, and
                retyping a saved address is what people abandon over. */}
            {viewer?.signedIn && !clientSecret && !editingDetails && hasNeededDetails && (
                <section className="mt-4 rounded-xl border border-line bg-surface p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h2 className="text-sm font-semibold text-ink">Your details</h2>
                            <p className="mt-1 text-[13px] text-ink-2">{phone}</p>
                            {atCustomerSite && (
                                <p className="text-[13px] text-ink-2">{serviceAddress}</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => setEditingDetails(true)}
                            className="shrink-0 text-[12.5px] text-accent-ink underline"
                        >
                            Change
                        </button>
                    </div>
                </section>
            )}

            {(!viewer?.signedIn || editingDetails || !hasNeededDetails) &&
                !clientSecret &&
                viewer?.signedIn && (
                    <section className="mt-4 rounded-xl border border-line bg-surface p-4">
                        <h2 className="text-sm font-semibold text-ink">Your details</h2>
                        <p className="mt-1 text-[12.5px] text-ink-3">
                            We'll save these so you don't have to type them next time.
                        </p>
                        <div className="mt-3 grid gap-2.5">
                            <Field
                                id="phone"
                                label="Mobile number"
                                type="tel"
                                autoComplete="tel"
                                value={phone}
                                onChange={setPhone}
                            />
                            {atCustomerSite && (
                                <div className="grid gap-1">
                                    <label htmlFor="addr" className="text-[12.5px] text-ink-2">
                                        Address
                                    </label>
                                    <textarea
                                        id="addr"
                                        rows={3}
                                        value={serviceAddress}
                                        autoComplete="street-address"
                                        onChange={(e) => setServiceAddress(e.target.value)}
                                        placeholder="Street address, unit number, and anything we need to find it"
                                        className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-3"
                                    />
                                    {areaNote}
                                </div>
                            )}
                        </div>
                    </section>
                )}

            {atCustomerSite && !clientSecret && !viewer?.signedIn && (
                <section className="mt-4 rounded-xl border border-line bg-surface p-4">
                    <h2 className="text-sm font-semibold text-ink">Where should we pick you up?</h2>
                    <textarea
                        rows={3}
                        value={serviceAddress}
                        onChange={(e) => setServiceAddress(e.target.value)}
                        placeholder="Street address, unit number, and anything we need to find it"
                        className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-3"
                    />
                    {area.known && area.covered ? (
                        <p className="mt-1.5 text-[12px] text-good">
                            We cover that area.
                        </p>
                    ) : area.known ? (
                        <p className="mt-1.5 rounded-lg border border-calm/30 bg-calm-soft px-3 py-2 text-[12.5px] text-ink">
                            That looks outside where we usually go. You can still book —{" "}
                            {options?.serviceAreas.note ??
                                "we'll be in touch to confirm we can get to you."}
                        </p>
                    ) : (
                        <p className="mt-1.5 text-[12px] text-ink-3">
                            Include parking or access notes if they'd help.
                        </p>
                    )}
                </section>
            )}

            {methods.length > 0 && !clientSecret && (
                <section className="mt-4 rounded-xl border border-line bg-surface p-4">
                    <h2 className="text-sm font-semibold text-ink">
                        How would you like to do this?
                    </h2>
                    <div className="mt-2.5 grid gap-1.5">
                        {methods.map((m) => (
                            <label
                                key={m.id}
                                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-line px-3 py-2.5 text-[13.5px] text-ink has-checked:border-accent"
                            >
                                <input
                                    type="radio"
                                    name="onlineVia"
                                    value={m.id}
                                    checked={onlineVia === m.id}
                                    onChange={() => setOnlineVia(m.id)}
                                    className="size-4 accent-accent"
                                />
                                {m.label}
                            </label>
                        ))}
                    </div>
                    <p className="mt-2 text-[12px] text-ink-3">
                        We send a video link either way, so you always have one to fall back
                        on.
                    </p>
                </section>
            )}

            {!viewer ? null : clientSecret ? (
                <Elements
                    stripe={loadStripe(STRIPE_PUBLISHABLE_KEY)}
                    options={{ clientSecret, appearance: appearanceFromTokens() }}
                >
                    <PayForm dueNow={dueNow} />
                </Elements>
            ) : (
                <>
                    {!viewer.signedIn && (
                        <section className="mt-4 rounded-xl border border-line bg-surface p-4">
                            <h2 className="text-sm font-semibold text-ink">Your details</h2>
                            <p className="mt-1 text-[12.5px] text-ink-3">
                                No account needed — we just need to know who's coming and
                                how to reach you.
                            </p>

                            <div className="mt-3 grid gap-2.5">
                                <Field
                                    id="guest-name"
                                    label="Full name"
                                    value={guest.name}
                                    autoComplete="name"
                                    onChange={(v) => setGuest({ ...guest, name: v })}
                                />
                                <Field
                                    id="guest-email"
                                    label="Email"
                                    type="email"
                                    value={guest.email}
                                    autoComplete="email"
                                    onChange={(v) => setGuest({ ...guest, email: v })}
                                />
                                <Field
                                    id="guest-phone"
                                    label="Phone"
                                    type="tel"
                                    value={guest.phone}
                                    autoComplete="tel"
                                    onChange={(v) => setGuest({ ...guest, phone: v })}
                                />
                            </div>

                            <p className="mt-3 border-t border-line pt-2.5 text-[12.5px] text-ink-3">
                                Been here before?{" "}
                                <a
                                    href={`${viewer.loginUrl}?returnTo=${encodeURIComponent(
                                        typeof window === "undefined"
                                            ? "/book"
                                            : window.location.href,
                                    )}`}
                                    className="text-accent-ink underline"
                                >
                                    Sign in
                                </a>{" "}
                                to use your credit.
                            </p>
                        </section>
                    )}

                <button
                    type="button"
                    onClick={start}
                    disabled={busy}
                    className="mt-4 w-full rounded-lg bg-accent px-4 py-3 text-[14.5px] font-semibold text-on-accent hover:brightness-110 disabled:opacity-50"
                >
                    {busy
                        ? "Just a moment…"
                        : dueNow === 0
                            ? "Confirm booking"
                            : "Continue to payment"}
                </button>
                </>
            )}

            <p className="mt-3 text-center text-[12px] text-ink-3">
                Cancel more than 24 hours ahead and you're credited in full.
            </p>
        </main>
    );
}

/** Labelled text input for the guest details. */
function Field({
    id,
    label,
    value,
    onChange,
    type = "text",
    autoComplete,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    autoComplete?: string;
}) {
    return (
        <div className="grid gap-1">
            <label htmlFor={id} className="text-[12.5px] text-ink-2">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                autoComplete={autoComplete}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-3"
            />
        </div>
    );
}

function Row({
    label,
    value,
    muted,
}: {
    label: string;
    value: string;
    muted?: boolean;
}) {
    return (
        <div className="flex items-baseline justify-between gap-3 py-0.5">
            <span className={`text-[13px] ${muted ? "text-ink-3" : "text-ink-2"}`}>
                {label}
            </span>
            <span className={`font-mono text-[13px] ${muted ? "text-ink-3" : "text-ink"}`}>
                {value}
            </span>
        </div>
    );
}

/** Card form. Separate so it sits inside <Elements> and can use the hooks. */
function PayForm({ dueNow }: { dueNow: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
    const [onlineVia, setOnlineVia] = useState("");
    const [serviceAddress, setServiceAddress] = useState("");
    const [phone, setPhone] = useState("");
    // Details we already hold start collapsed. Confirming what's on file is
    // one glance; retyping it is the thing people abandon checkouts over.
    const [editingDetails, setEditingDetails] = useState(false);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!stripe || !elements) return;

        setBusy(true);
        setError(null);

        // Fulfilment happens in the app: this returns there, and its webhook
        // covers the case where the customer closes the tab first.
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: `${APP_URL}/booking/success` },
        });

        if (error) {
            setError(error.message ?? "That payment didn't go through.");
            setBusy(false);
        }
    }

    return (
        <form onSubmit={submit} className="mt-4 grid gap-3">
            <PaymentElement
                options={{
                    layout: "tabs",
                    wallets: { applePay: "auto", googlePay: "auto" },
                    paymentMethodOrder: ["apple_pay", "google_pay", "card"],
                }}
            />
            {error && <p className="text-[13px] text-crit">{error}</p>}
            <button
                type="submit"
                disabled={!stripe || busy}
                className="rounded-lg bg-accent px-4 py-3 text-[14.5px] font-semibold text-on-accent hover:brightness-110 disabled:opacity-50"
            >
                {busy ? "Paying…" : `Pay ${money(dueNow)}`}
            </button>
        </form>
    );
}

/**
 * Dress Stripe's iframe in this site's tokens.
 *
 * Read from the live stylesheet rather than hardcoded, so a customer who
 * re-themes the site gets a matching payment form for free — including dark
 * mode, which the tokens already handle.
 */
function appearanceFromTokens() {
    if (typeof window === "undefined") return undefined;
    const css = getComputedStyle(document.documentElement);
    const v = (name: string, fallback: string) =>
        css.getPropertyValue(name).trim() || fallback;

    return {
        theme: "stripe" as const,
        variables: {
            colorPrimary: v("--color-accent", "#b4530b"),
            colorBackground: v("--color-surface", "#ffffff"),
            colorText: v("--color-ink", "#14181a"),
            colorDanger: v("--color-crit", "#b3261e"),
            fontFamily: v("--font-sans", "system-ui, sans-serif"),
            borderRadius: "8px",
        },
    };
}
