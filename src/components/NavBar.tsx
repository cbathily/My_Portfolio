import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fonts, useResponsive, MAXW } from '../theme';

const LINKS = [
  { label: 'Home', screen: 'Home' },
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
      <View style={s.linkRow}>
        <Animated.Text style={[s.bracket, { opacity: prog }]}>[ </Animated.Text>
        <Text style={[s.link, isActive && s.linkActive]}>{label}</Text>
        <Animated.Text style={[s.bracket, { opacity: prog }]}> ]</Animated.Text>
      </View>
    </Pressable>
  );
}

export default function NavBar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { pad, isPhone } = useResponsive();

  return (
    <View style={s.nav}>
      <View style={[s.inner, { paddingHorizontal: pad }]}>
        <Pressable onPress={() => navigation.navigate('Home' as never)} style={s.brand}>
          <Text style={s.brandTxt}>Coumba Bathily</Text>
        </Pressable>
        {isPhone ? (
          <View style={s.menuPhone}>
            {LINKS.map(({ label, screen }) => (
              <Pressable
                key={screen}
                onPress={() => navigation.navigate(screen as never)}
                style={s.phoneLinkWrap}
              >
                <Text style={[s.phoneLink, route.name === screen && s.phoneLinkActive]}>
                  {route.name === screen ? `[ ${label} ]` : label}
                </Text>
              </Pressable>
            ))}
          </View>
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
  brand: { flexDirection: 'row', alignItems: 'center' },
  brandTxt: { fontFamily: fonts.bold, fontSize: 16, letterSpacing: -0.3, color: colors.ink },

  /* desktop nav */
  menu: { flexDirection: 'row', alignItems: 'center', gap: 32 },
  linkWrap: { alignItems: 'center' },
  linkRow: { flexDirection: 'row', alignItems: 'center' },
  bracket: { fontFamily: fonts.semibold, fontSize: 15.5, color: colors.accent },
  link: { fontFamily: fonts.medium, fontSize: 15.5, color: colors.text },
  linkActive: { color: colors.ink },

  /* phone nav — compact inline links */
  menuPhone: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  phoneLinkWrap: { paddingVertical: 4 },
  phoneLink: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.text, letterSpacing: 0.2 },
  phoneLinkActive: { color: colors.accent, fontFamily: fonts.semibold },
});
