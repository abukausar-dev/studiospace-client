export function Crosshair({ className = "" }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className={`pointer-events-none absolute ${className}`}
        >
            <line x1="14" y1="0" x2="14" y2="28" />
            <line x1="0" y1="14" x2="28" y2="14" />
        </svg>
    );
}

const pixelPattern = [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0];
const blinkDurations = [3.2, 2.6, 3.8, 2.9, 3.4, 2.4, 3.6, 3.0, 2.7, 3.9, 2.5, 3.3];
const blinkOffsets = [0, 1.3, 0.6, 2.1, 0.9, 1.7, 0.3, 2.4, 1.1, 0.5, 1.9, 1.5];

export function PixelCluster({ className = "" }: { className?: string }) {
    return (
        <div aria-hidden="true" className={`grid grid-cols-4 gap-1 ${className}`}>
            {pixelPattern.map((filled, index) => (
                <span
                    key={index}
                    className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${filled ? "pixel-blink bg-current" : "bg-transparent"
                        }`}
                    style={
                        filled
                            ? {
                                animationDuration: `${blinkDurations[index]}s`,
                                animationDelay: `-${blinkOffsets[index]}s`,
                            }
                            : undefined
                    }
                />
            ))}
        </div>
    );
}

export function VerticalText({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            aria-hidden="true"
            className={`absolute whitespace-nowrap text-xs font-semibold uppercase tracking-[0.3em] ${className}`}
            style={{ writingMode: "vertical-rl" }}
        >
            {children}
        </span>
    );
}