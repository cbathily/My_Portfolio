import { useWindowDimensions } from 'react-native';
import type { TextStyle } from 'react-native';

/* ============================================================
   Design tokens — ported 1:1 from the web portfolio
   accent #5613D4 · ink #2c2c2e · text #424242 · muted #6B7280 · line #D1D1D1
   ============================================================ */

export const colors = {
  accent: '#46000A',
  accentSoft: '#efeafc',
  accentDark: '#4a0fc0',
  ink: '#2c2c2e',
  text: '#424242',
  muted: '#6B7280',
  line: '#D1D1D1',
  lineSoft: '#e7e7e9',
  ph: '#dadada',
  ph2: '#d0d0d0',
  paper: '#ffffff',
  paper2: '#fafafa',
  error: '#d83232',
  white: '#ffffff',
};

// Custom fonts must be addressed by family name per weight (RN can't synthesize weights)
export const fonts = {
  regular: 'SchibstedGrotesk_400Regular',
  medium: 'SchibstedGrotesk_500Medium',
  semibold: 'SchibstedGrotesk_600SemiBold',
  bold: 'SchibstedGrotesk_700Bold',
  extrabold: 'SchibstedGrotesk_800ExtraBold',
  black: 'SchibstedGrotesk_900Black',
  serif: 'InstrumentSerif_400Regular',
  serifItalic: 'InstrumentSerif_400Regular_Italic',
};

export const MAXW = 1320;

/* Responsive helper. Mirrors the CSS breakpoints (820 / 700 / 600). */
export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const pad = width < 600 ? 20 : width < 1000 ? 40 : 72;
  return {
    width,
    height,
    pad,
    isPhone: width < 700,
    isNarrow: width < 820,
    isSmall: width < 600,
  };
}

/* Fluid scaling like CSS clamp(min, prefVW, max) */
export function clamp(width: number, min: number, vw: number, max: number): number {
  const v = (vw / 100) * width;
  return Math.round(Math.max(min, Math.min(v, max)));
}

/* ============================================================
   TYPE SCALE  — the single source of truth for headings.
   RN letterSpacing is in px (not em), so we always derive it
   proportionally from the font size. NEVER hardcode a px value.
   ------------------------------------------------------------
   Rule of thumb:
     • bigger heading  → tighter tracking (down to -0.045em) + tighter line-height
     • all headings    → weight 600 (semibold). 900/black is NOT used.
     • one serif accent word per headline (wrap it in <Serif>)
   ============================================================ */

/** Proportional tracking: tracking(size) ≈ CSS `size * em`. */
export function tracking(size: number, em = -0.04): number {
  return Math.round(size * em * 100) / 100;
}

type TypePreset = Pick<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight' | 'letterSpacing' | 'color'>;

/**
 * Width-aware type scale. Call once per render: `const t = typeScale(width)`.
 * Then spread a preset into a Text style: `<Text style={[t.h2, ...]}>`.
 *
 * | preset | matches web class            | size                    |
 * |--------|------------------------------|-------------------------|
 * | hero   | Hero name (Home H1)          | clamp(52, 11.5vw, 164)  |
 * | cta    | CTA / Contact big            | clamp(44, 9.5vw, 140)   |
 * | h1     | Page title (Projects/Detail) | clamp(40, 7vw, 96)      |
 * | h2     | Section header (About etc.)  | clamp(36, 5.5vw, 76)    |
 * | h3     | Sub-section header (case)    | clamp(26, 3.4vw, 46)    |
 * | quote  | Pull-quote / big statement   | clamp(22, 3vw, 42)      |
 * | lede   | Intro paragraph              | clamp(20, 2.4vw, 32)    |
 * | card   | Card / list item title       | clamp(22, 2.3vw, 30)    |
 */
export function typeScale(width: number) {
  const cl = (min: number, vw: number, max: number) => clamp(width, min, vw, max);
  const make = (fs: number, lhMul: number, em: number, fam = fonts.semibold): TypePreset => ({
    fontFamily: fam,
    color: colors.ink,
    fontSize: fs,
    lineHeight: Math.round(fs * lhMul),
    letterSpacing: tracking(fs, em),
  });
  return {
    hero:  make(cl(52, 11.5, 164), 0.9,  -0.045),
    cta:   make(cl(44, 9.5, 140),  0.92, -0.045),
    h1:    make(cl(40, 7, 96),     0.98, -0.04),
    h2:    make(cl(36, 5.5, 76),   1.0,  -0.04),
    h3:    make(cl(26, 3.4, 46),   1.08, -0.03),
    quote: make(cl(22, 3, 42),     1.25, -0.03),
    lede:  make(cl(20, 2.4, 32),   1.35, -0.02, fonts.regular),
    card:  make(cl(22, 2.3, 30),   1.1,  -0.025),
  };
}
