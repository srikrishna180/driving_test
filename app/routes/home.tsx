// routes/_index.tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export function meta() {
    return [
        { title: "Drive Academy | Brisbane Driving Lessons" },
        {
            name: "description",
            content:
                "Professional manual & automatic driving lessons in Brisbane, QLD. High pass rates, 20+ years’ experience, test‑day packages and competitive pricing.",
        },
    ];
}

export default function HomePage() {
    const whyRef = useRef<HTMLElement | null>(null);
    const [carVisible, setCarVisible] = useState(false);

    // Car slides in when "Why Choose Us" is on screen, slides out when it leaves
    useEffect(() => {
        if (!whyRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // if any part visible, show; if not, hide
                    setCarVisible(entry.isIntersecting);
                });
            },
            {
                threshold: 0.2, // small part visible is enough
            }
        );

        observer.observe(whyRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* HERO WITH VIDEO BACKGROUND */}
            <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
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

                <div className="absolute inset-0 bg-black/45" />

                <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-0">
                    <div className="max-w-xl space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-200">
                            Accredited Driving Instructors • Brisbane QLD
                        </p>
                        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                            Learn to drive with the professionals in Brisbane QLD
                        </h1>
                        <p className="text-sm leading-relaxed text-slate-100 sm:text-[15px]">
                            Get professional manual and automatic driving lessons from
                            accredited instructors in Brisbane, and join hundreds of satisfied
                            customers.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <a
                                href='https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103'
                                className="inline-flex items-center justify-center rounded-full bg-[#ff2c00] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-sm hover:bg-[#ff4b26]"
                            >
                                Book a Lesson
                            </a>
                            <Link
                                to="/packages"
                                className="inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:border-white"
                            >
                                View Packages
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR SERVICES (SECOND SECTION) */}
            <section className="bg-white py-14 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
                    <div className="text-center">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Our Services
                        </h2>
                        <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
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

            {/* WHY CHOOSE US WITH BI‑DIRECTIONAL SLIDING CAR */}
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

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                            <Feature
                                title="High pass rates"
                                body="Our students learn and develop core skills needed to pass their driving test, helping them pass with confidence."
                            />
                            <Feature
                                title="20+ years’ experience"
                                body="Our qualified instructors have over 20 years of professional driving training experience between them."
                            />
                            <Feature
                                title="Test‑day support"
                                body="Special packages to support you on your test day, including a warm‑up lesson and car hire."
                            />
                            <Feature
                                title="Keys2Drive accredited"
                                body="Get a FREE lesson with Keys2Drive – a government‑funded program we are accredited to offer."
                            />
                            <Feature
                                title="Safety focused"
                                body="We teach the latest safe‑driving techniques in every lesson and prepare learners for real‑world conditions."
                            />
                            <Feature
                                title="Competitive pricing"
                                body="Some of the most affordable pricing in Brisbane, including discounted multi‑lesson packages."
                            />
                        </div>
                    </div>

                    {/* Car illustration: slides in/out based on visibility */}
                    <div
                        className={`w-full lg:w-[48%] transform transition-all duration-[8000ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                            carVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                        }`}
                    >
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
                            <img
                                src="https://lirp.cdn-website.com/edba1fc3/dms3rep/multi/opt/truck+design-1920w.png"
                                alt="Drive Academy training vehicle"
                                className="h-56 w-full object-cover sm:h-64"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* PACKAGES & PRICING */}
            <section className="bg-slate-950 py-14 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0 text-white">
                    <div className="text-center">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Packages &amp; Pricing
                        </h2>
                        <p className="mt-2 text-2xl font-bold sm:text-3xl">
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

                    <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 px-5 py-6 sm:flex sm:items-center sm:justify-between sm:px-8">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Master Learner&apos;s Pack
                            </p>
                            <p className="mt-1 text-2xl font-bold text-white">$770</p>
                            <ul className="mt-3 text-sm text-slate-200">
                                <li>10 × 1hr driving lessons</li>
                                <li>Free pick‑up and drop‑off</li>
                                <li>Pre‑test warm‑up lesson</li>
                                <li>Car hire for test</li>
                            </ul>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <a
                                href='https://driveacademy.com.au/Cart?id=11460'
                                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900 hover:bg-slate-100"
                            >
                                Book Auto
                            </a>
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
            className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-transform hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.18)]"
        >
            <p className="text-sm font-semibold text-slate-900">{title}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                {body}
            </p>
            <span className="mt-3 text-xs font-semibold text-sky-700 group-hover:text-sky-600">
        Learn more →
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
        <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.5)]">
            {badge && (
                <span className="self-start rounded-full bg-[#ff2c00] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          {badge}
        </span>
            )}
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {label}
            </p>
            <p className="mt-1 text-xs text-slate-300">{sublabel}</p>
            <p className="mt-3 text-2xl font-bold text-white">{price}</p>
            <ul className="mt-3 flex-1 space-y-1.5 text-xs text-slate-200">
                {features.map((f) => (
                    <li key={f}>{f}</li>
                ))}
            </ul>
            <a
                href={href}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-900 hover:bg-slate-100"
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
