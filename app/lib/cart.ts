/**
 * A tiny cart, held in the browser only.
 *
 * This site is static marketing — it has no database and no session. The cart
 * lives in localStorage and is handed to the booking app at checkout as a
 * query string, so nothing sensitive is stored here and the price is always
 * re-derived server-side by the app.
 *
 * Uses useSyncExternalStore so it renders correctly under SSR: the server
 * snapshot is always empty, and the real cart appears after hydration.
 */

import { useSyncExternalStore } from "react";

const KEY = "da.cart.v1";

export type CartLine = { slug: string; qty: number };

type Listener = () => void;
const listeners = new Set<Listener>();

/** Cached so getSnapshot returns a stable reference between changes. */
let snapshot: CartLine[] = [];
let hydrated = false;

function read(): CartLine[] {
    // Private browsing and blocked site data both throw here.
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
            .filter((l) => l && typeof l.slug === "string" && Number.isFinite(l.qty))
            .map((l) => ({ slug: l.slug, qty: Math.max(1, Math.min(20, Math.floor(l.qty))) }));
    } catch {
        return [];
    }
}

function write(lines: CartLine[]) {
    snapshot = lines;
    try {
        localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
        // A cart that can't persist still works for this page view.
    }
    listeners.forEach((l) => l());
}

function subscribe(listener: Listener) {
    if (!hydrated) {
        snapshot = read();
        hydrated = true;
    }
    listeners.add(listener);
    // Keep two tabs in step.
    const onStorage = (e: StorageEvent) => {
        if (e.key === KEY) {
            snapshot = read();
            listeners.forEach((l) => l());
        }
    };
    window.addEventListener("storage", onStorage);
    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
    };
}

function getSnapshot(): CartLine[] {
    if (!hydrated) {
        snapshot = read();
        hydrated = true;
    }
    return snapshot;
}

/** The server has no cart, and must render the same markup the client hydrates. */
function getServerSnapshot(): CartLine[] {
    return [];
}

export function useCart(): CartLine[] {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useCartCount(): number {
    return useCart().reduce((n, l) => n + l.qty, 0);
}

export function addToCart(slug: string, qty = 1) {
    const lines = getSnapshot();
    const existing = lines.find((l) => l.slug === slug);
    write(
        existing
            ? lines.map((l) =>
                l.slug === slug ? { ...l, qty: Math.min(20, l.qty + qty) } : l,
            )
            : [...lines, { slug, qty }],
    );
}

export function setQty(slug: string, qty: number) {
    if (qty <= 0) return removeFromCart(slug);
    write(getSnapshot().map((l) => (l.slug === slug ? { ...l, qty: Math.min(20, qty) } : l)));
}

export function removeFromCart(slug: string) {
    write(getSnapshot().filter((l) => l.slug !== slug));
}

export function clearCart() {
    write([]);
}

/**
 * Encodes the cart for the booking app: `?items=slug:qty,slug:qty`.
 *
 * Deliberately carries no prices — the app looks every slug up in its own
 * config and charges from there, so a tampered URL can't change what's paid.
 */
export function cartQuery(lines: CartLine[]): string {
    return lines.map((l) => `${l.slug}:${l.qty}`).join(",");
}
