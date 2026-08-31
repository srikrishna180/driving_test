import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import {Navbar} from "~/components/Navbar";
import {Footer} from "~/components/Footer";
import { CartBar } from "~/components/MiniCart";
import { CartClearOnPurchase } from "~/components/CartClearOnPurchase";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        // Same families as the booking app — the tokens in app.css name them,
        // and a customer moving between the two sites must not see the type
        // change under them.
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    // Structured Data for LocalBusiness / DrivingSchool
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "DrivingSchool",
        "name": "Drive Academy",
        "description": "Professional driving school in Brisbane, Queensland offering manual and automatic driving lessons with TMR accredited instructors",
        "url": "https://yourwebsite.com", // Replace with your actual domain
        "logo": "https://yourwebsite.com/logo.png", // Replace with your actual logo URL
        "image": "https://yourwebsite.com/og-image.jpg", // Replace with your actual OG image
        "email": "infodriveacademy@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Brisbane",
            "addressRegion": "QLD",
            "postalCode": "4000", // Update with your actual postal code
            "addressCountry": "AU"
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Brisbane",
                "sameAs": "https://en.wikipedia.org/wiki/Brisbane"
            },
            {
                "@type": "State",
                "name": "Queensland"
            }
        ],
        "priceRange": "$$",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "20",
            "bestRating": "5",
            "worstRating": "1"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Driving Lesson Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Automatic Driving Lessons",
                        "description": "Professional automatic transmission driving lessons in Brisbane"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Manual Driving Lessons",
                        "description": "Professional manual transmission driving lessons in Brisbane"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Driving Test Package",
                        "description": "Complete driving test preparation package with warm-up lesson"
                    }
                }
            ]
        },
        "knowsAbout": [
            "Driving instruction",
            "Road safety",
            "Queensland driving regulations",
            "TMR requirements"
        ]
    };

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <Meta />
            <Links />
        </head>
        <body>
        <Navbar />
        <CartClearOnPurchase />
        {children}
        <CartBar />
        <ScrollRestoration />
        <Scripts />
        <Footer />
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
            )}
        </main>
    );
}
