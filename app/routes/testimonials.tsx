// routes/testimonials.tsx
import type { Route } from "./+types/testimonials";

type Testimonial = {
    id: string;
    name: string;
    avatarUrl?: string | null;
    rating: number;
    text: string;
};

export const testimonials = [
    {
        name: "Lucie G",
        rating: 5,
        text: "My son had his first lesson. Very happy with everything. Highly recommend.",
    },
    {
        name: "Evan W",
        rating: 5,
        text: "Hi, Just wanted to let you know both of the kids thoroughly enjoyed their lessons on monday and it was entirely due to your personality and patience",
    },
    {
        name: "Rachel G",
        rating: 5,
        text: "Hi Farooq, Rachel Here, Just letting ya know I Passed yay yay yay!! Thank-you Very much for the lessons. Truely appreciate it, have a wonderful, Blessed Day.",
    },
    {
        name: "Nahidur R",
        rating: 5,
        text: "They teach very effectively the road rules from all aspect - what to do, why to do and how to act with the rules, during driving on Queensland roads. I wish all the best for Drive Academy and highly recommended.",
    },
    {
        name: "Najmim F",
        rating: 5,
        text: "Tasneem is really a good instructor. she helped me a lot to get the license quickly. she is friendly. I enjoyed her accompany during lesson.I wish her all the best success in life.",
    },
    {
        name: "Majid M",
        rating: 5,
        text: "Thanks to the Drive Academy professional team, my son just passed the test in his first driving test",
    },
    {
        name: "Rawan A",
        rating: 5,
        text: "I had my first lesson today and I really enjoyed it, My driver was very patient with me and taught me simpler ways of doing things when driving. I will definitely take more lessons and I recommend Drive academy for everyone, it really is the best!",
    },
    {
        name: "Zara S",
        rating: 5,
        text: "I had my first lesson today and my driver was very patient and reliable. I am a lot more confident on the road and will definitely be taking more lessons. 100% recommend Drive Academy.",
    },
    {
        name: "Ali H",
        rating: 5,
        text: "Ver well trained staff. Really helpful to pass driving test.",
    },
    {
        name: "Muhammad A",
        rating: 5,
        text: "Umar was very helpful, flexible, friendly, and provided excellent tips at every step of the process. Helped me pass my test on the first attempt. Would definitely recommend this to anyone looking for driving lessons",
    },
    {
        name: "Paramjeet K",
        rating: 5,
        text: "My first time with Drive Academy, I took lessons with Mr. Farooq and I'm thankful because I've passed today. I took their driving lessons and pre test packages, definitely worthwhile. Farooq is fatherly and always kind to help me get better. I was always given constructive feedbacks to improve. He kept making me practice whenever there was a need until he is happy with my driving and knows I have built confidence as well, his patience and great approach is highly commendable! I found Drive Academy after some research and was impressed with the videos they posted, hence called and booked my lessons. Whoever is wanting to pass don't wait, book your lessons today as they are highly skilled instructors and insya Allah you will pass. Thanks so much Mr Farooq.",
    },
    {
        name: "Amiel D",
        rating: 5,
        text: "I had my lessons with Anum, and she was very good and nice! I learned a lot from her and now i passed the test and Im very thankful!",
    },
    {
        name: "Amina M",
        rating: 5,
        text: "The driving instructors were incredibly supportive, knowledgeable and patient with me. Ali instilled confidence in me from the very first lesson. Took me through the routes I was assessed on and provided a simplified approach for me along the way. They went the extra mile to make sure I was comfortable and confident in my driving ability and for the test.",
    },
    {
        name: "Farha A",
        rating: 5,
        text: "Excellent!! Highly recommend...got my licence on first attempt..friendly staffs and always on time",
    },
    {
        name: "Silvie",
        rating: 5,
        text: "I had a driving lesson from Ali Khan. He was on time and in good communication by email. Ali was calm, mature, and gave me some good tips about driving in Australia(I am frome Europe). I had a perfect hour in his car and feel more and more safe to drive. He made me feel relaxed and have a positive attitude.",
    },
    {
        name: "Amber I",
        rating: 5,
        text: "I've had two lessons now and have really enjoyed my time with Tas. She is very patient and understands that we are still learning! Very good value for money. I can't wait to do more lessons with Drive Academy.",
    },
    {
        name: "Beverley C",
        rating: 5,
        text: "The staff are very supportive and professional at all times. Ali is a kind, patient, and very knowledgeable capable instructor.",
    },
    {
        name: "Monika S",
        rating: 5,
        text: "Drive academy instructors are very very patient. My instructor today was great, taught me the basics and answered any questions I had. Made sure I was fully comfortable behind the wheel",
    },
    {
        name: "Ruri",
        rating: 5,
        text: "I had driving lessons with Ali and he has shown to be very knowledgeable and professional. I am very happy with Drive Academy and I continue to feel more and more confident whilst driving!",
    },
    {
        name: "Sharni P",
        rating: 5,
        text: "I’ve been putting off driving lessons for years now, but had I known there were instructors out there like Anum, I would have had my licence a long time ago. Anum is knowledgeable and I feel like I’m learning a lot ... but more than that, she is patient and extremely compassionate and because of this, my confidence, which has been sorely lacking, is growing with each lesson: I’m so grateful to her and Drive Academy and look forward to my weekly drives with her.",
    },
];


export function meta() {
    return [{ title: "Testimonials | Drive Academy" }];
}

export default function TestimonialsPage(_props: Route.ComponentProps) {
    const renderStars = (count: number) => (
        <div className="flex items-center gap-0.5 text-[#ffb400]">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    className={`h-4 w-4 ${
                        i < count ? "fill-current" : "fill-[#e5e7eb]"
                    }`}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                </svg>
            ))}
        </div>
    );

    return (
        <main className="min-h-screen bg-[#f5f7fb]">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
                {/* Page heading */}
                <header className="mb-8 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Testimonials
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Real feedback from learners who trained with Drive Academy instructors.
                    </p>
                </header>

                {/* Testimonials list – single centered column */}
                <section className="space-y-4">
                    {testimonials.map((t, idx) => (
                        <article
                            key={idx}
                            className="flex gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-slate-100 sm:px-5 sm:py-5"
                        >
                            {/* Avatar */}

                            {/*{t?.avatarUrl ? (*/}
                            {/*    <img*/}
                            {/*        src={t?.avatarUrl}*/}
                            {/*        alt={t.name}*/}
                            {/*        className="mt-1 h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"*/}
                            {/*    />*/}
                            {/*) : (*/}
                                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-400 sm:h-12 sm:w-12">
                                    {t.name[0]}
                                </div>
                            {/*)}*/}

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm font-semibold text-slate-900">
                                        {t.name}
                                    </p>
                                    {renderStars(t.rating)}
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                                    {t.text}
                                </p>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
