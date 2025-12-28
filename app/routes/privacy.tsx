// routes/privacy.tsx (or routes/privacy-policy.tsx)
import type { Route } from "./+types/privacy";

export function meta() {
    return [{ title: "Privacy Policy | Drive Academy" }];
}

export default function PrivacyPage(_props: Route.ComponentProps) {
    return (
        <main className="min-h-screen bg-[#f5f7fb]">
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-0">
                {/* Heading */}
                <header className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        This Privacy Policy explains how Drive Academy collects, uses and
                        protects your personal information when you use our website or
                        communicate with us.
                    </p>
                </header>

                <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-700 shadow-sm sm:p-8">
                    {/* What is collected */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            What is Collected
                        </h2>
                        <ul className="mt-3 ml-5 list-disc space-y-2">
                            <li>
                                Drive Academy collects your personal information when you use
                                the website and communicate by email or phone. This information
                                can include your name, contact information, phone numbers and
                                payment information.
                            </li>
                            <li>
                                We may also collect non‑personal information such as your IP
                                address, browser version and operating system, which may be
                                released in anonymous form, such as a report publishing our
                                website usage trends.
                            </li>
                            <li>
                                Any credit card details are processed securely in a PCI
                                compliant payment gateway using a secure HTTPS internet
                                connection.
                            </li>
                            <li>
                                Like most websites, Drive Academy uses cookies to store a user&apos;s
                                website preferences. If you do not wish to have cookies placed
                                on your device, you should set your browser to refuse cookies
                                before using our website, with the drawback that certain
                                features may not function properly without cookies.
                            </li>
                        </ul>
                    </div>

                    {/* How it is used */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            How Your Information is Used
                        </h2>
                        <ul className="mt-3 ml-5 list-disc space-y-2">
                            <li>
                                The personal information collected is used for billing,
                                identification, authentication, service improvement, research
                                and website development.
                            </li>
                            <li>
                                Drive Academy will not share your personal information with
                                anyone except to provide the requested services, develop our
                                products, protect our rights, assist with a lawful
                                investigation, comply with the law, or to contact you.
                            </li>
                            <li>
                                Some third‑party service providers (such as website hosts,
                                payment service providers and backup service providers) may have
                                access to personal information held by us that:
                                <ul className="mt-2 ml-5 list-disc space-y-1">
                                    <li>
                                        need to know that information in order to process it on
                                        behalf of Drive Academy or to provide services available at
                                        the Drive Academy website; and
                                    </li>
                                    <li>have agreed not to disclose it to others.</li>
                                </ul>
                            </li>
                            <li>
                                Aggregated non‑personal data collected by Drive Academy may be
                                shared with third parties in order to improve the Drive Academy
                                website.
                            </li>
                        </ul>
                    </div>

                    {/* Social media */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Social Media
                        </h2>
                        <p className="mt-2">
                            Drive Academy may tag you in a photo on social media or include
                            your Facebook profile photo if you leave a testimonial. You can
                            request for a photo not to be displayed or shared.
                        </p>
                    </div>

                    {/* Business transfers */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Business Transfers
                        </h2>
                        <p className="mt-2">
                            If Drive Academy is acquired, or in the unlikely event that it
                            goes out of business or enters bankruptcy, user information would
                            be one of the assets transferred or acquired by a third party. You
                            acknowledge that such transfers may occur, and that any acquirer
                            of Drive Academy may continue to use your personal information as
                            set forth in this policy.
                        </p>
                    </div>

                    {/* Changes */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Privacy Policy Changes
                        </h2>
                        <p className="mt-2">
                            Although most changes are likely to be minor, Drive Academy may
                            change this Privacy Policy from time to time, at its sole
                            discretion. We encourage users to check this page frequently for
                            any updates. Your continued use of this site after any change in
                            the Privacy Policy will constitute your acceptance of such
                            changes.
                        </p>
                    </div>

                    {/* Questions */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Questions or Complaints
                        </h2>
                        <p className="mt-2">
                            Your privacy is taken seriously. You can contact Drive Academy
                            anytime at{" "}
                            <a
                                href="mailto:infodriveacademy@gmail.com"
                                className="font-semibold text-sky-600 hover:text-sky-500"
                            >
                                infodriveacademy@gmail.com
                            </a>{" "}
                            with any questions or complaints regarding how your personal
                            information is handled.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
