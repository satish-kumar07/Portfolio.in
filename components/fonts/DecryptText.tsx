import React, { useEffect, useRef, useState, useCallback } from "react";

/* ─── Default character sets ───────────────────────────────────────── */
const CHARS_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHARS_DIGITS = "0123456789";
const CHARS_SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";
const DEFAULT_CHARSET = CHARS_UPPER + CHARS_DIGITS + CHARS_SYMBOLS;

/* ─── Props ────────────────────────────────────────────────────────── */
interface DecryptTextProps {
  /** The final text to reveal */
  text: string;
  /** Milliseconds between each frame tick (lower = faster). Default 30 */
  speed?: number;
  /** How many random‑char frames each letter goes through before settling. Default 8 */
  revealFrames?: number;
  /** Extra className applied to the wrapper <span> */
  className?: string;
  /** Character pool for the scramble. Default A‑Z + 0‑9 + symbols */
  charset?: string;
  /** Delay (ms) before the animation starts on mount. Default 0 */
  startDelay?: number;
  /** If true the animation replays on hover. Default true */
  hoverReplay?: boolean;
}

/* ─── Component ────────────────────────────────────────────────────── */
export default function DecryptText({
  text,
  speed = 30,
  revealFrames = 8,
  className = "",
  charset = DEFAULT_CHARSET,
  startDelay = 0,
  hoverReplay = true,
}: DecryptTextProps) {
  const [display, setDisplay] = useState<string>("");
  const frameRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Core animation logic ─────────────────────────────────────── */
  const runAnimation = useCallback(() => {
    // Cancel any running animation
    if (intervalRef.current) clearInterval(intervalRef.current);

    /*
     * For each character position we track how many "ticks" have elapsed.
     * A character settles once its tick count exceeds
     *   (index * staggerOffset) + revealFrames
     * This creates the left-to-right stagger.
     */
    const len = text.length;
    const staggerOffset = 2; // ticks between each letter starting to resolve
    let tick = 0;

    const randomChar = () => charset[Math.floor(Math.random() * charset.length)];

    intervalRef.current = setInterval(() => {
      let result = "";
      let settled = 0;

      for (let i = 0; i < len; i++) {
        // Spaces always pass through
        if (text[i] === " ") {
          result += " ";
          settled++;
          continue;
        }

        const threshold = i * staggerOffset + revealFrames;

        if (tick >= threshold) {
          // Settled — show the real character
          result += text[i];
          settled++;
        } else if (tick >= i * staggerOffset) {
          // Actively scrambling — random char
          result += randomChar();
        } else {
          // Not yet started — show random char (initial noise)
          result += randomChar();
        }
      }

      setDisplay(result);
      tick++;

      if (settled === len) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);
  }, [text, speed, revealFrames, charset]);

  /* ── Mount animation ──────────────────────────────────────────── */
  useEffect(() => {
    // Show initial random noise immediately
    const randomChar = () => charset[Math.floor(Math.random() * charset.length)];
    setDisplay(
      text
        .split("")
        .map((ch) => (ch === " " ? " " : randomChar()))
        .join("")
    );

    const timeout = setTimeout(() => {
      runAnimation();
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, charset, startDelay, runAnimation]);

  /* ── Hover replay ─────────────────────────────────────────────── */
  const handleMouseEnter = () => {
    if (hoverReplay) runAnimation();
  };

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <span
      className={`inline-block whitespace-nowrap ${className}`}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      {display.split("").map((char, i) => {
        const isSettled = char === text[i];
        const isSpace = char === " ";

        return (
          <span
            key={i}
            className={`
              inline-block transition-all duration-200
              ${isSpace ? "w-[0.3em]" : ""}
              ${
                isSettled
                  ? "opacity-100"
                  : "opacity-70 animate-[flicker_0.15s_ease-in-out_infinite_alternate]"
              }
            `}
            style={{
              textShadow: isSettled
                ? "0 0 8px rgba(0,240,255,0.4), 0 0 20px rgba(191,0,255,0.2)"
                : "0 0 12px rgba(0,240,255,0.6), 0 0 30px rgba(0,240,255,0.3)",
            }}
          >
            {isSpace ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}
