
import type { Metadata } from "next";

import StudiosExplorer from "@/components/studios/StudiosExplorer";

export const metadata: Metadata = {
    title: "Explore Studios | StudioSpace",
    description:
        "Discover and compare creative workspaces for photography, film production, podcasting, music and art.",
};

interface StudiosPageProps {
    searchParams: Promise<{
        category?: string | string[];
        search?: string | string[];
    }>;
}

export default async function StudiosPage({
    searchParams,
}: StudiosPageProps) {
    const params = await searchParams;

    const initialCategory =
        typeof params.category === "string"
            ? params.category
            : "";

    const initialSearch =
        typeof params.search === "string"
            ? params.search
            : "";

    return (
        <StudiosExplorer
            initialCategory={initialCategory}
            initialSearch={initialSearch}
        />
    );
}
