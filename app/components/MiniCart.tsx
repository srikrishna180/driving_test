import { useEffect, useState } from "react";
import { packages } from "../data/packages";
import { cartQuery, clearCart, removeFromCart, setQty, useCart, useCartCount } from "../lib/cart";
import { APP_URL } from "../config";

function priceOf(slug: string): number {
    const p = packages.find((x) => x.slug === slug);
    return p ? Number(p.price.replace(/[^0-9.]/g, "")) : 0;
}

function nameOf(slug: string): string {
    return packages.find((x) => x.slug === slug)?.name ?? slug;
}

/**
 * Cart button for the header.
 *
 * Renders nothing until there's something in the cart — an empty cart control
 * is just clutter. When it does appear it carries the word "Cart" and the
 * item count, because a bare trolley glyph isn't obvious to everyone.
 */
export function CartButton({ onClick }: { onClick: () => void }) {
    const count = useCartCount();
    if (count === 0) return null;

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`View cart, ${count} item${count === 1 ? "" : "s"}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#ff2c00] bg-[#fff5f3] px-3 py-2 text-[13px] font-bold text-[#ff2c00] transition-colors hover:bg-[#ffe8e3]"
        >
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3A1 1 0 005.4 17H19M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
            </svg>
            <span>Cart</span>
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#ff2c00] px-1 text-[11px] font-bold text-white tabular-nums">
                {count}
            </span>
        </button>
    );
}

/**
 * Sticky bar on phones once the cart has something in it.
 *
 * The header control is easy to miss on a small screen, and "nothing seemed
 * to happen" is the usual result. This is unmissable, thumb-reachable, and
 * states the total in words and figures.
 */
export function CartBar() {
    const [open, setOpen] = useState(false);
    const lines = useCart();
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((sum, l) => sum + priceOf(l.slug) * l.qty, 0);

    if (count === 0) return null;

    return (
        <>
            <div className="h-20 lg:hidden" aria-hidden="true" />
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 shadow-[0_-4px_20px_rgba(15,23,42,0.12)] lg:hidden">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="flex w-full items-center justify-between gap-3 rounded-full bg-[#ff2c00] px-5 py-3.5 text-white transition-colors hover:bg-[#e62800]"
                >
                    <span className="text-sm font-bold">
                        {count} item{count === 1 ? "" : "s"} in cart
                    </span>
                    <span className="flex items-center gap-2 text-sm font-bold tabular-nums">
                        ${total.toFixed(2)}
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-90">
                            View
                        </span>
                    </span>
                </button>
            </div>
            <MiniCart open={open} onClose={() => setOpen(false)} />
        </>
    );
}

export function MiniCart({ open, onClose }: { open: boolean; onClose: () => void }) {
    const lines = useCart();
    const total = lines.reduce((sum, l) => sum + priceOf(l.slug) * l.qty, 0);

    // Escape to close, and don't let the page scroll behind the drawer.
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    if (!open) return null;

    const checkoutHref = `${APP_URL}/packages/checkout?items=${encodeURIComponent(
        cartQuery(lines),
    )}`;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <button
                type="button"
                aria-label="Close cart"
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40"
            />

            <aside
                role="dialog"
                aria-label="Your cart"
                className="relative flex h-full w-full max-w-sm flex-col bg-white shadow-2xl"
            >
                <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <h2 className="text-base font-bold text-slate-900">Your cart</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                {lines.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                        <p className="text-sm text-slate-500">Your cart is empty.</p>
                        <a
                            href="/packages"
                            className="text-sm font-bold text-[#ff2c00] hover:underline"
                        >
                            Browse packages
                        </a>
                    </div>
                ) : (
                    <>
                        <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto">
                            {lines.map((l) => (
                                <li key={l.slug} className="flex gap-3 px-5 py-4">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-slate-900">
                                            {nameOf(l.slug)}
                                        </p>
                                        <p className="mt-0.5 text-sm text-slate-500">
                                            ${priceOf(l.slug).toFixed(2)} each
                                        </p>

                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex items-center rounded-lg border border-slate-300">
                                                <button
                                                    type="button"
                                                    onClick={() => setQty(l.slug, l.qty - 1)}
                                                    aria-label={`Decrease ${nameOf(l.slug)}`}
                                                    className="h-9 w-9 text-lg leading-none text-slate-600 hover:bg-slate-50"
                                                >
                                                    &minus;
                                                </button>
                                                <span className="w-8 text-center text-sm font-semibold tabular-nums">
                                                    {l.qty}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setQty(l.slug, l.qty + 1)}
                                                    aria-label={`Increase ${nameOf(l.slug)}`}
                                                    className="h-9 w-9 text-lg leading-none text-slate-600 hover:bg-slate-50"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(l.slug)}
                                                className="text-xs font-semibold text-slate-500 hover:text-[#ff2c00]"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <p className="shrink-0 text-sm font-bold tabular-nums text-slate-900">
                                        ${(priceOf(l.slug) * l.qty).toFixed(2)}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <footer className="border-t border-slate-200 px-5 py-4">
                            <div className="flex items-baseline justify-between">
                                <span className="text-sm font-semibold text-slate-700">Total</span>
                                <span className="text-xl font-bold tabular-nums text-slate-900">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            <p className="mt-1 text-xs text-slate-500">
                                No card processing fee. You'll pay securely on the next step.
                            </p>

                            <a
                                href={checkoutHref}
                                className="mt-3 flex w-full items-center justify-center rounded-full bg-[#ff2c00] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#e62800]"
                            >
                                Check out
                            </a>

                            <button
                                type="button"
                                onClick={clearCart}
                                className="mt-2 w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-700"
                            >
                                Clear cart
                            </button>
                        </footer>
                    </>
                )}
            </aside>
        </div>
    );
}

/** Header cart button plus its drawer, wired together. */
export function CartWidget() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <CartButton onClick={() => setOpen(true)} />
            <MiniCart open={open} onClose={() => setOpen(false)} />
        </>
    );
}
