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
        <div className="mb-8 md:mb-10">
            {label && (
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest md:text-sm">
                    <span className="inline-block h-2 w-2 bg-current" />
                    {label}
                </p>
            )}
            <h2>{title}</h2>
            {description && <p className="mt-4 max-w-2xl opacity-80">{description}</p>}
        </div>
    );
}