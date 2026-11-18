import React from 'react';
import {
  View, Text, TextInput, Pressable, Modal as RNModal, ScrollView,
  StyleSheet, Image, TextInputProps, ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius } from '@/constants/theme';

/* ---------- Screen: gradient background + scroll + safe area ---------- */
export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <LinearGradient colors={[colors.deep, colors.sky, colors.mist]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.screenContent} showsVerticalScrollIndicator={false}>
          <View style={s.screenInner}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

/* ---------- Text helpers ---------- */
export const Title = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <Text style={[s.title, light && { color: colors.white }]}>{children}</Text>
);
export const Muted = ({ children }: { children: React.ReactNode }) => (
  <Text style={s.muted}>{children}</Text>
);

/* ---------- GlassCard ---------- */
export function GlassCard({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[s.card, style]}>
      <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
      {children}
    </View>
  );
}

/* ---------- Button ---------- */
export function Button({
  title, onPress, variant = 'primary', disabled, style,
}: {
  title: string; onPress?: () => void; variant?: 'primary' | 'ghost';
  disabled?: boolean; style?: ViewStyle;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        s.btn,
        variant === 'primary' ? s.btnPrimary : s.btnGhost,
        pressed && { opacity: 0.8 },
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      <Text style={[s.btnText, variant === 'ghost' && { color: colors.deep }]}>{title}</Text>
    </Pressable>
  );
}

/* ---------- Input ---------- */
export function Input({ label, ...rest }: { label?: string } & TextInputProps) {
  return (
    <View style={{ marginBottom: 12 }}>
      {label ? <Text style={s.label}>{label}</Text> : null}
      <TextInput placeholderTextColor={colors.mute} {...rest} style={[s.input, rest.style]} />
    </View>
  );
}

/* ---------- Modal: blurred backdrop, content on top ---------- */
export function Modal({
  visible, onClose, title, children,
}: { visible: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.backdrop}>
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        <View style={s.sheet}>
          <View style={s.sheetHead}>
            <Text style={s.sheetTitle}>{title}</Text>
            <Pressable onPress={onClose} accessibilityLabel="Close">
              <Text style={{ fontSize: 22, color: colors.deep }}>✕</Text>
            </Pressable>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
        </View>
      </View>
    </RNModal>
  );
}

/* ---------- Avatar + AvatarStack (shows 2, then "+N") ---------- */
export type Person = { name: string; url?: string | null };

export function Avatar({ name, url, size = 40 }: Person & { size?: number }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const box = { width: size, height: size, borderRadius: size / 2 };
  return url ? (
    <Image source={{ uri: url }} style={[s.avatar, box]} />
  ) : (
    <View style={[s.avatar, s.avatarFallback, box]}>
      <Text style={{ color: colors.white, fontFamily: fonts.semi, fontSize: size * 0.38 }}>{initials}</Text>
    </View>
  );
}

export function AvatarStack({ people, max = 2, size = 40 }: { people: Person[]; max?: number; size?: number }) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {shown.map((p, i) => (
        <View key={i} style={{ marginLeft: i ? -12 : 0 }}>
          <Avatar {...p} size={size} />
        </View>
      ))}
      {extra > 0 && (
        <View style={[s.more, { width: size, height: size, borderRadius: size / 2 }]}>
          <Text style={{ fontFamily: fonts.medium, color: colors.ink }}>+{extra}</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  screenContent: { paddingBottom: 140 },
  screenInner: { width: '100%', maxWidth: 520, alignSelf: 'center', padding: 16 },
  title: { fontFamily: fonts.bold, fontSize: 24, color: colors.navy },
  muted: { fontFamily: fonts.regular, fontSize: 14, color: colors.mute },
  card: {
    borderRadius: 24, overflow: 'hidden', padding: 16, marginBottom: 16,
    backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBorder,
    boxShadow: '0px 8px 24px rgba(2,69,122,0.18)',
  },
  btn: { paddingVertical: 14, paddingHorizontal: 22, borderRadius: radius.pill, alignItems: 'center' },
  btnPrimary: { backgroundColor: colors.deep },
  btnGhost: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.sky },
  btnText: { fontFamily: fonts.semi, fontSize: 15, color: colors.white },
  label: { fontFamily: fonts.medium, fontSize: 13, color: colors.deep, marginBottom: 6 },
  input: {
    backgroundColor: colors.white, borderRadius: radius.md, paddingVertical: 12, paddingHorizontal: 16,
    fontFamily: fonts.regular, fontSize: 15, color: colors.ink, borderWidth: 1, borderColor: colors.mist,
  },
  backdrop: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sheet: {
    width: '92%', maxWidth: 480, maxHeight: '85%', backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: radius.lg, padding: 20,
  },
  sheetHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sheetTitle: { fontFamily: fonts.bold, fontSize: 20, color: colors.navy },
  avatar: { borderWidth: 2, borderColor: colors.white },
  avatarFallback: { backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  more: {
    backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center',
    marginLeft: -12, borderWidth: 2, borderColor: colors.mist,
  },
});
