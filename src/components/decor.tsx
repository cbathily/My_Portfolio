import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';

/* Subtle blueprint guide lines. Kept very light so they read as a background
   design decision and never compete with the content. */
const GRID_COLOR = colors.grid;

/* ─────────────────────────────────────────────
   GridLines — two thin guide lines in the far-left margin
   Render as the FIRST child of a position:relative wrapper, with the page
   content placed in a sibling layer above it (zIndex 1). The lines hug the
   left edge of the viewport (in the outer gutter, to the left of the content)
   so they read as a quiet margin rail rather than column guides.
───────────────────────────────────────────── */
const RAIL_LEFT = 16; // inset from the very left edge of the page
const RAIL_GAP = 22;  // distance between the two lines
const LINE_W = 1;     // shared thickness for every guide line (vertical + horizontal)

export function GridLines() {
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { zIndex: 0 }]}>
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: RAIL_LEFT, width: LINE_W, backgroundColor: GRID_COLOR }} />
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: RAIL_LEFT + RAIL_GAP, width: LINE_W, backgroundColor: GRID_COLOR }} />
    </View>
  );
}

/* ─────────────────────────────────────────────
   PageGrid wrapper — drop-in around a screen's body.
   <PageGrid>…content…</PageGrid>
───────────────────────────────────────────── */
export function PageGrid({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ position: 'relative' }}>
      <GridLines />
      <View style={{ position: 'relative', zIndex: 1 }}>{children}</View>
    </View>
  );
}

/* ─────────────────────────────────────────────
   SectionRule — full-bleed solid hairline that spans the whole width and
   crosses the left margin rail. Use in place of a content-width divider.
───────────────────────────────────────────── */
export function SectionRule({ marginTop }: { marginTop?: number }) {
  return <View style={{ marginTop, height: LINE_W, backgroundColor: GRID_COLOR }} />;
}
