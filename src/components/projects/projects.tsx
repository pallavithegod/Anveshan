"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/config/projects";
import Typography from "../Typography";
import FlipCard from "../ui/flip-card";
import { ExternalLink, Github, RotateCw, ChevronDown } from "lucide-react";

// Helper to extract owner profile info from repository URL
function getOwnerGithubInfo(repoUrl: string) {
  if (!repoUrl) return { url: "", handle: "" };
  try {
    const clean = repoUrl
      .trim()
      .replace(/\.git\/?$/, "")
      .replace(/\/+$/, "");
    const parsed = new URL(clean);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    if (pathParts.length >= 1) {
      const handle = pathParts[0];
      return {
        url: `${parsed.origin}/${handle}`,
        handle,
      };
    }
  } catch {
    const match = repoUrl.match(/github\.com\/([^/]+)/);
    if (match) {
      return {
        url: `https://github.com/${match[1]}`,
        handle: match[1],
      };
    }
  }
  return { url: "", handle: "" };
}

export default function ProjectsSection() {
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto"
    >
      <div className="text-center mb-8 sm:mb-12">
        <Typography.Display className="font-sketch-block font-normal text-primary text-4xl sm:text-6xl md:text-7xl leading-tight">
          PROJECTS
        </Typography.Display>
        <Typography.Lead className="font-prompt text-white/80 text-sm sm:text-lg max-w-2xl mx-auto mt-2 px-2">
          Showcase of innovative software built and maintained by our community
          members. Click or drag any card to preview the project screenshot.
        </Typography.Lead>
      </div>

      {/* Grid: 2 projects per row on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {projectsData.map((project, index) => {
          const isHiddenOnMobile = index >= 4 && !showAllMobile;
          const ownerInfo = getOwnerGithubInfo(project.GithubRepo);

          return (
            <div
              key={project.id}
              className={`w-full ${isHiddenOnMobile ? "hidden lg:block" : "block"}`}
            >
              <FlipCard
                width="100%"
                height={440}
                radius={18}
                background="#141414"
                color="#f5f5f5"
                tilt={true}
                tiltMax={6}
                glare={false}
                hoverScale={1.02}
                perspective={1200}
                stiffness={160}
                damping={18}
                shadow={true}
                className="w-full group !h-[260px] sm:!h-[380px] lg:!h-[440px]"
                front={
                  <div className="relative p-3 sm:p-4 lg:p-5 h-full flex flex-col justify-between bg-gradient-to-b from-[#181818] to-[#121212] select-none rounded-[18px] overflow-hidden">
                    {/* Upper Body */}
                    <div className="flex-1 min-h-0 flex flex-col justify-between">
                      <div>
                        {/* Header: Pure Sketch Category Tag & Flip Hint */}
                        <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-3 shrink-0">
                          <span className="font-cabin-sketch text-[9px] sm:text-xs tracking-wider uppercase text-primary font-bold truncate max-w-[75%]">
                            // {project.Work}
                          </span>
                          <span className="font-cabin-sketch text-[9px] sm:text-xs text-neutral-400 group-hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider select-none shrink-0">
                            <RotateCw
                              size={10}
                              className="transition-transform duration-500 group-hover:rotate-180 text-primary/80"
                            />
                            <span className="hidden sm:inline">Flip</span>
                          </span>
                        </div>

                        {/* Project Title */}
                        <div className="mb-1 sm:mb-2 shrink-0">
                          <Typography.H3 className="font-sketch-block text-base sm:text-xl lg:text-2xl text-white group-hover:text-primary transition-colors tracking-wide leading-tight line-clamp-1 sm:line-clamp-2">
                            {project.name}
                          </Typography.H3>
                        </div>

                        {/* Description with Left Vertical Greyish Accent Line & phone ellipsis */}
                        <div className="relative pl-2 sm:pl-3 my-1 sm:my-2 border-l-2 border-neutral-600">
                          <p className="text-[10px] sm:text-xs lg:text-sm text-neutral-300 font-averta-std leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Author / Builder Info */}
                      <div className="mt-auto pt-1.5 sm:pt-2 shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-cabin-sketch text-[9px] sm:text-xs uppercase tracking-wider text-neutral-400">
                            Built by:
                          </span>
                          <span className="font-cabin-sketch text-[10px] sm:text-xs lg:text-sm font-bold text-white tracking-wide truncate">
                            {project.owner}
                          </span>
                        </div>

                        {/* Builder's GitHub profile subtle button */}
                        {ownerInfo.url && (
                          <div className="mt-1 sm:mt-1.5">
                            <Link
                              href={ownerInfo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-no-flip="true"
                              onClick={(e) => e.stopPropagation()}
                              onPointerDown={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-neutral-900/90 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-neutral-200 font-mono text-[9px] sm:text-[11px] transition-all max-w-full group/builder cursor-pointer"
                              title={`Visit @${ownerInfo.handle} on GitHub`}
                            >
                              <Github
                                size={10}
                                className="text-neutral-500 group-hover/builder:text-neutral-300 shrink-0"
                              />
                              <span className="truncate">
                                @{ownerInfo.handle}
                              </span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sticky Footer Action Buttons - Pinned at the bottom, zero overflow */}
                    <div className="sticky bottom-0 left-0 right-0 pt-2 sm:pt-3 border-t border-neutral-800/80 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent z-20 shrink-0 mt-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {project.Deployment && (
                          <Link
                            href={project.Deployment}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-no-flip="true"
                            onClick={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="flex-1 min-w-0 py-1.5 sm:py-2 px-1.5 sm:px-2.5 bg-primary text-black font-cabin-sketch text-[11px] sm:text-xs lg:text-sm font-bold tracking-wider uppercase border border-black sm:border-2 rounded-lg shadow-[1px_1px_0px_0px_#000000] sm:shadow-[2px_2px_0px_0px_#000000] hover:bg-neutral-200 hover:border-neutral-300 transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer"
                          >
                            <ExternalLink
                              size={12}
                              strokeWidth={2.5}
                              className="shrink-0"
                            />
                            <span className="truncate">Live Demo</span>
                          </Link>
                        )}
                        {project.GithubRepo && (
                          <Link
                            href={project.GithubRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-no-flip="true"
                            onClick={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="flex-1 min-w-0 py-1.5 sm:py-2 px-1.5 sm:px-2.5 bg-neutral-900 text-neutral-200 border border-neutral-700 sm:border-2 rounded-lg shadow-[1px_1px_0px_0px_#000000] sm:shadow-[2px_2px_0px_0px_#000000] hover:border-primary hover:text-white transition-all flex items-center justify-center gap-1 sm:gap-1.5 font-cabin-sketch text-[11px] sm:text-xs lg:text-sm font-bold tracking-wider uppercase cursor-pointer"
                            aria-label={`${project.name} GitHub Repository`}
                          >
                            <Github
                              size={12}
                              strokeWidth={2}
                              className="shrink-0"
                            />
                            <span className="truncate">GitHub</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                }
                back={
                  <div className="relative w-full h-full bg-[#141414] overflow-hidden flex flex-col justify-between select-none p-3 sm:p-4 rounded-[18px]">
                    {/* Top Bar: Category & Flip Back */}
                    <div className="flex items-center justify-between gap-1 mb-1 sm:mb-2 shrink-0">
                      <div className="truncate max-w-[65%]">
                        <span className="font-cabin-sketch text-[8px] sm:text-[10px] tracking-wider uppercase text-primary font-bold block truncate">
                          // {project.Work}
                        </span>
                        <span className="font-sketch-block text-[11px] sm:text-base font-bold text-white truncate block">
                          {project.name}
                        </span>
                      </div>
                      <span className="font-cabin-sketch text-[8px] sm:text-xs font-bold text-black bg-primary px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg border border-black sm:border-2 shadow-[1px_1px_0px_0px_#000] flex items-center gap-1 shrink-0">
                        <RotateCw size={8} strokeWidth={2.5} />{" "}
                        <span>Back</span>
                      </span>
                    </div>

                    {/* Framed Project Screenshot */}
                    <div className="relative flex-1 min-h-0 rounded-lg sm:rounded-xl overflow-hidden border border-neutral-800 bg-black my-1">
                      <Image
                        src={project.image}
                        alt={`${project.name} preview`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>

                    {/* Bottom Sticky Action Bar */}
                    <div className="sticky bottom-0 left-0 right-0 pt-1.5 sm:pt-2 border-t border-neutral-800/80 bg-[#141414] mt-1 shrink-0 z-20">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {project.Deployment && (
                          <Link
                            href={project.Deployment}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-no-flip="true"
                            onClick={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="flex-1 min-w-0 py-1 sm:py-1.5 px-1.5 sm:px-2.5 bg-primary text-black font-cabin-sketch text-[10px] sm:text-xs lg:text-sm font-bold tracking-wider uppercase border border-black sm:border-2 rounded-lg shadow-[1px_1px_0px_0px_#000000] sm:shadow-[2px_2px_0px_0px_#000000] hover:bg-neutral-200 hover:border-neutral-300 transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <ExternalLink
                              size={11}
                              strokeWidth={2.5}
                              className="shrink-0"
                            />
                            <span className="truncate">Live Demo</span>
                          </Link>
                        )}
                        {project.GithubRepo && (
                          <Link
                            href={project.GithubRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-no-flip="true"
                            onClick={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="flex-1 min-w-0 py-1 sm:py-1.5 px-1.5 sm:px-2.5 bg-neutral-900 border border-neutral-700 sm:border-2 rounded-lg text-neutral-200 shadow-[1px_1px_0px_0px_#000000] sm:shadow-[2px_2px_0px_0px_#000000] hover:border-primary hover:text-white transition-all flex items-center justify-center gap-1 font-cabin-sketch text-[10px] sm:text-xs lg:text-sm font-bold tracking-wider uppercase cursor-pointer"
                            aria-label={`${project.name} GitHub Repository`}
                          >
                            <Github
                              size={11}
                              strokeWidth={2}
                              className="shrink-0"
                            />
                            <span className="truncate">GitHub</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          );
        })}
      </div>

      {/* View More / View Less button specifically for phone & tablet screens */}
      <div className="flex justify-center mt-6 sm:mt-8 lg:hidden">
        <button
          onClick={() => setShowAllMobile(!showAllMobile)}
          className="px-5 py-2 rounded-xl bg-[#141414] border-2 border-neutral-700 hover:border-primary text-white hover:text-primary font-cabin-sketch text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center gap-2 shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
          aria-expanded={showAllMobile}
        >
          <span>
            {showAllMobile ? "View Less Projects" : "View More Projects"}
          </span>
          <ChevronDown
            size={15}
            className={`transition-transform duration-300 ${
              showAllMobile ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </section>
  );
}
