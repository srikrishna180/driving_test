// routes/locations.tsx
import { Fragment } from "react";

const PHONE = "0420 585 553";
const EMAIL = "info@driveacademy.com.au";

const OPENING_HOURS = [
    { day: "Monday", hours: "7:00am to 4:00pm" },
    { day: "Tuesday", hours: "7:00am to 4:00pm" },
    { day: "Wednesday", hours: "7:00am to 4:00pm" },
    { day: "Thursday", hours: "7:00am to 4:00pm" },
    { day: "Friday", hours: "7:00am to 4:00pm" },
    { day: "Saturday", hours: "7:00am to 4:00pm" },
    { day: "Sunday", hours: "7:00am to 4:00pm" },
];

const AREAS_COLUMNS: string[][] = [
    [
        "Acacia Ridge",
        "Algester",
        "Annerley",
        "Archerfield",
        "Beenleigh",
        "Bethania",
        "Browns Plains",
        "Calamvale",
        "Camp Hill",
        "Cannon Hill",
        "Carbrook",
        "Carindale",
        "Chambers Flat",
        "Chelmer",
    ],
    [
        "Coopers Plains",
        "Coorparoo",
        "Corinda",
        "Crestmead",
        "Daisy Hill",
        "Darra",
        "Doolandella",
        "Drewvale",
        "Durack",
        "Dutton Park",
        "Eight Mile Plains",
        "East Brisbane",
        "Eden's Landing",
        "Forest Lake",
    ],
    [
        "Fortitude Valley",
        "Greenslopes",
        "Greenbank",
        "Heritage Park",
        "Hillcrest",
        "Holland Park",
        "Holland Park West",
        "Inala",
        "Indooroopilly",
        "Kangaroo Point",
        "Kingston",
        "Kuraby",
        "Logan Central",
        "Logan Reserve",
    ],
    [
        "Logan Village",
        "Loganholme",
        "Loganlea",
        "Mackenzie",
        "Mansfield",
        "Meadowbrook",
        "Moorooka",
        "Mount Gravatt",
        "Mount Gravatt East",
        "New Farm",
        "Newstead",
        "Pallara",
        "Park Ridge",
        "Parkinson",
    ],
    [
        "Regents Park",
        "Rochedale",
        "Rochedale South",
        "Runcorn",
        "Salisbury",
        "Slacks Creek",
        "Springwood",
        "Stones Corner",
        "Stretton",
        "Sunnybank",
        "Sunnybank Hills",
        "Tanah Merah",
        "Tarragindi",
        "Tennyson",
    ],
];

export function meta() {
    return [{ title: "Drive Academy | Locations" }];
}

export default function LocationsPage() {
    return (
        <main className="min-h-screen bg-[#f5f7fb]">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-0">
                {/* Heading */}
                <header>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Drive Academy in Brisbane, Logan & Ipswich
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Local pick‑up and drop‑off across Brisbane Southside, Logan and
                        surrounding suburbs.
                    </p>
                </header>

                {/* Contact + map - EQUAL HEIGHT */}
                <section className="mt-6 grid h-[380px] gap-8 md:grid-cols-[1.1fr_1.3fr] md:h-[420px]">
                    {/* Contact + hours */}
                    <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-800 shadow-sm sm:p-7 md:h-full">
                        <div className="space-y-6 h-full flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex gap-3">
                                        <span className="w-16 shrink-0 font-semibold text-slate-600">
                                            Phone:
                                        </span>
                                        <a
                                            href={`tel:${PHONE.replace(/\s/g, "")}`}
                                            className="flex items-center gap-1 font-semibold text-slate-900 hover:text-slate-700"
                                        >
                                            <svg
                                                className="h-4 w-4 text-slate-600"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M5.5 4.5 8 4l2 4-2 1c.6 1.4 1.6 2.7 3 3.9 1.3 1.2 2.6 2.1 4 2.7l1-2 4 2.1-.5 2.5c-.1.7-.6 1.3-1.3 1.5-1.3.4-3.4.2-6.1-1.1-2.6-1.3-4.9-3.2-7-5.7-2.1-2.5-3.4-4.9-3.9-7.2-.3-1.2-.3-2.1 0-2.8.2-.7.8-1.2 1.5-1.3Z"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={1.6}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            {PHONE}
                                        </a>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="w-16 shrink-0 font-semibold text-slate-600">
                                            Email:
                                        </span>
                                        <a
                                            href={`mailto:${EMAIL}`}
                                            className="font-semibold text-slate-900 hover:text-slate-700"
                                        >
                                            {EMAIL}
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <p className="font-semibold text-slate-700 mb-3">Opening hours</p>
                                    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-y-1 text-sm">
                                        {OPENING_HOURS.map(({ day, hours }) => (
                                            <Fragment key={day}>
                                                <span className="font-medium text-slate-700">{day}</span>
                                                <span className="pl-4 text-slate-600">{hours}</span>
                                            </Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <a
                                href='https://driveacademy.com.au/BookingsWeekly?Location=978&Staff=3103'
                                className="inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-8 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm hover:bg-slate-800 w-full"
                            >
                                Book Now
                            </a>
                        </div>
                    </div>

                    {/* Map embed */}
                    <div className="h-full rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden md:h-full">
                        <iframe
                            title="Drive Academy service area"
                            src="https://www.google.co.nz/maps/d/u/1/embed?mid=1Ji8cYyHNSAcS0miMPOcrVOjdPK2vd5Sm"
                            loading="lazy"
                            className="h-full w-full border-0"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </section>

                {/* Areas section - unchanged */}
                <section className="mt-16 rounded-3xl border border-slate-200/50 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] p-10 sm:p-12 lg:p-16">
                    <div className="mb-12 text-center">
                        <h2 className="text-lg font-bold uppercase tracking-[0.22em] text-slate-800">
                            Areas We Service
                        </h2>
                        <p className="mt-3 text-lg font-medium text-slate-700 max-w-2xl mx-auto">
                            Free pick-up and drop-off available in the following Brisbane suburbs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                        {AREAS_COLUMNS.slice(0, 3).map((column, colIdx) => (
                            <ul key={colIdx} className="space-y-2 text-base font-medium text-slate-800 leading-relaxed">
                                {column.map((suburb, idx) => (
                                    <li key={idx} className="py-2 px-4 rounded-xl bg-slate-50/70">
                                        {suburb}
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>

                    <div className="mt-12 pt-10 border-t border-slate-200 text-center">
                        <p className="text-base text-slate-600">
                            Not seeing your suburb? <span className="font-semibold text-slate-900">Contact us</span> – we service most Brisbane areas!
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
