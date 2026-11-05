
import {
    Search,
    Clock3,
    CalendarCheck2,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";

import Reveal from "@/components/shared/Reveal";

const steps = [
    {
        number: "01",
        label: "STEP ONE",
        title: "Discover Spaces",
        description:
            "Explore a curated collection of creative workspaces. Compare locations, equipment, amenities and studio ratings to find the right environment for your project.",
        icon: Search,
        accent: true,
    },
    {
        number: "02",
        label: "STEP TWO",
        title: "Select Shoot Hours",
        description:
            "Choose your preferred studio and select the date, starting time and number of hours that fit your production schedule.",
        icon: Clock3,
        accent: false,
    },
    {
        number: "03",
        label: "STEP THREE",
        title: "Book Instantly",
        description:
            "Review your booking details and estimated cost, then submit your request. Track its status from your personal bookings dashboard.",
        icon: CalendarCheck2,
        accent: true,
    },
    {
        number: "04",
        label: "STEP FOUR",
        title: "Create & Produce",
        description:
            "Once your booking is confirmed, show up at your selected workspace and focus on what matters most: creating something remarkable.",
        icon: Sparkles,
        accent: false,
    },
];

export default function HowBookingWorks() {
    return (
        <section id="how-it-works" className=" scroll-mt-20 relative overflow-hidden bg-base-100 px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
            <div className="mx-auto max-w-[1400px]">

                {/* Editorial heading */}
                <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-primary" />

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                YOUR CREATIVE JOURNEY
                            </p>
                        </div>

                        <h2>
                            From idea
                            <span className="block text-primary">
                                to creation.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 opacity-70 sm:text-base">
                            Finding the perfect creative workspace should be simple.
                            Four straightforward steps take you from discovering a studio
                            to bringing your next project to life.
                        </p>
                    </div>

                    <div className="hidden items-center gap-4 border-l border-base-content/20 pl-6 sm:flex lg:mb-2">
                        <span className="font-display text-6xl text-primary">
                            04
                        </span>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.15em]">
                                SIMPLE STEPS
                            </p>
                            <p className="mt-1 text-xs opacity-60">
                                One creative journey
                            </p>
                        </div>
                    </div>
                </div>

                {/* Four booking steps */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <Reveal
                                key={step.number}
                                delay={index * 0.12}
                                className="h-full"
                            >
                                <article
                                    className="group relative flex h-full min-h-[330px] flex-col overflow-hidden border border-base-content/15 bg-base-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7"
                                >
                                    {/* Decorative background number */}
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -right-2 -top-5 font-display text-[125px] leading-none text-base-content/[0.045]"
                                    >
                                        {step.number}
                                    </span>

                                    {/* Step number and label */}
                                    <div className="relative z-10 flex items-center justify-between">
                                        <span
                                            className={`font-display text-5xl ${step.accent ? "text-primary" : "text-base-content/50"
                                                }`}
                                        >
                                            {step.number}
                                        </span>

                                        <span
                                            className={`text-[9px] font-bold uppercase tracking-[0.16em] ${step.accent ? "text-primary" : "opacity-50"
                                                }`}
                                        >
                                            {step.label}
                                        </span>
                                    </div>

                                    {/* Step icon */}
                                    <div
                                        className={`relative z-10 mt-8 flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:rotate-6 ${step.accent
                                                ? "bg-primary text-white"
                                                : "bg-base-content text-base-100"
                                            }`}
                                    >
                                        <Icon size={22} strokeWidth={1.8} />
                                    </div>

                                    {/* Step content */}
                                    <div className="relative z-10 mt-7 flex-1">
                                        <h3>{step.title}</h3>

                                        <p className="mt-4 text-sm leading-7 opacity-65">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Card footer */}
                                    <div className="relative z-10 mt-7 flex items-center justify-between border-t border-base-content/15 pt-5">
                                        <span className="text-[9px] font-bold uppercase tracking-[0.16em] opacity-50">
                                            STUDIO JOURNEY
                                        </span>

                                        <span className="flex h-9 w-9 items-center justify-center border border-base-content/20 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                                            <ArrowUpRight size={17} />
                                        </span>
                                    </div>

                                    {/* Bottom accent line */}
                                    <div
                                        className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${step.accent ? "bg-primary" : "bg-accent"
                                            }`}
                                    />
                                </article>
                            </Reveal>
                        );
                    })}
                </div>

                {/* Closing statement */}
                <div className="mt-10 flex flex-col gap-3 border-t border-base-content/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-60">
                        SIMPLE TO BOOK. BUILT TO CREATE.
                    </p>

                    <p className="text-xs opacity-60">
                        Your next great project starts with the right space.
                    </p>
                </div>
            </div>
        </section>
    );
}
