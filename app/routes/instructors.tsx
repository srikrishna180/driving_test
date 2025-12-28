// routes/instructor.$id.tsx
import { useState } from "react";

type Testimonial = {
    id: string;
    name: string;
    rating: number;
    text: string;
};

type Instructor = {
    id: string;
    name: string;
    role: string;
    avatarUrl?: string | null;
    bio: string;
    rating: number;
    featuredTestimonial?: Testimonial;
    testimonials: Testimonial[];
};

const instructor: Instructor = {
    id: "tas-khan",
    name: "Tas Khan",
    role: "TMR Accredited Instructor",
    avatarUrl: null,
    bio: "Hi, my name is Tas and I am a TMR accredited instructor with over 20 years of driving teaching experience. I help students acquire and improve their driving skill and ensure they are proficient in skills necessary to pass their driving test.",
    rating: 5,
    featuredTestimonial: {
        id: "sharni",
        name: "Sharni P",
        rating: 5,
        text: "I’ve been putting off driving lessons for years but Tas’s patient and knowledgeable approach has completely strengthened my confidence on the road.",
    },
    testimonials: [
        {
            id: "paramjeet",
            name: "Paramjeet K",
            rating: 5,
            text: "My first time with Drive Academy, I took lessons with Mr. Farooq and I'm thankful because I've passed today. The lessons and pre‑test packages were definitely worthwhile.",
        },
        {
            id: "amiel",
            name: "Amiel D",
            rating: 5,
            text: "I had my lessons with Anum, and she was very good and nice. I learned a lot and passed the test. I’m very thankful.",
        },
        {
            id: "sharni",
            name: "Sharni P",
            rating: 5,
            text: "I've been putting off driving lessons for years but Tas’s patient and extremely compassionate approach means my confidence, which was lacking, is growing with each lesson.",
        },
    ],
};

export function meta() {
    return [{ title: "Instructor – Tas Khan | Drive Academy" }];
}

export default function InstructorPage() {
    const [tab, setTab] = useState<"overview" | "testimonials">("overview");

    const renderStars = (count: number) => (
        <div className="flex items-center gap-1 text-[#ffb400]">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    className={`h-4 w-4 ${
                        i < count ? "fill-current" : "fill-[#e5e7eb]"
                    }`}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                </svg>
            ))}
        </div>
    );

    return (
        <main className="min-h-screen bg-[#f5f7fb]">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-0">
                {/* Header */}
                <header className="mb-4">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        {instructor.name}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">{instructor.role}</p>
                </header>

                {/* Main card */}
                <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
                    {/* Tabs */}
                    <div className="flex border-b border-slate-100 px-6 pt-4 sm:px-8">
                        <button
                            type="button"
                            onClick={() => setTab("overview")}
                            className={`mr-6 border-b-2 pb-3 text-sm font-semibold transition-colors ${
                                tab === "overview"
                                    ? "border-sky-500 text-slate-900"
                                    : "border-transparent text-slate-400 hover:text-slate-700"
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            type="button"
                            onClick={() => setTab("testimonials")}
                            className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${
                                tab === "testimonials"
                                    ? "border-sky-500 text-slate-900"
                                    : "border-transparent text-slate-400 hover:text-slate-700"
                            }`}
                        >
                            Testimonials ({instructor.testimonials.length})
                        </button>
                    </div>

                    {tab === "overview" ? (
                        <div className="px-6 py-6 sm:px-8 sm:py-8">
                            <div className="flex flex-col gap-8 md:flex-row">
                                {/* Left column */}
                                <div className="flex w-full max-w-xs flex-col items-center gap-4 md:items-start">
                                    {instructor.avatarUrl ? (
                                        <img
                                            src={instructor.avatarUrl}
                                            alt={instructor.name}
                                            className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
                                        />
                                    ) : (
                                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-400 sm:h-32 sm:w-32">
                                            Image
                                            <br />
                                            Not Available
                                        </div>
                                    )}

                                    {renderStars(instructor.rating)}

                                    <a
                                        href="https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103"
                                        className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                                        Book Now
                                    </a>

                                    <button
                                        type="button"
                                        onClick={() => setTab("testimonials")}
                                        className="text-xs font-semibold text-sky-600 hover:text-sky-500"
                                    >
                                        Read my testimonials
                                    </button>
                                </div>

                                {/* Right column */}
                                <div className="flex-1 space-y-6">
                                    <p className="text-sm leading-relaxed text-slate-700">
                                        {instructor.bio}
                                    </p>

                                    {instructor.featuredTestimonial && (
                                        <div className="rounded-2xl bg-slate-50 px-4 py-4 sm:px-5 sm:py-5">
                                            <div className="mb-1 text-3xl text-slate-200">“</div>
                                            <p className="text-sm leading-relaxed text-slate-700">
                                                {instructor.featuredTestimonial.text}
                                            </p>
                                            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                                {instructor.featuredTestimonial.name}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="px-6 py-6 sm:px-8 sm:py-8">
                            <h2 className="mb-4 text-base font-semibold text-slate-900">
                                Testimonials – {instructor.name}
                            </h2>
                            <div className="space-y-4">
                                {instructor.testimonials.map((t) => (
                                    <article
                                        key={t.id}
                                        className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-4 sm:px-5 sm:py-5"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="text-sm font-semibold text-slate-900">
                                                {t.name}
                                            </p>
                                            {renderStars(t.rating)}
                                        </div>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-700">
                                            {t.text}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
