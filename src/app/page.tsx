import Band from "@/components/shared/Band";
import Marquee from "@/components/shared/Marquee";
import Reveal from "@/components/shared/Reveal";
import CountUp from "@/components/shared/CountUp";
import SectionHeading from "@/components/shared/SectionHeading";
import { Crosshair, PixelCluster, VerticalText } from "@/components/shared/Decor";

const categories = [
  "Photo Studios",
  "Podcast Rooms",
  "Music Suites",
  "Sound Stages",
  "Art Workshops",
];

export default function Home() {
  return (
    <>
      <Band tone="cream">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest md:text-sm">
              Creative workspace marketplace
            </p>
            <h1>
              Find your <span className="text-primary">creative</span> space.
            </h1>
            <p className="mt-5 max-w-md text-base md:text-lg">
              Discover studios. Meet creators. Make something extraordinary.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn btn-neutral btn-sm sm:btn-md">
                Explore Studios
              </button>
              <button className="btn btn-accent btn-sm sm:btn-md">
                Host Your Space
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="relative h-64 sm:h-80 lg:h-96">
            <div className="absolute right-0 top-0 h-full w-4/5 bg-primary" />
            <div className="absolute bottom-0 right-0 h-1/2 w-3/5 bg-accent" />
            <div className="absolute left-0 top-8 flex h-3/4 w-3/5 items-center justify-center bg-neutral text-neutral-content">
              <span className="font-display text-[6rem] leading-none text-primary sm:text-[8rem]">
                S
              </span>
            </div>
            <div className="float-slow absolute left-1/2 top-3 h-3 w-3 bg-accent" />
            <PixelCluster className="absolute bottom-3 right-3 text-neutral-content" />
            <Crosshair className="left-[55%] top-1/3 text-neutral-content" />
            <VerticalText className="right-2 top-5 text-neutral-content">
              Find your space
            </VerticalText>
          </Reveal>
        </div>
      </Band>

      <div className="bg-accent text-accent-content">
        <Marquee items={categories} />
      </div>

      <Band tone="ink">
        <SectionHeading label="By the numbers" title="Built for makers" />
        <div className="grid gap-8 sm:grid-cols-3">
          <Reveal>
            <p className="font-display text-5xl text-accent md:text-6xl">
              <CountUp value={50} suffix="+" />
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest md:text-sm">
              Studios listed
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-display text-5xl text-accent md:text-6xl">
              <CountUp value={1200} suffix="+" />
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest md:text-sm">
              Hours booked
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-display text-5xl text-accent md:text-6xl">
              <CountUp value={300} suffix="+" />
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest md:text-sm">
              Creators
            </p>
          </Reveal>
        </div>
      </Band>

      <Band tone="red">
        <h2 className="max-w-xl">Let&apos;s create something remarkable.</h2>
        <button className="btn btn-neutral btn-sm mt-6 sm:btn-md">Get started</button>
      </Band>
    </>
  );
}