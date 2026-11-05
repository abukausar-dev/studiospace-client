"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/components/layout/Logo";
import UserMenu from "@/components/layout/UserMenu";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Container from "@/components/shared/Container";
import { authClient } from "@/lib/auth-client";
import { navLinks } from "@/lib/constants";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const isActive = (href: string) => {
        if (href.startsWith("/#")) return false;
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const desktopLinkClass = (href: string) =>
        `border-b-2 py-1 text-sm font-semibold uppercase tracking-wider transition-colors ${isActive(href) ? "border-primary text-primary" : "border-transparent text-base-content hover:border-base-content"
        }`;

    const mobileLinkClass = (href: string) =>
        `border-l-4 py-3 pl-3 text-sm font-semibold uppercase tracking-wider transition-colors ${isActive(href) ? "border-primary bg-base-200 text-primary" : "border-transparent text-base-content"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-base-content/10 bg-base-100">
            <Container className="flex h-16 items-center justify-between">
                <Logo />

                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={desktopLinkClass(link.href)}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    {isPending && <div className="h-8 w-24 animate-pulse bg-base-300" />}

                    {!isPending && user && (
                        <UserMenu
                            user={user}
                            name={user.name}
                            image={user.image || ""}
                            email={user.email}
                        />
                    )}

                    {!isPending && !user && (
                        <div className="hidden items-center gap-2 sm:flex">
                            <Link href="/login" className="btn btn-outline btn-sm rounded-none uppercase">
                                Login
                            </Link>
                            <Link href="/register" className="btn btn-primary btn-sm rounded-none uppercase text-white">
                                Register
                            </Link>
                        </div>
                    )}

                    <button
                        type="button"
                        className="btn btn-square btn-ghost lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </Container>

            {isMenuOpen && (
                <nav className="border-t border-base-content/10 bg-base-100 lg:hidden">
                    <Container className="flex flex-col py-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={mobileLinkClass(link.href)}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {!isPending && !user && (
                            <div className="flex gap-2 py-3">
                                <Link
                                    href="/login"
                                    className="btn btn-outline btn-sm flex-1 rounded-none uppercase"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="btn btn-primary btn-sm flex-1 rounded-none uppercase text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </Container>
                </nav>
            )}
        </header>
    );
}