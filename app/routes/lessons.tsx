// routes/lessons.tsx
import type { Route } from "./+types/lessons";
import { useSearchParams } from "react-router";

type LessonRow = {
    service: string;
    autoPrice: string;
    autoOldPrice?: string;
};

type TestPackage = {
    name: string;
    price: string;
    descriptionLines: string[];
    href: string;
    ctaLabel: string;
};

const DRIVING_LESSONS: LessonRow[] = [
    { service: "1 Hour Lesson", autoPrice: "$70" },
    { service: "2 Hour Lesson", autoPrice: "$130" },
    { service: "5 Lesson Pack", autoPrice: "$325", autoOldPrice: "$350" },
    { service: "10 Lesson Pack", autoPrice: "$600", autoOldPrice: "$700" },
];

const TEST_PACKAGES: TestPackage[] = [
    {
        name: "Test Day Package",
        price: "$180*",
        descriptionLines: [
            "1 hour warm‑up lesson",
            "Pick‑up and drop‑off",
            "Car hire for test",
            "*Excludes TMR booking fee",
        ],
        href: "https://driveacademy.com.au/Cart?id=11458",
        ctaLabel: "Buy Auto Pack",
    },
    {
        name: "Grand Master Learner’s Package",
        price: "$770*",
        descriptionLines: [
            "10 x 1hr driving lessons",
            "1 hour warm‑up lesson",
            "Pick‑up and drop‑off",
            "Car hire for test",
            "*Excludes TMR booking fee",
        ],
        href: "https://driveacademy.com.au/Cart?id=11460",
        ctaLabel: "Buy Auto Pack",
    },
];

export function meta() {
    return [{ title: "Lessons | Drive Academy" }];
}

export default function LessonsPage(_props: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = (searchParams.get("tab") ?? "lessons") as "lessons" | "test";

    const setTab = (next: "lessons" | "test") => {
        const sp = new URLSearchParams(searchParams);
        sp.set("tab", next);
        setSearchParams(sp, { replace: true });
    };

    return (
        <main className="min-h-screen bg-[#f5f7fb]">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-0">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Lessons
                </h1>

                {/* Tabs */}
                <div className="mt-4 border-b border-slate-200">
                    <nav className="flex gap-6 text-sm">
                        <button
                            type="button"
                            onClick={() => setTab("lessons")}
                            className={`border-b-2 pb-3 font-semibold transition-colors ${
                                tab === "lessons"
                                    ? "border-slate-900 text-slate-900"
                                    : "border-transparent text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            Driving Lessons
                        </button>
                        <button
                            type="button"
                            onClick={() => setTab("test")}
                            className={`border-b-2 pb-3 font-semibold transition-colors ${
                                tab === "test"
                                    ? "border-slate-900 text-slate-900"
                                    : "border-transparent text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            Driving Test Package
                        </button>
                    </nav>
                </div>

                {tab === "lessons" ? <DrivingLessonsTab /> : <DrivingTestPackageTab />}
            </div>
        </main>
    );
}

/* ==== Driving Lessons tab ==== */

function DrivingLessonsTab() {
    return (
        <section className="mt-8 space-y-8">
            {/* Hero */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <img
                    src="https://cdn.bookingtimes.com/Common/LoadImage?Id=66892&v=1"
                    alt="Driving lesson car"
                    className="h-64 w-full object-cover sm:h-80"
                />
            </div>

            {/* Copy */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-3 text-center text-lg font-semibold text-slate-900 sm:text-xl">
                    Get confident behind the wheel
                </h2>
                <div className="space-y-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                    <p>
                        Brisbane&apos;s Drive Academy offers professional manual and automatic
                        driving lessons. Each lesson includes pick‑up and drop‑off in our
                        vehicle.
                    </p>
                    <p>
                        Our instructors are experienced and patient, and aim to make your
                        lessons as stress‑free as possible while you develop safe driving
                        techniques and build real‑world confidence.
                    </p>
                    <p>
                        Choose from a range of lesson lengths or save with multi‑lesson
                        packs.
                    </p>
                </div>
            </div>

            {/* Pricing table */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-4 py-3 sm:px-6 sm:py-4">
                    <p className="text-sm font-semibold text-slate-900">
                        Lesson pricing
                    </p>
                    <p className="text-xs text-slate-500">
                        All prices are for automatic lessons. Manual on request.
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100 text-sm">
                        <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-slate-700 sm:px-6">
                                Service
                            </th>
                            <th className="px-4 py-2 text-right font-semibold text-slate-700 sm:px-6">
                                Auto
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 bg-white">
                        {DRIVING_LESSONS.map((row) => (
                            <tr key={row.service}>
                                <td className="px-4 py-3 text-slate-800 sm:px-6">
                                    {row.service}
                                </td>
                                <td className="px-4 py-3 text-right sm:px-6">
                                    {row.autoOldPrice ? (
                                        <span className="space-x-2">
                        <span className="text-xs text-slate-400 line-through">
                          {row.autoOldPrice}
                        </span>
                        <span className="font-semibold text-emerald-600">
                          {row.autoPrice}
                        </span>
                      </span>
                                    ) : (
                                        <span className="font-semibold text-slate-900">
                        {row.autoPrice}
                      </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
                <a
                    href='https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103'
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                    Book Lessons
                </a>
            </div>
        </section>
    );
}

/* ==== Driving Test Package tab ==== */

function DrivingTestPackageTab() {
    return (
        <section className="mt-8 space-y-8">
            {/* Hero */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <img
                    src="https://cdn.bookingtimes.com/Common/LoadImage?Id=380282&v=1"
                    alt="Student holding licence after test"
                    className="h-64 w-full object-cover sm:h-80"
                />
            </div>

            {/* Copy */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-3 text-center text-lg font-semibold text-slate-900 sm:text-xl">
                    Pass your test with confidence
                </h2>
                <div className="space-y-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                    <p>
                        We offer a Driving Test Package with everything you need to support
                        you on your big day. This includes a warm‑up lesson before the test
                        so you feel comfortable behind the wheel, plus pick‑up and drop‑off
                        before and after your test.
                    </p>
                    <p>
                        The package is a student‑friendly, affordable way to get everything
                        organised with one booking and is available for both manual and
                        automatic drivers.
                    </p>
                </div>
            </div>

            {/* Packages */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="grid divide-y divide-slate-100 text-sm md:grid-cols-2 md:divide-y-0 md:divide-x">
                    {TEST_PACKAGES.map((pack) => (
                        <div
                            key={pack.name}
                            className="flex flex-col items-center gap-4 px-6 py-8 text-center sm:px-8"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                {pack.name}
                            </p>
                            <p className="text-2xl font-bold text-slate-900">
                                {pack.price}
                            </p>
                            <ul className="space-y-1 text-xs text-slate-700">
                                {pack.descriptionLines.map((line) => (
                                    <li key={line}>{line}</li>
                                ))}
                            </ul>
                            <a
                                href={pack.href}
                                className="mt-3 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-xs font-semibold text-white hover:bg-slate-800">
                                {pack.ctaLabel}
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
                <a
                    href='https://driveacademy.com.au/Cart?id=11460'
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                    Book Test Package
                </a>
            </div>
        </section>
    );
}
