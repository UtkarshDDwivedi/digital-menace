"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Unlink, Loader2, AlertTriangle, X } from "lucide-react";

interface DisconnectYouTubeButtonProps {
  redirectOnDisconnect?: boolean;
  className?: string;
}

export default function DisconnectYouTubeButton({
  redirectOnDisconnect = true,
  className = "",
}: DisconnectYouTubeButtonProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      const res = await fetch("/api/youtube/disconnect", {
        method: "POST",
      });

      if (res.ok) {
        setShowConfirm(false);
        if (redirectOnDisconnect) {
          router.replace("/");
        }
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to disconnect YouTube:", err);
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className={
          className ||
          "inline-flex items-center gap-1.5 text-xs font-bold text-red-600 transition hover:text-red-700"
        }
      >
        <Unlink size={13} />
        <span>Disconnect</span>
      </button>

      {showConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDisconnecting) {
              setShowConfirm(false);
            }
          }}
        >
          <div className="relative w-full max-w-sm rounded-[2rem] border-2 border-black bg-white p-6 shadow-[8px_8px_0px_#171717] animate-in zoom-in-95 duration-200">
            <button
              type="button"
              disabled={isDisconnecting}
              onClick={() => setShowConfirm(false)}
              className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full border border-black/20 text-neutral-500 hover:text-black hover:bg-neutral-100 transition"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl border-2 border-black bg-red-100 text-red-600 shadow-[2px_2px_0px_#171717]">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-black">
                  Disconnect YouTube?
                </h3>
                <p className="text-xs text-neutral-500">
                  This will unlink your channel.
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-neutral-600">
              Your stored credentials will be deleted and revoked. You will need
              to reconnect your YouTube account before generating new roasts.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              <button
                type="button"
                disabled={isDisconnecting}
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border-2 border-black bg-white py-2.5 text-xs font-bold text-black transition hover:bg-neutral-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDisconnecting}
                onClick={handleDisconnect}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-red-600 py-2.5 text-xs font-bold text-white shadow-[2px_2px_0px_#171717] transition hover:bg-red-700 active:translate-y-0.5 disabled:opacity-50"
              >
                {isDisconnecting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Disconnecting...</span>
                  </>
                ) : (
                  <span>Yes, Disconnect</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

