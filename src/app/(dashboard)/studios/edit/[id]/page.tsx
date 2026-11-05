"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { DollarSign, MapPin, Users, Image as ImageIcon, ArrowLeft } from "lucide-react";
import type { Studio } from "@/types/studio";

const AVAILABLE_AMENITIES = [
    "High-speed WiFi",
    "Air Conditioning",
    "Cyclorama Wall",
    "Soundproofing",
    "Audio Interface",
    "Softboxes & C-Stands",
    "Dressing Room",
    "Blackout Blinds",
    "Lounge Area",
    "Free Parking",
];

export default function EditStudioPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [studio, setStudio] = useState<Studio | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "photo-studio",
        hourlyRate: "",
        securityDeposit: "50",
        maxCapacity: "5",
        location: "",
        imageUrl: "",
        overview: "",
    });

    const [amenities, setAmenities] = useState<string[]>([]);

    useEffect(() => {
        async function loadStudio() {
            try {
                setLoading(true);
                const res = await fetch(`/api/studios/${id}`);
                const json = await res.json();
                if (res.ok && json.success && json.data) {
                    const s: Studio = json.data;
                    setStudio(s);
                    setFormData({
                        title: s.title || "",
                        category: s.category || "photo-studio",
                        hourlyRate: s.hourlyRate?.toString() || "",
                        securityDeposit: s.securityDeposit?.toString() || "0",
                        maxCapacity: s.maxCapacity?.toString() || "1",
                        location: s.location || "",
                        imageUrl: s.imageUrl || "",
                        overview: s.overview || "",
                    });
                    setAmenities(s.amenities || []);
                } else {
                    toast.error("Failed to load studio details for editing");
                    router.push("/my-listings");
                }
            } catch {
                toast.error("Error loading studio");
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            loadStudio();
        }
    }, [id, router]);

    const toggleAmenity = (item: string) => {
        setAmenities((prev) =>
            prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
        );
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const res = await fetch(`/api/studios/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    amenities,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Studio listing updated successfully!");
                router.push("/my-listings");
            } else {
                toast.error(data.message || "Failed to update studio");
            }
        } catch {
            toast.error("Failed to communicate with server");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-12">
                <div className="h-8 w-48 animate-pulse bg-base-300" />
                <div className="mt-6 h-96 w-full animate-pulse bg-base-200" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center text-xs font-semibold uppercase text-base-content/70 hover:text-primary"
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
            </button>

            <div className="mt-4 border-b border-base-content/10 pb-4">
                <h1 className="font-display text-3xl uppercase tracking-wider text-base-content sm:text-4xl">
                    Edit Workspace Listing
                </h1>
                <p className="mt-1 text-xs text-base-content/70">
                    Modify pricing, availability, and facilities for {studio?.title}
                </p>
            </div>

            <form onSubmit={handleUpdate} className="mt-8 space-y-6">
                {/* Read-Only Host Details */}
                <div className="border border-base-content/10 bg-base-200/50 p-4">
                    <p className="font-mono text-xs uppercase tracking-wider text-base-content/60">
                        Host Identification (Read-only)
                    </p>
                    <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-[11px] uppercase text-base-content/60">Host Name</label>
                            <input
                                type="text"
                                readOnly
                                value={studio?.ownerName || "Host"}
                                className="input input-bordered w-full rounded-none bg-base-300 text-xs font-semibold text-base-content"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] uppercase text-base-content/60">Host Email</label>
                            <input
                                type="text"
                                readOnly
                                value={studio?.ownerEmail || "host@studiospace.io"}
                                className="input input-bordered w-full rounded-none bg-base-300 text-xs font-semibold text-base-content"
                            />
                        </div>
                    </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                            Studio Title
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="select select-bordered w-full rounded-none bg-base-200 text-base-content"
                        >
                            <option value="photo-studio">Photo Studio</option>
                            <option value="film-stage">Film Stage</option>
                            <option value="podcast-lounge">Podcast Lounge</option>
                            <option value="music-suite">Music Suite</option>
                            <option value="workshop">Art Workshop</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                            Location
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                            />
                            <MapPin className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-base-content/40" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                            Hourly Rate ($)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                required
                                min="1"
                                value={formData.hourlyRate}
                                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                            />
                            <DollarSign className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-base-content/40" />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                            Security Deposit ($)
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={formData.securityDeposit}
                            onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                            className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                            Max Capacity
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min="1"
                                value={formData.maxCapacity}
                                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                                className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                            />
                            <Users className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-base-content/40" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                        Image URL
                    </label>
                    <div className="relative">
                        <input
                            type="url"
                            required
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                        />
                        <ImageIcon className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-base-content/40" />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-base-content/80">
                        Amenities
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {AVAILABLE_AMENITIES.map((amenity) => {
                            const active = amenities.includes(amenity);
                            return (
                                <button
                                    type="button"
                                    key={amenity}
                                    onClick={() => toggleAmenity(amenity)}
                                    className={`btn btn-xs rounded-none uppercase ${active ? "btn-neutral text-white" : "btn-outline text-base-content/70"
                                        }`}
                                >
                                    {active ? "✓ " : "+ "}
                                    {amenity}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                        Overview
                    </label>
                    <textarea
                        rows={4}
                        value={formData.overview}
                        onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                        className="textarea textarea-bordered w-full rounded-none bg-base-200 text-base-content"
                    />
                </div>

                <div className="flex gap-4 border-t border-base-content/10 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="btn btn-outline rounded-none uppercase"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={updating}
                        className="btn btn-neutral flex-1 rounded-none uppercase text-white shadow-md"
                    >
                        {updating ? "Saving Changes..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}