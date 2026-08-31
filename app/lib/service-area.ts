/**
 * Whether an address looks like somewhere this business travels to.
 *
 * Pure and shared: the booking page uses it to reassure someone as they type,
 * and the server uses it to flag a job for the owner. Both must agree, or the
 * customer is told one thing and the owner sees another.
 *
 * Deliberately advisory. Refusing a booking because a postcode isn't on a
 * list loses work the owner would happily have taken — a suburb one over,
 * a regular customer who moved. The owner decides; this only tells them when
 * it's worth a look.
 */

export type AreaCheck =
    | { known: false }
    | { known: true; covered: true }
    | { known: true; covered: false; postcode: string | null };

/** Australian postcodes are four digits; take the last one in the string. */
export function extractPostcode(address: string): string | null {
    const matches = address.match(/\b\d{4}\b/g);
    return matches ? matches[matches.length - 1] : null;
}

export function checkServiceArea(
    address: string,
    areas: { postcodes?: string[]; suburbs?: string[] } | null | undefined,
): AreaCheck {
    const postcodes = areas?.postcodes ?? [];
    const suburbs = areas?.suburbs ?? [];

    // No coverage list configured: every address is fine, and nothing is shown.
    if (postcodes.length === 0 && suburbs.length === 0) return { known: false };

    const text = address.toLowerCase();

    if (suburbs.some((s) => text.includes(s.toLowerCase()))) {
        return { known: true, covered: true };
    }

    const postcode = extractPostcode(address);
    if (postcode && postcodes.includes(postcode)) {
        return { known: true, covered: true };
    }

    // Nothing recognisable yet — while someone is still typing "22 Wat", say
    // nothing rather than flashing a warning at them.
    if (!postcode && address.trim().length < 12) return { known: false };

    return { known: true, covered: false, postcode };
}
