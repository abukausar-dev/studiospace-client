import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Home() {
  return (
    <Container className="py-16">
      <h1 className="text-6xl md:text-8xl">Find your creative space.</h1>
      <p className="mt-4 max-w-xl">
        Discover studios. Meet creators. Make something extraordinary.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="btn btn-primary">Explore Studios</button>
        <button className="btn btn-outline">Host Your Space</button>
      </div>

      <div className="mt-24">
        <SectionHeading
          label="Featured"
          title="Selected creative spaces"
          description="A quick check that our reusable heading works."
        />
      </div>
    </Container>
  );
}