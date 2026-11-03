"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

export default function CountUp({
    value,
    suffix = "",
}: {
    value: number;
    suffix?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const controls = animate(0, value, {
            duration: 1.6,
            ease: "easeOut",
            onUpdate: (latest) => setCurrent(Math.round(latest)),
        });

        return () => controls.stop();
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {current}
            {suffix}
        </span>
    );
}