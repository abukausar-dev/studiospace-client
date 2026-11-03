
import {
    ShieldCheck,
    UserCheck,
    Wrench,
    MessageCircle,
    ArrowUpRight,
} from "lucide-react";

import Reveal from "@/components/shared/Reveal";

const guarantees = [
    {
        number: "01",
        label: "BOOKING CONFIDENCE",
        title: "Liability Protection",
        description:
            "Review security deposits, booking details and host-provided policies before requesting a space. Confirm any additional insurance or liability arrangements directly with the host.",
        icon: ShieldCheck,
        tone: "primary",
    },
    {
        number: "02",
        label: "TRUST & TRANSPARENCY",
        title: "Verified Profiles",
        description:
            "Explore host information, studio descriptions and listing details before making your decision. Clarify identity and booking details with the host.",
        icon: UserCheck,
        tone: "accent",
    },
    {
        number: "03",
        label: "READY TO CREATE",
        title: "Equipment Safety",
        description:
            "Check the listed amenities and equipment before booking. Coordinate with your host about equipment condition, usage instructions and workspace access.",
        icon: Wrench,
        tone: "primary",
    },
    {
        number: "04",
        label: "HERE TO HELP",
        title: "Host Support",
        description:
            "Contact your host about availability, studio access and booking questions. Response times and support availability depend on the individual host.",
        icon: MessageCircle,
        tone: "accent",
    },
];

export default function HostGuarantee() {
    return (
        <section className="relative overflow-hidden bg-base-200 px-5 py-20 text-base-content sm:px-10 lg:px-16 lg:py-28">
            {/* Decorative background element */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 top-16 hidden h-72 w-72 border-[35px] border-primary/15 lg:block"
            />

            <div className="relative mx-auto max-w-[1400px]">
                {/* Section heading */}
                <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-primary" />

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                SPACE FOR CREATIVITY. ROOM FOR CONFIDENCE.
                            </p>
                        </div>

                        <h2>
                            Create with
                            <span className="block text-primary">
                                confidence.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-base-content/65 sm:text-base">
                            Great creative experiences start with clear information
                            and communication. StudioSpace brings hosts and creators
                            together to make every workspace discovery more informed.
                        </p>
                    </div>

                    <div className="border-l-2 border-primary pl-6 lg:mb-2">
                        <p className="font-display text-5xl text-primary">
                            YOUR SPACE.
                        </p>

                        <p className="mt-2 font-display text-5xl text-base-content">
                            YOUR RULES.
                        </p>

                        <p className="mt-4 text-xs leading-6 text-base-content/60">
                            Clear details. Better decisions. More room to create.
                        </p>
                    </div>
                </div>

                {/* Guarantee cards */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {guarantees.map((item, index) => {
                        const Icon = item.icon;

                        const iconStyle =
                            item.tone === "primary"
                                ? "bg-primary text-primary-content"
                                : "bg-accent text-accent-content";

                        const numberStyle =
                            item.tone === "primary"
                                ? "text-primary"
                                : "text-accent";

                        return (
                            <Reveal
                                key={item.number}
                                delay={index * 0.12}
                                className="h-full"
                            >
                                <article className="group relative flex h-full min-h-[350px] flex-col overflow-hidden border border-base-content/10 bg-base-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7">
                                    {/* Decorative number */}
                                    <span
                                        aria-hidden="true"
                                        className={`font-display text-6xl leading-none opacity-75 ${numberStyle}`}
                                    >
                                        {item.number}
                                    </span>

                                    {/* Icon */}
                                    <div
                                        className={`mt-8 flex h-14 w-14 items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6 ${iconStyle}`}
                                    >
                                        <Icon size={25} strokeWidth={1.7} />
                                    </div>

                                    {/* Content */}
                                    <div className="mt-7 flex-1">
                                        <p className={`text-[9px] font-bold uppercase tracking-[0.18em] ${numberStyle}`}>
                                            {item.label}
                                        </p>

                                        <h3 className="mt-3 text-base-content">
                                            {item.title}
                                        </h3>

                                        <p className="mt-4 text-sm leading-7 text-base-content/65">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Card footer */}
                                    <div className="mt-8 flex items-center justify-between border-t border-base-content/15 pt-5">
                                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-base-content/50">
                                            STUDIO JOURNEY
                                        </span>

                                        <ArrowUpRight
                                            size={18}
                                            className="text-base-content/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                                        />
                                    </div>

                                    {/* Bottom accent line */}
                                    <div
                                        className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${item.tone === "primary"
                                                ? "bg-primary"
                                                : "bg-accent"
                                            }`}
                                    />
                                </article>
                            </Reveal>
                        );
                    })}
                </div>

                {/* Bottom statement */}
                <div className="mt-10 flex flex-col gap-3 border-t border-base-content/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-base-content/55">
                        BUILT AROUND CREATORS. CONNECTED BY CREATIVITY.
                    </p>

                    <p className="text-xs text-base-content/55">
                        Better spaces start with better connections.
                    </p>
                </div>
            </div>
        </section>
    );
}
