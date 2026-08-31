import { packageUrl } from "../config";
// src/data/packages.ts
export type PackageCategory = "automatic-packages" | "lesson-vouchers";

export type PackageDetail = {
    id: string;
    slug: string;
    name: string;
    price: string;
    badge?: "AUTO";
    /** Real photography, if the customer has any. Falls back to PackageArt. */
    imageUrl?: string;
    /** Headline spec drawn on the fallback artwork, e.g. "10 × 1HR LESSONS". */
    artLabel: string;
    artVariant?: "package" | "voucher";
    category: PackageCategory;
    includesTitle: string;
    includes: string[];
    notesTitle?: string;
    notes?: string[];
    href: string;
};

export const packages: PackageDetail[] = [
    {
        id: "auto-test-day",
        slug: "automatic-test-day-package",
        artLabel: "WARM-UP + CAR",
        name: "(Automatic) Test Day Package",
        price: "$180.00",
        // badge: "AUTO",
        category: "automatic-packages",
        includesTitle: "This package includes:",
        includes: [
            "Pick up and drop off from your home or desired location",
            "1hr x Warm‑up lesson prior to test (TMR requires students to check in 20 mins before their test, therefore total lesson time is 40 mins)",
            "Car hire for test – vehicles are checked and approved for testing purposes",
            "Driving instructor attendance for test debrief",
            "*Excludes TMR Booking Fee",
            "Please note – for full 1hr please try to meet at the nominated test centre. Otherwise we will pick you up from your desired location.",
        ],
        notesTitle: "Note",
        notes: [
            "Please try to update ALL fields on your booking sheet.",
            "Once you book your test package, Drive Academy will be in contact with you to get confirmation screenshot.",
            "Please book the package 1hr before your actual test. This will be the time we pick you up for your pre‑test lesson.",
        ],
        href: packageUrl("automatic-test-day-package"),
    },
    {
        id: "auto-gold",
        slug: "automatic-gold-package",
        artLabel: "10 × 1HR LESSONS",
        name: "(Automatic) Gold Package",
        price: "$600.00",
        // badge: "AUTO",
        category: "automatic-packages",
        includesTitle: "This package includes:",
        includes: [
            "10 hours of driving lessons",
            "You may choose to (at the availability & discretion of your instructor):",
            "• Split this into 10 x 1 hour lessons",
            "• or 5 x 2 hour lessons",
        ],
        href: packageUrl("automatic-gold-package"),
    },
    {
        id: "auto-silver",
        slug: "automatic-silver-package",
        artLabel: "5 × 1HR LESSONS",
        name: "(Automatic) Silver Package",
        price: "$325.00",
        // badge: "AUTO",
        category: "automatic-packages",
        includesTitle: "This package includes:",
        includes: ["5 x 1hr Automatic Driving Lesson"],
        href: packageUrl("automatic-silver-package"),
    },
    {
        id: "starter-kit",
        slug: "starter-kit",
        artLabel: "3 × 1HR LESSONS",
        name: "Starter Kit",
        price: "$198.00",
        // badge: "AUTO",
        category: "automatic-packages",
        includesTitle: "Introducing our Learner Starter Pack:",
        includes: [
            "3 hours of expert driving lessons for only $198 (that’s only $66 per hour).",
            "Tailored instruction from experienced instructors so you gain the skills and confidence to become a safe driver.",
            "Valid for 12 months from date of purchase.",
            "Voucher cannot be redeemed for a night lesson.",
            "Valid for new learners only, one use per person.",
            "Drive Academy reserve the right to convert package to normal lesson rate if student has already used this package before.",
        ],
        href: packageUrl("starter-kit"),
    },
    {
        id: "voucher-1hr",
        slug: "automatic-1-hour-voucher",
        artLabel: "SINGLE LESSON",
        artVariant: "voucher",
        name: "(Automatic) 1 Hour Voucher",
        price: "$70.00",
        // badge: "AUTO",
        category: "lesson-vouchers",
        includesTitle: "This package includes:",
        includes: ["1 x 1hr Automatic Driving Lesson"],
        href: packageUrl("automatic-1-hour-voucher"),
    },
    {
        id: "voucher-2hr",
        slug: "automatic-2-hour-voucher",
        artLabel: "2HR LESSON",
        artVariant: "voucher",
        name: "(Automatic) 2 Hour Voucher",
        price: "$130.00",
        // badge: "AUTO",
        category: "lesson-vouchers",
        includesTitle: "This package includes:",
        includes: ["1 x 2hr Automatic Driving Lesson"],
        href: packageUrl("automatic-2-hour-voucher"),
    },
    {
        id: "auto-grand-master",
        slug: "automatic-grand-master-package",
        artLabel: "10 LESSONS + TEST",
        name: "(Automatic) Grand Master Package",
        price: "$770.00",
        // badge: "AUTO",
        category: "automatic-packages",
        includesTitle: "This package is the ultimate automatic learner driver package. It includes:",
        includes: [
            "10 x 1hr Automatic Driving Lessons",
            "Pick‑up and drop‑off before your driving test",
            "1 x Warm‑up lesson before your driving test",
            "Car hire for your driving test",
            "*Excludes TMR Booking Fee",
        ],
        href: packageUrl("automatic-grand-master-package"),
    },
];
