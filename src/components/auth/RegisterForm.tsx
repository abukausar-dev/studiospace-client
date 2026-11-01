"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const validatePassword = (value: string) => {
    if (value.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(value)) return "Password must have an uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must have a lowercase letter";
    return "";
};

export default function RegisterForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setPasswordError(value ? validatePassword(value) : "");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const error = validatePassword(password);
        if (error) {
            setPasswordError(error);
            toast.error(error);
            return;
        }

        setIsLoading(true);
        try {
            const { error: signUpError } = await authClient.signUp.email({
                name,
                email,
                password,
                image: photoUrl,
            });

            if (signUpError) {
                toast.error(signUpError.message || "Registration failed");
                return;
            }

            toast.success("Account created! Please log in.");
            router.push("/login");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="mb-1 block text-sm font-semibold">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your full name"
                    className="input w-full"
                />
            </div>

            <div>
                <label htmlFor="email" className="mb-1 block text-sm font-semibold">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="input w-full"
                />
            </div>

            <div>
                <label htmlFor="photoUrl" className="mb-1 block text-sm font-semibold">
                    Photo URL
                </label>
                <input
                    id="photoUrl"
                    type="url"
                    
                    value={photoUrl}
                    onChange={(event) => setPhotoUrl(event.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                    className="input w-full"
                />
            </div>

            <div>
                <label htmlFor="password" className="mb-1 block text-sm font-semibold">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(event) => handlePasswordChange(event.target.value)}
                    placeholder="Uppercase, lowercase, 6+ characters"
                    className="input w-full"
                />
                {passwordError && (
                    <p className="mt-1 text-sm text-error">{passwordError}</p>
                )}
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-primary w-full">
                {isLoading ? "Creating account..." : "Register"}
            </button>

            <p className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold underline">
                    Login
                </Link>
            </p>
        </form>
    );
}