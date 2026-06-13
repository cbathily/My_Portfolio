import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fonts, useResponsive, MAXW } from '../theme';

const LINKS = [
  { label: 'Projects', screen: 'Projects' },
  { label: 'About Me', screen: 'About' },
  { label: 'Contact', screen: 'Contact' },
] as const;

function NavLinkItem({ label, isActive, onPress }: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  const prog = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  useEffect(() => {
    Animated.spring(prog, {
      toValue: isActive ? 1 : 0,
      damping: 22,
      stiffness: 220,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [isActive]);
  return (
    <Pressable onPress={onPress} style={s.linkWrap}>
      <Text style={[s.link, isActive && s.linkActive]}>{label}</Text>
      <Animated.View style={[s.underline, { transform: [{ scaleX: prog }], opacity: prog }]} />
    </Pressable>
  );
}

export default function NavBar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { pad, isPhone } = useResponsive();
  const [open, setOpen] = useState(false);

  return (
    <View style={s.nav}>
      <View style={[s.inner, { paddingHorizontal: pad }]}>
        <Pressable onPress={() => navigation.navigate('Home' as never)} style={s.brand}>
          <Text style={s.brandTxt}>Coumba Bathily</Text>
        </Pressable>
        {isPhone ? (
          <Pressable onPress={() => setOpen(v => !v)} style={s.burger} hitSlop={8}>
            <View style={[s.burgerLine, open && s.burgerLine1Open]} />
            <View style={[s.burgerLine, open && { opacity: 0 }]} />
            <View style={[s.burgerLine, open && s.burgerLine3Open]} />
          </Pressable>
        ) : (
          <View style={s.menu}>
            {LINKS.map(({ label, screen }) => (
              <NavLinkItem
                key={screen}
                label={label}
                isActive={route.name === screen}
                onPress={() => navigation.navigate(screen as never)}
              />
            ))}
          </View>
        )}
      </View>
      {isPhone && open && (
        <View style={[s.mobileMenu, { paddingHorizontal: pad }]}>
          {LINKS.map(({ label, screen }) => (
            <Pressable
              key={screen}
              style={s.mobileLink}
              onPress={() => { navigation.navigate(screen as never); setOpen(false); }}
            >
              <Text style={[s.mobileLinkTxt, route.name === screen && s.mobileLinkActive]}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  nav: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderBottomWidth: 1,
    borderBottomColor: colors.lineSoft,
    zIndex: 60,
  },
  inner: {
    maxWidth: MAXW,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accent },
  brandTxt: { fontFamily: fonts.bold, fontSize: 18, letterSpacing: -0.3, color: colors.ink },
  menu: { flexDirection: 'row', alignItems: 'center', gap: 32 },
  linkWrap: { alignItems: 'center' },
  link: { fontFamily: fonts.medium, fontSize: 15.5, color: colors.text },
  linkActive: { color: colors.ink },
  underline: { height: 1.5, width: '100%', backgroundColor: colors.ink, marginTop: 3 },

  burger: { gap: 5, justifyContent: 'center', paddingVertical: 4 },
  burgerLine: { width: 22, height: 1.5, backgroundColor: colors.ink },
  burgerLine1Open: { transform: [{ translateY: 6.5 }, { rotate: '45deg' }] },
  burgerLine3Open: { transform: [{ translateY: -6.5 }, { rotate: '-45deg' }] },

  mobileMenu: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderTopWidth: 1,
    borderTopColor: colors.lineSoft,
    paddingBottom: 8,
  },
  mobileLink: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.lineSoft },
  mobileLinkTxt: { fontFamily: fonts.medium, fontSize: 16, color: colors.text },
  mobileLinkActive: { color: colors.ink, fontFamily: fonts.semibold },
});
