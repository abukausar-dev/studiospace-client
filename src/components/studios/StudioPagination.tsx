
"use client";

import {
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

import type { Pagination } from "@/types/studio";

interface StudioPaginationProps {
    pagination: Pagination;
    onPageChange: (page: number) => void;
}

export default function StudioPagination({
    pagination,
    onPageChange,
}: StudioPaginationProps) {
    const { page, totalPages } = pagination;

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-base-content/10 pt-8 sm:flex-row">
            <p className="text-xs text-base-content/60">
                Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className="btn btn-outline btn-sm gap-2 sm:btn-md"
                >
                    <ArrowLeft size={15} />
                    Previous
                </button>

                <span className="flex h-9 min-w-9 items-center justify-center bg-neutral px-3 text-sm font-bold text-neutral-content">
                    {page}
                </span>

                <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="btn btn-outline btn-sm gap-2 sm:btn-md"
                >
                    Next
                    <ArrowRight size={15} />
                </button>
            </div>
        </div>
    );
}
