// src/components/Navbar.tsx
import { Link, NavLink, useLocation } from "react-router";
import { useState } from "react";

const navItems = [
    // { to: "/instructors", label: "Instructors" },
    // { to: "/lessons", label: "Lessons" },
    { to: "/packages", label: "Packages" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/service-areas", label: "Service Areas" },
    { to: "/videos", label: "Videos" },
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
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
                {/* Left: logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff2c00] text-lg font-bold text-white">
                        DA
                    </div>
                    <span className="hidden text-base font-bold text-slate-900 sm:block">
                        Drive Academy
                    </span>
                </Link>

                {/* Center: desktop nav */}
                <div className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-700 lg:flex xl:gap-7">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                [
                                    "whitespace-nowrap transition-colors hover:text-[#ff2c00]",
                                    isActive || isActivePath(item.to)
                                        ? "text-[#ff2c00]"
                                        : "text-slate-600",
                                ].join(" ")
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                {/* Right: phone + login + CTA (desktop) */}
                <div className="hidden items-center gap-3 lg:flex xl:gap-4">
                    <a
                        href="tel:0402585553"
                        className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-slate-900 transition-colors hover:text-[#ff2c00]"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                        0402 585 553
                    </a>

                    <a
                        href="https://driveacademy.com.au/Login"
                        className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600 transition-colors hover:text-slate-900"
                    >
                        Login
                    </a>

                    <a
                        href='https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103'
                        className="inline-flex items-center whitespace-nowrap rounded-full bg-[#ff2c00] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg transition-all hover:bg-[#e62800] hover:shadow-xl"
                    >
                        Book Now
                    </a>
                </div>

                {/* Mobile: Book Now + menu toggle */}
                <div className="flex items-center gap-2 lg:hidden">
                    <a
                        href='https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103'
                        className="inline-flex items-center whitespace-nowrap rounded-full bg-[#ff2c00] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#e62800]"
                    >
                        Book Now
                    </a>
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-50"
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {open ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="border-t border-slate-200 bg-white lg:hidden">
                    <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
                        {/* Phone + Login row */}
                        <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                            <a
                                href="tel:0402585553"
                                className="flex items-center gap-2 text-sm font-bold text-slate-900"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                0402 585 553
                            </a>
                            <a
                                href="https://driveacademy.com.au/Login"
                                onClick={() => setOpen(false)}
                                className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600"
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
                                        "rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-[0.12em]",
                                        isActive || isActivePath(item.to)
                                            ? "bg-[#ff2c00]/10 text-[#ff2c00]"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                                    ].join(" ")
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
