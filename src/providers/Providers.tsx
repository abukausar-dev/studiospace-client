"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="data-theme"
            defaultTheme="studiolight"
            themes={["studiolight", "studiodark"]}
            enableSystem={false}
        >
            {children}
            <Toaster position="top-right" richColors />
        </ThemeProvider>
    );
}