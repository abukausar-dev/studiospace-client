
"use client";

import { useEffect, useState } from "react";

import type {
    Studio,
    Pagination,
    StudioFilters,
    StudiosResponse,
} from "@/types/studio";

interface UseStudiosResult {
    studios: Studio[];
    pagination: Pagination | null;
    loading: boolean;
    error: string;
    retry: () => void;
}

export default function useStudios(
    filters: StudioFilters,
    page: number,
): UseStudiosResult {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        const fetchStudios = async () => {
            setLoading(true);
            setError("");

            try {
                const params = new URLSearchParams();

                params.set("page", String(page));
                params.set("limit", "9");
                params.set("sort", filters.sort);

                if (filters.search.trim()) {
                    params.set("search", filters.search.trim());
                }

                if (filters.category) {
                    params.set("category", filters.category);
                }

                if (filters.minPrice) {
                    params.set("minPrice", filters.minPrice);
                }

                if (filters.maxPrice) {
                    params.set("maxPrice", filters.maxPrice);
                }

                const response = await fetch(
                    `/api/studios?${params.toString()}`,
                    {
                        cache: "no-store",
                        signal: controller.signal,
                    },
                );

                const result: StudiosResponse = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Unable to load studios.",
                    );
                }

                if (
                    !Array.isArray(result.data) ||
                    !result.pagination
                ) {
                    throw new Error(
                        "Invalid studio response from server.",
                    );
                }

                setStudios(result.data);
                setPagination(result.pagination);
            } catch (error) {
                if (
                    error instanceof Error &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while loading studios.",
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchStudios();

        return () => {
            controller.abort();
        };
    }, [filters, page, retryCount]);

    const retry = () => {
        setRetryCount((current) => current + 1);
    };

    return {
        studios,
        pagination,
        loading,
        error,
        retry,
    };
}
