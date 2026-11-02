export default function SectionHeading({
    label,
    title,
    description,
}: {
    label?: string;
    title: string;
    description?: string;
}) {
    return (
        <div className="mb-10">
            {label && (
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
                    <span className="inline-block h-2 w-2 bg-current" />
                    {label}
                </p>
            )}
            <h2 className="text-4xl md:text-6xl">{title}</h2>
            {description && <p className="mt-4 max-w-2xl opacity-80">{description}</p>}
        </div>
    );
}