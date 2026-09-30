"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface DraggableMarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number; // pixels per second
  pauseOnHover?: boolean;
  className?: string;
  trackClassName?: string;
}

export default function DraggableMarquee({
  children,
  direction = "left",
  speed = 36,
  pauseOnHover = true,
  className = "",
  trackClassName = "",
}: DraggableMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isDraggingState, setIsDraggingState] = useState(false);

  // Animation & position state stored in refs for 60fps performance without re-renders
  const offsetRef = useRef(0);
  const singleWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const momentumVelocityRef = useRef(0);

  // Drag tracking
  const dragStartXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const hasMovedRef = useRef(false);
  const velocitiesRef = useRef<number[]>([]);

  // Function to apply transform directly to DOM
  const renderTransform = useCallback(() => {
    const singleWidth = singleWidthRef.current;
    if (!singleWidth || !trackRef.current) return;

    // Seamless infinite wrap: offset % singleWidth
    let normalized = offsetRef.current % singleWidth;
    if (normalized < 0) {
      normalized += singleWidth;
    }

    trackRef.current.style.transform = `translate3d(${-normalized}px, 0, 0)`;
  }, []);

  // Measure content width
  useEffect(() => {
    const measure = () => {
      if (contentRef.current) {
        singleWidthRef.current = contentRef.current.offsetWidth;
      }
    };

    measure();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && contentRef.current) {
      resizeObserver = new ResizeObserver(() => {
        measure();
        renderTransform();
      });
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [renderTransform]);

  // Main Animation Loop
  useEffect(() => {
    let animId: number;
    let lastTimestamp = performance.now();

    const tick = (now: number) => {
      let dt = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      // Guard against huge dt when switching tabs
      if (dt > 0.1) dt = 0.1;

      if (!isDraggingRef.current) {
        if (Math.abs(momentumVelocityRef.current) > 2) {
          // Apply momentum inertia
          offsetRef.current -= momentumVelocityRef.current * dt;
          // Smooth exponential friction decay (0.92 per 60fps frame)
          momentumVelocityRef.current *= Math.pow(0.92, dt * 60);
        } else {
          momentumVelocityRef.current = 0;
          // Background auto-scroll when not paused on hover
          const isPaused = pauseOnHover && isHoveredRef.current;
          if (!isPaused) {
            const dirMultiplier = direction === "left" ? 1 : -1;
            offsetRef.current += dirMultiplier * speed * dt;
          }
        }
        renderTransform();
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [direction, speed, pauseOnHover, renderTransform]);

  // Pointer event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only accept left mouse button or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;

    isDraggingRef.current = true;
    setIsDraggingState(true);

    dragStartXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    hasMovedRef.current = false;
    momentumVelocityRef.current = 0;
    velocitiesRef.current = [];

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const now = performance.now();
    const dx = e.clientX - lastXRef.current;
    const dt = (now - lastTimeRef.current) / 1000;

    if (Math.abs(e.clientX - dragStartXRef.current) > 5) {
      hasMovedRef.current = true;
    }

    // Direct 1:1 manipulation: moving right pulls cards right (decreases offset)
    offsetRef.current -= dx;

    if (dt > 0.002) {
      const v = dx / dt; // pixels per second
      velocitiesRef.current.push(v);
      if (velocitiesRef.current.length > 5) {
        velocitiesRef.current.shift();
      }
    }

    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
    renderTransform();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDraggingState(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const now = performance.now();
    // If the user held still before letting go (>120ms), momentum should be 0
    if (now - lastTimeRef.current > 120) {
      momentumVelocityRef.current = 0;
    } else if (velocitiesRef.current.length > 0) {
      const avgVelocity =
        velocitiesRef.current.reduce((a, b) => a + b, 0) /
        velocitiesRef.current.length;
      // Cap maximum launch momentum
      const maxVelocity = 2200;
      momentumVelocityRef.current = Math.max(
        -maxVelocity,
        Math.min(maxVelocity, avgVelocity),
      );
    } else {
      momentumVelocityRef.current = 0;
    }
  };

  // Intercept click on child links/buttons if the user was dragging
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasMovedRef.current = false;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none touch-pan-y ${
        isDraggingState ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        if (isDraggingRef.current) {
          isDraggingRef.current = false;
          setIsDraggingState(false);
        }
      }}
      onClickCapture={handleClickCapture}
    >
      <div
        ref={trackRef}
        className={`flex flex-nowrap will-change-transform ${trackClassName}`}
        style={{ width: "max-content" }}
      >
        {/* Set 1: Measured content */}
        <div ref={contentRef} className="flex shrink-0 items-center">
          {children}
        </div>

        {/* Set 2: Duplicate for seamless looping */}
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {children}
        </div>

        {/* Set 3: Extra duplicate for wide screens and fast momentum wraps */}
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
