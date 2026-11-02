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
            <div className="marquee-track flex w-max py-3">
                {doubled.map((item, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-8 whitespace-nowrap pr-8 font-display text-2xl uppercase md:text-4xl"
                    >
                        {item}
                        <span aria-hidden="true">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}