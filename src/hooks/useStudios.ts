"use client";

import { useState, useEffect, useCallback } from "react";
import type { Studio, StudioFilters, StudiosResponse } from "@/types/studio";

export interface UseStudiosResult {
    studios: Studio[];
    loading: boolean;
    error: string | null;
    totalPages: number;
    totalStudios: number;
    refetch: () => void;
}

export const useStudios = (
    filters: StudioFilters,
    page: number = 1,
    limit: number = 9
): UseStudiosResult => {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalStudios, setTotalStudios] = useState<number>(0);

    const fetchStudios = useCallback(async (signal?: AbortSignal) => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append("page", page.toString());
            params.append("limit", limit.toString());

            if (filters.search && filters.search.trim() !== "") {
                params.append("search", filters.search.trim());
            }

            if (filters.category && filters.category !== "all") {
                params.append("category", filters.category);
            }

            if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice !== "") {
                params.append("minPrice", filters.minPrice.toString());
            }

            if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== "") {
                params.append("maxPrice", filters.maxPrice.toString());
            }

            if (filters.sort) {
                params.append("sort", filters.sort);
            }

            const res = await fetch(`/api/studios?${params.toString()}`, {
                signal,
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error(`Failed to load studios (${res.status})`);
            }

            const json: StudiosResponse = await res.json();

            if (json.success) {
                setStudios(json.data || []);
                setTotalPages(json.pagination?.totalPages || 1);
                setTotalStudios(json.pagination?.total || 0);
            } else {
                throw new Error(json.message || "Failed to fetch studio listings");
            }
        } catch (err: unknown) {
            if (err instanceof Error && err.name === "AbortError") {
                return;
            }
            const message = err instanceof Error ? err.message : "An unexpected error occurred";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [filters.search, filters.category, filters.minPrice, filters.maxPrice, filters.sort, page, limit]);

    useEffect(() => {
        const controller = new AbortController();
        fetchStudios(controller.signal);

        return () => {
            controller.abort();
        };
    }, [fetchStudios]);

    return {
        studios,
        loading,
        error,
        totalPages,
        totalStudios,
        refetch: () => fetchStudios(),
    };
};

export default useStudios;