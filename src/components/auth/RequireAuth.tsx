"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [isPending, session, pathname, router]);

    if (isPending || !session) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}