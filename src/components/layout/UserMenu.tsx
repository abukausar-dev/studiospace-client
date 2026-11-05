"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    LayoutDashboard,
    PlusSquare,
    Building2,
    CalendarCheck,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface UserMenuProps {
    name?: string | null;
    image?: string | null;
    email?: string | null;
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | null;
}

export default function UserMenu({ name, image, email, user }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const userName = user?.name || name || "Creator";
    const userImage = user?.image || image || null;
    const userEmail = user?.email || email || "creator@studiospace.io";

    // Outside click and Escape key handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success("Logged out successfully");
            setIsOpen(false);
            router.push("/");
            router.refresh();
        } catch {
            toast.error("Failed to sign out. Please try again.");
        }
    };

    const menuItems = [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Add New Studio", href: "/add-studio", icon: PlusSquare },
        { label: "My Studio Listings", href: "/my-listings", icon: Building2 },
        { label: "My Bookings", href: "/my-bookings", icon: CalendarCheck },
    ];

    return (
        <div className="relative" ref={menuRef}>
            {/* Clickable Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 border border-base-content/20 bg-base-200/60 p-1 transition-colors hover:border-primary focus:outline-none"
                aria-expanded={isOpen}
                aria-label="Toggle user navigation menu"
            >
                <div className="relative h-8 w-8 overflow-hidden bg-primary/20">
                    {userImage ? (
                        <Image
                            src={userImage}
                            alt={userName}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary font-display text-sm text-white">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <ChevronDown
                    className={`h-3.5 w-3.5 text-base-content/70 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""
                        }`}
                />
            </button>

            {/* Editorial Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 border-2 border-base-content/20 bg-base-100 shadow-2xl">
                    {/* User Information Header */}
                    <div className="border-b border-base-content/10 bg-base-200/50 p-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                            Authenticated User
                        </span>
                        <p className="truncate font-display text-base uppercase tracking-wide text-base-content">
                            {userName}
                        </p>
                        <p className="truncate text-xs text-base-content/60">{userEmail}</p>
                    </div>

                    {/* Navigation Links */}
                    <div className="p-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-base-content/85 transition-colors hover:bg-base-200 hover:text-primary"
                                >
                                    <Icon className="h-4 w-4 text-accent" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Logout Action Button */}
                    <div className="border-t border-base-content/10 p-1">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-error transition-colors hover:bg-error/10"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}