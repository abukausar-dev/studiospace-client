import StudioDetailsView from "@/components/studios/StudioDetailsView";

interface StudioDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function StudioDetailsPage({ params }: StudioDetailsPageProps) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-base-100 py-10">
            <StudioDetailsView studioId={id} />
        </main>
    );
}