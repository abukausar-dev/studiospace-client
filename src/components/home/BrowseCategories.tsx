
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { categories } from "@/lib/constants";

type CategoryVisual = {
    imageUrl: string;
    description: string;
    imageAlt: string;
};

const categoryVisuals: Record<string, CategoryVisual> = {
    "photo-studio": {
        imageUrl:
            "https://images.unsplash.com/photo-1736580602204-b940bb0423ec?auto=format&fit=crop&w=1000&q=85",
        description:
            "Photography sets, professional lighting and creative backdrops.",
        imageAlt:
            "Indoor photography studio with white backdrop and studio lighting",
    },

    "film-stage": {
        imageUrl:
            "https://images.unsplash.com/photo-1759417501792-0d188b64b774?auto=format&fit=crop&w=1000&q=85",
        description:
            "Production sets, cinema cameras and professional lighting.",
        imageAlt:
            "Indoor film production set with chairs, lights and camera equipment",
    },

    "podcast-lounge": {
        imageUrl:
            "https://images.unsplash.com/photo-1782274265689-4f10a91d4abb?auto=format&fit=crop&w=1000&q=85",
        description:
            "Acoustic rooms, recording microphones and podcast setups.",
        imageAlt:
            "Indoor podcast recording studio with microphones and headphones",
    },

    "music-suite": {
        imageUrl:
            "https://images.unsplash.com/photo-1661261400335-7dc71eb2b5a6?auto=format&fit=crop&w=1000&q=85",
        description:
            "Music production rooms, studio monitors and recording gear.",
        imageAlt:
            "Indoor music production studio with desk and speakers",
    },

    workshop: {
        imageUrl:
            "https://images.unsplash.com/photo-1763793426538-db411c27894d?auto=format&fit=crop&w=1000&q=85",
        description:
            "Creative art rooms, painting spaces and workshop equipment.",
        imageAlt:
            "Indoor art studio with easels and paintings",
    },
};

export default function BrowseCategories() {
    return (
        <section className="bg-base-200 px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
            <div className="mx-auto max-w-[1400px]">
                {/* Editorial section heading */}
                <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-primary" />

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                FIND YOUR CREATIVE ENVIRONMENT
                            </p>
                        </div>

                        <h2>
                            One marketplace.
                            <span className="block text-primary">
                                Endless possibilities.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 opacity-70 sm:text-base">
                            Every creative project needs a different environment.
                            Explore dedicated indoor spaces built for the way you create.
                        </p>
                    </div>

                    <Link
                        href="/studios"
                        className="btn btn-outline btn-sm w-fit gap-3 sm:btn-md"
                    >
                        All Categories
                        <ArrowUpRight size={17} />
                    </Link>
                </div>

                {/* Category cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {categories.map((category, index) => {
                        const visual = categoryVisuals[category.slug];

                        return (
                            <Link
                                key={category.slug}
                                href={`/studios?category=${category.slug}`}
                                className="group relative isolate block aspect-[4/5] overflow-hidden bg-base-300"
                            >
                                {/* Studio image */}
                                <img
                                    src={visual.imageUrl}
                                    alt={visual.imageAlt}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Dark image overlay */}
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 transition-opacity duration-300 group-hover:from-black/95"
                                />

                                {/* Category number */}
                                <span className="absolute right-4 top-4 font-display text-4xl text-white/80">
                                    0{index + 1}
                                </span>

                                {/* Category badge */}
                                <span className="absolute left-4 top-5 bg-primary px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-white">
                                    EXPLORE SPACE
                                </span>

                                {/* Bottom content */}
                                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                                    <div className="mb-4 h-px w-10 bg-accent transition-all duration-300 group-hover:w-20" />

                                    <h3 className="text-white">
                                        {category.homeLabel}
                                    </h3>

                                    <p className="mt-3 text-xs leading-6 text-white/70">
                                        {visual.description}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between border-t border-white/30 pt-4">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                                            DISCOVER
                                        </span>

                                        <span className="flex h-9 w-9 items-center justify-center border border-white/50 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-base-content">
                                            <ArrowUpRight size={17} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom note */}
                <div className="mt-10 flex flex-col gap-3 border-t border-base-content/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-60">
                        FIVE CREATIVE CATEGORIES
                    </p>

                    <p className="text-xs opacity-60">
                        Find the right space for your next big idea.
                    </p>
                </div>
            </div>
        </section>
    );
}
