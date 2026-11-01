import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 p-8 text-base-content">
      <div className="flex items-center justify-between border-b border-base-content pb-4">
        <span className="font-display text-2xl font-extrabold uppercase">
          StudioSpace.
        </span>
        <ThemeToggle />
      </div>

      <h1 className="mt-10 text-6xl md:text-8xl">Find your creative space.</h1>
      <p className="mt-4 max-w-xl">
        Discover studios. Meet creators. Make something extraordinary.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="btn btn-primary">Explore Studios</button>
        <button className="btn btn-outline">Host Your Space</button>
      </div>
    </main>
  );
}