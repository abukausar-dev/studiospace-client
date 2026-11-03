
import Link from "next/link";
import {
    ArrowUpRight,
    MapPin,
    Star,
} from "lucide-react";

import { categories } from "@/lib/constants";
import type { Studio } from "@/types/studio";

interface StudioCardProps {
    studio: Studio;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(price);
};

export default function StudioCard({ studio }: StudioCardProps) {
    const category = categories.find(
        (item) => item.slug === studio.category,
    );

    return (
        <article className="group flex h-full flex-col overflow-hidden border border-base-content/10 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
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
                    <div className="flex h-full items-center justify-center bg-base-300">
                        <span className="text-xs uppercase tracking-widest opacity-50">
                            Image unavailable
                        </span>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 bg-primary px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-primary-content">
                    {category?.homeLabel || "Creative Space"}
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

            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-primary">
                        CREATIVE WORKSPACE
                    </span>

                    <span className="flex shrink-0 items-center gap-1 text-xs font-bold">
                        <Star
                            size={14}
                            className="fill-accent text-accent"
                        />

                        {Number(studio.rating || 0).toFixed(1)}

                        <span className="font-normal text-base-content/55">
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

                <p className="mt-3 flex items-center gap-2 text-sm text-base-content/65">
                    <MapPin size={15} className="shrink-0 text-primary" />
                    <span>{studio.location}</span>
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-[10px] text-base-content/60">
                    <span className="border border-base-content/15 px-2 py-1">
                        Up to {studio.maxCapacity} guests
                    </span>

                    <span className="border border-base-content/15 px-2 py-1">
                        {studio.reviewCount || 0} reviews
                    </span>
                </div>

                <div className="mt-auto border-t border-base-content/10 pt-5">
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
    );
}
