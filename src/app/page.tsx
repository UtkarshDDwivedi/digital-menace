import PlatformCarousel from "@/components/PlatformCarousel";

export default function Home() {
  return (
    <div className="grow flex flex-col">
      <div className="flex items-baseline justify-between m-4">
        <p className="w-[75%] text-6xl font-extrabold tracking-wide">
          Pick a platform
        </p>
        <div className="h-12 w-12 rounded-xl bg-black"></div>
      </div>
      <PlatformCarousel />
    </div>
  );
}
