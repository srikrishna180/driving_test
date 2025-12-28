// routes/contact.tsx
import type { Route } from "./+types/contact";
import { Form, useActionData } from "react-router";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    // TODO: send to your backend / email service
    // const name = formData.get("name");
    // ...
    return { success: true };
}

const SUBJECT_OPTIONS = [
    "General Enquiry",
    "Account Enquiry",
    "Reschedule a booking",
    "Cancel a booking",
    "Driving Lessons",
    "Driving Test Package",
];

export function meta() {
    return [{ title: "Contact Drive Academy" }];
}

export default function ContactPage(_props: Route.ComponentProps) {
    const actionData = useActionData<typeof action>();

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-0">
                <h1 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
                    Contact Drive Academy
                </h1>

                {actionData?.success && (
                    <p className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                        Thanks for getting in touch. We&apos;ll respond shortly.
                    </p>
                )}

                <Form method="post" className="space-y-5">
                    {/* Name */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="name"
                            className="block font-semibold text-slate-800"
                        >
                            Name:
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="block w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="email"
                            className="block font-semibold text-slate-800"
                        >
                            Email:
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="block w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="phone"
                            className="block font-semibold text-slate-800"
                        >
                            Phone:
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="block w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        />
                    </div>

                    {/* Subject select */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="subject"
                            className="block font-semibold text-slate-800"
                        >
                            Subject:
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            className="block w-full rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            defaultValue={SUBJECT_OPTIONS[0]}
                        >
                            {SUBJECT_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Enquiry textarea */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="enquiry"
                            className="block font-semibold text-slate-800"
                        >
                            Enquiry:
                        </label>
                        <textarea
                            id="enquiry"
                            name="enquiry"
                            rows={6}
                            required
                            className="block w-full resize-y rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        />
                    </div>

                    {/* Submit button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-sm bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800 sm:w-auto"
                        >
                            Send
                        </button>
                    </div>
                </Form>

                {/* Contact details under form (from right column in screenshot) */}
                <div className="mt-8 space-y-1 text-sm text-slate-800">
                    <div className="flex gap-2">
                        <span className="w-16 font-semibold text-slate-700">Phone:</span>
                        <a
                            href="tel:0402585553"
                            className="text-rose-600 hover:text-rose-500"
                        >
                            0402 585 553
                        </a>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-16 font-semibold text-slate-700">Email:</span>
                        <a
                            href="mailto:info@driveacademy.com.au"
                            className="text-rose-600 hover:text-rose-500"
                        >
                            info@driveacademy.com.au
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
