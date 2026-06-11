import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet, Keyboard } from 'react-native';
import { colors, fonts, useResponsive, clamp } from '../theme';
import { Reveal, Label, Avail, Container } from '../components/ui';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

type FormStatus = { type: 'ok' | 'err'; msg: string } | null;
type FormErrors = { name?: boolean; email?: boolean; message?: boolean };

export default function ContactScreen() {
  const { width, pad, isNarrow } = useResponsive();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!name.trim()) e.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = true;
    if (!message.trim()) e.message = true;
    return e;
  }

  function submit() {
    Keyboard.dismiss();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setStatus({ type: 'err', msg: 'Bitte fülle die markierten Felder korrekt aus.' });
      return;
    }
    setLoading(true);
    setStatus(null);
    setTimeout(() => {
      const first = name.trim().split(' ')[0];
      setLoading(false);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
      setStatus({ type: 'ok', msg: `Danke, ${first}! Deine Nachricht ist angekommen — ich melde mich bald.` });
    }, 900);
  }

  return (
    <ScrollView
      style={s.bg}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <NavBar />

      <Container pad={pad}>
        {/* HERO */}
        <View style={{ paddingTop: clamp(width, 48, 7, 104), paddingBottom: clamp(width, 28, 4, 52) }}>
          <Reveal>
            <Label accent style={{ marginBottom: 22 }}>Say hello</Label>
          </Reveal>
          <Reveal delay={80}>
            <Text style={[s.heroTitle, { fontSize: clamp(width, 46, 9, 140), lineHeight: clamp(width, 46, 9, 140) * 0.9 }]}>
              Let's create{'\n'}something <Text style={s.serif}>good.</Text>
            </Text>
          </Reveal>
        </View>

        {/* CONTENT GRID */}
        <View style={[s.grid, isNarrow && s.gridStack, { marginTop: clamp(width, 56, 7, 104), paddingBottom: 80 }]}>

          {/* LEFT: info */}
          <Reveal style={s.info}>
            <Text style={[s.introPara, { fontSize: clamp(width, 18, 1.5, 21) }]}>
              Got an open internship, a project, or just a question? I read every message and reply personally.
            </Text>
            <View style={{ marginBottom: 32 }}>
              <Avail />
            </View>
            <View style={{ marginBottom: 32 }}>
              <Label style={{ marginBottom: 14 }}>Prefer email?</Label>
              <Text style={s.mail}>coumbathily06@gmail.com</Text>
            </View>
            <View style={{ marginBottom: 32 }}>
              <Label style={{ marginBottom: 14 }}>Find me online</Label>
              {['LinkedIn', 'Instagram', 'Behance'].map(l => (
                <Text key={l} style={[s.social, { marginBottom: 10 }]}>{l} ↗</Text>
              ))}
            </View>
            <View>
              <Label style={{ marginBottom: 10 }}>Response time</Label>
              <Text style={s.responseTime}>Usually within ~2 days · Munich, DE</Text>
            </View>
          </Reveal>

          {/* RIGHT: form */}
          <Reveal delay={80} style={s.form}>
            <FormField label="Your name" error={errors.name}>
              <TextInput
                style={[s.input, errors.name && s.inputErr]}
                placeholder="Jane Doe"
                placeholderTextColor="#b4b4b4"
                value={name}
                onChangeText={v => { setName(v); setErrors(p => ({ ...p, name: false })); }}
                autoComplete="name"
                returnKeyType="next"
              />
            </FormField>
            <FormField label="Email" error={errors.email}>
              <TextInput
                style={[s.input, errors.email && s.inputErr]}
                placeholder="jane@company.com"
                placeholderTextColor="#b4b4b4"
                value={email}
                onChangeText={v => { setEmail(v); setErrors(p => ({ ...p, email: false })); }}
                autoComplete="email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </FormField>
            <FormField label="Message" error={errors.message}>
              <TextInput
                style={[s.input, s.textarea, errors.message && s.inputErr]}
                placeholder="Tell me about the role, the team, or what you're working on…"
                placeholderTextColor="#b4b4b4"
                value={message}
                onChangeText={v => { setMessage(v); setErrors(p => ({ ...p, message: false })); }}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </FormField>
            <View style={s.formFoot}>
              <Pressable
                onPress={loading ? undefined : submit}
                style={({ pressed }) => [s.submitBtn, pressed && { opacity: 0.8 }]}
              >
                <Text style={s.submitTxt}>{loading ? 'Wird gesendet…' : 'Send message →'}</Text>
              </Pressable>
              {status && (
                <Text style={[s.statusTxt, status.type === 'ok' ? s.statusOk : s.statusErr]}>
                  {status.msg}
                </Text>
              )}
            </View>
          </Reveal>
        </View>
      </Container>

      <Footer />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function FormField({ label, children, error }: {
  label: string;
  children: React.ReactNode;
  error?: boolean;
}) {
  return (
    <View style={[ff.field, error && ff.fieldErr]}>
      <Text style={ff.label}>{label}</Text>
      {children}
    </View>
  );
}

const ff = StyleSheet.create({
  field: { marginBottom: 32 },
  fieldErr: {},
  label: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: colors.muted,
    marginBottom: 11,
  },
});

const s = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.paper },
  heroTitle: { fontFamily: fonts.semibold, color: colors.ink, letterSpacing: -3.5 },
  serif: { fontFamily: fonts.serifItalic, color: colors.accent },
  grid: { flexDirection: 'row', gap: 80, alignItems: 'flex-start' },
  gridStack: { flexDirection: 'column', gap: 48 },
  info: { flex: 0.85 },
  introPara: { color: colors.ink, lineHeight: 30, marginBottom: 32, maxWidth: 380 },
  mail: { fontFamily: fonts.semibold, fontSize: 24, color: colors.ink, letterSpacing: -0.6 },
  social: { fontFamily: fonts.regular, fontSize: 17, color: colors.text },
  responseTime: { fontFamily: fonts.medium, fontSize: 17, color: colors.ink },
  form: { flex: 1.15 },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: colors.line,
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.ink,
    paddingVertical: 9,
    backgroundColor: 'transparent',
    outlineStyle: 'none',
  } as any,
  inputErr: { borderBottomColor: colors.error },
  textarea: { minHeight: 120, lineHeight: 26 },
  formFoot: { flexDirection: 'row', alignItems: 'center', gap: 22, flexWrap: 'wrap', marginTop: 8 },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    backgroundColor: colors.accent,
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  submitTxt: { fontFamily: fonts.semibold, fontSize: 16, color: '#fff' },
  statusTxt: { flex: 1, fontSize: 15, lineHeight: 22 },
  statusOk: { color: colors.accent, fontFamily: fonts.medium },
  statusErr: { color: colors.error },
});
