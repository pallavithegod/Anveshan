import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageSquare,
  Sparkles,
  Trophy,
  Users,
  Video,
  Award,
  Layers,
  Clock,
  Camera,
  Gift,
  Play,
} from "lucide-react";
import { eventsData } from "@/config/events";
import Typography from "@/components/Typography";
import ScrollToTopOnMount from "@/components/events/scroll-to-top";
import EventGallery from "@/components/events/event-gallery";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params = eventsData.map((event) => ({
    slug: event.slug,
  }));
  // Alias reforged26 to reforged-26 so both URLs resolve seamlessly
  params.push({ slug: "reforged26" });
  return params;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const normalizedSlug = slug === "reforged26" ? "reforged-26" : slug;
  const event = eventsData.find((e) => e.slug === normalizedSlug);

  if (!event) {
    notFound();
  }

  const isReforged = event.slug === "reforged-26";
  const isWidescreen = event.bannerFormat === "widescreen" || isReforged;

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto font-sans text-white">
      <ScrollToTopOnMount />
      {/* Top Navigation */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <Link
          href="/#events"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-primary hover:border-primary transition-all text-sm font-semibold shadow-[2px_2px_0px_#000000]"
        >
          <ArrowLeft size={16} />
          <span>Back to All Events</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-cabin-sketch text-xs sm:text-sm px-3 py-1 rounded-full bg-primary/10 border border-primary/40 text-primary font-bold tracking-wider">
            {event.category.toUpperCase()}
          </span>
          <span className="font-cabin-sketch text-xs sm:text-sm px-3 py-1 rounded-full bg-[#FFBE0D]/15 text-[#FFBE0D] border border-[#FFBE0D]/40 font-bold">
            {event.year}
          </span>
          {event.timelineStatus === "Upcoming" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold animate-pulse">
              ● UPCOMING
            </span>
          )}
          {event.timelineStatus === "Past" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
              ✓ CONCLUDED
            </span>
          )}
          {isReforged && (
            <span className="hidden sm:inline-flex items-center gap-1 font-cabin-sketch text-xs sm:text-sm px-3 py-1 rounded-full bg-[#FFBE0D]/15 text-[#FFBE0D] border border-[#FFBE0D]/40 font-bold">
              FLAGSHIP HACKATHON
            </span>
          )}
        </div>
      </div>

      {/* Main Event Article Card */}
      <article className="bg-[#121212] rounded-3xl border-2 border-neutral-800 overflow-hidden shadow-[8px_8px_0px_#000000]">
        {/* =========================================================================
            HERO & OVERVIEW SECTION
            - Widescreen banners (Reforged '26, TechStarter 3.0): 16:9 Banner + compact side-by-side Overview
            - Square Posters (all others): Split 2-Column Hero (Poster left, Overview + Highlights right)
           ========================================================================= */}
        {isWidescreen ? (
          <div>
            {/* 16:9 Edge-to-Edge Banner */}
            {event.image && (
              <div className="relative w-full aspect-[16/9] max-h-[460px] bg-neutral-950 border-b-2 border-neutral-800 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {/* Widescreen Header & Details */}
            <div className="p-6 sm:p-10 lg:p-12 pb-8">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 text-primary font-mono text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                  <Sparkles size={16} />
                  <span>{event.badge}</span>
                </div>
                <Typography.Display className="font-sketch-block text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {event.name}
                </Typography.Display>
                <p className="font-prompt text-neutral-400 text-sm sm:text-base max-w-3xl mt-3">
                  {event.shortSummary}
                </p>
              </div>

              {/* Quick Meta Pills */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-neutral-300 pb-6 mb-8 border-b border-neutral-800">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <Calendar size={15} className="text-primary" />
                  <span>{event.date}</span>
                </span>

                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <MapPin size={15} className="text-primary" />
                  <span>{event.location}</span>
                </span>

                {event.attendeesCount && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <Users size={15} className="text-primary" />
                    <span>{event.attendeesCount}</span>
                  </span>
                )}

                {event.prizePool && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/40 text-primary font-bold">
                    <Trophy size={15} />
                    <span>{event.prizePool}</span>
                  </span>
                )}
              </div>

              {/* Reforged Special Action Portal Box */}
              {isReforged && (
                <div className="p-5 sm:p-6 mb-8 rounded-2xl bg-gradient-to-r from-[#1c1800] via-[#161616] to-[#121212] border-2 border-primary shadow-[4px_4px_0px_#FFBE0D]">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                    <div className="flex-1 min-w-0 pr-0 md:pr-4">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] font-bold">
                          ✓ SUCCESSFULLY CONCLUDED
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/40 text-primary font-mono text-[11px] font-bold">
                          ★ FLAGSHIP HACKATHON
                        </span>
                      </div>
                      <h3 className="font-sketch-block text-xl sm:text-2xl text-white font-bold flex items-center gap-2">
                        <Trophy className="text-[#FFBE0D] shrink-0" size={22} />
                        <span>Reforged '26 Official Portal & Archive</span>
                      </h3>
                      <p className="font-averta-std text-xs sm:text-sm text-neutral-300 mt-1">
                        Explore the problem tracks, offline finale photo gallery, and official portal archive.
                      </p>
                    </div>
                    <div className="w-full md:w-auto flex flex-col items-end gap-2.5 shrink-0 md:ml-auto">
                      {event.officialLink && (
                        <Link
                          href={event.officialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto min-w-[215px] inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-black font-sketch-block text-sm sm:text-base font-bold rounded-xl border-2 border-primary hover:bg-white hover:border-white transition-all shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 shrink-0"
                        >
                          <span>Dedicated Portal</span>
                          <ExternalLink size={16} />
                        </Link>
                      )}
                      {event.whatsappLink && (
                        <Link
                          href={event.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto min-w-[215px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-black font-sketch-block text-sm font-bold rounded-xl transition-all shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 shrink-0"
                        >
                          <MessageSquare size={16} />
                          <span>WhatsApp Community</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick In-Page Navigation Bar */}
              <div className="sticky top-20 z-30 -mx-2 px-3 py-2.5 mb-8 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-lg">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider px-1 shrink-0">
                  Quick Jump:
                </span>
                <a
                  href="#overview"
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-neutral-800/90 border border-neutral-700/80 text-neutral-300 hover:text-primary hover:border-primary transition-colors whitespace-nowrap"
                >
                  Overview & Highlights
                </a>
                {isReforged && event.tracks && (
                  <a
                    href="#tracks"
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-neutral-800/90 border border-neutral-700/80 text-neutral-300 hover:text-primary hover:border-primary transition-colors whitespace-nowrap"
                  >
                    Problem Tracks ({event.tracks.length})
                  </a>
                )}
                {isReforged && event.rounds && (
                  <a
                    href="#schedule"
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-neutral-800/90 border border-neutral-700/80 text-neutral-300 hover:text-primary hover:border-primary transition-colors whitespace-nowrap"
                  >
                    Rounds & Dates
                  </a>
                )}
                {event.gallery && event.gallery.length > 0 && (
                  <a
                    href="#gallery"
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-primary/15 border border-primary/40 text-primary hover:bg-primary hover:text-black transition-colors whitespace-nowrap font-bold"
                  >
                    Photo Gallery ({event.gallery.length})
                  </a>
                )}
                {isReforged && event.perks && (
                  <a
                    href="#perks"
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-neutral-800/90 border border-neutral-700/80 text-neutral-300 hover:text-primary hover:border-primary transition-colors whitespace-nowrap"
                  >
                    Perks & Goodies
                  </a>
                )}
              </div>

              {/* Compact Side-by-Side: Overview (col-span-7) & Highlights (col-span-5) */}
              <div id="overview" className="scroll-mt-36 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4">
                <div className="lg:col-span-7">
                  <h2 className="font-sketch-block text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-primary">//</span>
                    <span>Overview & Context</span>
                  </h2>
                  <div className="font-averta-std text-neutral-300 text-sm sm:text-base leading-relaxed space-y-3">
                    {event.description.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <h2 className="font-sketch-block text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-primary">//</span>
                    <span>Key Highlights</span>
                  </h2>
                  <div className="space-y-2.5">
                    {event.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs sm:text-sm text-neutral-200"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-primary shrink-0 mt-0.5"
                        />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Split 2-Column Hero for Square Posters */
          <div className="p-6 sm:p-8 lg:p-10 border-b-2 border-neutral-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: 1:1 Poster + Quick Meta + Actions */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {event.image && (
                  <div className="relative w-full max-w-[420px] aspect-square mx-auto lg:mx-0 rounded-2xl overflow-hidden border-2 border-neutral-700/80 shadow-[0_12px_40px_rgba(0,0,0,0.8)] bg-neutral-900">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 420px"
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Quick Meta Details under poster */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-xs text-neutral-300 max-w-[420px] mx-auto lg:mx-0 w-full">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
                    <Calendar size={15} className="text-primary shrink-0" />
                    <span className="truncate">{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
                    <MapPin size={15} className="text-primary shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  {event.attendeesCount && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
                      <Users size={15} className="text-primary shrink-0" />
                      <span className="truncate">{event.attendeesCount}</span>
                    </div>
                  )}

                  {event.prizePool && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-primary/10 border border-primary/40 text-primary font-bold">
                      <Trophy size={15} className="shrink-0" />
                      <span className="truncate">{event.prizePool}</span>
                    </div>
                  )}
                </div>

                {/* Actions if present */}
                {(event.officialLink || event.whatsappLink) && (
                  <div className="flex flex-col gap-2 max-w-[420px] mx-auto lg:mx-0 w-full pt-1">
                    {event.officialLink && (
                      <Link
                        href={event.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-black font-sketch-block text-sm font-bold rounded-xl border-2 border-primary hover:bg-white hover:border-white transition-all shadow-[2px_2px_0px_#000000]"
                      >
                        <span>Visit Official Portal</span>
                        <ExternalLink size={15} />
                      </Link>
                    )}
                    {event.whatsappLink && (
                      <Link
                        href={event.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-black font-sketch-block text-sm font-bold rounded-xl transition-all shadow-[2px_2px_0px_#000000]"
                      >
                        <MessageSquare size={15} />
                        <span>Join WhatsApp Group</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Title + Short Summary + Overview + Highlights */}
              <div className="lg:col-span-7 flex flex-col justify-start">
                <div className="inline-flex items-center gap-2 text-primary font-mono text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                  <Sparkles size={16} />
                  <span>{event.badge}</span>
                </div>

                <Typography.Display className="font-sketch-block text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                  {event.name}
                </Typography.Display>

                <p className="font-prompt text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 border-b border-neutral-800/80 pb-4">
                  {event.shortSummary}
                </p>

                {/* Overview & Context */}
                <div className="mb-6">
                  <h3 className="font-sketch-block text-xl sm:text-2xl font-bold text-white mb-2.5 flex items-center gap-2">
                    <span className="text-primary">//</span>
                    <span>Overview & Context</span>
                  </h3>
                  <div className="font-averta-std text-neutral-300 text-sm sm:text-base leading-relaxed space-y-2.5">
                    {event.description.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Compact Highlights Grid */}
                {event.highlights && event.highlights.length > 0 && (
                  <div>
                    <h3 className="font-sketch-block text-xl sm:text-2xl font-bold text-white mb-2.5 flex items-center gap-2">
                      <span className="text-primary">//</span>
                      <span>Key Highlights & Outcomes</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {event.highlights.map((highlight, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-200"
                        >
                          <CheckCircle2
                            size={15}
                            className="text-primary shrink-0 mt-0.5"
                          />
                          <span className="leading-snug">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            HIGH PRIORITY CONTENT SECTIONS
            Priority given to:
            1. YouTube Session Recordings
            2. Event Snapshots & Media Archive
            3. Mentors / Jury Panel / Winners
            4. Reforged Tracks, Schedule & Perks
           ========================================================================= */}
        <div className="p-6 sm:p-10 lg:p-12 space-y-12">
          {/* Priority 1: YouTube Video Links */}
          {event.youtubeLinks && event.youtubeLinks.length > 0 && (
            <div>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
                <h2 className="font-sketch-block text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  <Video size={24} className="text-primary" />
                  <span>
                    Session Video Recordings ({event.youtubeLinks.length})
                  </span>
                </h2>
                <span className="font-mono text-xs text-neutral-400">
                  Official Lecture Sessions & Streams
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {event.youtubeLinks.map((yt, i) => (
                  <Link
                    key={i}
                    href={yt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-primary p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,190,13,0.15)] overflow-hidden"
                  >
                    <div>
                      {/* Video Thumbnail with Play Button Overlay */}
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-800 border border-neutral-800/80 mb-3.5">
                        {yt.videoId ? (
                          <Image
                            src={`https://img.youtube.com/vi/${yt.videoId}/hqdefault.jpg`}
                            alt={yt.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-neutral-600">
                            <Video size={36} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-red-600/90 transition-all backdrop-blur-[2px]">
                            <Play
                              size={17}
                              className="fill-current ml-0.5 text-white/90"
                            />
                          </div>
                        </div>
                        {yt.session && (
                          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-black/85 backdrop-blur-sm border border-neutral-700 text-[10px] font-mono text-neutral-300 font-bold uppercase">
                            {yt.session}
                          </div>
                        )}
                      </div>

                      {/* Video Title */}
                      <h4 className="font-sketch-block text-white text-base sm:text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {yt.title}
                      </h4>
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-800/80 text-xs">
                      <span className="font-mono text-neutral-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-neutral-600" />
                        Video Session
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/20 border border-red-500/20 text-red-400/80 font-medium group-hover:bg-red-600/70 group-hover:border-red-500/40 group-hover:text-white transition-all">
                        <span>Watch Video</span>
                        <ExternalLink size={12} className="opacity-70" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Priority 2: Event Snapshots & Photo Archive */}
          {event.gallery && event.gallery.length > 0 && (
            <EventGallery images={event.gallery} eventName={event.name} />
          )}

          {/* Speakers / Mentors Section */}
          {event.speakersOrMentors && event.speakersOrMentors.length > 0 && (
            <div>
              <h2 className="font-sketch-block text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">//</span>
                <span>Featured Speakers & Mentors</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {event.speakersOrMentors.map((speaker, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center gap-4"
                  >
                    {speaker.image ? (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/50 shrink-0 bg-neutral-800">
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-neutral-800 border-2 border-primary/40 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                        {speaker.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-sketch-block text-white text-lg font-bold truncate">
                        {speaker.name}
                      </h4>
                      <p className="font-averta-std text-xs text-neutral-300 truncate">
                        {speaker.role}
                      </p>
                      {speaker.company && (
                        <p className="font-mono text-[11px] text-primary truncate">
                          @{speaker.company}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mentors & Jury Panel (HackBPIT 2k23) */}
          {event.judges && event.judges.length > 0 && (
            <div>
              <h2 className="font-sketch-block text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">//</span>
                <span>Mentors & Jury Panel</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {event.judges.map((judge, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center text-center group hover:border-primary/50 transition-colors"
                  >
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/60 mb-3 bg-neutral-800">
                      <Image
                        src={judge.image}
                        alt={judge.name}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="font-sketch-block text-white text-base font-bold leading-snug">
                      {judge.name}
                    </h4>
                    {judge.role && (
                      <p className="font-averta-std text-[11px] text-neutral-400 mt-1">
                        {judge.role}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Winners Section (HackBPIT 2k23) */}
          {event.winners && event.winners.length > 0 && (
            <div>
              <h2 className="font-sketch-block text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy size={26} className="text-[#FFBE0D]" />
                <span>Hackathon Winners</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.winners.map((winner, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-neutral-900 border-2 border-[#FFBE0D]/50 overflow-hidden shadow-[4px_4px_0px_#000000]"
                  >
                    <div className="relative w-full h-56 sm:h-64 bg-neutral-800">
                      <Image
                        src={winner.image}
                        alt={winner.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs text-[#FFBE0D] font-bold">
                          {winner.title}
                        </span>
                        <h4 className="font-sketch-block text-lg sm:text-xl text-white font-bold">
                          {winner.teamName}
                        </h4>
                      </div>
                      <Award size={24} className="text-[#FFBE0D]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reforged Problem Tracks, Rounds & Perks */}
          {isReforged && (
            <>
              {/* Problem Tracks */}
              {event.tracks && (
                <div id="tracks" className="scroll-mt-24">
                  <h2 className="font-sketch-block text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-primary">//</span>
                    <span>Problem Tracks ({event.tracks.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {event.tracks.map((track, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-primary/50 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase font-bold mb-2">
                            <Layers size={14} />
                            <span>Track 0{i + 1}</span>
                          </div>
                          <h4 className="font-sketch-block text-xl text-white font-bold mb-2">
                            {track.title}
                          </h4>
                          <p className="font-averta-std text-xs sm:text-sm text-neutral-300 leading-relaxed">
                            {track.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule & Evaluation Rounds */}
              {event.rounds && (
                <div id="schedule" className="scroll-mt-24">
                  <h2 className="font-sketch-block text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-primary">//</span>
                    <span>Schedule & Evaluation Rounds</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.rounds.map((round, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-primary/40 transition-colors"
                      >
                        <div>
                          {/* Round Header: Phase Pill + Clean Single-Line Date Badge */}
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-1.5 text-primary font-mono text-xs uppercase font-bold tracking-wider">
                              <Sparkles size={14} className="shrink-0" />
                              <span>Round 0{i + 1}</span>
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black border border-[#FFBE0D]/30 text-xs font-mono text-[#FFBE0D] whitespace-nowrap shrink-0">
                              <Clock
                                size={12}
                                className="shrink-0 text-[#FFBE0D]"
                              />
                              <span className="whitespace-nowrap font-semibold">
                                {round.date}
                              </span>
                            </span>
                          </div>

                          {/* Round Title */}
                          <h4 className="font-sketch-block text-lg sm:text-xl text-white font-bold leading-snug mb-2">
                            {round.title}
                          </h4>

                          {/* Round Description */}
                          <p className="font-averta-std text-xs sm:text-sm text-neutral-300 leading-relaxed">
                            {round.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Perks & Goodies */}
              {event.perks && (
                <div id="perks" className="scroll-mt-24">
                  <h2 className="font-sketch-block text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-primary">//</span>
                    <span>Perks & Goodies</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {event.perks.map((perk, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3 hover:border-primary/40 transition-colors"
                      >
                        <Gift
                          size={18}
                          className="text-primary shrink-0 mt-0.5"
                        />
                        <span className="font-averta-std text-xs sm:text-sm text-neutral-200">
                          {perk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Image Placeholders for Future/Upcoming Archive */}
          {event.hasImagePlaceholders && (
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-dashed border-neutral-700 text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mx-auto text-neutral-400 mb-3">
                <Camera size={22} />
              </div>
              <h4 className="font-sketch-block text-lg text-white font-bold">
                Event Media Archive
              </h4>
              <p className="font-averta-std text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mt-1">
                High-resolution event photos, slide decks, and workshop captures
                are being processed and archived for this session.
              </p>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
