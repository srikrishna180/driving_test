// routes/boxhill.tsx
import { useEffect, useRef, useState } from "react";

export function meta() {
    return [
        {
            title: "Box Hill, VIC Mowing & Garden Services | Augusta Lawn Care",
        },
        {
            name: "description",
            content:
                "Augusta offers professional lawn mowing, landscaping, mulch installation, garden maintenance, and yard cleanups throughout Box Hill, Camberwell, Burwood & Doncaster, VIC.",
        },
    ];
}

export default function BoxHillPage(_props: Route.ComponentProps) {
    const truckRef = useRef<HTMLDivElement | null>(null);
    const [truckVisible, setTruckVisible] = useState(false);

    useEffect(() => {
        if (!truckRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTruckVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(truckRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* HERO WITH VIDEO BACKGROUND */}
            <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
                {/* Video background (replace src with your real mp4 in /public) */}
                <video
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="https://vid.cdn-website.com/edba1fc3/videos/eV4gBPyQ9Sb5GKWol0zA_ALC+Video+2025-v.mp4" type="video/mp4" />
                </video>

                {/* Top yellow paint band – swap for SVG/PNG if you have the asset */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[#ffc800]" />

                {/* Bottom green paint band */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[#4c9a2a]" />

                {/* Dark overlay for text contrast */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Text content */}
                <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl space-y-3">
                        <p className="text-3xl font-extrabold uppercase leading-tight tracking-wide text-white drop-shadow sm:text-4xl">
                            Box Hill, VIC Mowing &amp; Garden Services
                        </p>
                        <p className="text-2xl font-extrabold text-[#ffd72a] drop-shadow">
                            Save Time. Save Hassle.
                        </p>
                        <p className="text-lg font-semibold text-white drop-shadow">
                            Let Augusta Maintain Your Lawn
                        </p>
                    </div>
                </div>
            </section>

            {/* MAIN COPY: PROFESSIONAL SERVICES */}
            <section className="bg-white py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Professional Landscaping &amp; Lawn Care Services in Box Hill
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-slate-700">
                        Augusta Lawn Care of Box Hill stands out as your reliable choice for expert lawn care
                        and garden maintenance. Our locally owned business provides top tier, customized services
                        to meet the specific needs of your home&apos;s lawn or commercial property. With a
                        seasoned team of professionals, we offer a wide range of lawn care and landscaping
                        services, including lawn mowing, landscaping, mulch installation, garden maintenance, and
                        seasonal property cleanups throughout Box Hill, Camberwell, Burwood, and Doncaster, VIC.
                    </p>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="bg-slate-50 py-12">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-slate-900">
                            Our Camberwell Landscaping &amp; Yard Care Services
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Select from our property services below.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <article className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
                            <h4 className="text-base font-semibold text-slate-900">Lawn Mowing &amp; Lawn Care</h4>
                            <p className="mt-2 text-sm text-slate-600">
                                Routine mowing, edging and trimming to keep your lawn neat all season long.
                            </p>
                            <a
                                href="/services/boxhill-lawn-care"
                                className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-600"
                            >
                                Learn more &rarr;
                            </a>
                        </article>

                        <article className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
                            <h4 className="text-base font-semibold text-slate-900">
                                Landscaping &amp; Garden Maintenance
                            </h4>
                            <p className="mt-2 text-sm text-slate-600">
                                Garden bed rejuvenation, hedging, planting and ongoing garden care.
                            </p>
                            <a
                                href="/services/boxhill-landscaping"
                                className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-600"
                            >
                                Learn more &rarr;
                            </a>
                        </article>

                        <article className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
                            <h4 className="text-base font-semibold text-slate-900">Property Cleanups</h4>
                            <p className="mt-2 text-sm text-slate-600">
                                One‑time or seasonal cleanups including leaf removal and debris hauling.
                            </p>
                            <a
                                href="/services/boxhill-property-cleanups"
                                className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-600"
                            >
                                Learn more &rarr;
                            </a>
                        </article>
                    </div>
                </div>
            </section>

            {/* WHY AUGUSTA – TRUCK SLIDE-IN */}
            <section className="bg-white py-16">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:px-8">
                    {/* Truck image that comes in from left on scroll */}
                    <div
                        ref={truckRef}
                        className={`w-full max-w-3xl transform transition-all duration-700 ease-out
              ${truckVisible ? "translate-x-0 opacity-100" : "-translate-x-40 opacity-0"}`}
                    >
                        {/* Put your truck PNG/JPG into /public/media and update src */}
                        <img
                            src="https://lirp.cdn-website.com/edba1fc3/dms3rep/multi/opt/truck+design-1920w.png"
                            alt="Augusta Lawn Care Truck"
                            className="w-full"
                        />
                    </div>

                    <div className="w-full max-w-md space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900">Why Augusta Lawn Care?</h2>
                        <ul className="space-y-4 text-lg text-slate-800">
                            <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#4c9a2a] text-[#4c9a2a]">
                  ✓
                </span>
                                <span>5 Star Professional Lawn Service</span>
                            </li>
                            <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#4c9a2a] text-[#4c9a2a]">
                  ✓
                </span>
                                <span>Locally Owned &amp; Operated</span>
                            </li>
                            <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#4c9a2a] text-[#4c9a2a]">
                  ✓
                </span>
                                <span>Licensed &amp; Insured</span>
                            </li>
                        </ul>
                        <button className="mt-4 inline-flex items-center justify-center rounded-full bg-[#ffc800] px-8 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 hover:bg-[#ffdd33]">
                            Get Estimate
                        </button>
                    </div>
                </div>
            </section>

            {/* CONTACT / OFFICE HOURS */}
            <section id="contact" className="bg-slate-50 py-12">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                We are available to chat
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Reach out via our website contact form, email or by phone. Contact us today!
                            </p>

                            {/* Replace with <Form> + action if you want RR v7 form handling */}
                            <form className="mt-4 grid gap-4 text-sm md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block font-medium text-slate-800">Name</label>
                                    <input
                                        type="text"
                                        className="block w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                                        placeholder="Full name"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block font-medium text-slate-800">Email</label>
                                    <input
                                        type="email"
                                        className="block w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block font-medium text-slate-800">Phone</label>
                                    <input
                                        type="tel"
                                        className="block w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                                        placeholder="Mobile number"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="mb-1 block font-medium text-slate-800">
                                        How can we help?
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="block w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                                        placeholder="Tell us about your lawn or garden..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center rounded-full bg-emerald-800 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>

                        <aside className="space-y-4 text-sm text-slate-700">
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900">Office hours</h4>
                                <p className="mt-1">Mon – Sun</p>
                                <p className="text-slate-600">Open 24 Hours</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900">
                                    Corporate &amp; Franchise Information
                                </h4>
                                <p className="mt-1 text-slate-600">
                                    Augusta Lawn Care Services — All Rights Reserved. Privacy Policy and franchise
                                    information are available on the main website.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}
