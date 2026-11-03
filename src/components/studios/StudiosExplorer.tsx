
"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { categories } from "@/lib/constants";
import type { StudioFilters } from "@/types/studio";

import useStudios from "@/hooks/useStudios";

import StudioCard from "@/components/studios/StudioCard";
import StudioFiltersForm from "@/components/studios/StudioFilters";
import StudioSkeleton from "@/components/studios/StudioSkeleton";
import StudioPagination from "@/components/studios/StudioPagination";

interface StudiosExplorerProps {
    initialCategory: string;
    initialSearch: string;
}

const defaultFilters: StudioFilters = {
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
};

const areFiltersEqual = (
    first: StudioFilters,
    second: StudioFilters,
) => {
    return (
        first.search === second.search &&
        first.category === second.category &&
        first.minPrice === second.minPrice &&
        first.maxPrice === second.maxPrice &&
        first.sort === second.sort
    );
};

export default function StudiosExplorer({
    initialCategory,
    initialSearch,
}: StudiosExplorerProps) {
    const selectedCategory = categories.some(
        (category) => category.slug === initialCategory,
    )
        ? initialCategory
        : "";

    const startingFilters: StudioFilters = {
        ...defaultFilters,
        category: selectedCategory,
        search: initialSearch,
    };

    const [filters, setFilters] =
        useState<StudioFilters>(startingFilters);

    const [appliedFilters, setAppliedFilters] =
        useState<StudioFilters>(startingFilters);

    const [page, setPage] = useState(1);

    // Automatically apply every valid filter.
    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            const minimum = Number(filters.minPrice);
            const maximum = Number(filters.maxPrice);

            // Invalid minimum price
            if (
                filters.minPrice.trim() &&
                (!Number.isFinite(minimum) || minimum < 0)
            ) {
                return;
            }

            // Invalid maximum price
            if (
                filters.maxPrice.trim() &&
                (!Number.isFinite(maximum) || maximum < 0)
            ) {
                return;
            }

            // Minimum price cannot exceed maximum price.
            if (
                filters.minPrice.trim() &&
                filters.maxPrice.trim() &&
                minimum > maximum
            ) {
                return;
            }

            const nextFilters: StudioFilters = {
                ...filters,
                search: filters.search.trim(),
            };

            setAppliedFilters((current) => {
                if (areFiltersEqual(current, nextFilters)) {
                    return current;
                }

                return nextFilters;
            });

            setPage(1);
        }, 500);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [filters]);

    const {
        studios,
        pagination,
        loading,
        error,
        retry,
    } = useStudios(appliedFilters, page);

    // Apply button: immediately apply all filters.
    const handleApply = (newFilters: StudioFilters) => {
        const normalizedFilters: StudioFilters = {
            ...newFilters,
            search: newFilters.search.trim(),
        };

        setFilters(normalizedFilters);
        setAppliedFilters(normalizedFilters);
        setPage(1);
    };

    // Clear every filter.
    const handleReset = () => {
        setFilters(defaultFilters);
        setAppliedFilters(defaultFilters);
        setPage(1);
    };

    const resultStart =
        pagination && pagination.total > 0
            ? (pagination.page - 1) * pagination.limit + 1
            : 0;

    const resultEnd = pagination
        ? Math.min(
            pagination.page * pagination.limit,
            pagination.total,
        )
        : 0;

    return (
        <>
            {/* Page heading */}
            <section className="bg-base-200 px-5 py-16 sm:px-10 lg:px-16 lg:py-20">
                <div className="mx-auto max-w-[1400px]">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-10 bg-primary" />

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            THE STUDIOSPACE COLLECTION
                        </p>
                    </div>

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div>
                            <h1>
                                Find your
                                <span className="block text-primary">
                                    creative space.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-sm leading-7 text-base-content/65 sm:text-base">
                                Discover inspiring studios, professional production
                                spaces and creative environments built around your
                                next big idea.
                            </p>
                        </div>

                        <div className="border-l-2 border-primary pl-5">
                            <p className="font-display text-4xl text-primary">
                                CREATE MORE.
                            </p>

                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-base-content/55">
                                FIND THE RIGHT SPACE.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search and filters */}
            <section className="bg-base-100 px-5 py-10 sm:px-10 lg:px-16">
                <div className="mx-auto max-w-[1400px]">
                    <StudioFiltersForm
                        filters={filters}
                        onChange={setFilters}
                        onApply={handleApply}
                        onReset={handleReset}
                    />
                </div>
            </section>

            {/* Studio results */}
            <section className="bg-base-100 px-5 pb-20 sm:px-10 lg:px-16 lg:pb-28">
                <div className="mx-auto max-w-[1400px]">
                    {/* Result heading */}
                    <div className="mb-8 flex flex-col gap-3 border-b border-base-content/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                                EXPLORE THE COLLECTION
                            </p>

                            <h2 className="mt-3">Available Studios</h2>
                        </div>

                        {!loading && !error && pagination && (
                            <p className="text-xs text-base-content/60">
                                Showing {resultStart}–{resultEnd} of {pagination.total} studios
                            </p>
                        )}
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <StudioSkeleton key={index} />
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="border border-error/30 bg-base-200 px-6 py-16 text-center">
                            <h3>Unable to load studios.</h3>

                            <p className="mt-3 text-sm text-base-content/60">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={retry}
                                className="btn btn-neutral btn-sm mt-6"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && !error && studios.length === 0 && (
                        <div className="border border-base-content/10 bg-base-200 px-6 py-20 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-primary text-primary-content">
                                <Search size={27} />
                            </div>

                            <h3 className="mt-7">No studios found.</h3>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-base-content/60">
                                We could not find any workspace matching your current
                                filters. Try changing your search or explore all
                                available studios.
                            </p>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="btn btn-neutral btn-sm mt-7 sm:btn-md"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}

                    {/* Studio cards */}
                    {!loading && !error && studios.length > 0 && (
                        <>
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {studios.map((studio) => (
                                    <StudioCard
                                        key={studio._id}
                                        studio={studio}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination && (
                                <StudioPagination
                                    pagination={pagination}
                                    onPageChange={setPage}
                                />
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
