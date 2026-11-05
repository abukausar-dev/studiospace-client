import Link from "next/link";
import { ArrowLeft, Film, Compass } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-base-100 px-4 text-center">
            <div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-none border-2 border-dashed border-primary/40 bg-base-200">
                <Film className="h-12 w-12 text-primary animate-pulse" />
                <span className="absolute -bottom-2 -right-2 bg-neutral px-2 py-0.5 font-mono text-xs uppercase text-white">
                    404 Error
                </span>
            </div>

            <p className="font-mono text-xs uppercase tracking-widest text-primary">
                Scene Not Found
            </p>

            <h1 className="mt-2 font-display text-4xl uppercase tracking-wider text-base-content sm:text-6xl">
                Lost On Set
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-base-content/70">
                The workspace slot, shoot location, or scene you are trying to direct does not exist or has been shifted to another soundstage.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                    href="/"
                    className="btn btn-neutral rounded-none uppercase text-white shadow-lg"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
                </Link>
                <Link
                    href="/studios"
                    className="btn btn-outline rounded-none uppercase text-base-content"
                >
                    <Compass className="mr-2 h-4 w-4" /> Explore Studios
                </Link>
            </div>
        </div>
    );
}