
import "swiper/css/bundle";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Band from "@/components/shared/Band";
import Marquee from "@/components/shared/Marquee";

import HeroSlider from "@/components/home/HeroSlider";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import BrowseCategories from "@/components/home/BrowseCategories";
import HowBookingWorks from "@/components/home/HowBookingWorks";

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
      {/* Hero */}
      <HeroSlider />

      {/* Creative category marquee */}
      <div className="bg-accent text-accent-content">
        <Marquee items={categories} />
      </div>

      {/* Dynamic featured studios */}
      <FeaturedStudios />

      {/* Browse by category */}
      <BrowseCategories />

      {/* How booking works */}
      <HowBookingWorks />

      {/* Final homepage CTA */}
      <Band tone="red">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              YOUR NEXT PROJECT STARTS HERE
            </p>

            <h2 className="mt-4">
              Let&apos;s create something remarkable.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 opacity-80 sm:text-base">
              Discover a space that fits your vision. Explore creative
              workspaces and find the perfect place to make your next
              project happen.
            </p>
          </div>

          <Link
            href="/studios"
            className="btn btn-neutral btn-sm gap-3 sm:btn-md"
          >
            Explore Studios
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </Band>
    </>
  );
}
