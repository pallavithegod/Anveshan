"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  MapPin,
  Trophy,
  Cpu,
  Code2,
  Globe,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { eventsData, EventItem } from "@/config/events";
import Typography from "../Typography";

gsap.registerPlugin(ScrollTrigger);

function EventCardBanner({ event }: { event: EventItem }) {
  if (event.image) {
    const isReforged = event.slug === "reforged-26";

    return (
      <div className="relative w-full h-[200px] sm:h-[250px] rounded-xl overflow-hidden border border-neutral-800 my-3.5 bg-black/90 group-hover:border-primary/50 transition-colors flex items-center justify-center">
        {/* Ambient blurred backdrop so the container feels full and rich */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src={event.cardImage || event.image}
            alt=""
            fill
            sizes="100px"
            className="object-cover blur-xl opacity-35 scale-110"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Crisp uncropped image */}
        <div className="relative w-full h-full z-10 flex items-center justify-center p-1">
          <Image
            src={event.cardImage || event.image}
            alt={event.name}
            fill
            sizes="(max-width: 768px) 100vw, 760px"
            className={`transition-transform duration-500 group-hover:scale-[1.02] ${
              isReforged ? "object-cover" : "object-contain"
            }`}
          />
        </div>

        {/* Date pill overlay */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-mono text-primary font-bold shadow-md">
            {event.date}
          </span>
        </div>
      </div>
    );
  }

  // High-impact branded graphic for events without offline photos yet
  if (event.slug === "reforged-26") {
    return (
      <div className="relative w-full h-[180px] sm:h-[230px] rounded-xl overflow-hidden border border-primary/40 my-3.5 bg-gradient-to-br from-[#1c1800] via-[#121212] to-black p-5 flex flex-col justify-between group-hover:border-primary transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/20 border border-primary text-primary text-xs font-bold font-mono">
            <Trophy size={14} />
            <span>FLAGSHIP HACKATHON '26</span>
          </div>
          <span className="text-xs font-mono text-[#FFBE0D] animate-pulse font-bold">
            ● REGISTRATIONS OPEN
          </span>
        </div>
        <div className="my-auto">
          <h4 className="font-sketch-block text-2xl sm:text-3xl text-white font-bold leading-tight">
            REFORGED '26 HACKATHON
          </h4>
          <p className="font-mono text-xs sm:text-sm text-neutral-300 mt-1">
            n8n · Agentic AI · Gemma · Open Innovation
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[11px] text-primary font-bold">
            ₹10K Cash + ₹1L Swag
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[11px] text-neutral-300 font-mono">
            18 - 28 Oct 2026
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[11px] text-neutral-300 font-mono">
            BPIT Delhi
          </span>
        </div>
      </div>
    );
  }

  if (event.slug === "introduction-to-ai-agents") {
    return (
      <div className="relative w-full h-[180px] sm:h-[230px] rounded-xl overflow-hidden border border-neutral-800 my-3.5 bg-gradient-to-br from-[#0c1a24] via-[#121212] to-black p-5 flex flex-col justify-between group-hover:border-primary/50 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-500/20 border border-sky-400 text-sky-400 text-xs font-bold font-mono">
            <Cpu size={14} />
            <span>AGENTIC AI MASTERCLASS</span>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            23 March 2026
          </span>
        </div>
        <div className="my-auto">
          <p className="font-mono text-xs text-primary font-bold uppercase tracking-widest">
            Autonomous Loop Architecture
          </p>
          <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-lg font-sketch-block text-white mt-1">
            <span className="px-2 py-1 rounded bg-black/60 border border-white/10">
              Perceive
            </span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-black/60 border border-primary/40 text-primary">
              Think
            </span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-black/60 border border-white/10">
              Act
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[11px] text-neutral-300 font-mono">
            LangChain & CrewAI
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[11px] text-neutral-300 font-mono">
            Vector DBs
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[11px] text-neutral-300 font-mono">
            React + FastAPI
          </span>
        </div>
      </div>
    );
  }

  if (event.slug === "web3-and-blockchain-session") {
    return (
      <div className="relative w-full h-[180px] sm:h-[230px] rounded-xl overflow-hidden border border-neutral-800 my-3.5 bg-gradient-to-br from-[#1e0e28] via-[#121212] to-black p-5 flex flex-col justify-between group-hover:border-primary/50 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-400 text-xs font-bold font-mono">
            <Globe size={14} />
            <span>ANVESHAN × QUILLAI NETWORK</span>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            28 Dec 2024
          </span>
        </div>
        <div className="my-auto">
          <h4 className="font-sketch-block text-2xl sm:text-3xl text-white font-bold leading-tight">
            WEB3 & BLOCKCHAIN WORKSHOP
          </h4>
          <p className="font-mono text-xs sm:text-sm text-neutral-300 mt-1">
            Smart Contracts · EVM Architecture · Blockchain Security
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[11px] text-neutral-300 font-mono">
            Solidity dApps
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[11px] text-neutral-300 font-mono">
            QuillAI Network
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[11px] text-primary font-bold">
            Hands-on Lab
          </span>
        </div>
      </div>
    );
  }

  // Default fallback banner for other cohort/workshop sessions
  return (
    <div className="relative w-full h-[180px] sm:h-[230px] rounded-xl overflow-hidden border border-neutral-800 my-3.5 bg-gradient-to-br from-neutral-900 via-[#141414] to-black p-5 flex flex-col justify-between group-hover:border-primary/50 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/40 text-primary text-xs font-bold font-mono">
          <Code2 size={14} />
          <span>{event.badge}</span>
        </div>
        <span className="text-xs font-mono text-neutral-400">{event.date}</span>
      </div>
      <div className="my-auto">
        <h4 className="font-sketch-block text-2xl sm:text-3xl text-white font-bold leading-tight">
          {event.name}
        </h4>
        <p className="font-mono text-xs sm:text-sm text-neutral-400 mt-1">
          {event.location}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-mono">
          {event.attendeesCount || "Anveshan Community"}
        </span>
        <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-primary font-mono">
          Interactive Session
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      const cards = cardsRef.current.filter(Boolean) as HTMLLIElement[];

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "+=250",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }

    if (headingRef.current && cardsRef.current.length > 0) {
      const firstCard = cardsRef.current[0];
      if (firstCard) {
        gsap.to(headingRef.current, {
          opacity: 1,
          scrollTrigger: {
            trigger: firstCard,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        });
      }
    }

    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#testimonials" || hash === "#testiminials") {
        window.history.replaceState(null, "", "/#events");
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, []);

  const addToRefs = (el: HTMLLIElement | null, index: number) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section
      className="min-h-screen font-sans relative !overflow-x-clip pt-12 pb-24"
      id="events"
    >
      {/* Background Sticky Headline & Subheading (Cards cover subheading as they scroll up) */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center pointer-events-none z-0">
        <div
          ref={headingRef}
          className="text-center px-2 sm:px-4 w-full select-none"
        >
          <Typography.H1 className="text-[clamp(2.4rem,7.2vw,11.5rem)] uppercase text-white font-wc-rough-trad font-normal tracking-tight whitespace-nowrap leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            EVENTS & HACKATHONS
          </Typography.H1>
          <p className="font-cabin-sketch italic text-neutral-200 text-sm sm:text-base md:text-lg lg:text-xl tracking-wider max-w-xl sm:max-w-2xl mx-auto mt-4 sm:mt-5 px-4 leading-relaxed">
            From 30-hour national hackathons and developer cohorts to hands-on
            Agentic AI masterclasses—explore our engineering milestones.
          </p>
        </div>
      </div>

      {/* Stacking Cards Container */}
      <div
        ref={containerRef}
        className="w-full max-w-[340px] sm:max-w-[560px] md:max-w-[660px] lg:max-w-[740px] mx-auto relative z-10 px-3 sm:px-4"
        style={{
          paddingTop: "2rem",
          paddingBottom: "calc(65vh - 35vh)",
        }}
      >
        <ul id="cards" className="list-none p-0 grid grid-cols-1 gap-[42vh]">
          {eventsData.map((event, index) => {
            const isReforged = event.slug === "reforged-26";
            const rotation = index % 2 === 0 ? "-1.5deg" : "1.5deg";

            return (
              <li
                key={event.slug}
                ref={(el) => addToRefs(el, index)}
                id={`card-${event.slug}`}
                className="card sticky top-[20vh] sm:top-[18vh]"
                style={{
                  rotate: rotation,
                  zIndex: index + 1, // Ensures later cards stack on top; Reforged '26 (last) sits on top!
                }}
              >
                <article
                  className={`card-body w-full box-border p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 bg-[#121212] text-white shadow-[6px_6px_0px_0px_#000000] hover:shadow-[10px_10px_0px_0px_#000000] group select-none ${
                    isReforged
                      ? "border-[#FFBE0D] hover:border-white shadow-[6px_6px_0px_0px_#FFBE0D]"
                      : "border-neutral-800 hover:border-primary"
                  }`}
                >
                  {/* Top Bar: Category Tag + Year Pill */}
                  <div className="flex items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-cabin-sketch text-xs sm:text-sm text-primary uppercase tracking-widest font-bold">
                        // {event.category.toUpperCase()}
                      </span>
                      {isReforged && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-[#FFBE0D]/40 text-[#FFBE0D] text-[10px] sm:text-xs font-mono font-bold">
                          🏆 BPIT'S MOST SUCCESSFUL HACKATHON
                        </span>
                      )}
                      {event.timelineStatus === "Upcoming" && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-mono font-bold animate-pulse">
                          ● UPCOMING
                        </span>
                      )}
                    </div>
                    <span className="font-cabin-sketch text-xs sm:text-sm px-3 py-0.5 rounded-full bg-[#FFBE0D]/15 text-[#FFBE0D] border border-[#FFBE0D]/40 font-bold tracking-wider">
                      {event.year}
                    </span>
                  </div>

                  {/* Picture / Branded Visual */}
                  <EventCardBanner event={event} />

                  {/* Heading */}
                  <div className="mt-2">
                    <h3 className="font-sketch-block text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wide leading-tight group-hover:text-primary transition-colors">
                      {event.name}
                    </h3>

                    {/* Metadata Row: Date & Location */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-neutral-400 mt-1.5 font-averta-std">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={13} className="text-primary" />
                        <span>{event.date}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} className="text-primary" />
                        <span>{event.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Short ~20-word summary */}
                  <p className="font-averta-std text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed mt-2.5 mb-5 line-clamp-2 sm:line-clamp-3">
                    {event.shortSummary}
                  </p>

                  {/* Card Footer: View Event Button & Optional Portal Link */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800">
                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-black font-sketch-block text-sm sm:text-base font-bold rounded-xl border-2 border-primary hover:bg-white hover:border-white transition-all shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
                    >
                      <span>View Event</span>
                      <ArrowRight size={16} />
                    </Link>

                    {/* Highlighted Official Portal for Reforged '26 */}
                    {isReforged && event.officialLink && (
                      <Link
                        href={event.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 text-[#FFBE0D] border border-[#FFBE0D]/60 hover:bg-[#FFBE0D] hover:text-black font-sketch-block text-xs sm:text-sm font-bold rounded-xl transition-all shadow-[2px_2px_0px_#000000]"
                      >
                        <span>Official Portal</span>
                        <ExternalLink size={14} />
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
