import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)/foodRegister"
          options={{ title: "Food Register" }}
        />
        <Stack.Screen
          name="(tabs)/routineRegister"
          options={{ title: "Routine Register" }}
        />
        <Stack.Screen name="(tabs)/profile" options={{ title: "Profile" }} />
        <Stack.Screen name="(tabs)/routines" options={{ title: "Routines" }} />
      </Stack>
    </View>
  );
}
