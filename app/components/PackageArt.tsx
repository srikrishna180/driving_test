/**
 * Inline artwork for a package card.
 *
 * The originals were served from cdn.bookingtimes.com, which dies with the
 * BookingTimes subscription. This draws the same idea locally — no network,
 * no third party, and it scales cleanly on a phone.
 *
 * A customer that has real photography can set `imageUrl` on the package and
 * that wins; this is the fallback.
 */

type Variant = "package" | "voucher";

export function PackageArt({
    label,
    variant = "package",
    badge = "AUTO",
    className = "",
}: {
    /** The headline spec, e.g. "10 × 1HR LESSONS". */
    label: string;
    variant?: Variant;
    /** Corner flag. Pass null to hide it. */
    badge?: string | null;
    className?: string;
}) {
    return (
        <svg
            viewBox="0 0 400 300"
            className={className}
            role="img"
            aria-label={label}
            preserveAspectRatio="xMidYMid slice"
        >
            <defs>
                <linearGradient id="pa-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="55%" stopColor="#eef2f6" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
            </defs>

            <rect width="400" height="300" fill="url(#pa-bg)" />

            {/* A road sweeping to the horizon — the through-line of the brand. */}
            <path d="M0 300 L160 96 L240 96 L400 300 Z" fill="#ffffff" opacity="0.75" />
            <path
                d="M200 118 L200 300"
                stroke="#cbd5e1"
                strokeWidth="6"
                strokeDasharray="18 16"
                strokeLinecap="round"
            />

            {variant === "voucher" ? (
                // Ticket
                <g transform="translate(200 128)">
                    <rect
                        x="-46"
                        y="-30"
                        width="92"
                        height="60"
                        rx="8"
                        fill="#ffffff"
                        stroke="#0f172a"
                        strokeWidth="4"
                    />
                    <circle cx="-46" cy="0" r="8" fill="url(#pa-bg)" />
                    <circle cx="46" cy="0" r="8" fill="url(#pa-bg)" />
                    <path
                        d="M-22 -6 h44 M-22 8 h28"
                        stroke="#0f172a"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </g>
            ) : (
                // Steering wheel
                <g transform="translate(200 128)">
                    <circle r="42" fill="#ffffff" stroke="#0f172a" strokeWidth="7" />
                    <circle r="13" fill="#0f172a" />
                    <path
                        d="M-42 0 h29 M13 0 h29 M0 13 v29"
                        stroke="#0f172a"
                        strokeWidth="7"
                        strokeLinecap="round"
                    />
                </g>
            )}

            {/* Spec bar */}
            <rect x="0" y="238" width="400" height="62" fill="#0f172a" />
            <text
                x="200"
                y="277"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="30"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
                letterSpacing="1"
            >
                {label}
            </text>

            {badge && (
                <g>
                    <rect x="0" y="0" width="118" height="42" fill="#ff2c00" />
                    <text
                        x="59"
                        y="30"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="24"
                        fontWeight="700"
                        fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
                        letterSpacing="2"
                    >
                        {badge}
                    </text>
                </g>
            )}
        </svg>
    );
}
