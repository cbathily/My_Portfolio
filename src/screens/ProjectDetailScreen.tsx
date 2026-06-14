import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { Asset } from 'expo-asset';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fonts, useResponsive, clamp, typeScale, tracking } from '../theme';
import { Reveal, Label, Placeholder, Chip, Pill, Container } from '../components/ui';
import { PROJECT_COVERS, PLANTNET_IMAGES, MUNICH_IMAGES, ATOLLS_IMAGES, MOOSBURG_IMAGES } from '../assets/images';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type Issue = { title: string; desc: string };

type CaseSection = {
  label: string;
  title: string;
  paragraphs: string[];
  lead?: boolean;
  image?: { ar: number };
  issues?: Issue[];
  twoImages?: boolean;
  postParagraphs?: string[];
  postVideoParagraphs?: string[];
  imageBeforeIssues?: { ar: number; source?: any };
  issuesIntro?: string;
  stackedImages?: { ar: number; source?: any }[];
  figmaEmbed?: string;
  videoSource?: any;
};

type ProjectDetail = {
  num: string;
  titlePre: string;
  titleAccent: string;
  titlePost?: string;
  lede: string;
  chips: string[];
  pills: string[];
  meta: { label: string; value: string }[];
  deliverables: string[];
  sections: CaseSection[];
  nextNum: string;
  nextTitlePre: string;
  nextTitleAccent: string;
  nextTitlePost?: string;
  nextId: string;
};

/* ─────────────────────────────────────────────
   Project data
───────────────────────────────────────────── */
const PROJECTS_DETAIL: Record<string, ProjectDetail> = {

  plantnet: {
    num: '01',
    titlePre: 'Redesign of',
    titleAccent: 'PlantNet',
    lede: 'UI redesign of the plant identification app, simplifying hierarchy and navigation while adding community and engagement features.',
    chips: ['UX Audit', 'Wireframing', 'UI Design', 'Prototyping'],
    pills: ['Academic', 'UX Design'],
    meta: [
      { label: 'Duration', value: '6 months' },
      { label: 'Context', value: 'Academic Project' },
      { label: 'Semester', value: '2nd Semester' },
      { label: 'Tools', value: 'Figma' },
    ],
    deliverables: ['UX Audit', 'Wireframes', 'Prototype'],
    sections: [
      {
        label: 'Context',
        title: 'Why Pl@ntNet?',
        paragraphs: [
          'For my 2nd semester design module we could choose any mobile or web interface to redesign, so I picked PlantNet.',
          'PlantNet is a community plant identification app where users take photos of plants. The AI suggests species and the community helps improve the model over time. It has a dedicated user base of botanists, hikers and nature enthusiasts, including me.',
          'I chose PlantNet because I believe in its mission, but the UI hasn\'t kept pace with the product\'s growth.',
        ],
      },
      {
        label: 'The Problem',
        title: "UX Audit: what's broken?",
        paragraphs: [
          'To understand the current state of the app, I conducted a screen-by-screen UX audit. I documented recurring usability issues, interaction patterns, and visual inconsistencies across the interface. During this process, several recurring problem areas became visible, each affecting how users perceive and navigate the app in different ways.',
        ],
        imageBeforeIssues: { ar: 16 / 9, source: PLANTNET_IMAGES.ux_audit },
        issuesIntro: 'Four categories emerged consistently:',
        issues: [
          { title: 'Typography', desc: 'Weak hierarchy makes it difficult to scan information quickly and understand what is most important at a glance.' },
          { title: 'Screen efficiency', desc: 'Some screens feel inefficient, relying on isolated actions and unnecessary whitespace instead of more compact and functional UI patterns.' },
          { title: 'Navigation icons', desc: 'Icon-only navigation creates ambiguity and reduces clarity, making it harder for users to locate key sections.' },
          { title: 'Visual consistency', desc: 'Inconsistent spacing, components, and styling contribute to a fragmented and unstructured overall experience.' },
        ],
      },
      {
        label: 'Process',
        title: 'Wireframes and new ideas',
        paragraphs: [
          'I started with low fidelity wireframes for all redesigned screens before touching visual design. Key focus: navigation restructure, home screen hierarchy and the new community flows.',
          'The main focus of my redesign was the Home screen, as it is the first screen users see and defines the initial impression of the app.',
          'Beyond improving clarity, I rethought the product experience and introduced new concepts to increase engagement: a redesigned community layer, a dedicated space for articles, and a light gamification system.',
        ],
        stackedImages: [
          { ar: 16 / 9, source: PLANTNET_IMAGES.home_wireframe },
          { ar: 16 / 9, source: PLANTNET_IMAGES.social_wireframe },
        ],
      },
      {
        label: 'Outcome',
        title: 'The final design',
        lead: true,
        paragraphs: [
          'The final Figma prototype focuses on clarity, structure and usability.',
          'The redesign introduces a cleaner visual system with clear typographic hierarchy, improved spacing and a more consistent component language. A secondary purple accent complements the natural green palette.',
          'The app was reorganised around core use cases: exploring the home feed, browsing plant information, and engaging with the community.',
        ],
        figmaEmbed: 'https://www.figma.com/proto/MykogSCeLUoiyxS8CRuChq/Pl-ntNet-Semesterarbeit?node-id=3-313&p=f&t=KYbwXcFqFtLavQml-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A313',
      },
    ],
    nextNum: '02',
    nextTitlePre: 'Automated Review Management for',
    nextTitleAccent: 'Atolls',
    nextId: 'atolls',
  },

  atolls: {
    num: '02',
    titlePre: 'Automated Review Management for',
    titleAccent: 'Atolls',
    lede: 'An AI powered workflow that classifies incoming customer reviews, drafts responses, and surfaces patterns while keeping humans in the loop.',
    chips: ['n8n', 'Multi-Agent', 'LLM', 'UI Prototype'],
    pills: ['Industry Project', 'AI & Automation'],
    meta: [
      { label: 'Duration', value: '6 months' },
      { label: 'Context', value: 'Academic Project' },
      { label: 'Semester', value: '3rd Semester' },
      { label: 'Tools', value: 'n8n · React Native · Figma' },
    ],
    deliverables: ['n8n Workflow', 'Multi-Agent System', 'UI Prototype'],
    sections: [
      {
        label: 'Context',
        title: 'Collaboration with a Partner Company',
        paragraphs: [
          'As part of our third semester module on Multi-Agent-Systems, each team was paired with a real company and tasked with solving a business problem over six months.',
          'Our partner was Atolls. During the initial discovery phase we mapped how reviews were handled: team members read reviews, drafted responses and recorded notes across multiple spreadsheets.',
          'This discovery documented a fragmented process and scattered records that made it hard to get a consistent view of customer feedback.',
        ],
      },
      {
        label: 'The Problem',
        title: 'Lack of consistency at scale',
        paragraphs: [
          'Atolls received a steady stream of customer reviews, but every step of the process was handled manually. Reviews had to be read individually, responses were written from scratch, and documentation was spread across multiple spreadsheets.',
          'As a result, the team spent considerable time on repetitive tasks while gaining very little visibility into larger customer trends.',
        ],
        imageBeforeIssues: { ar: 2880 / 1400, source: ATOLLS_IMAGES.problem },
        issues: [
          { title: 'No automation', desc: 'Every review required manual reading, assessment, and response writing. There was no support for categorisation, drafting, or routing.' },
          { title: 'No consistent process', desc: 'Review management relied on spreadsheets and personal workflows. Information was unstructured, difficult to maintain, and hard to hand over between team members.' },
          { title: 'No visibility into customer sentiment', desc: 'Because reviews were never systematically classified, recurring topics and emerging issues remained hidden in the data.' },
          { title: 'Slow response cycles', desc: 'Responding to reviews took time and depended entirely on individual availability, making response quality and speed difficult to maintain consistently.' },
        ],
      },
      {
        label: 'Process',
        title: 'Workflow and Architecture',
        paragraphs: [
          'To address these challenges, we designed and built a multi agent workflow in n8n that processes incoming reviews end to end.',
          'When a new review arrives, the workflow classifies sentiment, extracts key topics, generates a draft response, and notifies the team via Slack.',
          'This was our first time working with n8n. At the start we faced issues with authentication, webhook configuration and branching logic, which required several iterations. We used testing runs and manual inspections to stabilise the flow, added retry and error handling, and refined the topic extraction prompts to reduce noisy classifications.',
          'Through iterative testing we settled on a single main workflow that orchestrates the core tasks and delegates specialised steps to webhook-triggered sub-workflows; this made the system easier to manage, test and extend while keeping manual review points clear.',
        ],
        videoSource: ATOLLS_IMAGES.video1,
      },
      {
        label: 'Outcome',
        title: 'The Final Prototype',
        paragraphs: [
          'We kept humans in control: AI generates draft responses and a Review Inbox lets team members edit and publish them with a single click, combining efficiency with accountability.',
          'Beyond the original project brief, we also developed an Insights Dashboard. Rather than focusing solely on response automation, we wanted to help Atolls understand what customers were actually saying over time. The dashboard highlights recurring keywords, tracks sentiment trends, and surfaces changes in review patterns, making it easier to identify emerging issues and customer needs.',
        ],
        videoSource: ATOLLS_IMAGES.video2,
        postVideoParagraphs: [
          'What began as a review response automation project evolved into a lightweight review intelligence platform.',
          'Within a single semester, we designed, implemented, and tested a working system that demonstrated how AI agents can support real business processes while keeping humans firmly in control.',
        ],
      },
    ],
    nextNum: '03',
    nextTitlePre: 'Hybrid',
    nextTitleAccent: 'Service Design',
    nextTitlePost: "for Moosburg's History",
    nextId: 'moosburg',
  },

  moosburg: {
    num: '03',
    titlePre: 'Hybrid',
    titleAccent: 'Service Design',
    titlePost: "for Moosburg's History",
    lede: 'A hybrid service design concept, combining physical information boards, a QR linked mobile experience and a concise brand identity to make local history more visible.',
    chips: ['User Research', 'Service Concept', 'Branding'],
    pills: ['Academic', 'Service Design'],
    meta: [
      { label: 'Duration', value: '6 months' },
      { label: 'Context', value: 'Academic Project' },
      { label: 'Semester', value: '3rd Semester' },
      { label: 'Tools', value: 'Figma · Design Principles' },
    ],
    deliverables: ['User Research', 'Service Concept', 'Branding'],
    sections: [
      {
        label: 'Context',
        title: 'Designing a Service for Moosburg',
        paragraphs: [
          'As part of our Service Design module, we were tasked with making the history of Moosburg an der Isar more visible and accessible.',
          'We conducted on-site field research, including interviews with residents and discussions with the city archivist, to understand how local history is currently experienced and where gaps exist.',
          'It quickly became clear that Moosburg\'s history was not absent, it was simply invisible in everyday life. Older residents carried local knowledge, but younger generations and visitors often had little awareness of the significance of places they passed daily.',
          'One example is the former WWII guard barracks, located directly next to a kindergarten and a residential building. Despite their historical relevance, they remain unmarked and largely unknown.',
        ],
        imageBeforeIssues: { ar: 2880 / 1400, source: MOOSBURG_IMAGES.problem },
      },
      {
        label: 'The Process',
        title: 'User Research',
        paragraphs: [
          'Our research revealed a clear disconnect between historical knowledge and public awareness, not because of a lack of interest.',
          "Residents showed a genuine curiosity about Moosburg's history. However, access to historical information was inconsistent and difficult to navigate. Knowledge was distributed across different sources and rarely presented in a way that was easy to discover or engage with. As a result, much of Moosburg's history remained hidden in everyday life.",
        ],
        imageBeforeIssues: { ar: 1157 / 599, source: MOOSBURG_IMAGES.research },
        issuesIntro: 'Based on our findings, we identified four core problems:',
        issues: [
          { title: 'Generational knowledge gap', desc: 'Historical knowledge was concentrated in personal memories and older generations, with limited mechanisms for preserving and sharing it.' },
          { title: 'Invisible heritage sites', desc: 'Many historically significant locations lacked markers or contextual information, making them easy to overlook.' },
          { title: 'Fragmented access', desc: 'Information was dispersed across archives, institutions, and informal sources, without a central point of access.' },
          { title: 'Low accessibility', desc: 'Existing formats did not adequately address the needs of tourists, younger audiences, or users seeking low barrier experiences such as audio content.' },
        ],
      },
      {
        label: 'Concept',
        title: 'The Result',
        paragraphs: [
          'We designed a hybrid service that connects physical historical sites with a lightweight digital layer.',
          'The system combines on site information with QR access to a mobile experience, allowing users to explore history at different levels of depth.',
        ],
        issues: [
          { title: 'Physical information boards', desc: 'Installed at key historical locations, providing immediate context in public space.' },
          { title: 'QR based entry points', desc: 'Flyers, benches, and site boards allow low friction access to deeper content.' },
          { title: 'Mobile experience', desc: 'A responsive web interface offering articles and audio narration for each location, plus the ability to explore additional sites.' },
          { title: 'Brand identity', desc: 'A unified visual system (name, logo, colours) ensures consistency across physical and digital touchpoints.' },
        ],
        stackedImages: [
          { ar: 2880 / 1400, source: MOOSBURG_IMAGES.tafel },
          { ar: 2880 / 1400, source: MOOSBURG_IMAGES.tafel2 },
          { ar: 2880 / 1400, source: MOOSBURG_IMAGES.flyer },
        ],
        figmaEmbed: 'https://www.figma.com/proto/HLSnM72ozwVSgzZgtxMIwb/Moosburg-Prototype?node-id=1221-1395&t=vbOah1ph0QlDkFtL-1&scaling=scale-down&content-scaling=fixed&page-id=535%3A985&starting-point-node-id=1221%3A1395',
      },
    ],
    nextNum: '04',
    nextTitlePre: 'Super',
    nextTitleAccent: 'Munich App',
    nextId: 'munich',
  },

  munich: {
    num: '04',
    titlePre: 'Super',
    titleAccent: 'Munich App',
    lede: 'A 3 day hackathon concept that unifies public transport, culture and leisure into a single city app, designed in high fidelity under time pressure.',
    chips: ['UI Design', 'Prototyping', 'Branding'],
    pills: ['Hackathon', 'UI Design'],
    meta: [
      { label: 'Duration',  value: '2 days'             },
      { label: 'Context',   value: 'Academic Project'  },
      { label: 'Semester',  value: '2nd Semester'        },
      { label: 'Tools',     value: 'Figma'               },
    ],
    deliverables: ['Service Concept', 'UI Prototype', 'Branding'],
    sections: [
      {
        label: 'Context',
        title: 'Munich has too many apps.',
        paragraphs: [
          'MVG for transit. Separate apps for concert tickets, museum programmes, and city events. The brief asked us to design a service for the city of Munich, and fragmentation was the obvious problem to solve.',
          'Our idea was to consolidate everything into one platform. Not just timetables and disruption alerts, but also everything happening in the city: concerts, exhibitions, and museum openings, all surfaced alongside transit options in a single, coherent experience.',
        ],
      },
      {
        label: 'Process',
        title: 'Straight into design.',
        paragraphs: [
          'With only two days available, there was little time for extended discovery or iteration. We aligned on the core concept early and moved straight into high fidelity design, using the screens themselves to test and refine ideas.',
          'The tight timeframe inevitably shaped the outcome. Rather than aiming for a fully polished product, we focused on defining the core experience and visual direction as clearly as possible. For a hackathon setting, that tradeoff made sense: delivering something tangible, coherent, and ready to present was more valuable than pursuing completeness.',
        ],
        stackedImages: [
          { ar: 16 / 9, source: MUNICH_IMAGES.screen1 },
          { ar: 16 / 9, source: MUNICH_IMAGES.screen2 },
        ],
      },
    ],
    nextNum: '05',
    nextTitlePre: 'Agentic Workflow for',
    nextTitleAccent: 'Stadtwerke München',
    nextId: 'swm',
  },

  swm: {
    num: '05',
    titlePre: 'Agentic Workflow for',
    titleAccent: 'Stadtwerke München',
    lede: 'An AI powered multi agent workflow concept for Munich\'s public transport operator, automating customer inquiry handling at scale while keeping humans in control.',
    chips: ['Multi-Agent', 'Workflow Design', 'AI Automation'],
    pills: ['Concept', 'AI & Automation'],
    meta: [
      { label: 'Context', value: 'Concept'      },
      { label: 'Tools',   value: 'n8n · Figma'  },
    ],
    deliverables: ['Workflow Design', 'Prototype'],
    sections: [
      {
        label: 'Overview',
        title: 'Coming soon.',
        lead: true,
        paragraphs: [
          'This project is currently in progress. Details will follow.',
        ],
      },
    ],
    nextNum: '01',
    nextTitlePre: 'Redesign of',
    nextTitleAccent: 'PlantNet',
    nextId: 'plantnet',
  },
};

/* ─────────────────────────────────────────────
   Video player
───────────────────────────────────────────── */
function VideoPlayer({ source }: { source: any }) {
  const videoRef = React.useRef<any>(null);
  const currentTimeRef = React.useRef(0);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    const onTimeUpdate = () => { currentTimeRef.current = video.currentTime; };
    const onSeeking = () => { video.currentTime = currentTimeRef.current; };
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('seeking', onSeeking);
    return () => {
      observer.disconnect();
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('seeking', onSeeking);
    };
  }, []);

  if (Platform.OS !== 'web') {
    return <View style={{ width: '100%', aspectRatio: 2880 / 1400, backgroundColor: colors.ph }} />;
  }
  let uri = '';
  try { uri = Asset.fromModule(source).uri; } catch {}
  if (!uri) return <View style={{ width: '100%', aspectRatio: 2880 / 1400, backgroundColor: colors.ph }} />;
  return React.createElement('video', {
    ref: videoRef,
    src: uri,
    controls: true,
    muted: true,
    playsInline: true,
    style: { width: '100%', display: 'block', backgroundColor: '#000' },
  });
}

/* ─────────────────────────────────────────────
   Figma prototype embed
───────────────────────────────────────────── */
function FigmaEmbed({ url }: { url: string }) {
  const embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  const { width: winW, height: winH } = useWindowDimensions();
  const [loaded, setLoaded] = useState(false);

  const frameW = Math.min(390, winW - 48);
  const frameH = winH - 120;

  if (Platform.OS !== 'web') {
    return <View style={{ width: frameW, height: frameH, alignSelf: 'center', borderRadius: 12, backgroundColor: colors.ph }} />;
  }
  return (
    <View style={{ width: frameW, height: frameH, alignSelf: 'center', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: colors.line, backgroundColor: colors.ph }}>
      {!loaded && (
        <View style={sf.loader}>
          <Text style={sf.loaderTxt}>Loading prototype…</Text>
        </View>
      )}
      {React.createElement('iframe', {
        src: embedUrl,
        style: { width: '100%', height: '100%', border: 'none', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' },
        allowFullScreen: true,
        allow: 'fullscreen',
        onLoad: () => setLoaded(true),
      })}
    </View>
  );
}

const sf = StyleSheet.create({
  loader: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  loaderTxt: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted },
});

/* ─────────────────────────────────────────────
   Screen
───────────────────────────────────────────── */
export default function ProjectDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id = 'plantnet' } = (route.params ?? {}) as { id?: string };
  const data = PROJECTS_DETAIL[id] ?? PROJECTS_DETAIL.plantnet;
  const { width, pad, isNarrow } = useResponsive();
  const t = typeScale(width);

  const nextSize = clamp(width, 32, 5, 68);

  return (
    <ScrollView style={s.bg} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <NavBar />

      <Container pad={pad}>
        {/* Back link */}
        <Reveal>
          <Pressable onPress={() => navigation.navigate('Projects' as never)} style={s.backBtn}>
            <Text style={s.backTxt}>← All projects</Text>
          </Pressable>
        </Reveal>

        {/* Hero image */}
        <Reveal delay={60} y={32} style={s.heroImg}>
          <Placeholder style={StyleSheet.absoluteFill} source={PROJECT_COVERS[id]} />
          <View style={s.heroPills}>
            {data.pills.map(p => <Pill key={p}>{p}</Pill>)}
          </View>
        </Reveal>

        {/* Title row */}
        <View style={[s.titleRow, isNarrow && s.titleRowStack, { paddingTop: clamp(width, 40, 5, 68) }]}>
          <View style={{ flex: isNarrow ? undefined : 1.5 }}>
            <Reveal delay={100} y={16}>
              <View style={s.chips}>
                {data.chips.map(c => <Chip key={c}>{c}</Chip>)}
              </View>
            </Reveal>
            <Reveal delay={160} y={20}>
              <Text style={t.h1}>
                {data.titlePre}{' '}
                <Text style={s.serif}>{data.titleAccent}</Text>
                {data.titlePost ? <Text style={t.h1}>{' '}{data.titlePost}</Text> : null}
              </Text>
            </Reveal>
          </View>
          <Reveal delay={220} y={16} style={{ flex: isNarrow ? undefined : 1 }}>
            <Text style={[s.lede, { fontSize: clamp(width, 17, 1.5, 21), lineHeight: clamp(width, 17, 1.5, 21) * 1.4 }]}>
              {data.lede}
            </Text>
          </Reveal>
        </View>

        {/* Meta table */}
        <Reveal delay={60} y={16}>
          <View style={[s.meta, { marginTop: clamp(width, 44, 6, 80) }]}>
            {data.meta.map(({ label, value }) => (
              <View key={label} style={[s.metaItem, isNarrow && s.metaItemNarrow]}>
                <Text style={s.metaLabel}>{label}</Text>
                <Text style={s.metaValue}>{value}</Text>
              </View>
            ))}
            <View style={{ width: '100%' }}>
              <Text style={s.metaLabel}>Deliverables</Text>
              <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                {data.deliverables.map(d => <Chip key={d}>{d}</Chip>)}
              </View>
            </View>
          </View>
        </Reveal>

        {/* Case sections */}
        {data.sections.map(sec => {
          const hasFullWidth = !!(sec.imageBeforeIssues || sec.stackedImages || sec.figmaEmbed || sec.videoSource);
          const sectionPb = hasFullWidth ? 0 : clamp(width, 56, 7, 104);
          const bottomPb  = clamp(width, 56, 7, 104);
          const mt        = clamp(width, 28, 4, 44);

          // Only the last full-width block gets paddingBottom to avoid stacking gaps
          const issuesPb  = sec.stackedImages || sec.videoSource || sec.figmaEmbed ? 0 : bottomPb;
          const imgOnlyPb = sec.issues || sec.stackedImages || sec.videoSource || sec.figmaEmbed ? 0 : bottomPb;
          const stackedPb = sec.videoSource || sec.figmaEmbed ? 0 : bottomPb;
          const videoPb   = sec.figmaEmbed ? 0 : bottomPb;

          return (
            <View key={sec.label}>
              {/* Label + text body row */}
              <View style={[s.section, isNarrow && s.sectionStack, { paddingBottom: sectionPb }]}>
                <Reveal y={12} style={[s.sectionLabel, isNarrow && { width: 'auto' }]}>
                  <Label accent>{sec.label}</Label>
                </Reveal>
                <View style={s.sectionBody}>
                  <Reveal y={20}>
                    <Text style={[t.h3, { marginBottom: 24 }]}>{sec.title}</Text>
                    {sec.paragraphs.map((p, i) => (
                      <Text key={i} style={[s.sectionPara, i === 0 && sec.lead && s.sectionParaLead]}>{p}</Text>
                    ))}
                  </Reveal>
                  {sec.issues && !sec.imageBeforeIssues && (
                    <View style={s.issues}>
                      {sec.issues.map((issue, issueI) => (
                        <Reveal key={issue.title} delay={issueI * 60} y={12}>
                          <View style={[s.issue, !isNarrow && s.issueRow]}>
                            <Text style={[s.issueTitle, !isNarrow && s.issueTitleCol]}>{issue.title}</Text>
                            <Text style={[s.issueDesc, !isNarrow && { flex: 1 }]}>{issue.desc}</Text>
                          </View>
                        </Reveal>
                      ))}
                    </View>
                  )}
                  {sec.image && <Placeholder style={[s.shot, { aspectRatio: sec.image.ar }]} />}
                  {sec.twoImages && (
                    <View style={{ flexDirection: isNarrow ? 'column' : 'row', gap: 16, marginTop: 36 }}>
                      <Placeholder style={{ flex: 1, aspectRatio: isNarrow ? 16 / 9 : 3 / 4 }} />
                      <Placeholder style={{ flex: 1, aspectRatio: isNarrow ? 16 / 9 : 3 / 4 }} />
                    </View>
                  )}
                  {sec.postParagraphs?.map((p, i) => (
                    <Reveal key={i} delay={i * 60} y={12}>
                      <Text style={[s.sectionPara, s.postPara]}>{p}</Text>
                    </Reveal>
                  ))}
                </View>
              </View>

              {/* Full-width image (optionally before issues list) */}
              {sec.imageBeforeIssues && (
                <Reveal delay={80} y={28} style={{ marginTop: mt, paddingBottom: imgOnlyPb }}>
                  <Placeholder
                    source={sec.imageBeforeIssues.source}
                    style={{ width: '100%', aspectRatio: sec.imageBeforeIssues.ar }}
                  />
                </Reveal>
              )}
              {sec.imageBeforeIssues && sec.issues && (
                <View style={[{ paddingTop: clamp(width, 24, 3, 36), paddingBottom: issuesPb }, !isNarrow && { paddingLeft: 160 + 64 }]}>
                  {sec.issuesIntro && (
                    <Reveal y={12}>
                      <Text style={[s.sectionPara, { marginBottom: 0 }]}>{sec.issuesIntro}</Text>
                    </Reveal>
                  )}
                  <View style={s.issues}>
                    {sec.issues.map((issue, issueI) => (
                      <Reveal key={issue.title} delay={issueI * 60} y={12}>
                        <View style={[s.issue, !isNarrow && s.issueRow]}>
                          <Text style={[s.issueTitle, !isNarrow && s.issueTitleCol]}>{issue.title}</Text>
                          <Text style={[s.issueDesc, !isNarrow && { flex: 1 }]}>{issue.desc}</Text>
                        </View>
                      </Reveal>
                    ))}
                  </View>
                </View>
              )}

              {/* Stacked full-width images */}
              {sec.stackedImages && (
                <View style={{ marginTop: mt, gap: clamp(width, 20, 2, 32), paddingBottom: stackedPb }}>
                  {sec.stackedImages.map((img, imgI) => (
                    <Reveal key={imgI} delay={imgI * 100} y={28}>
                      <Placeholder
                        source={img.source}
                        style={{ width: '100%', aspectRatio: img.ar }}
                      />
                    </Reveal>
                  ))}
                </View>
              )}

              {/* Video player */}
              {sec.videoSource && (
                <Reveal delay={80} y={28} style={{ marginTop: mt, paddingBottom: videoPb }}>
                  <VideoPlayer source={sec.videoSource} />
                </Reveal>
              )}

              {sec.postVideoParagraphs && (
                <View style={[{ marginTop: 16, paddingBottom: videoPb }, !isNarrow && { paddingLeft: 160 + 64 }]}> 
                  {sec.postVideoParagraphs.map((p, i) => (
                    <Text key={i} style={s.sectionPara}>{p}</Text>
                  ))}
                </View>
              )}

              {/* Figma prototype embed */}
              {sec.figmaEmbed && (
                <Reveal delay={80} y={28} style={{ alignItems: 'center', marginTop: mt, paddingBottom: 40 }}>
                  <FigmaEmbed url={sec.figmaEmbed} />
                </Reveal>
              )}
            </View>
          );
        })}

        {/* Next project */}
        <Reveal>
          <View style={s.nextSection}>
            <Pressable
              onPress={() => (navigation as any).navigate('ProjectDetail', { id: data.nextId })}
              style={s.nextLink}
            >
              <View style={{ flexShrink: 1 }}>
                <Text style={s.nextLabel}>Next project · {data.nextNum}</Text>
                <Text style={[s.nextTitle, { fontSize: nextSize, lineHeight: Math.round(nextSize * 1.0), letterSpacing: tracking(nextSize, -0.04) }]}>
                  {data.nextTitlePre}{' '}
                  <Text style={s.serif}>{data.nextTitleAccent}</Text>
                  {data.nextTitlePost ? <Text>{' '}{data.nextTitlePost}</Text> : null}
                </Text>
              </View>
              <Text style={[s.nextArrow, { fontSize: clamp(width, 30, 4, 56) }]}>→</Text>
            </Pressable>
          </View>
        </Reveal>
      </Container>

      <Footer />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.paper },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 32, paddingBottom: 4 },
  backTxt: { fontFamily: fonts.medium, fontSize: 15, color: colors.muted },
  heroImg: { aspectRatio: 16 / 8, backgroundColor: colors.ph, position: 'relative', marginTop: 22, overflow: 'hidden' },
  heroPills: { position: 'absolute', top: 18, left: 18, flexDirection: 'row', gap: 8, zIndex: 2 },
  titleRow: { flexDirection: 'row', gap: 64, alignItems: 'flex-end' },
  titleRowStack: { flexDirection: 'column', alignItems: 'flex-start', gap: 24 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  serif: { fontFamily: fonts.serifItalic, color: colors.accent },
  lede: { color: colors.text, fontFamily: fonts.regular, maxWidth: 520 },

  // Meta
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 40,
    rowGap: 28,
    paddingVertical: 30,
    borderTopWidth: 1.5,
    borderTopColor: colors.ink,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  metaItem: { minWidth: 130 },
  metaItemNarrow: { width: '42%', minWidth: 0 },
  metaLabel: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: colors.accent,
    marginBottom: 10,
  },
  metaValue: { fontFamily: fonts.medium, color: colors.ink, fontSize: 16 },

  // Sections
  section: { flexDirection: 'row', gap: 64, paddingTop: 56 },
  sectionStack: { flexDirection: 'column', gap: 16 },
  sectionLabel: { width: 160 },
  sectionBody: { flex: 1 },
  sectionPara: { color: colors.text, fontFamily: fonts.regular, fontSize: 17, lineHeight: 27, marginBottom: 16, maxWidth: 660 },
  sectionParaLead: { color: colors.ink, fontSize: 19, lineHeight: 30 },
  postPara: { marginTop: 8, color: colors.muted },

  // Issues — two-column on desktop, stacked on phone
  issues: { marginTop: 34, borderTopWidth: 1, borderTopColor: colors.line, maxWidth: 760 },
  issue: { paddingVertical: 22, borderBottomWidth: 1, borderBottomColor: colors.line, gap: 8 },
  issueRow: { flexDirection: 'row', gap: 28, alignItems: 'flex-start' },
  issueTitle: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: colors.accent,
  },
  issueTitleCol: { width: 210, paddingTop: 2 },
  issueDesc: { color: colors.text, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24 },

  shot: { width: '100%', backgroundColor: colors.ph, marginTop: 38 },

  // Next
  nextSection: { borderTopWidth: 1.5, borderTopColor: colors.line, paddingVertical: 64, marginTop: 8 },
  nextLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    flexWrap: 'wrap',
  },
  nextLabel: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: colors.muted,
    marginBottom: 10,
  },
  nextTitle: { fontFamily: fonts.semibold, color: colors.ink },
  nextArrow: { color: colors.ink, fontFamily: fonts.bold },
});
