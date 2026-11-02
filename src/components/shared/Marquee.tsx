export default function Marquee({
    items,
    className = "",
}: {
    items: string[];
    className?: string;
}) {
    const doubled = items.concat(items);

    return (
        <div className={`overflow-hidden border-y border-base-content ${className}`}>
            <div className="marquee-track flex w-max py-2 md:py-3">
                {doubled.map((item, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-6 whitespace-nowrap pr-6 font-display text-xl uppercase md:text-3xl"
                    >
                        {item}
                        <span aria-hidden="true">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}