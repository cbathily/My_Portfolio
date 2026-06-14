import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ViewStyle, Animated, Pressable } from 'react-native';
import { colors, fonts, useResponsive, clamp, tracking } from '../theme';
import { Reveal, Label, Placeholder, Container, Serif } from '../components/ui';
import { ABOUT_PHOTO } from '../assets/images';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

/* Poppins family name (loaded in App.js via @expo-google-fonts/poppins) */
const POPPINS = 'Poppins_800ExtraBold';

type TimelineItem = { year: string; title: string; desc: string };

const TIMELINE: TimelineItem[] = [
  {
    year: '2024 — Today',
    title: 'B.Sc. Computer Science & Design',
    desc: 'Currently in my 4th semester at the University of Applied Sciences (HM) in Munich.',
  },
  {
    year: '2022 — 2024',
    title: 'B.Sc. Computer Science',
    desc: 'Started at LMU Munich, then shifted my focus toward Human–Computer Interaction and UX design.',
  },
  {
    year: '2014 — 2022',
    title: 'Abitur (High School Diploma)',
    desc: 'Graduated from the Adolf-Weber-Gymnasium in Munich.',
  },
];

const LANGUAGES = ['German', 'English', 'French'];

const HOBBIES: string[] = [
  'Sketching & illustration',
  'Books & films',
  'Hiking the Alps',
  'Team sports',
  'Photography',
];

const FACTS: string[] = [
  'My favorite typeface is Poppins.',
  'I name every single layer in Figma. Every. One.',
  'I keep a 400-deep folder of UI screenshots I love.',
];

function DashedRule({ style }: { style?: ViewStyle }) {
  return <View style={[{ borderTopWidth: 1, borderStyle: 'dashed', borderColor: colors.line }, style]} />;
}

function HobbyTag({ label, delay, size }: { label: string; delay: number; size: number }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [hovered, setHovered] = useState(false);

  const onHoverIn = () => {
    setHovered(true);
    Animated.spring(scale, { toValue: 1.05, useNativeDriver: true, tension: 280, friction: 12 }).start();
  };
  const onHoverOut = () => {
    setHovered(false);
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 280, friction: 12 }).start();
  };

  return (
    <Reveal delay={delay} y={14}>
      <Pressable onHoverIn={onHoverIn} onHoverOut={onHoverOut}>
        <Animated.View style={[s.tag, { transform: [{ scale }], borderColor: hovered ? colors.accent : colors.line }]}>
          <View style={[s.tagDot, hovered && { backgroundColor: colors.ink }]} />
          <Text style={[s.tagTxt, { fontSize: size }]}>{label}</Text>
        </Animated.View>
      </Pressable>
    </Reveal>
  );
}

export default function AboutScreen() {
  const { width, pad, isNarrow } = useResponsive();

  const aboveRule = clamp(width, 48, 6.5, 96);
  const afterRule = clamp(width, 36, 4.5, 64);

  return (
    <ScrollView style={s.bg} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <NavBar />

      {/* INTRO */}
      <Container pad={pad} style={{ paddingTop: clamp(width, 40, 5, 72) }}>
        <View style={[s.intro, isNarrow && s.introStack]}>
          <Reveal y={32} style={isNarrow ? s.introImgWrapNarrow : s.introImgWrap}>
            <Placeholder style={StyleSheet.absoluteFill} source={ABOUT_PHOTO} />
          </Reveal>
          <Reveal delay={90} y={20} style={isNarrow ? s.introTxtMobile : s.introTxt}>
            <Label accent style={{ marginBottom: 18 }}>About me</Label>
            <Text style={[s.introHeading, { fontSize: clamp(width, 34, 4.6, 60), lineHeight: clamp(width, 34, 4.6, 60) * 1.0, letterSpacing: tracking(clamp(width, 34, 4.6, 60), -0.035) }]}>
              Hi, I'm <Serif>Coumba.</Serif>
            </Text>
            <Text style={[s.introPara, { fontSize: clamp(width, 18, 1.5, 22) }]}>
              I'm a Computer Science & Design student based in Munich, working at the{' '}
              <Serif>intersection</Serif> of web and mobile interface design, design thinking, AI systems, and frontend development.
            </Text>
            <Text style={[s.introPara, { fontSize: clamp(width, 18, 1.5, 22) }]}>
              I work with established UX principles such as Nielsen's usability heuristics, grid systems, and interaction design patterns to create interfaces that are structured, consistent, and easy to navigate.
            </Text>

            {/* pull quote — hanging serif mark instead of left-border box */}
            <View style={s.pullQuote}>
              <Text style={[s.pullMark, { fontSize: clamp(width, 56, 6, 96), lineHeight: clamp(width, 56, 6, 96) * 0.7 }]}>“</Text>
              <Text style={[s.pullQuoteTxt, { fontSize: clamp(width, 20, 1.7, 26), lineHeight: clamp(width, 20, 1.7, 26) * 1.4 }]}>
                Clean typography, generous whitespace, and a small obsession with hierarchy. I believe good design is{' '}
                <Serif>invisible</Serif>; it just works and feels right.
              </Text>
            </View>

            <Text style={[s.introPara, { fontSize: clamp(width, 18, 1.5, 22) }]}>
              I enjoy working both independently and in teams, taking ownership of a full design process from concept to execution while often acting as a{' '}
              <Serif>bridge between design thinking and implementation.</Serif>
            </Text>
          </Reveal>
        </View>
      </Container>

      {/* ROOTS — clean 3-tier hierarchy */}
      <Container pad={pad} style={{ paddingTop: aboveRule }}>
        <DashedRule />
        <View style={{ paddingTop: afterRule }}>
          <View style={[s.row, isNarrow && s.rowStack]}>
            <Reveal style={isNarrow ? s.labelColNarrow : s.labelCol}>
              <Label accent>Roots</Label>
            </Reveal>
            <Reveal delay={80} y={20} style={[s.rowBody, !isNarrow && { flex: 1 }]}>
              <Text style={[s.statement, { fontSize: clamp(width, 26, 3.4, 46), lineHeight: clamp(width, 26, 3.4, 46) * 1.12, letterSpacing: tracking(clamp(width, 26, 3.4, 46), -0.03) }]}>
                Born in <Serif>Dakar, Senegal</Serif>, raised in <Serif>Munich, Germany.</Serif>
              </Text>
              <Text style={s.rootsBody}>
                Growing up between cultures, languages, and ways of thinking has shaped how I observe, interpret, and communicate. It pushes me to think beyond one perspective and design interfaces that feel intuitive for different users and contexts.
              </Text>

              <View style={s.langBlock}>
                <Label style={{ marginBottom: 14 }}>Languages</Label>
                <View style={s.langRow}>
                  {LANGUAGES.map((lang, i) => (
                    <Reveal key={lang} delay={120 + i * 70} y={12} style={s.langPill}>
                      <Text style={s.langPillTxt}>{lang}</Text>
                    </Reveal>
                  ))}
                </View>
              </View>
            </Reveal>
          </View>
        </View>
      </Container>

      {/* EDUCATION */}
      <Container pad={pad} style={{ paddingTop: aboveRule }}>
        <DashedRule />
        <View style={{ paddingTop: afterRule }}>
          <View style={[s.row, isNarrow && s.rowStack]}>
            <Reveal style={isNarrow ? s.labelColNarrow : s.labelCol}>
              <Label accent>Education</Label>
              <Text style={s.labelSub}>Where I study{'\n'}& studied.</Text>
            </Reveal>
            <View style={[s.timeline, !isNarrow && { flex: 1 }]}>
              {TIMELINE.map((item, i) => (
                <Reveal key={item.year} delay={i * 90} y={18} style={s.tlItem}>
                  <View style={s.tlDot} />
                  {i < TIMELINE.length - 1 && <View style={s.tlLine} />}
                  <Text style={s.tlYear}>{item.year}</Text>
                  <Text style={[s.tlTitle, { fontSize: clamp(width, 21, 2.4, 30), letterSpacing: tracking(clamp(width, 21, 2.4, 30), -0.025) }]}>
                    {item.title}
                  </Text>
                  <Text style={s.tlDesc}>{item.desc}</Text>
                </Reveal>
              ))}
            </View>
          </View>
        </View>
      </Container>

      {/* OFF THE CLOCK — hobbies as a tag cloud */}
      <Container pad={pad} style={{ paddingTop: aboveRule }}>
        <DashedRule />
        <View style={{ paddingTop: afterRule }}>
          <View style={[s.row, isNarrow && s.rowStack]}>
            <Reveal style={isNarrow ? s.labelColNarrow : s.labelCol}>
              <Label accent>Off the clock</Label>
              <Text style={s.labelSub}>What I do when{'\n'}I'm not designing.</Text>
            </Reveal>
            <View style={[s.tagCloud, !isNarrow && { flex: 1 }]}>
              {HOBBIES.map((h, i) => (
                <HobbyTag key={h} label={h} delay={i * 70} size={clamp(width, 17, 1.5, 21)} />
              ))}
            </View>
          </View>
        </View>
      </Container>

      {/* FUN FACTS — editorial numbered list */}
      <Container pad={pad} style={{ paddingTop: aboveRule, paddingBottom: aboveRule }}>
        <DashedRule />
        <View style={{ paddingTop: afterRule }}>
          <View style={[s.row, isNarrow && s.rowStack]}>
            <Reveal style={isNarrow ? s.labelColNarrow : s.labelCol}>
              <Label accent>Fun facts</Label>
              <Text style={s.labelSub}>The less serious{'\n'}stuff.</Text>
            </Reveal>
            <View style={[s.list, !isNarrow && { flex: 1 }]}>
              {FACTS.map((f, i) => (
                <Reveal key={f} delay={i * 80} y={16} style={[s.factRow, i < FACTS.length - 1 && s.factDivider]}>
                  <Text style={s.factNum}>{`0${i + 1}`}</Text>
                  <Text style={[s.factTxt, { fontSize: clamp(width, 18, 1.6, 23), lineHeight: clamp(width, 18, 1.6, 23) * 1.45 }]}>{f}</Text>
                </Reveal>
              ))}
            </View>
          </View>

          {/* the big one */}
          <Reveal delay={160} y={28} style={{ marginTop: clamp(width, 48, 6, 96), alignItems: 'center' }}>
            <View style={s.poppinsWrap}>
              <Text
                style={[
                  s.poppins,
                  { fontSize: clamp(width, 48, 13, 200), lineHeight: clamp(width, 48, 13, 200) * 1.4, letterSpacing: tracking(clamp(width, 48, 13, 200), -0.03) },
                ]}
              >
                poppins gang
              </Text>
              <Text style={s.poppinsCaption}>my favorite typeface — and I keep coming back to it.</Text>
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

  /* intro */
  intro: { flexDirection: 'row', gap: 64, alignItems: 'flex-start' },
  introStack: { flexDirection: 'column', gap: 28, alignItems: 'stretch' },
  introImgWrap: { flex: 1, aspectRatio: 5 / 6, position: 'relative', backgroundColor: colors.ph, overflow: 'hidden' },
  introImgWrapNarrow: { width: '100%', aspectRatio: 5 / 4, position: 'relative', backgroundColor: colors.ph, overflow: 'hidden' },
  introTxt: { flex: 1 },
  introTxtMobile: { width: '100%' },
  introHeading: { fontFamily: fonts.semibold, color: colors.ink, marginBottom: 20 },
  introPara: { color: colors.text, marginBottom: 20, lineHeight: 30, maxWidth: 460, fontFamily: fonts.regular },
  pullQuote: { marginTop: 6, marginBottom: 26, maxWidth: 460 },
  pullMark: { fontFamily: fonts.serifItalic, color: colors.accent, marginBottom: -clampSafe() },
  pullQuoteTxt: { fontFamily: fonts.semibold, color: colors.ink, marginTop: -8 },
  serif: { fontFamily: fonts.serifItalic, color: colors.accent },

  /* shared section row (label left / body right) */
  row: { flexDirection: 'row', gap: 64, alignItems: 'flex-start' },
  rowStack: { flexDirection: 'column', gap: 24, alignItems: 'stretch' },
  labelCol: { width: 200, paddingTop: 4 },
  labelColNarrow: { width: 'auto' },
  labelSub: { fontFamily: fonts.regular, color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 14 },
  rowBody: { maxWidth: 700 },

  /* roots */
  statement: { fontFamily: fonts.semibold, color: colors.ink },
  rootsBody: { fontFamily: fonts.regular, color: colors.text, fontSize: 17, lineHeight: 28, marginTop: 22, maxWidth: 600 },
  langBlock: { marginTop: 36 },
  langRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  langPill: { borderWidth: 1, borderColor: colors.line, borderRadius: 999, paddingVertical: 9, paddingHorizontal: 20 },
  langPillTxt: { fontFamily: fonts.medium, fontSize: 15, color: colors.ink },

  /* timeline */
  timeline: { maxWidth: 640, width: '100%' },
  tlItem: { paddingLeft: 46, paddingBottom: 40, position: 'relative' },
  tlDot: { position: 'absolute', left: 0, top: 5, width: 13, height: 13, borderRadius: 7, backgroundColor: colors.ink },
  tlLine: { position: 'absolute', left: 6, top: 18, bottom: 0, width: 1.5, backgroundColor: colors.line },
  tlYear: { fontFamily: fonts.semibold, fontSize: 13.5, color: colors.accent, marginBottom: 6 },
  tlTitle: { fontFamily: fonts.semibold, color: colors.ink, marginBottom: 8 },
  tlDesc: { color: colors.muted, fontSize: 16, lineHeight: 24, fontFamily: fonts.regular, maxWidth: 460 },

  /* hobbies — tag cloud */
  tagCloud: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, maxWidth: 680 },
  tag: {
    flexDirection: 'row', alignItems: 'center', gap: 11,
    borderWidth: 1, borderStyle: 'dashed', borderColor: colors.line,
    paddingVertical: 13, paddingHorizontal: 20,
  },
  tagDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accent },
  tagTxt: { fontFamily: fonts.semibold, color: colors.ink },

  /* fun facts — numbered list */
  list: { maxWidth: 700, width: '100%' },
  factRow: { flexDirection: 'row', alignItems: 'baseline', gap: 22, paddingVertical: 22 },
  factDivider: { borderBottomWidth: 1, borderStyle: 'dashed', borderColor: colors.line },
  factNum: { fontFamily: fonts.semibold, fontSize: 14, color: colors.accent, width: 28 },
  factTxt: { fontFamily: fonts.medium, color: colors.ink, flex: 1 },

  /* poppins gang */
  poppinsWrap: { alignSelf: 'center', alignItems: 'center' },
  poppins: { fontFamily: POPPINS, color: colors.accent, textAlign: 'center' },
  poppinsCaption: { fontFamily: fonts.regular, color: colors.muted, fontSize: 15, marginTop: 14, textAlign: 'center' },
});

/* small helper so the hanging quote mark overlaps the text slightly */
function clampSafe() { return 14; }