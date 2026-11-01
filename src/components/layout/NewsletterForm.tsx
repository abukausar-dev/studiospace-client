"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.includes("@") || !email.includes(".")) {
            toast.error("Please enter a valid email address");
            return;
        }

        toast.success("Thanks for subscribing to StudioSpace updates!");
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                className="input input-bordered w-full"
                aria-label="Email address"
            />
            <button type="submit" className="btn btn-primary">
                Subscribe
            </button>
        </form>
    );
}