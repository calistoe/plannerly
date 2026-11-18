import { colors, fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Placeholder icons. Swap with your Canva icons later.
const items: Record<string, { icon: string; label: string }> = {
  trips: { icon: "briefcase", label: "Trips" },
  calendar: { icon: "calendar", label: "Calendar" },
  profile: { icon: "person-circle", label: "Profile" },
};

export default function BottomNav({ state }: { state: any; navigation?: any }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleNavigation = (routeName: string) => {
    switch (routeName) {
      case "trips":
        router.navigate("/trips");
        break;
      case "calendar":
        router.navigate("/calendar");
        break;
      case "profile":
        router.navigate("/profile");
        break;
      default:
        console.warn("Unknown navigation route:", routeName);
    }
  };

  return (
    <View
      pointerEvents="box-none"
      style={[s.wrap, { bottom: 12 + insets.bottom }]}
    >
      <View style={s.bar}>
        <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />

        {state.routes.map((r: any, i: number) => {
          const focused = state.index === i;
          const it = items[r.name] ?? {
            icon: "ellipse",
            label: r.name,
          };

          return (
            <Pressable
              key={r.key}
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
              onPress={() => handleNavigation(r.name)}
              style={[s.item, focused && s.active]}
            >
              <Ionicons
                name={it.icon as any}
                size={26}
                color={focused ? colors.deep : colors.navy}
              />

              <Text
                style={[
                  s.label,
                  focused && {
                    color: colors.deep,
                    fontFamily: fonts.semi,
                  },
                ]}
              >
                {it.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "88%",
    maxWidth: 420,
    padding: 8,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    boxShadow: "0px 8px 24px rgba(2,69,122,0.25)",
  },
  item: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 30,
  },
  active: {
    backgroundColor: colors.white,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.navy,
    marginTop: 2,
  },
});
