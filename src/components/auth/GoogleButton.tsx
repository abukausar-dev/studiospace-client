"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { GoogleIcon } from "@/components/shared/SocialIcons";

export default function GoogleButton({ redirectTo = "/" }: { redirectTo?: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);

        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: redirectTo,
        });

        if (error) {
            toast.error(error.message || "Google login failed");
            setIsLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="btn btn-outline w-full"
        >
            <GoogleIcon size={20} />
            {isLoading ? "Redirecting..." : "Continue with Google"}
        </button>
    );
}