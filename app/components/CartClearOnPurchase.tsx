import { useEffect, useState } from "react";
import { clearCart } from "../lib/cart";

/**
 * Empties the cart after a completed purchase.
 *
 * The cart lives in this site's localStorage and the booking app has no way
 * to reach it, so the app sends the customer back with `?purchased=1` once
 * payment has cleared. Without this the badge would still show the items they
 * just paid for.
 */
export function CartClearOnPurchase() {
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        const url = new URL(window.location.href);
        if (url.searchParams.get("purchased") !== "1") return;

        clearCart();
        setConfirmed(true);

        // Drop the flag so a refresh doesn't repeat the message.
        url.searchParams.delete("purchased");
        window.history.replaceState({}, "", url.pathname + url.search);
    }, []);

    if (!confirmed) return null;

    return (
        <div
            role="status"
            className="mx-auto mt-4 max-w-3xl rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800"
        >
            Payment received — your lesson credit is ready. Book a time whenever suits.
        </div>
    );
}
