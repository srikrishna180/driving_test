import { useEffect, useState } from "react";
import { clearCart } from "../lib/cart";
import { myBookingsUrl } from "../config";

/**
 * Landing point after a completed purchase.
 *
 * Exists because the cart lives in THIS site's localStorage — the booking app
 * can't reach it, so the customer has to touch this origin once for it to
 * empty. Having done that, we send them where they actually want to go: their
 * bookings and credit in the app.
 */
export function meta() {
    return [{ title: "Thank you | Drive Academy" }, { name: "robots", content: "noindex" }];
}

export default function ThankYou() {
    const [failedToRedirect, setFailedToRedirect] = useState(false);

    useEffect(() => {
        clearCart();
        // Brief pause so the confirmation is actually seen, rather than a
        // bounce the customer can't read.
        const go = setTimeout(() => {
            window.location.href = myBookingsUrl();
        }, 1500);
        const fallback = setTimeout(() => setFailedToRedirect(true), 4000);
        return () => {
            clearTimeout(go);
            clearTimeout(fallback);
        };
    }, []);

    return (
        <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                </svg>
            </div>

            <h1 className="text-2xl font-bold text-slate-900">Payment received</h1>
            <p className="text-sm text-slate-600">
                Your lesson credit is ready. Taking you to your bookings…
            </p>

            <a
                href={myBookingsUrl()}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[#ff2c00] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white hover:bg-[#e62800]"
            >
                {failedToRedirect ? "Go to my bookings" : "Continue now"}
            </a>
        </main>
    );
}
