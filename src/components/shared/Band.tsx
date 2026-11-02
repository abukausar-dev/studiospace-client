import Container from "@/components/shared/Container";

type Tone = "cream" | "ink" | "red" | "mustard";

const toneClasses = {
    cream: "bg-base-100 text-base-content",
    ink: "bg-neutral text-neutral-content",
    red: "bg-primary text-primary-content",
    mustard: "bg-accent text-accent-content",
};

export default function Band({
    tone = "cream",
    children,
    className = "",
    id,
}: {
    tone?: Tone;
    children: React.ReactNode;
    className?: string;
    id?: string;
}) {
    return (
        <section
            id={id}
            className={`relative overflow-hidden border-b border-base-content ${toneClasses[tone]} ${className}`}
        >
            <Container className="py-16 md:py-24">{children}</Container>
        </section>
    );
}