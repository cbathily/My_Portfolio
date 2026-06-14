import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, useResponsive, MAXW } from '../theme';

export default function Footer() {
  const navigation = useNavigation();
  const { pad, isPhone } = useResponsive();

  return (
    <View style={[s.foot, { paddingHorizontal: pad }]}>
      <View style={s.rule} />
      <View style={[s.grid, isPhone && s.gridPhone]}>
        <View style={s.mainCol}>
          <Text style={s.heading}>
            Crafted with{' '}
            <Text style={s.serif}>care.</Text>
          </Text>
          <Text style={s.open}>Currently open to an internship starting Autumn 2026.</Text>
        </View>

        <View style={s.btnCol}>
          <Pressable onPress={() => navigation.navigate('Contact' as never)} style={({ pressed }) => [s.btn, pressed && { opacity: 0.75 }]}>
            <Text style={s.btnTxt}>Get in touch →</Text>
          </Pressable>
        </View>
      </View>

      <View style={s.bottom}>
        <Text style={s.bottomTxt}>© 2026 Coumba Bathily</Text>
        <Text style={s.bottomTxt}>Munich, DE</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  foot: { paddingTop: 40, maxWidth: MAXW, alignSelf: 'center', width: '100%' },
  rule: { borderTopWidth: 1.5, borderTopColor: colors.line, marginBottom: 48 },
  grid: { flexDirection: 'row', gap: 48, paddingBottom: 56, alignItems: 'center', justifyContent: 'space-between' },
  gridPhone: { flexDirection: 'column', gap: 24, alignItems: 'flex-start' },
  mainCol: { flex: 1, minWidth: 200 },
  btnCol: { alignItems: 'flex-end' },
  heading: {
    fontFamily: fonts.semibold,
    fontSize: 28,
    color: colors.ink,
    letterSpacing: -0.8,
    lineHeight: 30,
    marginBottom: 14,
  },
  serif: { fontFamily: fonts.serifItalic, color: colors.accent },
  open: { color: colors.text, marginBottom: 22, fontSize: 15, lineHeight: 22 },
  btn: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 13,
    alignSelf: 'flex-start',
  },
  btnTxt: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 36,
  },
  bottomTxt: { color: colors.muted, fontSize: 13.5 },
});
