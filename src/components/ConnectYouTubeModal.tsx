"use client";

import { useEffect } from "react";
import { SiYoutube } from "@icons-pack/react-simple-icons";
import { X, ArrowRight } from "lucide-react";

interface ConnectYouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectYouTubeModal({
  isOpen,
  onClose,
}: ConnectYouTubeModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="connect-youtube-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border-2 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_#171717] animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border-2 border-black bg-white text-black transition shadow-[2px_2px_0px_#171717] hover:bg-neutral-100 active:translate-y-0.5"
        >
          <X size={18} />
        </button>

        {/* Header with Graphic */}
        <div className="flex items-center gap-3.5">
          <div className="flex size-14 items-center justify-center rounded-2xl border-2 border-black bg-[#FF5D5D] shadow-[3px_3px_0px_#171717]">
            <SiYoutube size={30} className="text-white" />
          </div>

          <div>
            <span className="rounded-md border border-black/20 bg-neutral-100 px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-black">
              Account Required
            </span>
            <h2
              id="connect-youtube-title"
              className="text-2xl font-black text-black leading-tight mt-0.5"
            >
              Connect YouTube
            </h2>
          </div>
        </div>

        {/* Body Description */}
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          To generate your roast, Digital Menace needs access to your public
          YouTube activity (subscriptions, playlists and liked videos) to analyze your viewing habits.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <a
            href="/api/youtube/connect"
            className="flex w-full items-center justify-between rounded-full border-2 border-black bg-black px-6 py-3.5 text-sm font-bold text-white shadow-[4px_4px_0px_#171717] transition hover:bg-neutral-800 active:translate-y-0.5"
          >
            <div className="flex items-center gap-2.5">
              <SiYoutube size={18} className="text-[#FF0000]" />
              <span>Connect with YouTube</span>
            </div>
            <ArrowRight size={18} />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-1 text-center text-xs font-bold text-neutral-500 transition hover:text-black"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

