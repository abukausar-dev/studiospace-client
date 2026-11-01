import Link from "next/link";
import Logo from "@/components/layout/Logo";
import NewsletterForm from "@/components/layout/NewsletterForm";
import Container from "@/components/shared/Container";
import {
    XIcon,
    InstagramIcon,
    YoutubeIcon,
} from "@/components/shared/SocialIcons";
import { navLinks, categories } from "@/lib/constants";

const socialLinks = [
    { label: "X", href: "https://x.com", icon: <XIcon /> },
    { label: "Instagram", href: "https://instagram.com", icon: <InstagramIcon /> },
    { label: "YouTube", href: "https://youtube.com", icon: <YoutubeIcon /> },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-base-content bg-base-200">
            <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Logo />
                    <p className="mt-4 max-w-xs text-sm opacity-80">
                        StudioSpace connects photographers, filmmakers, podcasters and
                        musicians with creative spaces they can book by the hour, with
                        clear pricing and real availability.
                    </p>
                    <div className="mt-6 flex gap-2">
                        {socialLinks.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.label}
                                className="btn btn-square btn-outline btn-sm"
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-4 text-xl">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="hover:text-primary">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-xl">Popular Categories</h3>
                    <ul className="space-y-2 text-sm">
                        {categories.map((category) => (
                            <li key={category.slug}>
                                <Link
                                    href={`/studios?category=${category.slug}`}
                                    className="hover:text-primary"
                                >
                                    {category.homeLabel}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-xl">Newsletter</h3>
                    <p className="mb-4 text-sm opacity-80">
                        New studios and creator tips, straight to your inbox.
                    </p>
                    <NewsletterForm />
                </div>
            </Container>

            <div className="border-t border-base-content">
                <Container className="flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {currentYear} StudioSpace. All rights reserved.</p>
                    <p className="opacity-80">
                        By using StudioSpace you agree to our Terms of Use and Privacy Policy.
                    </p>
                </Container>
            </div>
        </footer>
    );
}