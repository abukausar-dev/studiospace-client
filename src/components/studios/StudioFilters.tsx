
"use client";

import { useState, type FormEvent } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { categories } from "@/lib/constants";

import type {
    StudioFilters as FilterValues,
    StudioSort,
} from "@/types/studio";

interface StudioFiltersProps {
    filters: FilterValues;
    onChange: (filters: FilterValues) => void;
    onApply: (filters: FilterValues) => void;
    onReset: () => void;
}

export default function StudioFilters({
    filters,
    onChange,
    onApply,
    onReset,
}: StudioFiltersProps) {
    const [error, setError] = useState("");

    const validateFilters = (values: FilterValues) => {
        const minimum = Number(values.minPrice);
        const maximum = Number(values.maxPrice);

        if (
            values.minPrice.trim() &&
            (!Number.isFinite(minimum) || minimum < 0)
        ) {
            return "Enter a valid minimum price.";
        }

        if (
            values.maxPrice.trim() &&
            (!Number.isFinite(maximum) || maximum < 0)
        ) {
            return "Enter a valid maximum price.";
        }

        if (
            values.minPrice.trim() &&
            values.maxPrice.trim() &&
            minimum > maximum
        ) {
            return "Minimum price cannot be greater than maximum price.";
        }

        return "";
    };

    const updateTextFilter = (
        name: "search" | "category" | "minPrice" | "maxPrice",
        value: string,
    ) => {
        const updatedFilters = {
            ...filters,
            [name]: value,
        };

        onChange(updatedFilters);
        setError(validateFilters(updatedFilters));
    };

    const updateSort = (value: StudioSort) => {
        const updatedFilters = {
            ...filters,
            sort: value,
        };

        onChange(updatedFilters);
        setError(validateFilters(updatedFilters));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationError = validateFilters(filters);

        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");

        onApply({
            ...filters,
            search: filters.search.trim(),
        });
    };

    const handleReset = () => {
        setError("");
        onReset();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border border-base-content/10 bg-base-200 p-5 sm:p-7"
        >
            <div className="mb-6 flex items-center gap-3">
                <SlidersHorizontal size={19} className="text-primary" />

                <h3>Find your workspace</h3>

                <span className="ml-auto text-[9px] font-bold uppercase tracking-[0.15em] text-base-content/50">
                    REFINE YOUR SEARCH
                </span>
            </div>

            {/* Search */}
            <div className="relative">
                <Search
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/45"
                />

                <input
                    type="search"
                    value={filters.search}
                    onChange={(event) =>
                        updateTextFilter("search", event.target.value)
                    }
                    placeholder="Search studio name or location..."
                    className="input input-bordered h-12 w-full bg-base-100 pl-12 text-sm"
                />
            </div>

            {/* Filters */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <label className="form-control gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/60">
                        Category
                    </span>

                    <select
                        value={filters.category}
                        onChange={(event) =>
                            updateTextFilter("category", event.target.value)
                        }
                        className="select select-bordered w-full bg-base-100"
                    >
                        <option value="">All Categories</option>

                        {categories.map((category) => (
                            <option key={category.slug} value={category.slug}>
                                {category.homeLabel}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="form-control gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/60">
                        Minimum Price ($ / hr)
                    </span>

                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={filters.minPrice}
                        onChange={(event) =>
                            updateTextFilter("minPrice", event.target.value)
                        }
                        placeholder="No minimum"
                        className="input input-bordered w-full bg-base-100"
                    />
                </label>

                <label className="form-control gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/60">
                        Maximum Price ($ / hr)
                    </span>

                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={filters.maxPrice}
                        onChange={(event) =>
                            updateTextFilter("maxPrice", event.target.value)
                        }
                        placeholder="No maximum"
                        className="input input-bordered w-full bg-base-100"
                    />
                </label>

                <label className="form-control gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/60">
                        Sort By
                    </span>

                    <select
                        value={filters.sort}
                        onChange={(event) =>
                            updateSort(event.target.value as StudioSort)
                        }
                        className="select select-bordered w-full bg-base-100"
                    >
                        <option value="newest">Newest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </label>
            </div>

            {/* Validation error */}
            {error && (
                <p role="alert" className="mt-4 text-sm text-error">
                    {error}
                </p>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3 border-t border-base-content/10 pt-5">
                <button
                    type="submit"
                    className="btn btn-neutral btn-sm gap-2 sm:btn-md"
                >
                    <Search size={16} />
                    Apply Filters
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-outline btn-sm sm:btn-md"
                >
                    Clear Filters
                </button>
            </div>
        </form>
    );
}
