
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
    Autoplay,
    EffectFade,
    Navigation,
    Pagination,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./HeroSlider.module.css";

const slides = [
    {
        id: "photography",
        kicker: "PHOTOGRAPHY / VIDEO",
        title: "Find your frame.",
        highlight: "Make it happen.",
        description:
            "From sunlit portrait lofts to fully equipped production spaces, find the right backdrop for your next creative idea.",
        imageUrl:
            "https://images.unsplash.com/photo-1765372860684-69f0e2524694?auto=format&fit=crop&w=2400&q=85",
        category: "Photo & Video",
        cardDescription:
            "The right light, the right backdrop and room to bring your vision to life.",
    },
    {
        id: "film-production",
        kicker: "FILM / PRODUCTION",
        title: "Give every story",
        highlight: "a stage.",
        description:
            "Find a production stage with the space, lighting and setup your crew needs to bring the next shot to life.",
        imageUrl:
            "https://images.unsplash.com/photo-1658042250011-2dd5c9b514c8?auto=format&fit=crop&w=2400&q=85",
        category: "Film Stages",
        cardDescription:
            "Room for your crew, equipment and the scenes you have imagined.",
    },
    {
        id: "sound-production",
        kicker: "PODCAST / MUSIC",
        title: "Bring your sound",
        highlight: "into focus.",
        description:
            "Book a focused recording space for clear conversations, fresh tracks and everything worth putting on record.",
        imageUrl:
            "https://images.unsplash.com/photo-1781865202629-c0ab5921973b?auto=format&fit=crop&w=2400&q=85",
        category: "Sound & Music",
        cardDescription:
            "Acoustic spaces for conversations, recording sessions and new sounds.",
    },
];

export default function HeroSlider() {
    return (
        <section
            aria-label="Explore creative workspaces"
            className="bg-neutral text-white"
        >
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                fadeEffect={{ mode: "cross-fade" }}
                slidesPerView={1}
                speed={700}
                loop={true}
                loopPreventsSliding={false}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 6500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                    stopOnLastSlide: false,
                }}
                onSwiper={(swiper) => {
                    if (swiper.autoplay && !swiper.autoplay.running) {
                        swiper.autoplay.start();
                    }
                }}
                className={styles.swiper}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <article className="relative isolate flex min-h-[620px] items-center overflow-hidden px-5 pb-28 pt-20 text-white sm:px-10 lg:min-h-[680px] lg:px-16">
                            {/* Background image */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 z-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url("${slide.imageUrl}")`,
                                }}
                            />

                            {/* Dark overlay */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/55 to-black/20"
                            />

                            <div
                                aria-hidden="true"
                                className="absolute inset-0 z-[2] bg-gradient-to-t from-black/45 via-transparent to-black/10"
                            />

                            {/* Decorative element */}
                            <div
                                aria-hidden="true"
                                className="absolute right-0 top-0 z-[3] hidden h-36 w-36 border-b-[18px] border-l-[18px] border-accent/90 lg:block"
                            />

                            <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-end gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:gap-16">
                                {/* Main content */}
                                <div className="max-w-3xl">
                                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs">
                                        <span className="bg-primary px-3 py-2 text-white">
                                            STUDIOSPACE
                                        </span>

                                        <span className="text-white/80">
                                            THE CREATIVE SPACE MARKETPLACE
                                        </span>
                                    </div>

                                    <p className="mt-9 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                                        {slide.kicker}
                                    </p>

                                    <h1 className="mt-4 max-w-3xl text-white">
                                        {slide.title}
                                        <span className="mt-1 block text-accent">
                                            {slide.highlight}
                                        </span>
                                    </h1>

                                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                                        {slide.description}
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <Link
                                            href="/studios"
                                            className="btn btn-neutral btn-sm gap-3 sm:btn-md"
                                        >
                                            Explore Studios
                                            <ArrowUpRight size={17} />
                                        </Link>

                                        <Link
                                            href="/studios"
                                            className="btn btn-accent btn-sm gap-3 sm:btn-md"
                                        >
                                            Host Your Space
                                            <ArrowUpRight size={17} />
                                        </Link>
                                    </div>

                                    <div className="mt-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65 sm:text-xs">
                                        <span className="h-px w-10 bg-primary" />
                                        YOUR SPACE. YOUR STORY. YOUR CREATION.
                                    </div>
                                </div>

                                {/* Information card */}
                                <aside className="relative hidden w-full max-w-[360px] justify-self-end lg:block">
                                    <div
                                        aria-hidden="true"
                                        className="absolute -right-5 -top-5 h-24 w-24 bg-primary"
                                    />

                                    <div className="relative border border-white/40 bg-black/40 p-3 backdrop-blur-md">
                                        <div className="flex items-center justify-between border-b border-white/20 pb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">
                                            <span>SPACE GUIDE</span>
                                            <span>0{index + 1} / 03</span>
                                        </div>

                                        <div className="mt-3 bg-base-100 p-6 text-base-content">
                                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                                FEATURED FORMAT
                                            </p>

                                            <h2 className="mt-4">{slide.category}</h2>

                                            <p className="mt-4 text-sm leading-6 opacity-75">
                                                {slide.cardDescription}
                                            </p>

                                            <div className="mt-7 flex items-center gap-3 border-t border-base-300 pt-5 text-[10px] font-bold uppercase tracking-[0.15em]">
                                                <span className="h-2 w-2 bg-primary" />
                                                BUILT FOR YOUR NEXT PROJECT
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 text-white">
                                            <span className="font-display text-4xl">
                                                0{index + 1}
                                            </span>

                                            <span className="text-right text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                                                DISCOVER
                                                <br />
                                                YOUR SPACE
                                            </span>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
