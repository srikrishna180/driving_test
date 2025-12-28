// routes/terms.tsx (or routes/terms-of-service.tsx)
import type { Route } from "./+types/terms";

export function meta() {
    return [{ title: "Terms of Service | Drive Academy" }];
}

export default function TermsPage(_props: Route.ComponentProps) {
    return (
        <main className="min-h-screen bg-[#f5f7fb]">
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-0">
                {/* Heading */}
                <header className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Terms of Service
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        By using this website (&quot;Service&quot;) you agree to be bound by
                        these Terms of Service with Drive Academy – ABN 17 350 895 401.
                        Drive Academy reserves the right to update and change the Terms of
                        Service without notice.
                    </p>
                </header>

                <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-700 shadow-sm sm:p-8">
                    {/* Account Terms */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Account Terms
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            This page contains the most current version of the Terms of
                            Service.
                        </p>
                        <ul className="mt-3 ml-5 list-disc space-y-2">
                            <li>
                                You agree that Drive Academy can send you booking reminders,
                                relevant information and other marketing via phone, SMS and/or
                                email. You can opt out of any marketing.
                            </li>
                            <li>
                                You are responsible for maintaining the security of your account
                                and password. Drive Academy cannot and will not be liable for
                                any loss or damage from your failure to comply with this
                                security obligation.
                            </li>
                            <li>
                                By purchasing from Drive Academy, you agree not to initiate any
                                credit card chargeback, or dispute any payment made for
                                services, products, digital goods, vouchers or gift cards
                                purchased, except in cases of proven fraud or unauthorised
                                transactions. All disputes must be resolved directly with Drive
                                Academy.
                            </li>
                            <li>You must not post or submit false information to the Service.</li>
                            <li>
                                You must not use the Service for any illegal or unauthorised
                                purpose, including violating any laws in your jurisdiction such
                                as copyright laws.
                            </li>
                            <li>
                                You are responsible for all activity that occurs from your
                                account. Accounts registered by &quot;bots&quot; or other
                                automated methods are not permitted and will be removed.
                            </li>
                            <li>
                                Drive Academy has the right to suspend or terminate your
                                account, refuse any current or future use of the Service, or any
                                other Drive Academy service, for any reason.
                            </li>
                            <li>
                                Violation of any of the terms or general conditions may result
                                in termination of your account.
                            </li>
                        </ul>
                    </div>

                    {/* Cancellation Rates */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Cancellation Rates
                        </h2>
                        <p className="mt-2">
                            Cancellation, non‑attendance or rescheduling of a booking will
                            incur the following charges:
                        </p>
                        <ul className="mt-3 ml-5 list-disc space-y-2">
                            <li>
                                Less than 12 hours notice before the booking will forfeit the
                                full booking fee.
                            </li>
                            <li>
                                Less than 18 hours notice before the booking will forfeit 50% of
                                the booking fee.
                            </li>
                            <li>
                                Less than 24 hours notice before the booking will forfeit 10% of
                                the booking fee.
                            </li>
                        </ul>
                        <p className="mt-3">
                            A cancellation does not automatically refund payment of products
                            or services. Any amount not subject to the cancellation fee is
                            credited towards your account balance at Drive Academy.
                        </p>
                    </div>

                    {/* Refund Policy */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Refund Policy
                        </h2>
                        <p className="mt-2">
                            All refunds must be resolved directly with Drive Academy.
                        </p>
                    </div>

                    {/* Modifications */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Modifications to Services and Prices
                        </h2>
                        <ul className="mt-3 ml-5 list-disc space-y-2">
                            <li>
                                Drive Academy reserves the right at any time and from time to
                                time to modify or discontinue, temporarily or permanently, the
                                Service (or any part thereof) with or without notice.
                            </li>
                            <li>
                                Prices of all services are subject to change with or without
                                notice.
                            </li>
                            <li>
                                Drive Academy shall not be liable to you or to any third party
                                for any modification, price change, suspension or
                                discontinuance of the Service.
                            </li>
                        </ul>
                    </div>

                    {/* Vouchers */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Vouchers
                        </h2>
                        <ul className="mt-3 ml-5 list-disc space-y-2">
                            <li>Vouchers are non‑refundable and cannot be redeemed for cash.</li>
                            <li>Unused vouchers cannot be transferred between clients.</li>
                        </ul>
                    </div>

                    {/* Fees */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">Fees</h2>
                        <ul className="mt-3 ml-5 list-disc space-y-2">
                            <li>
                                Credit card security is implemented using secure SSL encryption
                                on all transactions and processed using a secure, trusted, PCI
                                compliant payment gateway used by Drive Academy for payment
                                processing.
                            </li>
                            <li>All fees and transactions are in Australian Dollars.</li>
                        </ul>
                    </div>

                    {/* General Conditions */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            General Conditions
                        </h2>
                        <ul className="mt-3 ml-5 list-disc space-y-2">
                            <li>
                                Your use of this website is at your sole risk. The website is
                                provided on an &quot;as is&quot; and &quot;as available&quot;
                                basis.
                            </li>
                            <li>
                                You agree not to reproduce, duplicate, copy, sell, resell or
                                exploit any portion of the website, use of the website, or
                                access to the website without the express written permission of
                                Drive Academy.
                            </li>
                            <li>
                                Verbal, physical, written or other abuse (including threats of
                                abuse or retribution) of any Drive Academy customer, employee,
                                member, instructor, officer or external contractor will result
                                in immediate account termination.
                            </li>
                            <li>
                                You must not transmit any worms or viruses or any code of a
                                destructive nature.
                            </li>
                            <li>
                                You understand that Drive Academy uses third‑party vendors and
                                hosting partners to provide the necessary hardware, software,
                                networking, storage and related technology required to run the
                                website.
                            </li>
                            <li>
                                Drive Academy does not warrant that (i) the website will meet
                                your specific requirements, (ii) the website will be
                                uninterrupted, timely, secure or error‑free, (iii) the results
                                that may be obtained from the use of the website will be
                                accurate or reliable, (iv) the quality of any products,
                                websites, information or other material purchased or obtained by
                                you through the website will meet your expectations, and (v) any
                                errors in the website will be corrected.
                            </li>
                            <li>
                                You expressly understand and agree that Drive Academy shall not
                                be liable for any direct, indirect, incidental, special,
                                consequential or exemplary damages, including but not limited to
                                damages for loss of profits, goodwill, use, data or other
                                intangible losses (even if Drive Academy has been advised of the
                                possibility of such damages), resulting from:
                                <ul className="mt-2 ml-5 list-disc space-y-1">
                                    <li>the use or the inability to use the website</li>
                                    <li>
                                        the cost of procurement of substitute goods and services
                                        resulting from any goods, data, information or services
                                        purchased or obtained or messages received or transactions
                                        entered into through or from the website
                                    </li>
                                    <li>
                                        unauthorised access to or alteration of your transmissions
                                        or data
                                    </li>
                                    <li>statements or conduct of any third party on the website</li>
                                    <li>any other matter relating to the website.</li>
                                </ul>
                            </li>
                            <li>
                                The failure of Drive Academy to exercise or enforce any right or
                                provision of these Terms shall not constitute a waiver of such
                                right or provision.
                            </li>
                        </ul>
                    </div>

                    {/* Questions */}
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Questions
                        </h2>
                        <p className="mt-2">
                            Please send any questions or comments about these Terms of Service
                            to{" "}
                            <a
                                href="mailto:infodriveacademy@gmail.com"
                                className="font-semibold text-sky-600 hover:text-sky-500"
                            >
                                infodriveacademy@gmail.com
                            </a>
                            .
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
