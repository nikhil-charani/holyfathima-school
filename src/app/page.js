import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <StatsCounter />
      
      {/* Spacer for scrolling testing */}
      <div className="h-screen bg-background w-full flex items-center justify-center">
        <h2 className="text-4xl font-bold text-muted-foreground">More sections coming soon...</h2>
      </div>
    </main>
  );
}
