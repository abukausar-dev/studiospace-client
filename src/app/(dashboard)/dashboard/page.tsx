"use client";

import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
    const { data: session } = authClient.useSession();

    return (
        <div>
            <h1 className="text-4xl md:text-6xl">Dashboard</h1>
            <p className="mt-4">Welcome, {session?.user.name}</p>
        </div>
    );
}