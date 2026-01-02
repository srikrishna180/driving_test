// src/components/Footer.tsx
import { Link } from "react-router";

export function Footer() {
    return (
        <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-300">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-0">
                {/* Top: logo + social */}
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/logo-driveacademy-light.svg"
                            alt="Drive Academy"
                            className="h-8 w-auto"
                        />
                    </Link>

                    <div className="flex items-center gap-5">
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/driveacademy1/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700"
                            aria-label="Facebook"
                        >
                            <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M14 8h2V4h-2a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h2.5L18 10h-4V8a1 1 0 0 1 1-1Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://www.youtube.com/@driveacademy"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700"
                            aria-label="YouTube"
                        >
                            <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M22 8.2s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C16.3 4.6 12 4.6 12 4.6s-4.3 0-7.1.3c-.4.1-1.3.1-2.1 1C2.2 6.6 2 8.2 2 8.2S1.8 10 1.8 11.7v1.6C1.8 15 2 16.8 2 16.8s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.8.2 7.1.3 7.1.3s4.3 0 7.1-.3c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.8.2-3.5v-1.6C22.2 10 22 8.2 22 8.2Zm-12 6.3V8.9l5.3 2.8L10 14.5Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>

                        {/* Instagram */}
                        {/*<a*/}
                        {/*    href="https://www.instagram.com"*/}
                        {/*    target="_blank"*/}
                        {/*    rel="noreferrer"*/}
                        {/*    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700"*/}
                        {/*    aria-label="Instagram"*/}
                        {/*>*/}
                        {/*    <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">*/}
                        {/*        <path*/}
                        {/*            d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm4 2.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm4.75-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"*/}
                        {/*            fill="currentColor"*/}
                        {/*        />*/}
                        {/*    </svg>*/}
                        {/*</a>*/}
                    </div>
                </div>

                {/* Links */}
                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row">
                    <nav className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                        <Link to="/" className="hover:text-slate-200">
                            Home
                        </Link>
                        <Link to="/services" className="hover:text-slate-200">
                            Services
                        </Link>
                        <Link to="/packages" className="hover:text-slate-200">
                            Packages
                        </Link>
                        <Link to="/contact" className="hover:text-slate-200">
                            Contact Us
                        </Link>
                    </nav>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link to="/terms" className="hover:text-slate-200">
                            Terms of Service
                        </Link>
                        <Link to="/privacy" className="hover:text-slate-200">
                            Privacy Policy
                        </Link>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-6 flex flex-col items-center gap-1 text-center text-[11px] text-slate-500 sm:flex-row sm:justify-between">
                    <p>© {new Date().getFullYear()} Drive Academy. All rights reserved.</p>
                    <p>
                        Designed &amp; developed by{" "}
                        <a
                            href="https://irs.dev"
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-slate-300 hover:text-white"
                        >
                            Krishna
                        </a>
                        .
                    </p>
                </div>
            </div>
        </footer>
    );
}
