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
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest">
              Creative workspace marketplace
            </p>
            <h1 className="text-6xl sm:text-8xl xl:text-9xl">
              Find your <span className="text-primary">creative</span> space.
            </h1>
            <p className="mt-6 max-w-md text-lg">
              Discover studios. Meet creators. Make something extraordinary.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="btn btn-neutral">Explore Studios</button>
              <button className="btn btn-ghost underline">Host Your Space</button>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="relative h-96 sm:h-[30rem]">
            <div className="absolute right-0 top-0 h-full w-4/5 bg-primary" />
            <div className="absolute bottom-0 right-0 h-1/2 w-3/5 bg-accent" />
            <div className="absolute left-0 top-12 flex h-3/4 w-3/5 items-center justify-center bg-neutral text-neutral-content">
              <span className="font-display text-[12rem] leading-none text-primary">
                S
              </span>
            </div>
            <div className="float-slow absolute left-1/2 top-4 h-4 w-4 bg-accent" />
            <PixelCluster className="absolute bottom-4 right-4 text-neutral-content" />
            <Crosshair className="left-[55%] top-1/3 text-neutral-content" />
            <VerticalText className="right-2 top-6 text-neutral-content">
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
        <div className="grid gap-10 sm:grid-cols-3">
          <Reveal>
            <p className="font-display text-7xl text-accent">
              <CountUp value={50} suffix="+" />
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest">
              Studios listed
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-display text-7xl text-accent">
              <CountUp value={1200} suffix="+" />
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest">
              Hours booked
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-display text-7xl text-accent">
              <CountUp value={300} suffix="+" />
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest">
              Creators
            </p>
          </Reveal>
        </div>
      </Band>

      <Band tone="red">
        <h2 className="text-5xl sm:text-7xl">Let&apos;s create something remarkable.</h2>
        <button className="btn btn-neutral mt-8">Get started</button>
      </Band>
    </>
  );
}