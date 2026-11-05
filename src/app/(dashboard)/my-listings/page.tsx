"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Edit, Trash2, Plus, AlertTriangle, ExternalLink } from "lucide-react";
import type { Studio } from "@/types/studio";

export default function MyListingsPage() {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [targetStudio, setTargetStudio] = useState<Studio | null>(null);

    const fetchMyStudios = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/studios/mine");
            const json = await res.json();
            if (res.ok && json.success) {
                setStudios(json.data || []);
            } else {
                toast.error(json.message || "Failed to load listings");
            }
        } catch {
            toast.error("Error communicating with server");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyStudios();
    }, []);

    const confirmDelete = async () => {
        if (!targetStudio) return;

        try {
            setDeletingId(targetStudio._id);
            const res = await fetch(`/api/studios/${targetStudio._id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Studio listing removed successfully");
                setStudios((prev) => prev.filter((s) => s._id !== targetStudio._id));
            } else {
                toast.error(data.message || "Failed to delete studio");
            }
        } catch {
            toast.error("Failed to delete studio listing");
        } finally {
            setDeletingId(null);
            setTargetStudio(null);
        }
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-col justify-between gap-4 border-b border-base-content/10 pb-6 sm:flex-row sm:items-center">
                <div>
                    <h1 className="font-display text-3xl uppercase tracking-wider text-base-content sm:text-4xl">
                        My Studio Listings
                    </h1>
                    <p className="mt-1 text-xs text-base-content/70">
                        Manage your registered workspaces, edit details, and inspect availability.
                    </p>
                </div>
                <Link
                    href="/add-studio"
                    className="btn btn-neutral rounded-none uppercase text-white shadow-sm"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New Studio
                </Link>
            </div>

            {loading ? (
                <div className="mt-8 space-y-4">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="h-24 w-full animate-pulse bg-base-200" />
                    ))}
                </div>
            ) : studios.length === 0 ? (
                <div className="mt-12 border border-base-content/10 bg-base-200/50 p-12 text-center">
                    <h3 className="font-display text-2xl uppercase text-base-content">
                        No Workspace Listings Yet
                    </h3>
                    <p className="mt-2 text-xs text-base-content/70">
                        You have not listed any creative studios. Start hosting your space today!
                    </p>
                    <Link
                        href="/add-studio"
                        className="btn btn-neutral mt-6 rounded-none uppercase text-white"
                    >
                        List Your First Studio
                    </Link>
                </div>
            ) : (
                <div className="mt-8 overflow-x-auto border border-base-content/10">
                    <table className="table w-full">
                        <thead className="bg-base-200 text-xs uppercase text-base-content/70">
                            <tr>
                                <th>Workspace</th>
                                <th>Category</th>
                                <th>Rate</th>
                                <th>Location</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-content/10 bg-base-100 text-sm">
                            {studios.map((studio) => (
                                <tr key={studio._id} className="hover:bg-base-200/30">
                                    <td className="flex items-center gap-3 py-4">
                                        <div className="relative h-12 w-16 shrink-0 overflow-hidden bg-base-300">
                                            <Image
                                                src={studio.imageUrl || "/globe.svg"}
                                                alt={studio.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <Link
                                                href={`/studios/${studio._id}`}
                                                className="font-semibold text-base-content hover:text-primary hover:underline"
                                            >
                                                {studio.title}
                                            </Link>
                                            <p className="text-[11px] text-base-content/60">
                                                Deposit: ${studio.securityDeposit || 0}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-sm rounded-none border-primary/20 bg-primary/10 text-[10px] uppercase text-primary">
                                            {studio.category.replace("-", " ")}
                                        </span>
                                    </td>
                                    <td className="font-mono font-bold text-base-content">
                                        ${studio.hourlyRate}/hr
                                    </td>
                                    <td className="text-xs text-base-content/70">{studio.location}</td>
                                    <td className="text-right">
                                        <div className="inline-flex items-center gap-2">
                                            <Link
                                                href={`/studios/edit/${studio._id}`}
                                                className="btn btn-square btn-ghost btn-xs text-base-content hover:text-primary"
                                                title="Edit Listing"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => setTargetStudio(studio)}
                                                className="btn btn-square btn-ghost btn-xs text-error hover:bg-error/10"
                                                title="Delete Listing"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal (Assignment Rule) */}
            {targetStudio && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md border border-base-content/20 bg-base-100 p-6 shadow-2xl">
                        <div className="flex items-center gap-3 text-error">
                            <AlertTriangle className="h-6 w-6" />
                            <h3 className="font-display text-xl uppercase tracking-wider">Confirm Delete</h3>
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-base-content/80">
                            Are you sure you want to permanently delete{" "}
                            <strong className="text-base-content">{targetStudio.title}</strong>? This action
                            cannot be undone.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setTargetStudio(null)}
                                className="btn btn-outline btn-sm rounded-none uppercase"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                disabled={deletingId === targetStudio._id}
                                className="btn btn-error btn-sm rounded-none uppercase text-white"
                            >
                                {deletingId === targetStudio._id ? "Deleting..." : "Delete Permanently"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}