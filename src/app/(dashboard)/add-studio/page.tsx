"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { DollarSign, MapPin, Users, Image as ImageIcon } from "lucide-react";

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

export default function AddStudioPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const [loading, setLoading] = useState(false);
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

    const [amenities, setAmenities] = useState<string[]>([
        "High-speed WiFi",
        "Air Conditioning",
    ]);

    const toggleAmenity = (item: string) => {
        setAmenities((prev) =>
            prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.hourlyRate || !formData.location || !formData.imageUrl) {
            toast.error("Please fill in all mandatory fields.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/studios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    amenities,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Studio published successfully!");
                router.push("/my-listings");
            } else {
                toast.error(data.message || "Failed to publish studio.");
            }
        } catch {
            toast.error("An error occurred while connecting to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <div className="border-b border-base-content/10 pb-4">
                <h1 className="font-display text-3xl uppercase tracking-wider text-base-content sm:text-4xl">
                    List a New Studio
                </h1>
                <p className="mt-1 text-xs text-base-content/70">
                    Publish your creative workspace to thousands of verified creators.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Host Info (Read-Only) */}
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
                                value={session?.user?.name || "Authenticated Host"}
                                className="input input-bordered w-full rounded-none bg-base-300 text-xs font-semibold text-base-content"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] uppercase text-base-content/60">Host Email</label>
                            <input
                                type="text"
                                readOnly
                                value={session?.user?.email || "host@studiospace.io"}
                                className="input input-bordered w-full rounded-none bg-base-300 text-xs font-semibold text-base-content"
                            />
                        </div>
                    </div>
                </div>

                {/* Basic Studio Info */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                            Studio Title *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Apex Daylight Cyclorama Studio"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                            Workspace Category *
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
                            Location / Address *
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                placeholder="e.g. Brooklyn Arts District, NY"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                            />
                            <MapPin className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-base-content/40" />
                        </div>
                    </div>
                </div>

                {/* Pricing & Capacity */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                            Hourly Rate ($) *
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                required
                                min="1"
                                placeholder="45"
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
                            placeholder="50"
                            value={formData.securityDeposit}
                            onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                            className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                            Max Guest Capacity
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min="1"
                                placeholder="6"
                                value={formData.maxCapacity}
                                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                                className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                            />
                            <Users className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-base-content/40" />
                        </div>
                    </div>
                </div>

                {/* Visual / Image URL */}
                <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                        Studio Image URL (Direct Link / ImgBB) *
                    </label>
                    <div className="relative">
                        <input
                            type="url"
                            required
                            placeholder="https://images.unsplash.com/photo-..."
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                        />
                        <ImageIcon className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-base-content/40" />
                    </div>
                    <p className="mt-1 text-[11px] text-base-content/60">
                        Provide a direct image URL or upload to ImgBB and paste the viewer URL here.
                    </p>
                </div>

                {/* Amenities Selection */}
                <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-base-content/80">
                        Included Amenities & Gear
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {AVAILABLE_AMENITIES.map((amenity) => {
                            const active = amenities.includes(amenity);
                            return (
                                <button
                                    type="button"
                                    key={amenity}
                                    onClick={() => toggleAmenity(amenity)}
                                    className={`btn btn-xs rounded-none uppercase transition-all ${active ? "btn-neutral text-white" : "btn-outline text-base-content/70"
                                        }`}
                                >
                                    {active ? "✓ " : "+ "}
                                    {amenity}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Space Overview */}
                <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-base-content/80">
                        Space Overview & Guidelines
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Describe acoustics, lighting gear, electrical setup, and studio rules..."
                        value={formData.overview}
                        onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                        className="textarea textarea-bordered w-full rounded-none bg-base-200 text-base-content"
                    />
                </div>

                {/* Actions */}
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
                        disabled={loading}
                        className="btn btn-neutral flex-1 rounded-none uppercase text-white shadow-md"
                    >
                        {loading ? "Publishing Workspace..." : "Publish Studio"}
                    </button>
                </div>
            </form>
        </div>
    );
}