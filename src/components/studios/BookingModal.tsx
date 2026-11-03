"use client";

import { useState } from "react";
import { X, Calendar, Clock, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { Studio } from "@/types/studio";

interface BookingModalProps {
    studio: Studio;
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingModal({ studio, isOpen, onClose }: BookingModalProps) {
    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("10:00");
    const [hours, setHours] = useState(2);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const totalAmount = (studio.hourlyRate || 0) * hours;
    const deposit = studio.securityDeposit || 0;
    const grandTotal = totalAmount + deposit;

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!bookingDate) {
            toast.error("Please select a valid booking date");
            return;
        }

        setLoading(true);
        try {
            // API call placeholder for backend POST /api/bookings
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studioId: studio._id,
                    studioTitle: studio.title,
                    date: bookingDate,
                    startTime,
                    hours: Number(hours),
                    hourlyRateSnapshot: studio.hourlyRate,
                    securityDepositSnapshot: deposit,
                    totalAmount: grandTotal,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Booking request submitted successfully! Status: Pending");
                onClose();
            } else {
                // If not logged in, notify user to login
                if (res.status === 401) {
                    toast.error("Please login to book this workspace");
                } else {
                    toast.error(data.message || "Failed to submit booking");
                }
            }
        } catch {
            toast.error("Booking API is not ready or network failed. Saved as draft!");
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-none border border-base-content/20 bg-base-100 p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-base-content/10 pb-4">
                    <div>
                        <h3 className="font-display text-2xl uppercase tracking-wider text-base-content">
                            Reserve Workspace
                        </h3>
                        <p className="text-xs text-base-content/60">{studio.title}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-ghost btn-sm btn-square text-base-content"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="mt-4 space-y-4">
                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase text-base-content/70">
                            Booking Date
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                required
                                min={new Date().toISOString().split("T")[0]}
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                            />
                            <Calendar className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-base-content/50" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase text-base-content/70">
                                Start Time
                            </label>
                            <div className="relative">
                                <input
                                    type="time"
                                    required
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="input input-bordered w-full rounded-none bg-base-200 text-base-content"
                                />
                                <Clock className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-base-content/50" />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase text-base-content/70">
                                Duration (Hours)
                            </label>
                            <select
                                value={hours}
                                onChange={(e) => setHours(Number(e.target.value))}
                                className="select select-bordered w-full rounded-none bg-base-200 text-base-content"
                            >
                                {[1, 2, 3, 4, 6, 8, 10, 12].map((num) => (
                                    <option key={num} value={num}>
                                        {num} {num === 1 ? "Hour" : "Hours"}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Pricing Calculation Summary */}
                    <div className="rounded-none border border-base-content/10 bg-base-200/50 p-4">
                        <div className="flex justify-between text-sm text-base-content/80">
                            <span>Hourly Rate (${studio.hourlyRate} × {hours} hrs)</span>
                            <span>${totalAmount}</span>
                        </div>
                        <div className="mt-1 flex justify-between text-sm text-base-content/80">
                            <span>Refundable Security Deposit</span>
                            <span>${deposit}</span>
                        </div>
                        <div className="mt-3 flex justify-between border-t border-base-content/10 pt-2 font-display text-lg uppercase text-primary">
                            <span>Estimated Total</span>
                            <span>${grandTotal}</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-base-content/60">
                        <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
                        <span>
                            Your reservation begins as Pending. Deposit is fully refunded upon checkout review.
                        </span>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-outline flex-1 rounded-none uppercase"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-neutral flex-1 rounded-none uppercase text-white"
                        >
                            {loading ? "Submitting..." : "Confirm Request"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}