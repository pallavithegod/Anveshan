import React from "react";

import Image from "next/image";

import { measurementData, textItems } from "@/config/hero/heroMobile";

import DevfolioAndDiscordButtons from "./hero-buttons";

export const HeroMobile = React.memo(() => {
  return (
    <div className="w-full overflow-hidden relative">
      <div className="flex flex-col">
        {/* Top Section: Society Subheading & Blueprint Grid Box */}
        <div className="flex flex-row justify-between items-center px-5 pt-1 pb-3 w-full max-w-sm mx-auto mb-1">
          <div className="text-white/80 text-left text-xs font-light font-averta-std leading-tight tracking-widest">
            PREMIER TECHNICAL
            <br />
            SOCIETY OF BPIT
          </div>
          <div className="w-8 h-8 relative">
            <div className="w-4 h-4 ml-4 bg-[#262626]" />
            <div className="w-4 h-4 bg-[#262626]" />
          </div>
        </div>

        {/* Main Blueprint Canvas: Proportioned so Anveshan renders in ONE single big heading */}
        <div className="relative w-full pt-[64%]">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Measurement Guidelines & Dimension Arrows */}
            {measurementData.lines.map((line) => {
              if (line.isSvg) {
                return (
                  <div key={line.id} className="absolute" style={line.style}>
                    <Image
                      src={line.src!}
                      alt="Measurement arrow"
                      fill
                      className="object-contain"
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    key={line.id}
                    className="absolute bg-[#333333]"
                    style={line.style}
                  />
                );
              }
            })}

            {/* Big Heading: Anveshan rendered together in ONE continuous line */}
            <div className="absolute top-[21%] left-[7%] flex items-baseline whitespace-nowrap select-none z-10">
              <h1 className="font-sketch-block font-normal text-primary text-[17.2vw] leading-none mb-0">
                Anve
              </h1>
              <h1
                className="font-grutch-shaded font-normal text-white text-[16.8vw] leading-none mb-0 ml-[1px]"
                style={{ position: "relative", top: "-0.085em" }}
              >
                shan
              </h1>
            </div>

            {/* BPIT Sub-heading */}
            <div className="absolute top-[61%] left-[50%] select-none z-10">
              <span className="font-sketch-block font-normal text-white text-[9.5vw] leading-none">
                BPIT
              </span>
            </div>

            {/* Measurement Dimension Labels */}
            {measurementData.labels.map((item) => (
              <div
                key={item.id}
                className="absolute text-[#a3a3a3] text-center whitespace-nowrap font-museo transform -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
                style={{
                  fontWeight: 300,
                  letterSpacing: "1.5px",
                  fontSize: item.isSmall
                    ? "clamp(0.55rem, 1.8vw, 0.75rem)"
                    : "clamp(0.65rem, 2.2vw, 0.85rem)",
                  lineHeight: "1.2",
                  ...item.style,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Text on the Right */}
        <div className="absolute top-[12%] right-[2.5%] flex-shrink-0 z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-1.5 font-averta-std">
            {textItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                {item.text.split("").map((char, charIndex) => (
                  <div
                    key={`${item.id}-${charIndex}`}
                    className={`text-white/70 text-center leading-none py-[1.5px] sm:py-[2px] text-[8px] sm:text-[9px] ${
                      item.isBold ? "font-bold text-white/90" : "font-light"
                    }`}
                  >
                    {char}
                  </div>
                ))}
              </div>
            ))}
            <div className="w-3.5 h-3.5 bg-[#262626] mt-1.5" />
          </div>
        </div>

        {/* Bottom Explorer Tagline */}
        <div className="mt-3 sm:mt-5 font-sketch-block text-base sm:text-lg text-center text-white tracking-wide">
          ENTER <span className="text-[#FFBE0D]">•</span> THE{" "}
          <span className="text-[#FFBE0D]">•</span> ARENA
        </div>

        {/* Action Buttons */}
        <div className="mt-2 pb-6">
          <DevfolioAndDiscordButtons />
        </div>
      </div>
    </div>
  );
});

HeroMobile.displayName = "HeroMobile";
