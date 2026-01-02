// routes/_index.tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export function meta() {
    return [
        { title: "Drive Academy | Brisbane Driving Lessons" },
        {
            name: "description",
            content:
                "Professional manual & automatic driving lessons in Brisbane, QLD. High pass rates, 20+ years' experience, test‑day packages and competitive pricing.",
        },
    ];
}

export default function HomePage() {
    const whyRef = useRef<HTMLElement | null>(null);
    const [videoVisible, setVideoVisible] = useState(false);

    // Video slides in when "Why Choose Us" is on screen
    useEffect(() => {
        if (!whyRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setVideoVisible(entry.isIntersecting);
                });
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(whyRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* HERO WITH VIDEO BACKGROUND */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <video
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source
                        src="https://vid.cdn-website.com/edba1fc3/videos/eV4gBPyQ9Sb5GKWol0zA_ALC+Video+2025-v.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Darker overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />

                <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-0">
                    <div className="max-w-xl space-y-5">
                        {/* Bigger and more prominent */}
                        <p className="text-sm font-bold uppercase tracking-[0.24em] text-white sm:text-base">
                            Accredited Driving Instructors • Brisbane QLD
                        </p>
                        <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                            Learn to drive with the professionals in Brisbane QLD
                        </h1>
                        <p className="text-base leading-relaxed text-slate-100 sm:text-lg">
                            Get professional manual and automatic driving lessons from
                            accredited instructors in Brisbane, and join hundreds of satisfied
                            customers.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            {/* Bigger button */}
                            <a
                                href='https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103'
                                className="inline-flex items-center justify-center rounded-full bg-[#ff2c00] px-8 py-3.5 text-base font-bold uppercase tracking-[0.18em] text-white shadow-xl hover:bg-[#ff4b26] hover:shadow-2xl"
                            >
                                Book a Lesson
                            </a>
                            <Link
                                to="/packages"
                                className="inline-flex items-center justify-center rounded-full border-2 border-white/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white hover:border-white hover:bg-white/10"
                            >
                                View Packages
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* PACKAGES & PRICING (MOVED TO SECOND POSITION - BRIGHTER) */}
            <section className="bg-white py-14 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
                    <div className="text-center">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Packages &amp; Pricing
                        </h2>
                        <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                            Simple pricing that grows with you
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-3">
                        <PricingCard
                            label="Single Lesson"
                            sublabel="Driving lesson"
                            price="$70*"
                            features={[
                                "Automatic",
                                "Free pick‑up and drop‑off",
                                "Private instruction",
                                "Male & Female instructors",
                            ]}
                            cta="Book Auto"
                            href='https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103'
                        />

                        <PricingCard
                            label="5 Hour Package"
                            sublabel="Driving lessons"
                            price="$325"
                            badge="Best value"
                            features={[
                                "5 × 1hr driving lessons",
                                "Automatic",
                                "Free pick‑up and drop‑off",
                                "Private instruction",
                            ]}
                            cta="Book Auto"
                            href='https://driveacademy.com.au/Cart?id=11461'
                        />

                        <PricingCard
                            label="Pre‑Test Package"
                            sublabel="Driving lesson"
                            price="$180*"
                            features={[
                                "Pick‑up and drop‑off",
                                "Warm‑up lesson",
                                "Car hire for test",
                                "Assistance with pre‑test paperwork",
                                "*Excludes TMR fees",
                            ]}
                            cta="Book Auto"
                            href='https://driveacademy.com.au/Cart?id=11458'
                        />
                    </div>

                    <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-lg">
                        <div className="px-5 py-6 sm:flex sm:items-center sm:justify-between sm:px-8">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                    Master Learner&apos;s Pack
                                </p>
                                <p className="mt-1 text-3xl font-bold text-slate-900">$770</p>
                                <ul className="mt-3 space-y-1 text-sm text-slate-700">
                                    <li>✓ 10 × 1hr driving lessons</li>
                                    <li>✓ Free pick‑up and drop‑off</li>
                                    <li>✓ Pre‑test warm‑up lesson</li>
                                    <li>✓ Car hire for test</li>
                                </ul>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <a
                                    href='https://driveacademy.com.au/Cart?id=11460'
                                    className="inline-flex items-center justify-center rounded-full bg-[#ff2c00] px-8 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg hover:bg-[#ff4b26] hover:shadow-xl"
                                >
                                    Book Auto
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR SERVICES (COLORED THEME) */}
            {/* OUR SERVICES (DARKER BACKGROUND FOR BETTER READABILITY) */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-14 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
                    <div className="text-center">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ff6b4a]">
                            Our Services
                        </h2>
                        <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                            Everything you need to get your licence
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-3">
                        <ServiceCard
                            href="/lessons?tab=lessons"
                            title="Driving Lessons"
                            body="Learn from our professional and supportive instructors with tailored manual and automatic lessons."
                        />
                        <ServiceCard
                            href="/lessons?tab=test"
                            title="Test Day Package"
                            body="Let us support you on your big day with a warm‑up lesson, pick‑up and car hire for your test."
                        />
                        <ServiceCard
                            href="/services/mock-tests"
                            title="Mock Tests"
                            body="Prepare for your test with realistic mock assessments so you know exactly what to expect."
                        />
                    </div>
                </div>
            </section>



            {/* WHY CHOOSE US WITH YOUTUBE VIDEO */}
            <section
                ref={whyRef}
                className="bg-[#f5f7fb] py-14 sm:py-16"
            >
                <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:px-0">
                    {/* Text */}
                    <div className="w-full lg:w-[52%]">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Why Choose Us
                        </h2>
                        <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                            Confidence on the road starts here
                        </p>

                        <div className="mt-6 grid gap-5">
                            <Feature
                                title="High pass rates"
                                body="Our students learn and develop core skills needed to pass their driving test, helping them pass with confidence."
                            />
                            <Feature
                                title="20+ years' experience"
                                body="Our qualified instructors have over 20 years of professional driving training experience between them."
                            />
                            <Feature
                                title="Test‑day support"
                                body="Special packages to support you on your test day, including a warm‑up lesson and car hire."
                            />
                            <Feature
                                title="Safety focused"
                                body="We teach the latest safe‑driving techniques in every lesson and prepare learners for real‑world conditions."
                            />
                        </div>
                    </div>

                    {/* YouTube Video - slides in/out */}
                    {/* YouTube Video - slides in/out */}
                    <div
                        className={`w-full lg:w-[48%] transform transition-all duration-[2000ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                            videoVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                        }`}
                    >
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
                            <a
                                href="https://www.youtube.com/watch?v=LeuI7mAIdik"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block aspect-video w-full overflow-hidden bg-slate-900"
                            >
                                {/* YouTube Thumbnail */}
                                <img
                                    src="https://img.youtube.com/vi/LeuI7mAIdik/maxresdefault.jpg"
                                    alt="Drive Academy Training Video"
                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ff2c00] shadow-2xl transition-transform group-hover:scale-110">
                                        <svg
                                            className="ml-1 h-9 w-9 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Duration badge (optional) */}
                                <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                                    Watch Video
                                </div>
                            </a>

                            <div className="bg-slate-50 px-4 py-3">
                                <p className="text-xs font-semibold text-slate-700">
                                    Watch: Complete Ipswich Test Route Guide – 30min walkthrough with expert tips
                            </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>



            {/* ABOUT + INSTRUCTORS */}
            <section className="bg-white py-14 sm:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/70 shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
                        <div className="grid gap-10 border-b border-slate-200/70 bg-gradient-to-r from-white via-slate-50 to-white px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.4fr,1.2fr]">
                            {/* Copy */}
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    About Drive Academy
                                </p>
                                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                    Designed to get you behind the wheel, safely
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                                    From the moment you book your lesson and with over 20 years&apos;
                                    instructing experience combined, Drive Academy recognises and
                                    understands the need for safe driving. Feel safe and secure with
                                    Drive Academy and book with one of our friendly instructors today.
                                </p>

                                <div className="mt-5 flex flex-wrap items-center gap-4">
                                    <Link
                                        to="/instructors"
                                        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-slate-800"
                                    >
                                        Meet our instructors
                                    </Link>
                                    <p className="text-xs text-slate-500">
                                        Accredited, patient and focused on building confident drivers.
                                    </p>
                                </div>
                            </div>

                            {/* Stats / Highlight */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                        Experience
                                    </p>
                                    <p className="mt-1 text-xl font-semibold text-slate-900">
                                        20+ years
                                    </p>
                                    <p className="mt-1 text-xs text-slate-600">
                                        Combined instructor experience helping Brisbane learners pass
                                        first time.
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                        Focus
                                    </p>
                                    <p className="mt-1 text-xl font-semibold text-slate-900">
                                        Safety &amp; confidence
                                    </p>
                                    <p className="mt-1 text-xs text-slate-600">
                                        Lessons tailored to your pace, with modern safe‑driving
                                        techniques.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Instructors row */}
                        <div className="px-4 pb-6 pt-5 sm:px-6 sm:pb-8 sm:pt-6">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Your instructor team
                            </p>
                            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                                <Instructor name="Anum" type="Auto" />
                                <Instructor name="Ali" type="Manual & Auto" />
                                <Instructor name="Umar" type="Auto" />
                                <Instructor name="Tas" type="Auto" />
                                <Instructor name="Farooq" type="Manual & Auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA STRIP */}
            <section className="bg-slate-950 py-10 sm:py-12">
                <div className="mx-auto max-w-6xl px-4 lg:px-0">
                    <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-slate-100 px-6 py-6 text-center text-slate-900 shadow-[0_18px_60px_rgba(15,23,42,0.45)] sm:flex-row sm:text-left sm:px-8">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Ready to start driving?
                            </p>
                            <p className="mt-1 text-base font-semibold sm:text-lg">
                                Book your first lesson today and get on the road sooner.
                            </p>
                        </div>
                        <a
                            href='https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103'
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-sm hover:bg-slate-800"
                        >
                            Book Now
                        </a>
                    </div>
                </div>
            </section>


        </main>
    );
}

/* ==== Small subcomponents ==== */

type FeatureProps = {
    title: string;
    body: string;
};

function Feature({ title, body }: FeatureProps) {
    return (
        <div>
            <p className="text-sm font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                {body}
            </p>
        </div>
    );
}

type ServiceCardProps = {
    href: string;
    title: string;
    body: string;
};

function ServiceCard({ href, title, body }: ServiceCardProps) {
    return (
        <Link
            to={href}
            className="group flex flex-col rounded-3xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-6 text-left shadow-xl transition-all hover:-translate-y-1 hover:border-[#ff2c00]/50 hover:bg-slate-800 hover:shadow-2xl"
        >
            <p className="text-base font-bold text-white">{title}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                {body}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#ff6b4a] group-hover:gap-2 group-hover:text-[#ff4b26] transition-all">
                Learn more
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </span>
        </Link>
    );
}



type PricingCardProps = {
    label: string;
    sublabel: string;
    price: string;
    features: string[];
    cta: string;
    href: string;
    badge?: string;
};

function PricingCard({
                         label,
                         sublabel,
                         price,
                         features,
                         cta,
                         href,
                         badge,
                     }: PricingCardProps) {
    return (
        <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-2xl transition-shadow">
            {badge && (
                <span className="self-start rounded-full bg-[#ff2c00] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          {badge}
        </span>
            )}
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {label}
            </p>
            <p className="mt-1 text-xs text-slate-600">{sublabel}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{price}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-700">
                {features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                        <span className="text-[#ff2c00]">✓</span>
                        <span>{f}</span>
                    </li>
                ))}
            </ul>
            <a
                href={href}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#ff2c00] px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-md hover:bg-[#ff4b26] hover:shadow-lg"
            >
                {cta}
            </a>
        </article>
    );
}

type InstructorProps = {
    name: string;
    type: string;
};

function Instructor({ name, type }: InstructorProps) {
    return (
        <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                {name.charAt(0)}
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">{name}</p>
            <p className="text-xs text-slate-500">{type}</p>
        </div>
    );
}
