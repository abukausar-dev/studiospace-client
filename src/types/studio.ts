
export interface Studio {
    _id: string;
    title: string;
    category: string;
    hourlyRate: number;
    securityDeposit: number;
    maxCapacity: number;
    location: string;
    imageUrl: string;
    gallery: string[];
    amenities: string[];
    overview: string;

    ownerId: string;
    ownerName: string;
    ownerEmail: string;
    ownerImage?: string;

    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface StudiosResponse {
    success: boolean;
    message?: string;
    data: Studio[];
    pagination: Pagination;
}

export interface StudioStatistics {
    studios: number;
    bookings: number;
    creators: number;
}

export interface StatsResponse {
    success: boolean;
    message?: string;
    data: StudioStatistics;
}

export type StudioSort =
    | "newest"
    | "price-low"
    | "price-high"
    | "rating";

export interface StudioFilters {
    search: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    sort: StudioSort;
}
