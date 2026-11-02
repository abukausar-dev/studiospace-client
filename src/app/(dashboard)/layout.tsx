import RequireAuth from "@/components/auth/RequireAuth";
import Container from "@/components/shared/Container";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RequireAuth>
            <Container className="py-10">{children}</Container>
        </RequireAuth>
    );
}