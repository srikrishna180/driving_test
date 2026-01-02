// ADD MORE VIDEOS HERE - just copy this format:
// {
//   id: "VIDEO_ID_HERE",
//   title: "Video Title",
//   description: "Video description",
//   category: "Driving Lessons",
// },

export interface VideoData {
    id: string;
    title: string;
    description: string;
    category?: "Mock Tests" | "Test Routes" | "Tips & Tricks" | "Student Tests" | "Driving Lessons";
}

export const videos: VideoData[] = [
    {
        id: "L_RII38AS7A",
        title: "Full Ipswich Mock Test – Real Learner. Real Pressure. Full Drive!",
        description: "Complete mock driving test filmed in Ipswich with a real learner driver. Unedited drive showing real pressure, instructor feedback, and common hazards on actual test routes.",
        category: "Mock Tests",
    },
    {
        id: "IjGdReQnZrs",
        title: "How To Pass The Hazard Perception Test In 2025 - Driving Instructors Perspective!",
        description: "Updated 2025 hazard perception test attempted by our driving instructor. Practice test with detailed explanations and tips for passing your HPT.",
        category: "Tips & Tricks",
    },
    {
        id: "DFM726EmPY0",
        title: "How To Pass Your Driving Test With EASE! - Logan Mock Driving Test",
        description: "Full Logan mock test showing excellent driving habits and fundamentals. Watch and learn proper scanning, speed management, lane positioning, and steering control.",
        category: "Mock Tests",
    },
    {
        id: "3DNpaw-9YE0",
        title: "Brisbane Driving Test Route #4",
        description: "Complete driving test route in Brisbane with commentary. Learn the streets, intersections, and common challenges in this test area.",
        category: "Test Routes",
    },
    {
        id: "NPlwFiS7Rgs",
        title: "Student Almost Crashes...TWICE - Logan Mock Test",
        description: "Real mock test showing how to handle near-miss situations and recover from mistakes. Essential viewing for learners preparing for their test at Logan.",
        category: "Student Tests",
    },
    {
        id: "kArrTV7LCo0",
        title: "Common Driving Test Mistakes Students Make",
        description: "Learn the most common errors that cause test failures and how to avoid them. Expert breakdown of mistakes at intersections, roundabouts, and more.",
        category: "Tips & Tricks",
    },
    {
        id: "-JV1yqEkqR4",
        title: "How To Master Roundabouts - Queensland Driving Test",
        description: "Complete guide to navigating roundabouts correctly. Lane selection, signaling, give way rules, and multi-lane roundabout techniques.",
        category: "Driving Lessons",
    },
    {
        id: "MNJss8Raaws",
        title: "Parallel Parking Made Easy - Step by Step Guide",
        description: "Master parallel parking with this detailed step-by-step tutorial. Reference points, steering techniques, and common mistakes to avoid.",
        category: "Driving Lessons",
    },
    {
        id: "txY-K3eZh0A",
        title: "Three Point Turn Tutorial - Perfect Every Time",
        description: "Learn how to execute a perfect three-point turn for your driving test. Proper checking procedures, steering control, and positioning.",
        category: "Driving Lessons",
    },
    {
        id: "_pGpQtMFsFg",
        title: "Railway Crossing Safety - What You MUST Know",
        description: "Essential railway crossing procedures for your driving test. When to stop, how to check, and dealing with lights and boom gates.",
        category: "Driving Lessons",
    },
    {
        id: "GdPx4Xm3Hrg",
        title: "Logan Test Centre Complete Guide",
        description: "Everything you need to know about testing at Logan. Test routes, common fail points, parking areas, and local traffic conditions.",
        category: "Test Routes",
    },
    {
        id: "Ikml20AGdW4",
        title: "You Have To Watch This Logan Test Centre Update Before Your Test",
        description: "Important updates about Logan Test Centre that every learner needs to know before taking their driving test. Recent changes and new procedures.",
        category: "Tips & Tricks",
    },
    {
        id: "zFAT5Fi3PPo",
        title: "Reverse Parking Masterclass - QLD Driving Test",
        description: "Complete reverse parking tutorial for Queensland driving tests. Reference points, mirror use, and achieving perfect positioning.",
        category: "Driving Lessons",
    },
    {
        id: "EKyoE9a3mKI",
        title: "Lane Changing & Merging - Do It Right Every Time",
        description: "Master safe lane changes and merging for your test. Mirror checks, blind spots, signaling, and gap selection explained.",
        category: "Driving Lessons",
    },
    {
        id: "dKU0WooWxcY",
        title: "Ipswich Test Centre - Complete Area Overview",
        description: "Comprehensive guide to Ipswich test routes and common testing areas. Know the streets, roundabouts, and tricky intersections.",
        category: "Test Routes",
    },
    {
        id: "LeuI7mAIdik",
        title: "U-Turn Techniques - Test Day Success",
        description: "Perfect your U-turn maneuver for test day. Proper observations, positioning, and executing safe U-turns at intersections and driveways.",
        category: "Driving Lessons",
    },
    {
        id: "d-kqFFWsxgw",
        title: "She Failed Miserably...But PASSED! Don't Do These Errors",
        description: "Learn from common driving test mistakes and see how to recover from errors during your practical assessment. Real student experience.",
        category: "Student Tests",
    },
    {
        id: "qghmGkjXnIc",
        title: "Observation & Checking - The Secret To Passing",
        description: "Master the art of proper observations and checking procedures. Head checks, mirror use, and scanning techniques examiners look for.",
        category: "Tips & Tricks",
    },
    {
        id: "a_BLnnseoeA",
        title: "Test Day Nerves - How To Stay Calm & Confident",
        description: "Mental preparation tips for test day success. Managing anxiety, staying focused, and performing your best under pressure.",
        category: "Tips & Tricks",
    },
    {
        id: "DIQdXgTkTrA",
        title: "Speed Management & Road Signs Guide",
        description: "Understanding speed limits, speed zones, and reading road signs correctly. Essential knowledge for safe driving and passing your test.",
        category: "Driving Lessons",
    },
    {
        id: "w7c4syn2PIk",
        title: "Brisbane City Driving - Advanced Test Routes",
        description: "Navigate Brisbane CBD test routes with confidence. Multi-lane roads, tram lanes, bike lanes, and busy intersections explained.",
        category: "Test Routes",
    },
    {
        id: "2znBkAgL6EY",
        title: "Kerb-Side Stop & Hill Start Tutorial",
        description: "Perfect kerb-side stopping technique and hill start procedures. Distance from curb, parking brake use, and smooth takeoffs.",
        category: "Driving Lessons",
    },
    {
        id: "bSKILmqKB2g",
        title: "Real Student Test - Full Commentary Drive",
        description: "Watch a complete real student driving test with full instructor commentary. See what examiners are looking for and common pitfalls.",
        category: "Student Tests",
    },
    {
        id: "48-F7Db5XJ4",
        title: "Traffic Light Procedures - Green, Yellow, Red Rules",
        description: "Master traffic light navigation for your test. When to go, when to stop, yellow light decision-making, and filter arrows.",
        category: "Driving Lessons",
    },
];

// Helper function to get videos by category
export function getVideosByCategory(category: VideoData["category"]) {
    return videos.filter((video) => video.category === category);
}

// Get all unique categories
export function getCategories() {
    const categories = videos
        .map((v) => v.category)
        .filter((c): c is NonNullable<typeof c> => c !== undefined);
    return Array.from(new Set(categories));
}

// Get featured videos (first 6)
export function getFeaturedVideos() {
    return videos.slice(0, 6);
}

// Search videos by title or description
export function searchVideos(query: string) {
    const lowerQuery = query.toLowerCase();
    return videos.filter(
        (video) =>
            video.title.toLowerCase().includes(lowerQuery) ||
            video.description.toLowerCase().includes(lowerQuery)
    );
}
