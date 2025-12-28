// routes/package.$slug.tsx
import type { Route } from "./+types/package.$slug";
import { Link, useParams } from "react-router";
import { packages } from "~/data/packages";

export function meta({ params }: Route.MetaArgs) {
    const pkg = packages.find((p) => p.slug === params.slug);
    return [
        { title: pkg ? `${pkg.name} | Packages` : "Package not found" },
    ];
}

export default function PackageDetailPage(_props: Route.ComponentProps) {
    const { slug } = useParams<{ slug: string }>();
    const pkg = packages.find((p) => p.slug === slug);

    if (!pkg) {
        return (
            <main className="min-h-screen bg-[#f5f7fb]">
                <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-0">
                    <Link
                        to="/packages"
                        className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                    >
                        ← Back to packages
                    </Link>
                    <p className="mt-6 text-sm text-slate-700">Package not found.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f5f7fb]">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-0">
                {/* Back */}
                <Link
                    to="/packages"
                    className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900"
                >
                    ← Back to packages
                </Link>

                {/* Card */}
                <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
                    {/* Header row */}
                    <div className="grid gap-8 px-6 pb-6 pt-6 sm:px-8 sm:pt-8 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
                        <div className="overflow-hidden rounded-2xl border border-slate-100">
                            <img
                                src={pkg.imageUrl}
                                alt={pkg.name}
                                className="h-60 w-full object-cover sm:h-72"
                            />
                        </div>

                        <div className="flex flex-col justify-between gap-6">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    {pkg.badge === "AUTO" ? "Automatic Package" : "Package"}
                                </p>
                                <h1 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                    {pkg.name}
                                </h1>
                                <p className="mt-3 text-lg font-semibold text-slate-900">
                                    {pkg.price}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                <a
                                    href={pkg.href}
                                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 sm:w-auto">
                                    Add to Cart
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="border-t border-slate-100 px-6 py-6 sm:px-8 sm:py-8">
                        <section className="space-y-6 text-sm leading-relaxed text-slate-700">
                            <div>
                                <h2 className="mb-2 text-sm font-semibold text-slate-900 sm:text-base">
                                    {pkg.includesTitle}
                                </h2>
                                <ul className="ml-5 list-disc space-y-1">
                                    {pkg.includes.map((line) => (
                                        <li key={line}>{line}</li>
                                    ))}
                                </ul>
                            </div>

                            {pkg.notes && pkg.notes.length > 0 && (
                                <div className="rounded-2xl bg-slate-50 px-4 py-4 sm:px-5 sm:py-5">
                                    <h3 className="mb-2 text-sm font-semibold text-slate-900">
                                        {pkg.notesTitle ?? "Note"}
                                    </h3>
                                    <ul className="ml-5 list-disc space-y-1 text-sm text-slate-700">
                                        {pkg.notes.map((line) => (
                                            <li key={line}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
}
