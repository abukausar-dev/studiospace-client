"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Calendar, Clock, DollarSign, XCircle, AlertTriangle, ArrowRight } from "lucide-react";

interface Booking {
    _id: string;
    studioId: string;
    studioTitle: string;
    studioImage?: string;
    location: string;
    date: string;
    startTime: string;
    hours: number;
    hourlyRateSnapshot: number;
    securityDepositSnapshot: number;
    totalAmount: number;
    status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
    createdAt: string;
}

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [targetBooking, setTargetBooking] = useState<Booking | null>(null);
    const [cancelling, setCancelling] = useState(false);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/bookings/me");
            const json = await res.json();
            if (res.ok && json.success) {
                setBookings(json.data || []);
            } else {
                toast.error(json.message || "Failed to load bookings");
            }
        } catch {
            toast.error("Network error while loading reservations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async () => {
        if (!targetBooking) return;
        setCancelling(true);

        try {
            const res = await fetch(`/api/bookings/${targetBooking._id}/cancel`, {
                method: "PATCH",
            });
            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Booking cancelled successfully");
                setBookings((prev) =>
                    prev.map((b) => (b._id === targetBooking._id ? { ...b, status: "Cancelled" } : b))
                );
            } else {
                toast.error(data.message || "Failed to cancel reservation");
            }
        } catch {
            toast.error("Failed to connect to the server");
        } finally {
            setCancelling(false);
            setTargetBooking(null);
        }
    };

    const getStatusBadge = (status: Booking["status"]) => {
        switch (status) {
            case "Confirmed":
                return <span className="badge badge-success rounded-none text-xs uppercase text-white">Confirmed</span>;
            case "Pending":
                return <span className="badge badge-warning rounded-none text-xs uppercase text-black">Pending</span>;
            case "Completed":
                return <span className="badge badge-info rounded-none text-xs uppercase text-white">Completed</span>;
            case "Cancelled":
                return <span className="badge badge-error rounded-none text-xs uppercase text-white">Cancelled</span>;
            default:
                return <span className="badge badge-ghost rounded-none text-xs uppercase">{status}</span>;
        }
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-col justify-between gap-4 border-b border-base-content/10 pb-6 sm:flex-row sm:items-center">
                <div>
                    <h1 className="font-display text-3xl uppercase tracking-wider text-base-content sm:text-4xl">
                        My Studio Reservations
                    </h1>
                    <p className="mt-1 text-xs text-base-content/70">
                        Track your reserved production slots, approval statuses, and session billing details.
                    </p>
                </div>
                <Link
                    href="/studios"
                    className="btn btn-neutral rounded-none uppercase text-white shadow-sm"
                >
                    Explore More Studios <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </div>

            {loading ? (
                <div className="mt-8 space-y-4">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="h-28 w-full animate-pulse bg-base-200" />
                    ))}
                </div>
            ) : bookings.length === 0 ? (
                <div className="mt-12 border border-base-content/10 bg-base-200/50 p-12 text-center">
                    <h3 className="font-display text-2xl uppercase text-base-content">
                        No Workspace Reservations
                    </h3>
                    <p className="mt-2 text-xs text-base-content/70">
                        You have not booked any studio sessions yet. Browse our verified creative studios to get started!
                    </p>
                    <Link
                        href="/studios"
                        className="btn btn-neutral mt-6 rounded-none uppercase text-white"
                    >
                        Find a Workspace
                    </Link>
                </div>
            ) : (
                <div className="mt-8 overflow-x-auto border border-base-content/10">
                    <table className="table w-full">
                        <thead className="bg-base-200 text-xs uppercase text-base-content/70">
                            <tr>
                                <th>Workspace</th>
                                <th>Reserved Slot</th>
                                <th>Hours</th>
                                <th>Total Bill</th>
                                <th>Status</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-content/10 bg-base-100 text-sm">
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-base-200/30">
                                    <td className="flex items-center gap-3 py-4">
                                        <div className="relative h-12 w-16 shrink-0 overflow-hidden bg-base-300">
                                            <Image
                                                src={booking.studioImage || "/globe.svg"}
                                                alt={booking.studioTitle}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <Link
                                                href={`/studios/${booking.studioId}`}
                                                className="font-semibold text-base-content hover:text-primary hover:underline"
                                            >
                                                {booking.studioTitle}
                                            </Link>
                                            <p className="text-[11px] text-base-content/60">{booking.location}</p>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="flex flex-col text-xs font-medium text-base-content/80">
                                            <span className="flex items-center gap-1 font-semibold text-base-content">
                                                <Calendar className="h-3.5 w-3.5 text-primary" /> {booking.date}
                                            </span>
                                            <span className="flex items-center gap-1 text-base-content/60">
                                                <Clock className="h-3 w-3" /> Starting at {booking.startTime}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="font-mono text-xs font-semibold text-base-content">
                                        {booking.hours} {booking.hours === 1 ? "hr" : "hrs"}
                                    </td>

                                    <td>
                                        <div className="text-xs">
                                            <span className="font-mono font-bold text-base-content">${booking.totalAmount}</span>
                                            <span className="block text-[10px] text-base-content/50">
                                                (${booking.hourlyRateSnapshot}/hr + ${booking.securityDepositSnapshot} dep)
                                            </span>
                                        </div>
                                    </td>

                                    <td>{getStatusBadge(booking.status)}</td>

                                    <td className="text-right">
                                        {booking.status === "Pending" ? (
                                            <button
                                                type="button"
                                                onClick={() => setTargetBooking(booking)}
                                                className="btn btn-outline btn-error btn-xs rounded-none uppercase"
                                            >
                                                Cancel
                                            </button>
                                        ) : (
                                            <span className="text-xs text-base-content/40">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {targetBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md border border-base-content/20 bg-base-100 p-6 shadow-2xl">
                        <div className="flex items-center gap-3 text-error">
                            <AlertTriangle className="h-6 w-6" />
                            <h3 className="font-display text-xl uppercase tracking-wider">Cancel Reservation</h3>
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-base-content/80">
                            Are you sure you want to cancel your reservation for{" "}
                            <strong className="text-base-content">{targetBooking.studioTitle}</strong> on{" "}
                            <span className="font-semibold">{targetBooking.date}</span> at{" "}
                            <span className="font-semibold">{targetBooking.startTime}</span>?
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setTargetBooking(null)}
                                className="btn btn-outline btn-sm rounded-none uppercase"
                            >
                                Keep Booking
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={cancelling}
                                className="btn btn-error btn-sm rounded-none uppercase text-white"
                            >
                                {cancelling ? "Cancelling..." : "Confirm Cancellation"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}