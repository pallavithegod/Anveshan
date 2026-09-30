"use client";

import Typography from "../Typography";
import { Calendar, ExternalLink, Trophy } from "lucide-react";

export function handleScrollTo(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  }
}

export function handleRedirect(type: string) {
  if (type === "reforged") {
    window.open(
      "https://reforged.anveshan.dev",
      "_blank",
      "noopener,noreferrer",
    );
  } else if (type === "discord" || type === "contact") {
    handleScrollTo("contact");
  } else {
    handleScrollTo("events");
  }
}

export default function DevfolioAndDiscordButtons() {
  return (
    <div
      className="relative z-40 flex flex-col sm:flex-row justify-center items-center w-full px-4 gap-3 sm:gap-6 mt-4 sm:mt-3.5 lg:mt-4"
    >
      <button
        className="group h-13 sm:h-14 lg:h-16 px-6 sm:px-8 w-[270px] sm:w-auto sm:min-w-[240px] md:min-w-[270px] flex flex-row items-center justify-center gap-3 cursor-pointer bg-primary text-black font-bold rounded-2xl border-2 border-[#c79200] shadow-[3px_3px_0px_0px_#8a6500] sm:shadow-[4px_4px_0px_0px_#8a6500] hover:shadow-[6px_6px_0px_0px_#8a6500] hover:-translate-y-1 active:translate-y-0.5 hover:brightness-105 transition-all duration-200 select-none"
        onClick={() => handleScrollTo("events")}
      >
        <Calendar className="size-5 sm:size-6 text-black shrink-0 group-hover:scale-110 transition-transform duration-200" />
        <Typography.P className="text-black !text-lg sm:!text-xl lg:!text-2xl font-bold text-center mb-0 tracking-wide">
          Explore Events
        </Typography.P>
      </button>

      <button
        className="group h-13 sm:h-14 lg:h-16 px-6 sm:px-8 w-[270px] sm:w-auto sm:min-w-[240px] md:min-w-[270px] flex flex-row items-center justify-center gap-3 cursor-pointer bg-[#202020] hover:bg-[#2a2618] text-white font-bold rounded-2xl border-2 border-neutral-600 hover:border-[#FFBE0D] shadow-[3px_3px_0px_0px_#000000] sm:shadow-[4px_4px_0px_0px_#000000] hover:shadow-[0_0_30px_rgba(255,190,13,0.35),4px_4px_0px_0px_#FFBE0D] hover:-translate-y-1 active:translate-y-0.5 transition-all duration-300 select-none"
        onClick={() =>
          window.open(
            "https://reforged.anveshan.dev",
            "_blank",
            "noopener,noreferrer",
          )
        }
      >
        <Trophy className="size-5 sm:size-6 text-[#FFBE0D] shrink-0 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-300" />
        <Typography.P className="text-white !text-lg sm:!text-xl lg:!text-2xl font-bold text-center mb-0 tracking-wide">
          Reforged
        </Typography.P>
        <ExternalLink className="size-3.5 sm:size-4 text-neutral-400 group-hover:text-[#FFBE0D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
      </button>
    </div>
  );
}
