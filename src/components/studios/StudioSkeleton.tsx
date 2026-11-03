
export default function StudioSkeleton() {
    return (
        <div className="overflow-hidden border border-base-content/10 bg-base-100">
            <div className="aspect-[4/3] animate-pulse bg-base-300" />

            <div className="space-y-4 p-5">
                <div className="h-3 w-24 animate-pulse bg-base-300" />

                <div className="h-6 w-3/4 animate-pulse bg-base-300" />

                <div className="h-3 w-1/2 animate-pulse bg-base-300" />

                <div className="h-10 w-full animate-pulse bg-base-300" />
            </div>
        </div>
    );
}
