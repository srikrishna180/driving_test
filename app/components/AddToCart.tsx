import { addToCart, setQty, useCart } from "../lib/cart";

type Size = "sm" | "lg";

const SIZES: Record<Size, { box: string; step: string; qty: string; add: string }> = {
    sm: {
        box: "h-9",
        step: "w-11 text-lg",
        qty: "text-sm",
        add: "px-4 text-xs",
    },
    lg: {
        box: "h-12",
        step: "w-14 text-xl",
        qty: "text-base",
        add: "px-8 text-sm",
    },
};

/**
 * Add a package, then adjust the quantity in place.
 *
 * Before anything is in the cart this is a plain "Add to Cart" button. Once
 * it is, the same space becomes a − 1 + stepper, so changing your mind never
 * means opening the cart. Both states are the same height, so the card
 * doesn't jump when you tap.
 */
export function AddToCart({
    slug,
    size = "sm",
    className = "",
}: {
    slug: string;
    size?: Size;
    className?: string;
}) {
    const lines = useCart();
    const qty = lines.find((l) => l.slug === slug)?.qty ?? 0;
    const s = SIZES[size];

    if (qty === 0) {
        return (
            <button
                type="button"
                onClick={() => addToCart(slug)}
                className={`inline-flex w-full items-center justify-center rounded-full bg-slate-900 font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 ${s.box} ${s.add} ${className}`}
            >
                Add to Cart
            </button>
        );
    }

    return (
        <div
            className={`flex w-full items-center justify-between rounded-full bg-slate-900 text-white shadow-sm ${s.box} ${className}`}
        >
            <button
                type="button"
                onClick={() => setQty(slug, qty - 1)}
                // At 1 this removes the item, so say so rather than "decrease".
                aria-label={qty === 1 ? "Remove from cart" : "Decrease quantity"}
                className={`flex h-full items-center justify-center rounded-l-full leading-none transition-colors hover:bg-slate-700 ${s.step}`}
            >
                {qty === 1 ? (
                    <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5" />
                    </svg>
                ) : (
                    <span aria-hidden="true">&minus;</span>
                )}
            </button>

            <span
                aria-live="polite"
                className={`font-bold tabular-nums ${s.qty}`}
            >
                <span className="sr-only">In cart: </span>
                {qty}
            </span>

            <button
                type="button"
                onClick={() => addToCart(slug)}
                aria-label="Increase quantity"
                className={`flex h-full items-center justify-center rounded-r-full leading-none transition-colors hover:bg-slate-700 ${s.step}`}
            >
                <span aria-hidden="true">+</span>
            </button>
        </div>
    );
}
