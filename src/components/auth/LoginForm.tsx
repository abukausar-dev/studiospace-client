"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await authClient.signIn.email({ email, password });

            if (error) {
                toast.error(error.message || "Login failed");
                return;
            }

            toast.success("Welcome back!");
            router.push(redirectTo);
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        toast.info("Password reset is not available in this version.");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="mb-1 flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-semibold">
                        Password
                    </label>
                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-sm underline opacity-70"
                    >
                        Forgot Password?
                    </button>
                </div>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Your password"
                    className="input w-full"
                />
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-primary w-full">
                {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm">
                New to StudioSpace?{" "}
                <Link href="/register" className="font-semibold underline">
                    Register
                </Link>
            </p>
        </form>
    );
}