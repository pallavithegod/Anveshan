"use client";
import { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { logo, navItems } from "@/config/marginals";

import Typography from "../Typography";
import Button from "../ui/button";

const SCROLL_OFFSET = 80;
const handleScrollToSection = (href: string) => {
  if (href.startsWith("/#")) {
    const targetId = href.substring(2);
    const currentPage = window.location.pathname;
    if (currentPage !== "/") {
      window.location.href = href;
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - SCROLL_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", href);
    }
  } else {
    window.open(href, "_blank");
  }
};

function DesktopNavbar({ isWhite }: { isWhite: boolean }) {
  return (
    <div className="hidden relative lg:flex w-full items-center justify-between py-3">
      {/* Brand Logo with Smooth Cross-Fade */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center">
        <Link
          href={logo.href}
          className="relative flex items-center h-9 w-[160px] transition-opacity hover:opacity-90"
        >
          {/* Light Theme Logo (White 'nvesh' for dark navbar) */}
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={`h-9 w-auto object-contain transition-opacity duration-300 ease-in-out ${
              isWhite ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            unoptimized
            priority
          />
          {/* Dark Theme Logo (Black 'nvesh' for white navbar) */}
          <Image
            src="/assets/dark_logo_bg_remove.png"
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={`absolute left-0 top-0 h-9 w-auto object-contain transition-opacity duration-300 ease-in-out ${
              isWhite ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            unoptimized
            priority
          />
        </Link>
      </div>

      {/* Nav Links */}
      <div className="h-full flex justify-center mx-auto">
        <div className="flex gap-[3vw] xl:gap-[4vw] w-full justify-center items-center">
          {navItems.map((item: { name: string; href: string }) => (
            <button
              key={item.name}
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection(item.href);
              }}
              className="transition-colors cursor-pointer group py-1"
            >
              <Typography.P
                className={`!text-sm md:!text-base mb-0 text-center font-semibold transition-colors duration-200 ${
                  item.name === "Reforged"
                    ? "text-primary hover:text-amber-300 font-bold"
                    : isWhite
                      ? "text-neutral-900 group-hover:text-primary"
                      : "text-neutral-300 group-hover:text-primary"
                }`}
              >
                {item.name}
              </Typography.P>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isWhite, setIsWhite] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const teamSection =
        document.getElementById("team-section") ||
        document.getElementById("team");
      if (teamSection) {
        const rect = teamSection.getBoundingClientRect();
        const teamDivider = document.getElementById("team-divider");
        const dividerRect = teamDivider
          ? teamDivider.getBoundingClientRect()
          : null;

        // Navbar height is ~72px. When the top of team-section hits or goes under the navbar,
        // it enters the white page. When the divider hits the navbar, it leaves.
        const navbarThreshold = 80;
        const overWhite =
          rect.top <= navbarThreshold &&
          (dividerRect
            ? dividerRect.top > navbarThreshold
            : rect.bottom > navbarThreshold);

        setIsWhite(overWhite);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const fixLegacyHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.toLowerCase();
        if (hash === "#testimonials" || hash === "#testiminials") {
          window.history.replaceState(null, "", "/#events");
          const element = document.getElementById("events");
          if (element) {
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - SCROLL_OFFSET;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      }
    };

    fixLegacyHash();
    window.addEventListener("hashchange", fixLegacyHash);
    return () => {
      window.removeEventListener("hashchange", fixLegacyHash);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 py-2 transition-all duration-300 ${
          isWhite
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-md shadow-neutral-950/5 text-neutral-900"
            : `bg-black/90 backdrop-blur-md border-b ${
                scrolled
                  ? "border-neutral-800 shadow-lg shadow-black/60"
                  : "border-white/5"
              } text-white`
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-10">
          <DesktopNavbar isWhite={isWhite} />
          {/* Mobile Bar */}
          <div className="flex lg:hidden w-full items-center justify-between h-full py-2">
            <Link
              href={logo.href}
              className="relative flex items-center h-8 w-[120px]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={36}
                className={`h-8 w-auto object-contain transition-opacity duration-300 ease-in-out ${
                  isWhite ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
                unoptimized
                priority
              />
              <Image
                src="/assets/dark_logo_bg_remove.png"
                alt={logo.alt}
                width={120}
                height={36}
                className={`absolute left-0 top-0 h-8 w-auto object-contain transition-opacity duration-300 ease-in-out ${
                  isWhite ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                unoptimized
                priority
              />
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className={`p-2 transition-colors duration-200 focus:outline-none ${
                isWhite
                  ? "text-neutral-900 hover:text-primary"
                  : "text-white hover:text-primary"
              }`}
              aria-label="Open Navigation Menu"
            >
              <Menu
                size={26}
                className={isWhite ? "text-neutral-900" : "text-white"}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Drawer as Sibling (Z-[100] Solid Background, Overflow Protected) */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col justify-between px-5 sm:px-6 py-4 overflow-y-auto overscroll-contain transition-opacity duration-300 ease-in-out lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex w-full items-center justify-between shrink-0 pb-2 border-b border-white/10">
          <Link
            href={logo.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={36}
              className="h-8 w-auto object-contain"
              unoptimized
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-white hover:text-primary transition-colors duration-200 focus:outline-none"
            aria-label="Close Navigation Menu"
          >
            <X size={26} className="text-white" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col items-center justify-center my-auto py-3 space-y-2 sm:space-y-3.5 w-full">
          {navItems
            .filter((item) => item.name !== "Reforged")
            .map((item: { name: string; href: string }) => (
              <button
                key={item.name}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection(item.href);
                  setIsOpen(false);
                }}
                className="transition-colors py-1 px-4 rounded-lg hover:bg-white/5 active:bg-white/10 w-full max-w-xs text-center"
              >
                <span className="font-sketch-block text-xl sm:text-2xl text-white hover:text-primary transition-colors tracking-wide">
                  {item.name}
                </span>
              </button>
            ))}
        </div>

        {/* Drawer Footer / CTA: Reforged Website */}
        <div className="flex justify-center shrink-0 pt-2 pb-4">
          <Button
            className="h-11 !px-6 min-w-[200px] flex items-center justify-center cursor-pointer"
            onClick={() => {
              window.open(
                "https://reforged.anveshan.dev",
                "_blank",
                "noopener,noreferrer",
              );
              setIsOpen(false);
            }}
          >
            <span className="text-black font-bold text-sm sm:text-base font-cabin-sketch uppercase tracking-wider">
              Reforged
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
