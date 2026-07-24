import React from 'react';
import { Platform } from 'react-native';

/* ─────────────────────────────────────────────
   Grain — a subtle paper-like film grain over the whole viewport.
   Web only: renders a fixed, non-interactive layer with an inline SVG
   fractal-noise texture. Kept at very low opacity so it reads as a warm
   paper grain rather than visible noise, and never competes with content.
───────────────────────────────────────────── */

// Inline SVG noise, URL-encoded. baseFrequency = grain size (higher = finer),
// feColorMatrix saturate=0 desaturates the turbulence into neutral grey specks.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Grain() {
  if (Platform.OS !== 'web') return null;
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        backgroundImage: NOISE,
        backgroundRepeat: 'repeat',
        // Overall strength of the grain. Dial down for a fainter texture.
        opacity: 0.18,
        // Multiply lets the dark specks tint the white without dulling colours.
        mixBlendMode: 'multiply',
      }}
    />
  );
}