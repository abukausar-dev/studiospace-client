"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <button className="btn btn-square btn-ghost" aria-label="Toggle theme" />;
    }

    const isDark = theme === "studiodark";

    const handleToggle = () => {
        setTheme(isDark ? "studiolight" : "studiodark");
    };

    return (
        <button
            onClick={handleToggle}
            className="btn btn-square btn-ghost"
            aria-label="Toggle theme"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}