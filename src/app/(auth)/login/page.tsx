import Container from "@/components/shared/Container";
import LoginForm from "@/components/auth/LoginForm";
import { getSafeRedirect } from "@/lib/utils";

export const metadata = { title: "Login | StudioSpace" };

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ redirect?: string }>;
}) {
    const params = await searchParams;
    const redirectTo = getSafeRedirect(params.redirect);

    return (
        <Container className="py-12 sm:py-16">
            <div className="mx-auto max-w-md border border-base-content bg-base-100 p-6 sm:p-8">
                <h1 className="text-4xl">Welcome back</h1>
                <p className="mb-6 mt-2 opacity-80">
                    Log in to manage your studios and bookings.
                </p>
                <LoginForm redirectTo={redirectTo} />
            </div>
        </Container>
    );
}