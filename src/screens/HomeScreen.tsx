import React, { useRef, useCallback, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { siFigma, siReact, siPython } from 'simple-icons';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, useResponsive, clamp, typeScale, tracking } from '../theme';
import { Reveal, Placeholder, Btn, Container, Label, Serif } from '../components/ui';
import { PROJECT_COVERS } from '../assets/images';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

type MosaicProject = { id: string; num: string; title: string; alt: boolean; cover?: any };

const HIGHLIGHTS: MosaicProject[] = [
  { id: 'plantnet', num: '01', title: 'PlantNet — App Redesign',               alt: false },
  { id: 'atolls',   num: '02', title: 'Automated Review Management',           alt: true  },
  { id: 'moosburg', num: '03', title: "Hybrid Service Design for Moosburg's History", alt: false },
  { id: 'munich',   num: '04', title: 'Super Munich App',                      alt: false },
  { id: 'swm',      num: '05', title: 'Agentic Workflow for Stadtwerke München', alt: true  },
];

/* ─────────────────────────────────────────────
   Dashed horizontal rule (renders dashed on web)
───────────────────────────────────────────── */
function DashedRule({ style }: { style?: ViewStyle }) {
  return (
    <View style={[{ borderTopWidth: 1, borderStyle: 'dashed', borderColor: colors.line }, style]} />
  );
}

/* ─────────────────────────────────────────────
   Marquee  "COUMBA * BATHILY * …"
───────────────────────────────────────────── */
function MarqueeBanner() {
  const { width } = useResponsive();
  const fontSize = clamp(width, 64, 11, 150);
  const tx       = useRef(new Animated.Value(0)).current;
  const segW     = useRef(0);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (segW.current) return;
      segW.current = e.nativeEvent.layout.width;
      Animated.loop(
        Animated.timing(tx, {
          toValue: -segW.current,
          duration: 24000,
          easing: Easing.linear,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ).start();
    },
    [tx],
  );

  const nameStyle = { fontSize, lineHeight: Math.round(fontSize * 1.18), letterSpacing: tracking(fontSize, -0.045) };

  function Seg() {
    return (
      <View style={m.seg}>
        <Text style={[m.nameDark,  nameStyle]}>COUMBA</Text>
        <Text style={[m.star, { fontSize: fontSize * 0.42 }]}>✠</Text>
        <Text style={[m.nameLight, nameStyle]}>BATHILY</Text>
        <Text style={[m.star, { fontSize: fontSize * 0.42 }]}>✠</Text>
      </View>
    );
  }

  return (
    <View style={m.wrap}>
      <Animated.View style={[m.row, { transform: [{ translateX: tx }] }]}>
        {Array.from({ length: 8 }, (_, i) => (
          <View key={i} onLayout={i === 0 ? onLayout : undefined}>
            <Seg />
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const m = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.ink,
  },
  row:       { flexDirection: 'row' },
  seg:       { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 0 },
  nameDark:  { fontFamily: fonts.bold, color: colors.ink },
  nameLight: { fontFamily: fonts.bold, color: colors.line },
  star:      { fontFamily: fonts.regular, color: colors.accent, marginHorizontal: 18 },
});

/* ─────────────────────────────────────────────
   Single tile
───────────────────────────────────────────── */
type TileProps = {
  proj: MosaicProject;
  onPress: () => void;
  style: ViewStyle | ViewStyle[];
  large?: boolean;
};

function Tile({ proj, onPress, style, large = false }: TileProps) {
  const lift = useRef(new Animated.Value(0)).current;

  const hoverIn  = () => Animated.spring(lift, { toValue: 1, damping: 18, stiffness: 200, useNativeDriver: Platform.OS !== 'web' }).start();
  const hoverOut = () => Animated.spring(lift, { toValue: 0, damping: 18, stiffness: 200, useNativeDriver: Platform.OS !== 'web' }).start();

  const imgScale = lift.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] });

  const webHandlers = Platform.OS === 'web'
    ? { onMouseEnter: hoverIn, onMouseLeave: hoverOut }
    : {};

  return (
    <Pressable onPress={onPress} style={[s.tile, style]} {...(webHandlers as any)}>
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ scale: imgScale }] }]}>
        <Placeholder alt={proj.alt} style={{ flex: 1 }} source={proj.cover ?? PROJECT_COVERS[proj.id]} />
      </Animated.View>
      <View style={s.tileScrim} />
      <Text style={s.tileNum}>{proj.num}</Text>
      <View style={s.tileMeta}>
        <Text style={[s.tileTitle, !large && s.tileTitleSm]} numberOfLines={large ? 2 : 1}>
          {proj.title}
        </Text>
      </View>
    </Pressable>
  );
}

/* ─────────────────────────────────────────────
   Mosaic
───────────────────────────────────────────── */
type MosaicProps = {
  navigation: { navigate: (screen: string, params?: any) => void };
  isNarrow: boolean;
  width: number;
};

function Mosaic({ navigation, isNarrow }: MosaicProps) {
  const nav = (id: string) =>
    navigation.navigate('ProjectDetail' as never, { id } as never);
  const [p0, p1, p2, p3, p4] = HIGHLIGHTS;

  if (isNarrow) {
    // Mobile: hero + 2+2 grid
    return (
      <View>
        <Tile proj={p0} onPress={() => nav(p0.id)} style={{ aspectRatio: 4 / 3, width: '100%' }} large />
        <View style={{ flexDirection: 'row' }}>
          <Tile proj={p1} onPress={() => nav(p1.id)} style={{ flex: 1, aspectRatio: 1 }} />
          <Tile proj={p2} onPress={() => nav(p2.id)} style={{ flex: 1, aspectRatio: 1 }} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Tile proj={p3} onPress={() => nav(p3.id)} style={{ flex: 1, aspectRatio: 1 }} />
          <Tile proj={p4} onPress={() => nav(p4.id)} style={{ flex: 1, aspectRatio: 1 }} />
        </View>
      </View>
    );
  }

  // Desktop: big tile left (60%) + 2×2 grid right (40%)
  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <Tile proj={p0} onPress={() => nav(p0.id)} style={{ flex: 6 }} large />
      <View style={{ flex: 4, flexDirection: 'column' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Tile proj={p1} onPress={() => nav(p1.id)} style={{ flex: 1 }} />
          <Tile proj={p2} onPress={() => nav(p2.id)} style={{ flex: 1 }} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Tile proj={p3} onPress={() => nav(p3.id)} style={{ flex: 1 }} />
          <Tile proj={p4} onPress={() => nav(p4.id)} style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
}

/* ─────────────────────────────────────────────
   Skills & Tools data
───────────────────────────────────────────── */
type ToolItem = { cat: string; name: string; desc?: string };

const TOOLS: ToolItem[] = [
  { cat: 'Primary Tool', name: 'Figma',        desc: 'Wireframes · Prototypes · Design Systems' },
  { cat: 'Frontend',     name: 'React'                                                          },
  { cat: 'Research',     name: 'User Research', desc: 'Interviews · Usability Tests'            },
  { cat: 'Code',         name: 'Python'                                                         },
  { cat: 'Process',      name: 'Prototyping',   desc: 'Lo-fi to Hi-fi'                         },
];

const BRAND_ICONS: Record<string, { path: string; hex: string }> = {
  'Figma':  siFigma,
  'React':  siReact,
  'Python': siPython,
};

const FA_ICONS: Record<string, { icon: string; color: string }> = {
  'User Research': { icon: 'users',       color: '#6366F1' },
  'Prototyping':   { icon: 'layer-group', color: '#0EA5E9' },
};

function ToolIconSvg({ name, size }: { name: string; size: number }) {
  const brand = BRAND_ICONS[name];
  if (brand) {
    return (
      <Svg viewBox="0 0 24 24" width={size} height={size}>
        <Path d={brand.path} fill={`#${brand.hex}`} />
      </Svg>
    );
  }
  const fa = FA_ICONS[name];
  if (fa) return <FontAwesome5 name={fa.icon as any} size={size} color={fa.color} />;
  return null;
}

/* ─────────────────────────────────────────────
   Pulsing live-indicator dot
───────────────────────────────────────────── */
function PulseDot() {
  const ring = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(ring, { toValue: 1, duration: 1100, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(ring, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.delay(600),
      ]),
    ).start();
  }, [ring]);

  const ringScale   = ring.interpolate({ inputRange: [0, 1], outputRange: [1, 2.6] });
  const ringOpacity = ring.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.6, 0.2, 0] });

  return (
    <View style={{ width: 8, height: 8, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{
        position: 'absolute',
        width: 8, height: 8, borderRadius: 4,
        backgroundColor: colors.accent,
        transform: [{ scale: ringScale }],
        opacity: ringOpacity,
      }} />
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent }} />
    </View>
  );
}

/* ─────────────────────────────────────────────
   HomeScreen
───────────────────────────────────────────── */
const NAV_H   = 60;
const TOP_PAD = 24;

export default function HomeScreen() {
  const navigation = useNavigation();
  const { width, height: winH, pad, isPhone, isNarrow } = useResponsive();
  const t = typeScale(width);

  const splitH = Math.max(280, winH - NAV_H - TOP_PAD - 4);

  // consistent section rhythm
  const aboveRule = clamp(width, 48, 6.5, 96);   // gap above each dashed divider
  const afterRule = clamp(width, 36, 4.5, 64);   // gap from divider to content
  const markSize  = clamp(width, 52, 7.5, 96);

  const Intro = ({ align = 'left' as 'left' | 'right' }) => (
    <>
      <Text style={[t.lede, { textAlign: align }]}>
        I strive for <Serif>seamless</Serif>, <Serif>user-friendly</Serif> digital
        experiences through <Serif>thoughtful</Serif> design.
      </Text>
      <Text style={[s.caption, { textAlign: align }]}>
        Computer Science & Design student at the University of Applied Sciences Munich.
      </Text>
    </>
  );

  return (
    <ScrollView style={s.bg} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <NavBar />

      {/* MARQUEE BANNER */}
      <MarqueeBanner />

      {/* MAIN: text + mosaic */}
      {isNarrow ? (
        <Container pad={pad} style={{ paddingTop: TOP_PAD, paddingBottom: 0 }}>
          <View style={{ gap: 28, paddingBottom: 48 }}>
            <Reveal>
              <Intro align="left" />
            </Reveal>
            <Reveal delay={80}>
              <Mosaic navigation={navigation} isNarrow width={width} />
            </Reveal>
          </View>
        </Container>
      ) : (
        <View style={[s.split, { height: splitH + TOP_PAD }]}>
          <Reveal style={[s.textCol, { marginLeft: Math.max(0, Math.floor((width - 1320) / 2)) + pad }]}>
            <Intro align="left" />
          </Reveal>
          <Reveal delay={80} style={s.mosaicCol}>
            <Mosaic navigation={navigation} isNarrow={false} width={width} />
          </Reveal>
        </View>
      )}

      {/* SKILLS & TOOLS — dashed divider + dashed box per skill */}
      <Container pad={pad} style={{ paddingTop: aboveRule }}>
        <DashedRule />
        <View style={{ paddingTop: afterRule }}>
          <View style={[sk.row, isNarrow && sk.rowStack]}>
            <Reveal style={sk.head}>
              <Text style={t.h2}>
                Skills &{'\n'}<Serif>tools.</Serif>
              </Text>
              <Text style={sk.skillsSub}>What I work with{'\n'}day to day.</Text>
            </Reveal>
            <View style={[sk.grid, !isNarrow && { flex: 1 }]}>
              {TOOLS.map((tool, i) => (
                <Reveal
                  key={tool.name}
                  delay={80 + i * 50}
                  style={[sk.cell, isPhone ? sk.cellPhone : isNarrow ? sk.cellTablet : undefined]}
                >
                  <View style={sk.toolCard}>
                    <View style={sk.toolCardTop}>
                      <Label>{tool.cat}</Label>
                      <ToolIconSvg name={tool.name} size={22} />
                    </View>
                    <Text style={[sk.toolName, { fontSize: clamp(width, 17, 1.6, 22), letterSpacing: tracking(clamp(width, 17, 1.6, 22), -0.02) }]}>
                      {tool.name}
                    </Text>
                    {tool.desc ? <Text style={sk.toolDesc}>{tool.desc}</Text> : null}
                  </View>
                </Reveal>
              ))}
            </View>
          </View>
        </View>
      </Container>

      {/* DESIGN PHILOSOPHY — dashed divider + “ … ” */}
      <Container pad={pad} style={{ paddingTop: aboveRule }}>
        <DashedRule />
        <View style={{ paddingTop: afterRule }}>
          <View style={[q.row, isNarrow && q.rowStack]}>
            <Reveal style={isNarrow ? q.labelColNarrow : q.labelCol}>
              <Label accent>Design Philosophy</Label>
            </Reveal>
            <Reveal delay={80} style={[q.content, !isNarrow && { flex: 1 }]}>
              <Text style={[q.marks, { fontSize: markSize, lineHeight: markSize * 0.7 }]}>“</Text>
              <Text style={[t.quote, q.quoteText]}>
                What makes a design feel effortless is often{' '}
                <Text style={q.quoteAccent}>hidden in the details.</Text>
              </Text>
              <Text style={[q.attr, { fontSize: clamp(width, 15, 1.35, 18), lineHeight: clamp(width, 15, 1.35, 18) * 1.7 }]}>
                I focus on the small decisions that quietly improve an experience.{' '}
                <Text style={q.attrBold}>Spacing, hierarchy and consistency.</Text>
                {' '}Details rarely ask for attention, but they shape how a product feels.
              </Text>
              <Text style={[q.marks, q.marksBottom, { fontSize: markSize, lineHeight: markSize * 0.7 }]}>”</Text>
            </Reveal>
          </View>
        </View>
      </Container>

      {/* CURRENTLY WORKING ON — title right, subheading left, same row */}
      <Container pad={pad} style={{ paddingTop: aboveRule }}>
        <DashedRule />
        <View style={{ paddingTop: afterRule }}>
          <Reveal>
            <View style={wp.badge}>
              <PulseDot />
              <Text style={wp.badgeTxt}>project in progress · 2026</Text>
            </View>
            <View style={[wp.row, isNarrow && wp.rowStack]}>
              <View style={isNarrow ? wp.colNarrow : wp.titleCol}>
                <Text style={[wp.title, { fontSize: clamp(width, 28, 3.6, 48), lineHeight: clamp(width, 28, 3.6, 48) * 1.05, letterSpacing: tracking(clamp(width, 28, 3.6, 48), -0.03) }]}>
                  An agentic workflow for <Serif>Stadtwerke München.</Serif>
                </Text>
              </View>
              <View style={isNarrow ? wp.colNarrow : wp.descCol}>
                <Text style={wp.subheading}>
                  A multi-agent system that processes raw user interviews and outputs a complete{' '}
                  <Text style={wp.subAccent}>interview synthesis</Text> and ready-to-use{' '}
                  <Text style={wp.subAccent}>user journeys</Text>.
                </Text>
              </View>
            </View>
          </Reveal>
          <Reveal delay={80}>
            <View style={wp.tileWrap}>
              <Placeholder style={wp.tile} source={PROJECT_COVERS.swm} alt />
            </View>
          </Reveal>
        </View>
      </Container>

      {/* CTA — dashed divider + new asymmetric slogan */}
      <Container pad={pad} style={{ paddingTop: aboveRule, paddingBottom: aboveRule }}>
        <DashedRule />
        <View style={{ paddingTop: afterRule }}>
          <Reveal>
            <Text style={t.cta}>
              Let's turn <Serif>ideas</Serif>
            </Text>
          </Reveal>
          <Reveal delay={80}>
            <Text style={[t.cta, { marginLeft: isPhone ? 0 : clamp(width, 40, 18, 300) }]}>
              into <Serif>experiences.</Serif>
            </Text>
          </Reveal>
          <Reveal delay={160}>
            <View style={[s.ctaFoot, { justifyContent: isPhone ? 'flex-start' : 'flex-end' }]}>
              <Text style={[s.ctaDesc, { fontSize: clamp(width, 19, 1.9, 28), lineHeight: clamp(width, 19, 1.9, 28) * 1.35 }]}>
                Got a project, a question, or an open internship? I'd love to hear about it.
              </Text>
              <Btn
                label="Contact me"
                solid
                large
                onPress={() => navigation.navigate('Contact' as never)}
              />
            </View>
          </Reveal>
        </View>
      </Container>

      <Footer />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.paper },

  split:    { flexDirection: 'row' },
  textCol:  { width: 300, justifyContent: 'space-between', paddingTop: TOP_PAD, paddingBottom: 4, paddingRight: 40 },
  mosaicCol:{ flex: 1 },

  caption: { fontFamily: fonts.regular, color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 20 },

  tile: { position: 'relative', overflow: 'hidden', backgroundColor: colors.ph },
  tileNum: {
    position: 'absolute',
    top: 12, left: 14,
    fontSize: 11,
    fontFamily: fonts.semibold,
    color: 'rgba(255,255,255,0.7)',
    zIndex: 2,
  },
  tileScrim:   { position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', zIndex: 1,
                  backgroundImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.62))' } as any,
  tileMeta:    { position: 'absolute', left: 14, bottom: 12, right: 14, zIndex: 2 },
  tileTitle:   { fontFamily: fonts.semibold, fontSize: 15, color: '#fff', lineHeight: 20 },
  tileTitleSm: { fontSize: 12, lineHeight: 16 },

  ctaFoot: { marginTop: 40, flexDirection: 'row', alignItems: 'center', gap: 24, flexWrap: 'wrap' },
  ctaDesc: { color: colors.ink, fontFamily: fonts.medium, flex: 1, minWidth: 260, maxWidth: 620 },
});

/* Skills & Tools styles — dashed box around each skill */
const sk = StyleSheet.create({
  row:         { flexDirection: 'row', gap: 56, alignItems: 'flex-start' },
  rowStack:    { flexDirection: 'column', gap: 36 },
  head:        { width: 220 },
  skillsSub:   { fontFamily: fonts.regular, color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 18 },

  grid:        { flexDirection: 'row', flexWrap: 'wrap' },
  cell:        { width: '33.33%', padding: 7 },          // padding = gutter between boxes
  cellTablet:  { width: '50%' },
  cellPhone:   { width: '100%' },

  toolCard:    { flex: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.line, padding: 20, paddingBottom: 24 },
  toolCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
  toolName:    { fontFamily: fonts.semibold, color: colors.ink, marginBottom: 6 },
  toolDesc:    { fontFamily: fonts.regular, color: colors.muted, fontSize: 13.5, lineHeight: 20 },
});

/* Quote / Design Philosophy styles */
const q = StyleSheet.create({
  row:            { flexDirection: 'row', gap: 64, alignItems: 'flex-start' },
  rowStack:       { flexDirection: 'column', gap: 24 },
  labelCol:       { width: 160, paddingTop: 8 },
  labelColNarrow: { width: 'auto' },
  content:        { maxWidth: 720 },
  marks:          { fontFamily: fonts.serifItalic, color: colors.accent },
  marksBottom:    { alignSelf: 'flex-end', marginTop: 8 },
  quoteText:      { marginTop: -6 },
  quoteAccent:    { color: colors.accent },
  attr:           { color: colors.text, marginTop: 28, maxWidth: 560, fontFamily: fonts.regular },
  attrBold:       { fontFamily: fonts.semibold, color: colors.ink },
});

/* Currently Working On — subheading left, title right */
const wp = StyleSheet.create({
  badge:      { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24 },
  dot:        { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
  badgeTxt:   { fontFamily: fonts.semibold, fontSize: 13, letterSpacing: 0.4, textTransform: 'uppercase', color: colors.accent },

  row:        { flexDirection: 'row', gap: 56, alignItems: 'flex-start' },
  rowStack:   { flexDirection: 'column', gap: 16 },
  descCol:    { flex: 1, paddingTop: 6 },
  titleCol:   { flex: 1.6 },
  colNarrow:  { width: '100%' },

  subheading: { fontFamily: fonts.regular, color: colors.muted, fontSize: 17, lineHeight: 26, maxWidth: 360 },
  subAccent:  { fontFamily: fonts.semibold, color: colors.ink },

  title:      { fontFamily: fonts.semibold, color: colors.ink },
  tileWrap:   { marginTop: 36, position: 'relative' },
  tile:       { width: '100%', aspectRatio: 16 / 7 },
});
