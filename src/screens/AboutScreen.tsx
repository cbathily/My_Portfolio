import React from 'react';
import { ScrollView, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, fonts, useResponsive, clamp, tracking } from '../theme';
import { Reveal, Label, Placeholder, Container, Serif } from '../components/ui';
import { ABOUT_PHOTO } from '../assets/images';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

/* Poppins family names (loaded in App.js via @expo-google-fonts/poppins) */
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

const HOBBIES: string[] = [
  'Sketching & illustration',
  'Books & films (certified nerd)',
  'Hiking around the Alps',
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

export default function AboutScreen() {
  const { width, pad, isPhone, isNarrow } = useResponsive();

  const aboveRule = clamp(width, 48, 6.5, 96);
  const afterRule = clamp(width, 36, 4.5, 64);

  return (
    <ScrollView style={s.bg} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <NavBar />

      {/* INTRO */}
      <Container pad={pad} style={{ paddingTop: clamp(width, 40, 5, 72) }}>
        <View style={[s.intro, isNarrow && s.introStack]}>
            <Reveal style={[s.introImgWrap, isNarrow && { aspectRatio: 5 / 4 }]}>
            <Placeholder style={StyleSheet.absoluteFill} source={ABOUT_PHOTO} />
          </Reveal>
          <Reveal delay={80} style={s.introTxt}>
            <Label accent style={{ marginBottom: 18 }}>About me</Label>
            <Text style={[s.introHeading, { fontSize: clamp(width, 34, 4.6, 60), lineHeight: clamp(width, 34, 4.6, 60) * 1.0, letterSpacing: tracking(clamp(width, 34, 4.6, 60), -0.035) }]}>
              Hi, I'm <Serif>Coumba.</Serif>
            </Text>
            <Text style={[s.introPara, { fontSize: clamp(width, 18, 1.5, 22) }]}>
              A Computer Science & Design student in Munich, working at the crossover of design thinking, AI systems and frontend engineering.
            </Text>
            <Text style={[s.introPara, { fontSize: clamp(width, 18, 1.5, 22) }]}>
                        My aesthetic runs editorial: clean typography, generous whitespace, and a small obsession with hierarchy. I believe good design is{' '}
                        <Serif>invisible</Serif>; it just works and feels right.
            </Text>
          </Reveal>
        </View>
      </Container>

      {/* ROOTS */}
      <Container pad={pad} style={{ paddingTop: aboveRule }}>
        <DashedRule />
        <View style={{ paddingTop: afterRule }}>
          <View style={[s.row, isNarrow && s.rowStack]}>
            <Reveal style={isNarrow ? s.labelColNarrow : s.labelCol}>
              <Label accent>Roots</Label>
            </Reveal>
            <Reveal delay={80} style={[s.rowBody, !isNarrow && { flex: 1 }]}>
              <Text style={[s.statement, { fontSize: clamp(width, 26, 3.4, 46), lineHeight: clamp(width, 26, 3.4, 46) * 1.1, letterSpacing: tracking(clamp(width, 26, 3.4, 46), -0.03) }]}>
                Born in <Serif>Dakar, Senegal</Serif>, raised in <Serif>Munich.</Serif>
              </Text>
              {/* Roots subtext removed per request */}
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
                <Reveal key={item.year} delay={i * 80} style={s.tlItem}>
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

      {/* OFF THE CLOCK — hobbies */}
      <Container pad={pad} style={{ paddingTop: aboveRule }}>
        <DashedRule />
        <View style={{ paddingTop: afterRule }}>
          <View style={[s.row, isNarrow && s.rowStack]}>
            <Reveal style={isNarrow ? s.labelColNarrow : s.labelCol}>
              <Label accent>Off the clock</Label>
              <Text style={s.labelSub}>What I do when{'\n'}I'm not designing.</Text>
            </Reveal>
            <View style={[s.list, !isNarrow && { flex: 1 }]}>
              {HOBBIES.map((h, i) => (
                <Reveal key={h} delay={i * 60} style={[s.listRow, i < HOBBIES.length - 1 && s.listDivider]}>
                  <Text style={s.listNum}>{`0${i + 1}`}</Text>
                  <Text style={[s.listTxt, { fontSize: clamp(width, 19, 1.9, 26), letterSpacing: tracking(clamp(width, 19, 1.9, 26), -0.02) }]}>
                    {h}
                  </Text>
                </Reveal>
              ))}
            </View>
          </View>
        </View>
      </Container>

      {/* FUN FACTS + POPPINS GANG */}
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
                <Reveal key={f} delay={i * 60} style={[s.listRow, i < FACTS.length - 1 && s.listDivider]}>
                  <Text style={s.listNum}>{`0${i + 1}`}</Text>
                  <Text style={s.factTxt}>{f}</Text>
                </Reveal>
              ))}
            </View>
          </View>

          {/* the big one */}
          <Reveal delay={140} style={{ marginTop: clamp(width, 48, 6, 96), alignItems: 'center' }}>
            <Text
              style={[
                s.poppins,
                { fontSize: clamp(width, 54, 13, 200), lineHeight: clamp(width, 54, 13, 200) * 1.0, letterSpacing: tracking(clamp(width, 54, 13, 200), -0.03) },
              ]}
            >
              poppins gang
            </Text>
            <Text style={s.poppinsCaption}>my favorite typeface — and yes, I will defend it.</Text>
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
  introStack: { flexDirection: 'column', gap: 28 },
  introImgWrap: { flex: 1, aspectRatio: 5 / 6, position: 'relative', backgroundColor: colors.ph },
  introTxt: { flex: 1 },
  introHeading: { fontFamily: fonts.semibold, color: colors.ink, marginBottom: 20 },
  introPara: { color: colors.text, marginBottom: 20, lineHeight: 30, maxWidth: 440, fontFamily: fonts.regular },
  serif: { fontFamily: fonts.serifItalic, color: colors.accent },

  /* shared section row (label left / body right) */
  row: { flexDirection: 'row', gap: 64, alignItems: 'flex-start' },
  rowStack: { flexDirection: 'column', gap: 24 },
  labelCol: { width: 200, paddingTop: 4 },
  labelColNarrow: { width: 'auto' },
  labelSub: { fontFamily: fonts.regular, color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 14 },
  rowBody: { maxWidth: 680 },

  /* roots statement */
  statement: { fontFamily: fonts.semibold, color: colors.ink },
  statementSub: { fontFamily: fonts.regular, color: colors.muted, fontSize: 17, lineHeight: 26, marginTop: 18, maxWidth: 480 },

  /* timeline */
  timeline: { maxWidth: 640, width: '100%' },
  tlItem: { paddingLeft: 46, paddingBottom: 40, position: 'relative' },
  tlDot: { position: 'absolute', left: 0, top: 5, width: 13, height: 13, borderRadius: 7, backgroundColor: colors.ink },
  tlLine: { position: 'absolute', left: 6, top: 18, bottom: 0, width: 1.5, backgroundColor: colors.line },
  tlYear: { fontFamily: fonts.semibold, fontSize: 13.5, color: colors.accent, marginBottom: 6 },
  tlTitle: { fontFamily: fonts.semibold, color: colors.ink, marginBottom: 8 },
  tlDesc: { color: colors.muted, fontSize: 16, lineHeight: 24, fontFamily: fonts.regular, maxWidth: 460 },

  /* numbered lists (hobbies + facts) */
  list: { maxWidth: 680, width: '100%' },
  listRow: { flexDirection: 'row', alignItems: 'baseline', gap: 18, paddingVertical: 18 },
  listDivider: { borderBottomWidth: 1, borderStyle: 'dashed', borderColor: colors.line },
  listNum: { fontFamily: fonts.semibold, fontSize: 13, color: colors.accent, width: 26 },
  listTxt: { fontFamily: fonts.semibold, color: colors.ink, flex: 1 },
  factTxt: { fontFamily: fonts.regular, color: colors.text, fontSize: 17, lineHeight: 26, flex: 1 },

  /* poppins gang */
  poppins: { fontFamily: POPPINS, color: colors.accent, textAlign: 'center' },
  poppinsCaption: { fontFamily: fonts.regular, color: colors.muted, fontSize: 15, marginTop: 14, textAlign: 'center' },
});