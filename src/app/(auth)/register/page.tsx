import Container from "@/components/shared/Container";
import RegisterForm from "@/components/auth/RegisterForm";
import GoogleButton from "@/components/auth/GoogleButton";

export const metadata = { title: "Register | StudioSpace" };

export default function RegisterPage() {
    return (
        <Container className="py-12 sm:py-16">
            <div className="mx-auto max-w-md border border-base-content bg-base-100 p-6 sm:p-8">
                <h1 className="text-4xl">Create account</h1>
                <p className="mb-6 mt-2 opacity-80">
                    Join StudioSpace to book or host creative spaces.
                </p>
                <RegisterForm />
                <div className="divider my-6">OR</div>
                <GoogleButton />
            </div>
        </Container>
    );
}