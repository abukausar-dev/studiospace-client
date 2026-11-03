"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Star,
    Users,
    Shield,
    Clock,
    ArrowLeft,
    CheckCircle2,
    Mail,
    User,
    MessageSquareQuote,
} from "lucide-react";
import type { Studio } from "@/types/studio";
import BookingModal from "./BookingModal";

interface Review {
    _id: string;
    reviewerName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function StudioDetailsView({ studioId }: { studioId: string }) {
    const [studio, setStudio] = useState<Studio | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function loadStudioData() {
            try {
                setLoading(true);
                setError(null);

                // 1. Fetch Studio details
                const resStudio = await fetch(`/api/studios/${studioId}`);
                if (!resStudio.ok) {
                    throw new Error("Creative studio not found");
                }
                const dataStudio = await resStudio.json();
                if (dataStudio.success && dataStudio.data) {
                    setStudio(dataStudio.data);
                    setSelectedImage(dataStudio.data.imageUrl || "");
                } else {
                    throw new Error(dataStudio.message || "Failed to load studio");
                }

                // 2. Fetch Reviews
                const resReviews = await fetch(`/api/studios/${studioId}/reviews`);
                if (resReviews.ok) {
                    const dataReviews = await resReviews.json();
                    if (dataReviews.success) {
                        setReviews(dataReviews.data || []);
                    }
                }
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Failed to load details");
            } finally {
                setLoading(false);
            }
        }

        if (studioId) {
            loadStudioData();
        }
    }, [studioId]);

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="h-8 w-48 animate-pulse bg-base-300" />
                <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="h-96 animate-pulse bg-base-300 lg:col-span-2" />
                    <div className="h-96 animate-pulse bg-base-300" />
                </div>
            </div>
        );
    }

    if (error || !studio) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-20 text-center">
                <h2 className="font-display text-4xl uppercase text-primary">Studio Not Found</h2>
                <p className="mt-3 text-base-content/70">
                    The studio you are looking for does not exist or has been removed.
                </p>
                <Link
                    href="/studios"
                    className="btn btn-neutral mt-6 rounded-none uppercase text-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
                </Link>
            </div>
        );
    }

    // Gallery array creation (fallback to main imageUrl if gallery is empty)
    const galleryList = studio.gallery && studio.gallery.length > 0
        ? [studio.imageUrl, ...studio.gallery.filter((img) => img !== studio.imageUrl)]
        : [studio.imageUrl];

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
                href="/studios"
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-base-content/70 hover:text-primary"
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
            </Link>

            {/* Title & Category Header */}
            <div className="mt-4 flex flex-col justify-between gap-4 border-b border-base-content/10 pb-6 md:flex-row md:items-end">
                <div>
                    <span className="inline-block bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-primary">
                        {studio.category.replace("-", " ")}
                    </span>
                    <h1 className="mt-2 font-display text-3xl uppercase tracking-wide text-base-content sm:text-5xl">
                        {studio.title}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-base-content/70">
                        <span className="flex items-center">
                            <MapPin className="mr-1 h-3.5 w-3.5 text-accent" /> {studio.location}
                        </span>
                        <span className="flex items-center">
                            <Star className="mr-1 h-3.5 w-3.5 fill-accent text-accent" />
                            {studio.rating || 5.0} ({studio.reviewCount || reviews.length} reviews)
                        </span>
                        <span className="flex items-center">
                            <Users className="mr-1 h-3.5 w-3.5 text-base-content/60" /> Up to{" "}
                            {studio.maxCapacity} Creators
                        </span>
                    </div>
                </div>

                <div className="text-left md:text-right">
                    <p className="font-mono text-xs uppercase text-base-content/60">Hourly Rate</p>
                    <p className="font-display text-4xl text-primary sm:text-5xl">
                        ${studio.hourlyRate}
                        <span className="text-sm font-normal text-base-content/60">/hr</span>
                    </p>
                </div>
            </div>

            {/* Main Grid: Gallery + Booking Box */}
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
                {/* Left Column: Image Gallery & Details */}
                <div className="space-y-8 lg:col-span-2">
                    {/* Main Visual Display */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-base-content/10 bg-base-200">
                        <Image
                            src={selectedImage || studio.imageUrl || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"}
                            alt={studio.title}
                            fill
                            className="object-cover transition-all duration-300"
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            priority
                        />
                    </div>

                    {/* Gallery Carousel Thumbnails */}
                    {galleryList.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {galleryList.map((img, idx) => (
                                <button
                                    type="button"
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative h-20 w-28 shrink-0 overflow-hidden border transition-all ${selectedImage === img
                                            ? "border-primary ring-2 ring-primary/40"
                                            : "border-base-content/10 opacity-70 hover:opacity-100"
                                        }`}
                                >
                                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" sizes="112px" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Detailed Overview */}
                    <div className="border border-base-content/10 bg-base-200/40 p-6">
                        <h2 className="font-display text-xl uppercase tracking-wider text-base-content">
                            Space Overview
                        </h2>
                        <p className="mt-3 leading-relaxed text-base-content/80">
                            {studio.overview ||
                                "A versatile, professional creative studio environment outfitted for production crews, solo photographers, and independent creators requiring seamless gear support and clean acoustic isolation."}
                        </p>
                    </div>

                    {/* Amenities Grid */}
                    <div className="border border-base-content/10 bg-base-200/40 p-6">
                        <h2 className="font-display text-xl uppercase tracking-wider text-base-content">
                            Included Amenities & Equipment
                        </h2>
                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {(studio.amenities && studio.amenities.length > 0
                                ? studio.amenities
                                : ["High-speed WiFi", "Air Conditioning", "C-Stands", "Changing Room", "Soundproofing"]
                            ).map((amenity, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs font-medium text-base-content/80">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="border border-base-content/10 bg-base-200/40 p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-xl uppercase tracking-wider text-base-content">
                                Verified Creator Reviews ({reviews.length})
                            </h2>
                            <div className="flex items-center text-xs font-bold text-accent">
                                <Star className="mr-1 h-4 w-4 fill-accent" />
                                {studio.rating || 5.0} / 5.0
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {reviews.length > 0 ? (
                                reviews.map((rev) => (
                                    <div key={rev._id} className="border-b border-base-content/10 pb-4 last:border-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-semibold text-base-content">{rev.reviewerName}</p>
                                            <div className="flex items-center text-accent">
                                                {Array.from({ length: rev.rating || 5 }).map((_, r) => (
                                                    <Star key={r} className="h-3 w-3 fill-accent" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs leading-relaxed text-base-content/70">{rev.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-base-content/60 italic">
                                    No written reviews yet for this workspace. Be the first creator to book and review!
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Pricing & Booking Action Card */}
                <div className="space-y-6">
                    <div className="sticky top-24 border border-base-content/10 bg-base-200 p-6">
                        <h3 className="font-display text-2xl uppercase tracking-wider text-base-content">
                            Reserve Studio
                        </h3>
                        <p className="mt-1 text-xs text-base-content/70">
                            Immediate reservation request with instant slot protection.
                        </p>

                        <div className="mt-6 space-y-3 border-y border-base-content/10 py-4 text-xs">
                            <div className="flex justify-between">
                                <span className="text-base-content/70">Rate per hour</span>
                                <span className="font-bold text-base-content">${studio.hourlyRate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-base-content/70">Security Deposit</span>
                                <span className="font-bold text-base-content">${studio.securityDeposit || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-base-content/70">Max Guest Capacity</span>
                                <span className="font-bold text-base-content">{studio.maxCapacity} people</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-base-content/70">Cancellation Rule</span>
                                <span className="font-bold text-accent">Free Cancel (Pending status)</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="btn btn-neutral mt-6 w-full rounded-none py-3 uppercase tracking-wider text-white shadow-lg"
                        >
                            Book Workspace Now
                        </button>

                        {/* Host Details Box */}
                        <div className="mt-8 border-t border-base-content/10 pt-6">
                            <p className="font-mono text-xs uppercase tracking-wider text-base-content/60">
                                Workspace Host
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary font-display text-white">
                                    {(studio.ownerName || "Host").charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-base-content">
                                        {studio.ownerName || "StudioSpace Verified Host"}
                                    </p>
                                    <p className="text-[11px] text-base-content/60">
                                        {studio.ownerEmail || "host@studiospace.io"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                studio={studio}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}