// routes/videos.tsx
import type { Route } from "./+types/videos";
import { useState } from "react";
import { videos, getCategories, type VideoData } from "~/data/videos";

export function meta() {
    return [
        { title: "Videos | Drive Academy Brisbane" },
        {
            name: "description",
            content:
                "Watch our driving lessons, mock tests, and test day tips. Learn from real driving test footage and expert instruction from Drive Academy Brisbane.",
        },
    ];
}

export default function VideosPage(_props: Route.ComponentProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const categories = ["All", ...getCategories()];

    const filteredVideos =
        selectedCategory === "All"
            ? videos
            : videos.filter((v) => v.category === selectedCategory);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ff6b4a]">
                            Video Library
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                            Learn from our driving experts
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                            Watch mock tests, test routes, driving lessons and tips from
                            Drive Academy instructors. Real footage, real learners, real
                            results.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
                                    selectedCategory === cat
                                        ? "bg-[#ff2c00] text-white shadow-lg"
                                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Videos Grid */}
            <section className="bg-slate-50 py-12 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
                    {filteredVideos.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-12 text-center">
                            <p className="text-slate-600">
                                No videos found in this category.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredVideos.map((video) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white py-12">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
                    <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-8 text-center sm:px-10 sm:py-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b4a]">
                            Ready to start?
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                            Book your first lesson today
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
                            Put what you've learned into practice with professional
                            instruction from Drive Academy.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <a
                                href="https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103"
                                className="inline-flex items-center justify-center rounded-full bg-[#ff2c00] px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-xl hover:bg-[#ff4b26]"
                            >
                                Book a Lesson
                            </a>
                            <a
                                href="/packages"
                                className="inline-flex items-center justify-center rounded-full border-2 border-white/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-white/10"
                            >
                                View Packages
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* Video Card Component */
type VideoCardProps = {
    video: VideoData;
};

function VideoCard({ video }: VideoCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl">
            {/* Video Embed */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                {!isPlaying ? (
                    <>
                        <img
                            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                            alt={video.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff2c00] shadow-2xl transition-transform group-hover:scale-110">
                                <svg
                                    className="ml-1 h-7 w-7 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </button>
                    </>
                ) : (
                    <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                {video.category && (
                    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
            {video.category}
          </span>
                )}
                <h3 className="mt-3 text-base font-bold leading-snug text-slate-900">
                    {video.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {video.description}
                </p>
                <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#ff2c00] hover:text-[#ff4b26]"
                >
                    Watch on YouTube
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </article>
    );
}
