"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  SiGithub,
  SiInstagram,
  SiSpotify,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

import { ArrowDownRight, MessageCircle } from "lucide-react";

const platforms = [
  {
    id: "youtube",
    name: "YouTube",
    number: "01",
    description:
      "Your watch history knows things about you that even your friends don't.",
    status: "available",
    icon: SiYoutube,
    accent: "#FF5D5D",
    sticker: "👁️ WATCHING",
  },
  {
    id: "instagram",
    name: "Instagram",
    number: "02",
    description:
      "The carefully curated feed. The suspicious follows. The real you.",
    status: "coming-soom",
    icon: SiInstagram,
    accent: "#E8C8B5",
    sticker: "BRO 💀",
  },
  {
    id: "spotify",
    name: "Spotify",
    number: "03",
    description:
      "Your playlists, your guilty pleasures, your questionable music taste.",
    status: "coming-soon",
    icon: SiSpotify,
    accent: "#D2DDAE",
    sticker: "HEHE 🥱",
  },
  {
    id: "reddit",
    name: "Reddit",
    number: "04",
    description:
      "Years of comments, niche obsessions, and chronically online behavior.",
    status: "coming-soon",
    icon: MessageCircle,
    accent: "#F0D3A0",
    sticker: "EVIDENCE COLLECTED 🕵️",
  },
  {
    id: "github",
    name: "GitHub",
    number: "05",
    description:
      "Abandoned repositories, commit messages, and green squares of validation.",
    status: "coming-soon",
    icon: SiGithub,
    accent: "#D5CBEA",
    sticker: "UNDER REVIEW 🔎",
  },
];

export default function PlatformCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  const activePlatform = platforms[selectedIndex];

  return (
    <section className="grow flex flex-col justify-center gap-5">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          containScroll: false,
          duration: 25,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 items-stretch py-3">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            const isActive = selectedIndex === index;
            const isAvailable = platform.status === "available";

            return (
              <CarouselItem
                key={platform.id}
                className="basis-[82%] pl-3 sm:basis-[60%] sm:pl-4 lg:basis-[42%] xl:basis-[36%]"
              >
                <article
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Select ${platform.name}`}
                  className={[
                    "group relative flex h-full min-h-130 cursor-pointer",
                    "flex-col overflow-hidden rounded-[1.75rem] border",
                    "border-black/10 p-5 sm:min-h-117.5 sm:p-7",
                    "transition-[transform,opacity,box-shadow] duration-300",
                    isActive
                      ? "scale-100 opacity-100 shadow-[5px_6px_0px_rgba(0,0,0,0.12)]"
                      : "scale-[0.96] opacity-65 shadow-none",
                  ].join(" ")}
                  style={{
                    backgroundColor: platform.accent,
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-black/10 bg-white/70">
                        <Icon size={24} strokeWidth={2} />
                      </span>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/50">
                          Platform
                        </p>
                        <p className="text-sm font-bold text-black">
                          {platform.number}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Platform identity */}
                  <div className="mt-8">
                    <h3 className="text-5xl font-black leading-[0.95] tracking-[-0.055em] text-black sm:text-6xl">
                      {platform.name}
                      <span className="text-black/40">.</span>
                    </h3>

                    <p className="mt-3 max-w-72.5 text-sm leading-relaxed text-black/70">
                      {platform.description}
                    </p>
                  </div>

                  {/* Oversized graphic */}
                  <div className="relative flex min-h-35 flex-1 items-center justify-center py-5">
                    <div
                      className={[
                        "relative flex size-38 items-center justify-center",
                        "rounded-[1.8rem] border-[2.5px] border-black",
                        "bg-white shadow-[5px_5px_0px_#171717]",
                        "transition-transform duration-300",
                        isActive
                          ? "-rotate-6 group-hover:rotate-[-10deg]"
                          : "rotate-3",
                      ].join(" ")}
                    >
                      <Icon
                        size={76}
                        strokeWidth={1.7}
                        className="text-black"
                      />

                      <span className="absolute -right-3 -top-3 flex size-9 rotate-12 items-center justify-center rounded-full border-2 border-black bg-white text-sm font-black">
                        !
                      </span>
                    </div>

                    <span className="absolute bottom-3 right-1 rotate-6 rounded-md border-2 border-black bg-white px-3 py-2 text-[20px] font-black uppercase tracking-wider text-black shadow-[3px_3px_0px_#171717]">
                      {platform.sticker}
                    </span>
                  </div>

                  {/* Action */}

                  {isAvailable ? (
                    <Link
                      href={`${platform.id}`}
                      onClick={(event) => event.stopPropagation()}
                      className="flex w-full items-center justify-between gap-3 rounded-full border-2 border-black px-5 py-3.5 text-sm font-bold transition-all duration-200 bg-black text-white hover:bg-neutral-800 active:translate-y-0.5"
                    >
                      <span>Roast Me</span>
                      <ArrowDownRight size={19} />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="flex w-full cursor-not-allowed items-center justify-between gap-3 rounded-full border-2 border-black px-5 py-3.5 text-sm font-bold text-black/45 bg-white/35"
                    >
                      <span>Coming Soon™️</span>
                      <ArrowDownRight size={19} />
                    </button>
                  )}
                </article>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Touch navigation is available; these arrows are desktop-only. */}
        <CarouselPrevious className="left-1 hidden sm:flex" />
        <CarouselNext className="right-1 hidden sm:flex" />
      </Carousel>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4 px-1">
        <div
          className="flex items-center gap-1.5"
          aria-label="Choose a platform"
        >
          {platforms.map((platform, index) => (
            <button
              key={platform.id}
              type="button"
              aria-label={`Go to ${platform.name}`}
              aria-current={selectedIndex === index ? "true" : undefined}
              onClick={() => api?.scrollTo(index)}
              className={[
                "h-2 rounded-full transition-all duration-300",
                selectedIndex === index
                  ? "w-7 bg-[#FF5D5D]"
                  : "w-2 bg-foreground/20 hover:bg-foreground/45",
              ].join(" ")}
            />
          ))}
        </div>

        <p className="text-xs font-bold tabular-nums text-muted-foreground">
          {String(selectedIndex + 1).padStart(2, "0")}
          <span className="mx-1.5 text-foreground/30">/</span>
          {String(platforms.length).padStart(2, "0")}
          <span className="ml-2 hidden sm:inline">{activePlatform.name}</span>
        </p>
      </div>
    </section>
  );
}
