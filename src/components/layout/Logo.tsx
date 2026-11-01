import Link from "next/link";
import { Aperture } from "lucide-react";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Aperture size={28} className="text-primary" />
            <span className="font-display text-2xl font-extrabold uppercase tracking-tight">
                StudioSpace.
            </span>
        </Link>
    );
}