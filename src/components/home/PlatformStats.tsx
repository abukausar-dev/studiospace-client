
"use client";

import { useEffect, useState } from "react";
import {
    ArrowUpRight,
    Camera,
    CalendarCheck,
    Users,
} from "lucide-react";

import CountUp from "@/components/shared/CountUp";

interface PlatformStatistics {
    studios: number;
    bookings: number;
    creators: number;
}

interface StatsResponse {
    success: boolean;
    message?: string;
    data: PlatformStatistics;
}

const statisticItems = [
    {
        key: "studios",
        number: "01",
        label: "STUDIOS LISTED",
        title: "Creative Spaces",
        description: "Creative spaces ready to explore.",
        icon: Camera,
    },
    {
        key: "bookings",
        number: "02",
        label: "BOOKINGS MADE",
        title: "Creator Bookings",
        description: "Creative sessions across our platform.",
        icon: CalendarCheck,
    },
    {
        key: "creators",
        number: "03",
        label: "REGISTERED CREATORS",
        title: "Our Community",
        description: "People bringing new ideas to life.",
        icon: Users,
    },
] as const;

function StatsSkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-3">
            {statisticItems.map((item) => (
                <div
                    key={item.key}
                    className="border border-base-content/10 bg-base-200 p-7 sm:p-9"
                >
                    <div className="h-3 w-24 animate-pulse bg-base-300" />

                    <div className="mt-8 h-14 w-28 animate-pulse bg-base-300" />

                    <div className="mt-5 h-3 w-36 animate-pulse bg-base-300" />

                    <div className="mt-3 h-3 w-28 animate-pulse bg-base-300" />
                </div>
            ))}
        </div>
    );
}

export default function PlatformStats() {
    const [stats, setStats] = useState<PlatformStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        const fetchStats = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("/api/studios/stats", {
                    cache: "no-store",
                    signal: controller.signal,
                });

                const result: StatsResponse = await response.json();

                if (!response.ok || !result.success || !result.data) {
                    throw new Error(
                        result.message || "Unable to load platform statistics.",
                    );
                }

                const { studios, bookings, creators } = result.data;

                if (
                    !Number.isFinite(studios) ||
                    !Number.isFinite(bookings) ||
                    !Number.isFinite(creators)
                ) {
                    throw new Error("The server returned invalid statistics.");
                }

                setStats({
                    studios,
                    bookings,
                    creators,
                });
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    return;
                }

                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while loading statistics.",
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchStats();

        return () => {
            controller.abort();
        };
    }, [retryCount]);

    return (
        <section className="relative overflow-hidden bg-base-100 px-5 py-20 text-base-content sm:px-10 lg:px-16 lg:py-28">
            {/* Decorative element */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 hidden h-44 w-44 border-[25px] border-primary/10 lg:block"
            />

            <div className="relative mx-auto max-w-[1400px]">
                {/* Section heading */}
                <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-primary" />

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                THE COMMUNITY IN NUMBERS
                            </p>
                        </div>

                        <h2>
                            A growing space
                            <span className="block text-primary">
                                for creators.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-base-content/65 sm:text-base">
                            Every studio, booking and creator adds something to
                            our creative community. Here is a look at StudioSpace
                            through the numbers.
                        </p>
                    </div>

                    <div className="hidden items-center gap-3 border-l border-base-content/20 pl-5 lg:flex">
                        <span className="h-2 w-2 animate-pulse bg-primary" />

                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-base-content/60">
                            LIVE PLATFORM DATA
                        </p>
                    </div>
                </div>

                {/* Loading state */}
                {loading && <StatsSkeleton />}

                {/* Error state */}
                {!loading && error && (
                    <div className="border border-error/30 bg-base-200 p-8 text-center">
                        <h3>Statistics unavailable.</h3>

                        <p className="mt-3 text-sm text-base-content/65">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => setRetryCount((count) => count + 1)}
                            className="btn btn-neutral btn-sm mt-6 gap-2"
                        >
                            Try Again
                            <ArrowUpRight size={16} />
                        </button>
                    </div>
                )}

                {/* Real platform statistics */}
                {!loading && !error && stats && (
                    <div className="grid gap-4 sm:grid-cols-3">
                        {statisticItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    key={item.key}
                                    className="group relative overflow-hidden border border-base-content/10 bg-base-200 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-9"
                                >
                                    {/* Number and label */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-base-content/55">
                                            {item.label}
                                        </span>

                                        <span className="font-display text-3xl text-primary/75">
                                            {item.number}
                                        </span>
                                    </div>

                                    {/* Animated number */}
                                    <div className="mt-9 flex items-end justify-between">
                                        <p className="font-display text-6xl leading-none text-primary sm:text-7xl">
                                            <CountUp value={stats[item.key]} />
                                        </p>

                                        <Icon
                                            size={27}
                                            strokeWidth={1.5}
                                            className="mb-1 text-base-content/45 transition-colors group-hover:text-accent"
                                        />
                                    </div>

                                    {/* Description */}
                                    <h3 className="mt-7">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-base-content/60">
                                        {item.description}
                                    </p>

                                    {/* Accent line */}
                                    <div className="mt-7 h-px w-10 bg-primary transition-all duration-500 group-hover:w-full" />
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* Footer note */}
                <div className="mt-10 flex flex-col gap-3 border-t border-base-content/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-base-content/55">
                        REAL PEOPLE. REAL SPACES. REAL NUMBERS.
                    </p>

                    <p className="text-xs text-base-content/55">
                        Statistics are retrieved directly from our database.
                    </p>
                </div>
            </div>
        </section>
    );
}
