
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";

import { categories } from "@/lib/constants";

interface Studio {
    _id: string;
    title: string;
    category: string;
    hourlyRate: number;
    location: string;
    imageUrl: string;
    rating: number;
    reviewCount: number;
}

interface FeaturedResponse {
    success: boolean;
    message?: string;
    data: Studio[];
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(price);
};

const getCategoryLabel = (slug: string) => {
    const category = categories.find((item) => item.slug === slug);

    return category?.homeLabel || "Creative Space";
};

function StudioSkeleton() {
    return (
        <div className="border border-base-300">
            <div className="aspect-[4/3] animate-pulse bg-base-300" />

            <div className="space-y-4 p-5">
                <div className="h-3 w-24 animate-pulse bg-base-300" />
                <div className="h-6 w-3/4 animate-pulse bg-base-300" />
                <div className="h-3 w-1/2 animate-pulse bg-base-300" />
                <div className="h-10 w-full animate-pulse bg-base-300" />
            </div>
        </div>
    );
}

export default function FeaturedStudios() {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        const fetchFeaturedStudios = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("/api/studios/featured", {
                    cache: "no-store",
                    signal: controller.signal,
                });

                const result: FeaturedResponse = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Unable to load featured studios.",
                    );
                }

                setStudios(Array.isArray(result.data) ? result.data : []);
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    return;
                }

                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while loading studios.",
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchFeaturedStudios();

        return () => {
            controller.abort();
        };
    }, [retryCount]);

    return (
        <section className="bg-base-100 px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
            <div className="mx-auto max-w-[1400px]">

                {/* Section heading */}
                <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-primary" />

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                CURATED CREATIVE SPACES
                            </p>
                        </div>

                        <h2>
                            Spaces worth
                            <span className="block text-primary">
                                creating in.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 opacity-70 sm:text-base">
                            Discover inspiring workspaces selected for photographers,
                            filmmakers, podcasters, musicians and makers.
                        </p>
                    </div>

                    <Link
                        href="/studios"
                        className="btn btn-outline btn-sm w-fit gap-3 sm:btn-md"
                    >
                        Explore All Studios
                        <ArrowUpRight size={17} />
                    </Link>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <StudioSkeleton key={index} />
                        ))}
                    </div>
                )}

                {/* Error state */}
                {!loading && error && (
                    <div className="border border-error/40 p-10 text-center">
                        <h3>Unable to load studios.</h3>

                        <p className="mt-3 text-sm opacity-70">
                            {error}
                        </p>

                        <button
                            onClick={() => setRetryCount((count) => count + 1)}
                            className="btn btn-neutral btn-sm mt-6"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && studios.length === 0 && (
                    <div className="border border-base-300 py-16 text-center">
                        <h3>No studios available yet.</h3>

                        <p className="mt-3 text-sm opacity-70">
                            New creative spaces will appear here soon.
                        </p>

                        <Link
                            href="/studios"
                            className="btn btn-neutral btn-sm mt-6"
                        >
                            Explore Studios
                        </Link>
                    </div>
                )}

                {/* Featured studio cards */}
                {!loading && !error && studios.length > 0 && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {studios.map((studio) => (
                            <article
                                key={studio._id}
                                className="group flex h-full flex-col border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:border-primary"
                            >
                                {/* Studio image */}
                                <Link
                                    href={`/studios/${studio._id}`}
                                    aria-label={`View ${studio.title}`}
                                    className="relative block aspect-[4/3] overflow-hidden bg-base-300"
                                >
                                    {studio.imageUrl ? (
                                        <img
                                            src={studio.imageUrl}
                                            alt={studio.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-base-300" />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                                    <span className="absolute left-4 top-4 bg-primary px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
                                        {getCategoryLabel(studio.category)}
                                    </span>

                                    <div className="absolute bottom-4 left-4">
                                        <p className="font-display text-3xl text-white">
                                            {formatPrice(studio.hourlyRate)}
                                            <span className="ml-1 font-sans text-xs font-semibold uppercase tracking-wider">
                                                / HR
                                            </span>
                                        </p>
                                    </div>
                                </Link>

                                {/* Studio information */}
                                <div className="flex flex-1 flex-col p-5">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                                            FEATURED SPACE
                                        </span>

                                        <span className="flex shrink-0 items-center gap-1 text-xs font-bold">
                                            <Star
                                                size={14}
                                                className="fill-accent text-accent"
                                            />

                                            {Number(studio.rating || 0).toFixed(1)}

                                            <span className="font-normal opacity-60">
                                                ({studio.reviewCount || 0})
                                            </span>
                                        </span>
                                    </div>

                                    <Link
                                        href={`/studios/${studio._id}`}
                                        className="mt-4 hover:text-primary"
                                    >
                                        <h3>{studio.title}</h3>
                                    </Link>

                                    <p className="mt-3 flex items-center gap-2 text-sm opacity-65">
                                        <MapPin size={15} className="shrink-0" />

                                        <span>{studio.location}</span>
                                    </p>

                                    <div className="mt-auto border-t border-base-300 pt-5">
                                        <Link
                                            href={`/studios/${studio._id}`}
                                            className="btn btn-neutral btn-sm w-full justify-between sm:btn-md"
                                        >
                                            View Details
                                            <ArrowUpRight size={17} />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Section footer */}
                {!loading && !error && studios.length > 0 && (
                    <div className="mt-10 flex items-center justify-between border-t border-base-300 pt-6">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] opacity-60">
                            SHOWING {studios.length} FEATURED SPACES
                        </p>

                        <Link
                            href="/studios"
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-primary"
                        >
                            Discover More
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
