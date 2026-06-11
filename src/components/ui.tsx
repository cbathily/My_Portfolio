import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Pressable,
  Animated,
  Easing,
  Platform,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { colors, fonts, MAXW } from '../theme';

type PressState = { pressed: boolean; hovered?: boolean };

/* ---------- Serif accent word, e.g. "projects." ---------- */
export function Serif({ children, color = colors.accent, style }: {
  children: React.ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[{ fontFamily: fonts.serifItalic, color }, style]}>{children}</Text>;
}

/* ---------- Section label (uppercase, tracked) ---------- */
export function Label({ children, accent = false, style }: {
  children: React.ReactNode;
  accent?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.semibold,
          fontSize: 12,
          letterSpacing: 1.8,
          textTransform: 'uppercase',
          color: accent ? colors.accent : colors.muted,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

/* ---------- useInView: fires once when element scrolls into viewport ---------- */
function useInView() {
  const ref = useRef<any>(null);
  const [inView, setInView] = useState(Platform.OS !== 'web');
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.05, rootMargin: '0px 0px -32px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/* ---------- Reveal: fade + rise when scrolled into view ---------- */
export function Reveal({ children, delay = 0, y = 24, style }: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const { ref, inView } = useInView();
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      Animated.timing(v, {
        toValue: 1,
        duration: 680,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }, 16);
    return () => clearTimeout(t);
  }, [inView]);
  const translateY = v.interpolate({ inputRange: [0, 1], outputRange: [y, 0] });
  return (
    <Animated.View ref={ref as any} style={[{ opacity: v, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}

/* ---------- Hoverable: gives a `hovered` flag on web ---------- */
export function Hoverable({ children, style }: {
  children: ((hovered: boolean) => React.ReactNode) | React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const [hovered, setHovered] = useState(false);
  const webHandlers = Platform.OS === 'web'
    ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }
    : {};
  return (
    <View {...(webHandlers as any)} style={style}>
      {typeof children === 'function' ? children(hovered) : children}
    </View>
  );
}

/* ---------- Grey image placeholder (or real image when source provided) ---------- */
export function Placeholder({ alt = false, style, source }: {
  alt?: boolean;
  style?: StyleProp<ViewStyle>;
  source?: ImageSourcePropType;
}) {
  if (source) {
    return (
      <View style={[{ overflow: 'hidden', backgroundColor: colors.ph }, style]}>
        <Image
          source={source}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
    );
  }
  return (
    <View
      style={[{ backgroundColor: alt ? colors.ph2 : colors.ph, overflow: 'hidden' }, style]}
    />
  );
}

/* ---------- Pills / Chips ---------- */
export function Pill({ children, ghost = false, style }: {
  children: React.ReactNode;
  ghost?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        ui.pill,
        ghost && { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.line },
        style,
      ]}
    >
      <Text style={[ui.pillTxt, ghost && { color: colors.muted }]}>{children}</Text>
    </View>
  );
}

export function Chip({ children, style }: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[ui.chip, style]}>
      <Text style={ui.chipTxt}>{children}</Text>
    </View>
  );
}

/* ---------- Buttons ---------- */
export function Btn({ label, onPress, solid = false, large = false, style }: {
  label: string;
  onPress: () => void;
  solid?: boolean;
  large?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable onPress={onPress} style={(state: PressState) => [
      ui.btn,
      large && ui.btnLg,
      solid && ui.btnSolid,
      state.hovered && !solid && { borderColor: colors.ink },
      state.hovered && solid && { backgroundColor: colors.accentDark },
      state.pressed && { opacity: 0.9 },
      style,
    ]}>
      <Text style={[ui.btnTxt, solid && { color: colors.white }]}>{label}</Text>
      <Text style={[ui.btnArr, solid && { color: colors.white }]}>→</Text>
    </Pressable>
  );
}

export function TextLink({ label, onPress, arrow = '→', color = colors.ink, style }: {
  label: string;
  onPress: () => void;
  arrow?: string | false;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [ui.tlink, pressed && { opacity: 0.7 }, style]}>
      <Text style={[ui.tlinkTxt, { color }]}>{label}</Text>
      {arrow ? <Text style={[ui.tlinkTxt, { color }]}>{` ${arrow}`}</Text> : null}
    </Pressable>
  );
}

/* ---------- Availability badge ---------- */
export function Avail({ label = 'Open to internships · Autumn 2026', style }: {
  label?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[ui.avail, style]}>
      <View style={ui.blip} />
      <Text style={ui.availTxt}>{label}</Text>
    </View>
  );
}

/* ---------- Centered max-width container ---------- */
export function Container({ children, pad, style }: {
  children: React.ReactNode;
  pad?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ width: '100%', maxWidth: MAXW, alignSelf: 'center', paddingHorizontal: pad }, style]}>
      {children}
    </View>
  );
}

const ui = StyleSheet.create({
  pill: {
    backgroundColor: colors.ink,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 7,
    alignSelf: 'flex-start',
  },
  pillTxt: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  chipTxt: { color: colors.muted, fontFamily: fonts.medium, fontSize: 13 },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    paddingHorizontal: 22,
    paddingVertical: 13,
    alignSelf: 'flex-start',
  },
  btnLg: { paddingHorizontal: 28, paddingVertical: 16 },
  btnSolid: { backgroundColor: colors.accent, borderColor: colors.accent },
  btnTxt: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  btnArr: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  tlink: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  tlinkTxt: { fontFamily: fonts.semibold, fontSize: 15.5, color: colors.ink },
  avail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingVertical: 7,
    paddingLeft: 12,
    paddingRight: 14,
    alignSelf: 'flex-start',
  },
  blip: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
  availTxt: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
});
