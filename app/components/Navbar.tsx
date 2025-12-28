// src/components/Navbar.tsx
import { Link, NavLink, useLocation } from "react-router";
import { useState } from "react";

const navItems = [
    { to: "/instructors", label: "Instructors" },
    { to: "/lessons", label: "Lessons" },
    { to: "/packages", label: "Packages" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/locations", label: "Location" },
    { to: "/contact", label: "Contact" },
];

export function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const isActivePath = (path: string) =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-0">
                {/* Left: logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/logo-driveacademy.svg"
                        alt="Drive Academy"
                        className="h-8 w-auto"
                    />
                </Link>

                {/* Center: desktop nav */}
                <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 md:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                [
                                    "transition-colors",
                                    isActive || isActivePath(item.to)
                                        ? "text-slate-900"
                                        : "text-slate-500 hover:text-slate-900",
                                ].join(" ")
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                {/* Right: phone + login + CTA (desktop) */}
                <div className="hidden items-center gap-4 md:flex">
                    <a
                        href="tel:0402585553"
                        className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 hover:text-slate-900"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M5.5 4.5 8 4l2 4-2 1c.6 1.4 1.6 2.7 3 3.9 1.3 1.2 2.6 2.1 4 2.7l1-2 4 2.1-.5 2.5c-.1.7-.6 1.3-1.3 1.5-1.3.4-3.4.2-6.1-1.1-2.6-1.3-4.9-3.2-7-5.7-2.1-2.5-3.4-4.9-3.9-7.2-.3-1.2-.3-2.1 0-2.8.2-.7.8-1.2 1.5-1.3Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.6}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        0402 585 553
                    </a>

                    <a
                        href="https://driveacademy.com.au/Login"
                        className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 hover:text-slate-900"
                    >
                        Login
                    </a>

                    <a
                        href='https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103'
                        className="inline-flex items-center rounded-full bg-[#ff2c00] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#ff4b26]"
                    >
                        Book Now
                    </a>
                </div>

                {/* Mobile: Book Now + menu toggle */}
                <div className="flex items-center gap-2 md:hidden">
                    <a
                        href='https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103'
                        className="inline-flex items-center rounded-full bg-[#ff2c00] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#ff4b26]"
                    >
                        Book Now
                    </a>
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-800"
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            {open ? (
                                <path
                                    d="M6 18L18 6M6 6l12 12"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                />
                            ) : (
                                <path
                                    d="M4 7h16M4 12h16M4 17h16"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="border-t border-slate-200 bg-white md:hidden">
                    <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                        {/* Phone + Login row */}
                        <div className="mb-2 flex items-center justify-between">
                            <a
                                href="tel:0402585553"
                                className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M5.5 4.5 8 4l2 4-2 1c.6 1.4 1.6 2.7 3 3.9 1.3 1.2 2.6 2.1 4 2.7l1-2 4 2.1-.5 2.5c-.1.7-.6 1.3-1.3 1.5-1.3.4-3.4.2-6.1-1.1-2.6-1.3-4.9-3.2-7-5.7-2.1-2.5-3.4-4.9-3.9-7.2-.3-1.2-.3-2.1 0-2.8.2-.7.8-1.2 1.5-1.3Z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.6}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                0402 585 553
                            </a>
                            <a
                                href="https://driveacademy.com.au/Login"
                                onClick={() => setOpen(false)}
                                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600"
                            >
                                Login
                            </a>
                        </div>

                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                viewTransition
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    [
                                        "rounded-md px-2 py-2",
                                        isActive || isActivePath(item.to)
                                            ? "bg-slate-100 text-slate-900"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                                    ].join(" ")
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        {/* no extra Book button here – it's beside hamburger already */}
                    </div>
                </div>
            )}
        </header>
    );
}
