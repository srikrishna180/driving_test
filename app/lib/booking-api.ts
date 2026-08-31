/**
 * Talking to the booking app.
 *
 * The booking pages live in this repo so they carry the customer's own theme,
 * navbar and footer — but availability, prices and money all stay in the app.
 * This module is the whole seam between the two.
 *
 * Every call sends credentials. The session cookie is scoped to the parent
 * domain, so someone signed in on either site is signed in on both; that is
 * what lets a customer spend their account credit from a page served here.
 * It also means these must be fetched from the browser, never from this
 * server — the visitor's cookie is theirs, not ours to relay.
 */

import { APP_URL } from "~/config";

export type BookingOptions = {
    school: { name: string; timezone: string };
    instructors: {
        id: string;
        name: string;
        isOwner: boolean;
        prices: Record<string, number>;
    }[];
    services: {
        name: string;
        minutes: number;
        mode: "in_person" | "online" | "customer_site";
        description: string | null;
    }[];
    /** Places this business consults from. Empty for a business with none. */
    locations: { id: string; name: string; address: string | null }[];
    /** Ways an online appointment can be held. Empty = never asked. */
    onlineMethods: { id: string; label: string }[];
    /** Where the business travels to. Empty lists switch the check off. */
    serviceAreas: { postcodes?: string[]; suburbs?: string[]; note?: string };
    rules: {
        slotStepMinutes: number;
        minimumNoticeHours: number;
        bookingWindowDays: number;
        allowMultipleSlots: boolean;
        maxSlotsPerBooking: number;
        customDuration: {
            enabled: boolean;
            stepMinutes: number;
            minMinutes: number;
            maxMinutes: number;
        };
    };
};

export type Availability = {
    date: string | null;
    times: string[];
    days: { date: string; dayOfMonth: number; inMonth: boolean; available: boolean }[];
    window: { firstDate: string; lastDate: string };
};

export type Viewer =
    | { signedIn: false; loginUrl: string }
    | {
        signedIn: true;
        name: string;
        email: string;
        creditBalance: number;
        /** Already on file, so checkout can confirm rather than ask. */
        phone: string | null;
        address: string | null;
        accountUrl: string;
    };

export type BookingResult =
    | { status: "confirmed"; creditApplied: number; total: number }
    | {
        status: "payment_required";
        clientSecret: string;
        total: number;
        creditApplied: number;
        amountToCharge: number;
    };

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(`${APP_URL}${path}`, {
        // Without this the session cookie never leaves the browser and the
        // customer looks like a stranger to the app.
        credentials: "include",
        ...init,
    });

    const body = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(
            (body as { error?: string })?.error ??
            "We couldn't reach the booking system. Please try again.",
        );
    }
    return body as T;
}

export function getBookingOptions() {
    return call<BookingOptions>("/api/public/booking-options");
}

export function getViewer() {
    return call<Viewer>("/api/public/me");
}

export function getAvailability(params: {
    instructor: string;
    minutes: number;
    date?: string;
    month?: string;
    locationId?: string | null;
}) {
    const q = new URLSearchParams({
        instructor: params.instructor,
        minutes: String(params.minutes),
    });
    if (params.date) q.set("date", params.date);
    if (params.month) q.set("month", params.month);
    if (params.locationId) q.set("location", params.locationId);

    return call<Availability>(`/api/public/availability?${q}`);
}

export function createBooking(params: {
    instructorId: string;
    slots: string[];
    minutes: number;
    useCredit: boolean;
    /** Sent when nobody is signed in — booking a one-off without an account. */
    guest?: { name: string; email: string; phone: string };
    locationId?: string | null;
    onlineVia?: string | null;
    serviceAddress?: string;
    phone?: string;
}) {
    return call<BookingResult>("/api/public/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });
}

/* ------------------------------------------------------------------ *
 * Formatting
 *
 * Stored times are wall-clock strings in the school's timezone
 * ("2026-08-27T09:00"). Never hand one to `new Date()` — there is no zone in
 * it, so the browser would guess the viewer's and shift the time. Format the
 * string directly instead.
 * ------------------------------------------------------------------ */

export function formatTime(hhmm: string): string {
    const [h, m] = hhmm.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

/** "Monday, 7 September 2026" — computed in UTC so no zone can shift it. */
export function formatDate(date: string): string {
    const [y, m, d] = date.split("-").map(Number);
    const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
    return `${DAYS[dow]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

export function formatDateTime(iso: string): string {
    const [date, time] = iso.split("T");
    return `${formatDate(date)} at ${formatTime(time)}`;
}

export function monthLabel(month: string): string {
    const [y, m] = month.split("-").map(Number);
    return `${MONTHS[m - 1]} ${y}`;
}

export function money(amount: number): string {
    return `$${amount.toFixed(2)}`;
}

/** Month key ("2026-09") for a date or month string. */
export function monthOf(value: string): string {
    return value.slice(0, 7);
}

/** Step a month key forwards or backwards, rolling the year over. */
export function shiftMonth(month: string, delta: number): string {
    const [y, m] = month.split("-").map(Number);
    const d = new Date(Date.UTC(y, m - 1 + delta, 1));
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** Monday-first initials for the calendar header. */
export const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
