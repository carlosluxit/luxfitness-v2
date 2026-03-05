"use client";

import { useEffect, useState, useRef } from "react";

export interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  mainClassName?: string;
  elementLevelClassName?: string;
  splitLevelClassName?: string;
  staggerDuration?: number;
  transition?: unknown;
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  animatePresenceMode?: string;
  staggerFrom?: string;
}

export default function RotatingText({
  texts,
  rotationInterval = 2000,
  mainClassName = "",
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIsAnimating(true);
      // After exit animation, switch word and enter
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 400);
    }, rotationInterval);
    return () => clearInterval(id);
  }, [texts.length, rotationInterval]);

  const currentText = texts[index];

  return (
    <>
      <style>{`
        @keyframes rotatingTextEnter {
          from {
            opacity: 0;
            transform: translateY(80%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes rotatingTextExit {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-100%);
          }
        }
        .rotating-text-char {
          display: inline-block;
          animation: rotatingTextEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .rotating-text-char.exiting {
          animation: rotatingTextExit 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <span
        ref={containerRef}
        className={`relative inline-flex overflow-hidden ${mainClassName}`}
      >
        <span className="sr-only">{currentText}</span>
        <span className="inline-flex" aria-hidden="true">
          {Array.from(currentText).map((char, i) => (
            <span
              key={`${index}-${i}`}
              className={`rotating-text-char ${isAnimating ? "exiting" : ""}`}
              style={{
                animationDelay: `${i * 0.025}s`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </span>
    </>
  );
}
