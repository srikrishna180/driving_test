/**
 * Where this site sends people to actually book and pay.
 *
 * The marketing site is static content on the root domain; the booking app
 * lives on the `app.` subdomain. They don't share code or a database — the
 * only link between them is the URLs below, so this is the one file to change
 * when cloning this site for another customer.
 *
 * Booking pages are public: no login is needed until the customer pays.
 */

/**
 * Root of the booking app. No trailing slash.
 *
 * In development this points at the booking app running locally on :5173, so
 * Book Now actually works while you're building. Production uses the real
 * subdomain — deliberately automatic, so nobody has to remember to switch it
 * back before deploying.
 *
 * Set `VITE_APP_URL` to override either (a staging host, or a different local
 * port if 5173 is taken).
 */
export const APP_URL =
    import.meta.env.VITE_APP_URL ??
    (import.meta.env.DEV ? "http://localhost:5173" : "https://app.driveacademy.au");

/**
 * The booking calendar.
 *
 * No school slug in the path: the booking app serves one business per
 * deployment, so its domain already identifies the customer.
 */
export function bookingUrl(): string {
    // Booking now renders in this site, so it keeps the customer's own theme
    // and chrome. Only the data comes from APP_URL.
    return "/book";
}

/** All prepaid packages. */
export function packagesUrl(): string {
    return `${APP_URL}/packages`;
}

/**
 * Buy one package.
 *
 * `slug` must match a package slug in the booking app's
 * app/school-config.ts — that pairing is the whole contract between the
 * two repos, so renaming a slug in one means renaming it in the other.
 */
export function packageUrl(slug: string): string {
    return `${APP_URL}/packages/${slug}`;
}

/**
 * Sign in.
 *
 * The same door for everyone: a learner lands on their bookings, an
 * instructor or the owner on the staff dashboard — the app routes them by
 * role once they're through.
 */
export function loginUrl(): string {
    return `${APP_URL}/login`;
}

/**
 * A signed-in customer's account area.
 *
 * The navbar can now tell whether someone is signed in — it asks the app over
 * the shared session cookie — so this is only ever shown to people who are.
 */
export function accountUrl(): string {
    return `${APP_URL}/my-bookings`;
}

export function myBookingsUrl(): string {
    return `${APP_URL}/my-bookings`;
}

/**
 * Stripe's publishable key.
 *
 * Safe in the browser by design — it only identifies the account to Stripe.
 * The secret key never leaves the booking app. Must be the same account the
 * app charges on, or the client secret it hands back won't be recognised.
 */
export const STRIPE_PUBLISHABLE_KEY =
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? "";
