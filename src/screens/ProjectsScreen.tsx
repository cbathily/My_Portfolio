import React, { useState, useRef } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, useResponsive, clamp, typeScale } from '../theme';
import { Reveal, Placeholder, Chip, Pill, Container } from '../components/ui';
import { PROJECT_COVERS } from '../assets/images';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

type Project = {
  id: string;
  num: string;
  title: string;
  cats: string[];
  alt: boolean;
  pills: string[];
  chips: string[];
  desc: string;
  ar: number;
};

type Filter = { label: string; key: string };

const PROJECTS: Project[] = [
  {
    id: 'plantnet',
    num: '01',
    title: 'PlantNet — App Redesign',
    cats: ['ux', 'proto'],
    alt: false,
    pills: ['Academic', 'UX Design'],
    chips: ['UX Audit', 'Wireframing', 'UI Design', 'Prototyping'],
    desc: 'Redesigning the popular plant identification app: full UX audit, rebuilt UI and a new community layer.',
    ar: 4 / 5,
  },
  {
    id: 'atolls',
    num: '02',
    title: 'Automated Review Management for Atolls',
    cats: ['ai'],
    alt: true,
    pills: ['Industry Project', 'AI & Automation'],
    chips: ['n8n', 'Multi-Agent', 'LLM', 'UI Prototype'],
    desc: 'An AI powered multi agent workflow that classifies reviews, drafts responses, and surfaces sentiment trends while keeping humans in control.',
    ar: 5 / 4,
  },
  {
    id: 'moosburg',
    num: '03',
    title: "Hybrid Service Design for Moosburg's History",
    cats: ['ux'],
    alt: false,
    pills: ['Academic', 'Service Design'],
    chips: ['User Research', 'Service Concept', 'Branding'],
    desc: "A hybrid service concept combining physical information boards, a QR linked mobile experience and a concise brand identity to make local history visible.",
    ar: 3 / 4,
  },
  {
    id: 'munich',
    num: '04',
    title: 'Super Munich App',
    cats: ['ux', 'proto'],
    alt: true,
    pills: ['Hackathon', 'UI Design'],
    chips: ['UI Design', 'Prototyping', 'Branding'],
    desc: 'A hackathon concept unifying public transport, culture and leisure into one city app, designed in high fidelity under a 3 day time constraint.',
    ar: 4 / 3,
  },
  {
    id: 'swm',
    num: '05',
    title: 'Agentic Workflow for Stadtwerke München',
    cats: ['ai'],
    alt: false,
    pills: ['Concept', 'AI & Automation'],
    chips: ['Multi-Agent', 'Workflow Design', 'AI Automation'],
    desc: 'An AI powered multi agent workflow concept for Munich\'s public transport operator, automating customer inquiry handling at scale.',
    ar: 4 / 3,
  },
  {
    id: 'vinted',
    num: '06',
    title: 'Vinted: A Rebrand for Nostalgia',
    cats: ['brand'],
    alt: true,
    pills: ['Academic', 'Brand Design'],
    chips: ['Brand Identity', 'UI Design', 'Service Design', 'Prototyping'],
    desc: 'A rebranding concept that reimagines Vinted through a retro-nostalgic lens. Brand identity, website redesign, gamified app extension, and a physical retail concept.',
    ar: 4 / 3,
  },
];

const FILTERS: Filter[] = [
  { label: 'All', key: 'all' },
  { label: 'UX Design', key: 'ux' },
  { label: 'Prototyping', key: 'proto' },
  { label: 'AI & Automation', key: 'ai' },
  { label: 'Brand Design', key: 'brand' },
];

export default function ProjectsScreen() {
  const navigation = useNavigation();
  const [active, setActive] = useState('all');
  const { width, pad, isPhone } = useResponsive();
  const t = typeScale(width);

  const visible = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.cats.includes(active));

  // Asymmetric two-column layout — right column pushed down.
  const colGap = clamp(width, 28, 4, 72);
  const rowGap = clamp(width, 48, 6, 96);
  const offset = clamp(width, 40, 7, 110);
  const left  = visible.filter((_, i) => i % 2 === 0);
  const right = visible.filter((_, i) => i % 2 === 1);

  const open = (id: string) =>
    navigation.navigate('ProjectDetail' as never, { id } as never);

  return (
    <ScrollView style={s.bg} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <NavBar />

      <Container pad={pad}>
        {/* Header */}
        <View style={{ paddingTop: clamp(width, 56, 8, 110), alignItems: 'center' }}>
          <Reveal>
            <Text style={[t.h1, { textAlign: 'center' }]}>
              I design <Text style={s.serif}>across...</Text>
            </Text>
          </Reveal>
          <Reveal delay={80}>
            <View style={[s.filters, { marginTop: clamp(width, 34, 5, 56) }]}>
              {FILTERS.map(({ label, key }) => (
                <Pressable
                  key={key}
                  onPress={() => setActive(key)}
                  style={[s.tab, active === key && s.tabActive]}
                >
                  <Text style={[s.tabTxt, active === key && s.tabTxtActive]}>{label}</Text>
                </Pressable>
              ))}
            </View>
          </Reveal>
        </View>

        {/* Cards grid */}
        <View style={{ marginTop: clamp(width, 56, 7, 96), paddingBottom: clamp(width, 80, 10, 140) }}>
          {isPhone ? (
            <View style={{ gap: rowGap }}>
              {visible.map((proj, i) => (
                <ProjectCard key={proj.id} proj={proj} delay={i * 60} t={t} onPress={() => open(proj.id)} />
              ))}
            </View>
          ) : (
            <View style={{ flexDirection: 'row', gap: colGap, alignItems: 'flex-start' }}>
              <View style={{ flex: 1, gap: rowGap }}>
                {left.map((proj, i) => (
                  <ProjectCard key={proj.id} proj={proj} delay={i * 90} t={t} onPress={() => open(proj.id)} />
                ))}
              </View>
              <View style={{ flex: 1, gap: rowGap, marginTop: offset }}>
                {right.map((proj, i) => (
                  <ProjectCard key={proj.id} proj={proj} delay={45 + i * 90} t={t} onPress={() => open(proj.id)} />
                ))}
              </View>
            </View>
          )}
        </View>
      </Container>

      <Footer />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

type ProjectCardProps = {
  proj: Project;
  delay: number;
  t: ReturnType<typeof typeScale>;
  onPress: () => void;
};

function ProjectCard({ proj, delay, t, onPress }: ProjectCardProps) {
  const lift = useRef(new Animated.Value(0)).current;

  const hoverIn  = () => Animated.spring(lift, { toValue: 1, damping: 18, stiffness: 200, useNativeDriver: Platform.OS !== 'web' }).start();
  const hoverOut = () => Animated.spring(lift, { toValue: 0, damping: 18, stiffness: 200, useNativeDriver: Platform.OS !== 'web' }).start();

  const cardY    = lift.interpolate({ inputRange: [0, 1], outputRange: [0, -5] });
  const imgScale = lift.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] });

  const webHandlers = Platform.OS === 'web'
    ? { onMouseEnter: hoverIn, onMouseLeave: hoverOut }
    : {};

  return (
    <Reveal delay={delay}>
      <Animated.View
        {...(webHandlers as any)}
        style={[s.card, { transform: [{ translateY: cardY }] }]}
      >
        <Pressable onPress={onPress} style={[s.media, { aspectRatio: proj.ar }]}>
          <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ scale: imgScale }] }]}>
            <Placeholder alt={proj.alt} style={{ flex: 1 }} source={PROJECT_COVERS[proj.id]} />
          </Animated.View>
          <View style={s.pillsRow}>
            {proj.pills.map(p => <Pill key={p}>{p}</Pill>)}
          </View>
          <View style={s.viewBtn}>
            <Text style={s.viewTxt}>View case →</Text>
          </View>
        </Pressable>
        <View style={s.cardChips}>
          {proj.chips.map(c => <Chip key={c}>{c}</Chip>)}
        </View>
        <Text style={s.num}>{proj.num}</Text>
        <Pressable onPress={onPress}>
          <Text style={t.card}>{proj.title}</Text>
        </Pressable>
        <Text style={s.desc}>{proj.desc}</Text>
      </Animated.View>
    </Reveal>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.paper },
  serif: { fontFamily: fonts.serifItalic, color: colors.accent },
  sub: {
    color: colors.muted,
    maxWidth: 520,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: fonts.regular,
    fontSize: 17,
    lineHeight: 26,
  },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
  },
  tabActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  tabTxt: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.text },
  tabTxtActive: { color: '#fff' },
  card: { flexDirection: 'column' },
  media: { position: 'relative', overflow: 'hidden', width: '100%' },
  pillsRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    zIndex: 2,
  },
  viewBtn: { position: 'absolute', left: 18, bottom: 16, zIndex: 3 },
  viewTxt: { fontFamily: fonts.semibold, fontSize: 15, color: '#fff' },
  cardChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 22, marginBottom: 14 },
  num: { fontFamily: fonts.semibold, fontSize: 13, color: colors.accent, letterSpacing: 0.5, marginBottom: 10 },
  desc: { color: colors.muted, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, marginTop: 12, maxWidth: 460 },
});
