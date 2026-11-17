"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface EventGalleryProps {
  images: string[];
  eventName: string;
}

export default function EventGallery({ images, eventName }: EventGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === null ? null : prev === 0 ? images.length - 1 : prev - 1,
    );
  }, [selectedIndex, images.length]);

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === null ? null : prev === images.length - 1 ? 0 : prev + 1,
    );
  }, [selectedIndex, images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, showPrev, showNext]);

  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="scroll-mt-24">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase font-bold tracking-wider mb-1">
            <Camera size={15} />
            <span>On-Site Photography & Captures</span>
          </div>
          <h2 className="font-sketch-block text-2xl sm:text-3xl lg:text-4xl font-bold text-white flex items-center gap-2">
            <span>Event Photo Gallery</span>
            <span className="font-mono text-sm sm:text-base text-neutral-400 font-normal">
              ({images.length} Photos)
            </span>
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400">
          Click any photo to view full screen
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {images.map((img, i) => {
          const isElongated = img.toLowerCase().includes("7375");

          return (
            <div
              key={i}
              onClick={() => openLightbox(i)}
              className={`group relative w-full rounded-2xl overflow-hidden border border-neutral-800 hover:border-primary/70 bg-neutral-900 cursor-pointer transition-all duration-300 shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#FFBE0D] select-none ${
                isElongated
                  ? "col-span-1 sm:col-span-2 h-52 sm:h-64 md:h-72 lg:h-80"
                  : "col-span-1 h-64 sm:h-72 md:h-80"
              }`}
            >
              {/* Ambient blurred backdrop for elongated photo so borders are soft and deep */}
              {isElongated && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="100px"
                    className="object-cover blur-xl opacity-35 scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              )}

              {/* Main Image */}
              <div className="relative w-full h-full z-10 flex items-center justify-center">
                <Image
                  src={img}
                  alt={`${eventName} photo ${i + 1}`}
                  fill
                  sizes={
                    isElongated
                      ? "(max-width: 1024px) 100vw, 1200px"
                      : "(max-width: 640px) 100vw, 600px"
                  }
                  className={`${
                    isElongated
                      ? "object-contain sm:object-cover"
                      : "object-cover"
                  } group-hover:scale-105 transition-transform duration-500 ease-out`}
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 pointer-events-none">
                <div className="flex items-center justify-between w-full">
                  {isElongated ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/50 text-[10px] font-mono text-primary font-bold">
                      Panoramic Capture
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-mono text-primary font-bold inline-flex items-center gap-1.5 shadow-md">
                    <Maximize2 size={12} />
                    <span>Enlarge</span>
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-300 font-semibold">
                  Photo {i + 1} of {images.length}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-3 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div
              className="flex items-center justify-between gap-4 pb-3 border-b border-neutral-800 text-white shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="font-sketch-block text-lg sm:text-xl font-bold truncate">
                  {eventName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-xs font-mono text-primary whitespace-nowrap">
                  {selectedIndex + 1} / {images.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close photo viewer"
                  className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 hover:border-white transition-all text-neutral-300 hover:text-white flex items-center gap-1.5 text-xs font-mono"
                >
                  <X size={18} />
                  <span className="hidden sm:inline">Close (Esc)</span>
                </button>
              </div>
            </div>

            {/* Main Image Stage */}
            <div
              className="relative flex-1 flex items-center justify-center p-2 sm:p-6 my-auto min-h-0 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[82vh] max-w-[92vw] flex items-center justify-center">
                <Image
                  src={images[selectedIndex]}
                  alt={`${eventName} photo ${selectedIndex + 1}`}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain select-none"
                />
              </div>

              {/* Prev Button */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous photo"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/75 hover:bg-primary text-white hover:text-black border border-white/20 transition-all shadow-xl active:scale-95"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Next Button */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next photo"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/75 hover:bg-primary text-white hover:text-black border border-white/20 transition-all shadow-xl active:scale-95"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {images.length > 1 && (
              <div
                className="flex items-center justify-center gap-2 pt-3 border-t border-neutral-800 overflow-x-auto no-scrollbar shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      idx === selectedIndex
                        ? "border-primary scale-105 shadow-[0_0_12px_rgba(255,190,13,0.5)]"
                        : "border-neutral-800 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
