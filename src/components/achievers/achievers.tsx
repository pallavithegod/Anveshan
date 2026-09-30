"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import confetti from "canvas-confetti";
import { Achiever, achieversData } from "@/config/achievers";
import DraggableMarquee from "@/components/ui/draggable-marquee";
import Typography from "../Typography";

const SYNONYMS = [
  "ACHIEVER",
  "SELF-STARTER",
  "HIGH-FLYER",
  "HUSTLER",
  "TRAILBLAZER",
  "GO-GETTER",
  "MAVERICK",
  "PIONEER",
  "INNOVATOR",
  "LEADER",
  "CHAMPION",
  "PATHFINDER",
];

function AchieverCard({
  achiever,
  index,
}: {
  achiever: Achiever;
  index: number;
}) {
  const synonym = SYNONYMS[(achiever.id + index) % SYNONYMS.length];

  return (
    <article className="flex flex-col justify-between w-[230px] sm:w-[360px] h-[195px] sm:h-[250px] flex-shrink-0 p-3.5 sm:p-5 rounded-2xl bg-[#141414] border-2 border-neutral-800 hover:border-primary shadow-[3px_3px_0px_0px_#000000] hover:shadow-[5px_5px_0px_0px_#000000] transition-all duration-200 select-none group">
      {/* Top: Clickable LinkedIn Icon + Dynamic Synonym */}
      <div className="flex items-center justify-between">
        <Link
          href={achiever.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-1 sm:p-1.5 rounded-lg bg-neutral-900 border border-neutral-700/80 text-primary hover:text-white hover:border-primary transition-colors shadow-[1px_1px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px]"
          aria-label={`${achiever.name} LinkedIn Profile`}
        >
          <Linkedin size={14} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2.2} />
        </Link>
        <span className="font-cabin-sketch text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-widest">
          // {synonym}
        </span>
      </div>

      {/* Description: Post and Experience (Ex in yellow, achievements in neutral) */}
      <div className="my-auto py-0.5 sm:py-1">
        {/* Post */}
        <p className="text-white font-averta-std text-xs sm:text-base font-semibold leading-snug line-clamp-2">
          {achiever.role}
        </p>

        {/* Experience: 'Ex: ...' highlighted in golden yellow */}
        {(achiever.exrole || achiever.achievements) && (
          <p className="font-averta-std text-[10px] sm:text-sm mt-0.5 sm:mt-1.5 leading-snug line-clamp-1 sm:line-clamp-2">
            {achiever.exrole && (
              <span className="text-[#FFBE0D] font-medium mr-1 sm:mr-1.5">
                Ex: {achiever.exrole}
              </span>
            )}
            {achiever.achievements && (
              <span className="text-neutral-400">
                {achiever.exrole ? "· " : ""}// {achiever.achievements}
              </span>
            )}
          </p>
        )}
      </div>

      {/* Footer: Profile Photo + Name & Slightly Decreased Batch Size */}
      <div className="flex items-center gap-2.5 sm:gap-3 pt-2 sm:pt-2.5 border-t border-neutral-800">
        <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-primary/40 bg-neutral-900 shrink-0">
          <Image
            src={achiever.image}
            alt={achiever.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <strong className="font-sketch-block text-white text-sm sm:text-lg font-bold leading-tight truncate">
            {achiever.name}
          </strong>
          <span className="font-cabin-sketch text-neutral-400 text-[9px] sm:text-xs tracking-wider uppercase">
            Batch: {achiever.batch}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function AchieversSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const triggerConfettiCelebration = () => {
      const duration = 1200;
      const animationEnd = Date.now() + duration;
      const colors = ["#FFBE0D", "#FFD700", "#FFFFFF", "#FFA000", "#FFE082"];

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors,
          zIndex: 9999,
        });

        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors,
          zIndex: 9999,
        });
      }, 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            setHasScrolledIn(true);
            triggerConfettiCelebration();
          }
        });
      },
      { threshold: 0.2 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const row1 = achieversData.slice(0, 11);
  const row2 = achieversData.slice(11);

  return (
    <section
      ref={sectionRef}
      id="achievers"
      className="py-16 sm:py-24 relative overflow-hidden w-full"
    >
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14 px-4 max-w-4xl mx-auto relative">
        <div className="inline-flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <Typography.Display className="font-sketch-block font-normal text-primary text-5xl sm:text-6xl md:text-7xl leading-tight">
            HALL OF FAME
          </Typography.Display>

          {/* Graffiti Plop-in badge next to heading */}
          <div
            className={`transition-all duration-700 ease-out transform ${
              hasScrolledIn
                ? "scale-100 rotate-6 opacity-100"
                : "scale-0 -rotate-12 opacity-0"
            } inline-block`}
            aria-hidden="true"
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 48 48"
              fill="none"
              className="text-primary filter drop-shadow-[2px_2px_0px_#000000]"
            >
              {/* Graffiti Hand-drawn Star / Trophy badge */}
              <path
                d="M24 4L28.8 15.6L41.3 16.8L31.8 25.1L34.6 37.4L24 31L13.4 37.4L16.2 25.1L6.7 16.8L19.2 15.6L24 4Z"
                fill="#FFBE0D"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M20 20L24 12L28 20L36 21L30 27L32 35L24 30L16 35L18 27L12 21L20 20Z"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <Typography.Lead className="font-prompt text-white/80 text-sm sm:text-lg max-w-2xl mx-auto mt-2">
          Celebrating the exceptional placements, internships, and career
          milestones of our members.
        </Typography.Lead>
      </div>

      {/* Scrolling Marquee Container with side fade gradients */}
      <div className="relative w-full flex flex-col gap-4 sm:gap-6 overflow-hidden">
        {/* Edge Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-28 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-28 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

        {/* Row 1: Scrolling Left */}
        <div className="w-full">
          <DraggableMarquee speed={32} direction="left" pauseOnHover={true}>
            {row1.map((achiever, index) => (
              <div
                key={`r1-${achiever.id}-${index}`}
                className="px-2 sm:px-2.5 py-2"
              >
                <AchieverCard achiever={achiever} index={index} />
              </div>
            ))}
          </DraggableMarquee>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="w-full">
          <DraggableMarquee speed={30} direction="right" pauseOnHover={true}>
            {row2.map((achiever, index) => (
              <div
                key={`r2-${achiever.id}-${index}`}
                className="px-2 sm:px-2.5 py-2"
              >
                <AchieverCard achiever={achiever} index={index + 11} />
              </div>
            ))}
          </DraggableMarquee>
        </div>
      </div>
    </section>
  );
}
