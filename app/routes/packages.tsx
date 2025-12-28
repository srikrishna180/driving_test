// routes/packages.tsx
import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/packages";
import { packages } from "~/data/packages";

const CATEGORIES = [
    { id: "all", label: "All" },
    { id: "automatic-packages", label: "Automatic Packages" },
    { id: "lesson-vouchers", label: "Lesson Vouchers" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

export function meta() {
    return [{ title: "Packages | Drive Academy" }];
}

export default function PackagesPage(_props: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = (searchParams.get("tab") ?? "all") as CategoryId;

    const setTab = (next: CategoryId) => {
        const sp = new URLSearchParams(searchParams);
        sp.set("tab", next);
        setSearchParams(sp, { replace: true });
    };

    const filtered =
        tab === "all" ? packages : packages.filter((p) => p.category === tab);

    return (
        <main className="min-h-screen bg-[#f5f7fb]">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-0">
                <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Packages
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Save with lesson packs or purchase gift vouchers for friends and
                            family.
                        </p>
                    </div>
                </header>

                {/* Tabs */}
                <div className="mt-5 border-b border-slate-200">
                    <nav className="flex flex-wrap gap-6 text-sm">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setTab(cat.id)}
                                className={`border-b-2 pb-3 font-semibold transition-colors ${
                                    tab === cat.id
                                        ? "border-slate-900 text-slate-900"
                                        : "border-transparent text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Grid */}
                <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filtered.map((pkg) => (
                        <article
                            key={pkg.id}
                            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
                        >
                            <Link
                                to={`/packages/${pkg.slug}`}
                                prefetch="intent"
                                className="flex-1"
                            >
                                {/* Image area with full artwork visible */}
                                <div className="relative bg-slate-50">
                                    <div className="aspect-[4/3] w-full">
                                        <img
                                            src={pkg.imageUrl}
                                            alt={pkg.name}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                  {/*                  <span className="absolute left-0 top-0 bg-[#ff2c00] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">*/}
                  {/*  {pkg.badge}*/}
                  {/*</span>*/}
                                </div>

                                <div className="px-4 pt-3 pb-3 sm:px-5 sm:pt-4">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                        {pkg.category === "lesson-vouchers"
                                            ? "Lesson Voucher"
                                            : "Auto Package"}
                                    </p>
                                    <p className="mt-2 line-clamp-2 text-sm font-semibold text-slate-900">
                                        {pkg.name}
                                    </p>
                                    <p className="mt-2 text-sm font-bold text-slate-900">
                                        {pkg.price}
                                    </p>
                                </div>
                            </Link>

                            <div className="border-t border-slate-100 px-4 pb-4 pt-3 sm:px-5">
                                <a
                                    href={pkg.href}
                                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors group-hover:bg-slate-800">
                                    Add to Cart
                                </a>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
