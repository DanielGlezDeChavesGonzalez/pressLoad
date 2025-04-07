import { Stack } from "expo-router";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}>
      <Tabs.Screen
        name='index'
        options={{ title: "Home" }}
      />
      <Tabs.Screen
        name='mealTracker'
        options={{ title: "Meal Tracker" }}
      />
      <Tabs.Screen
        name='routineTracker'
        options={{ title: "Routine Tracker" }}
      />
      <Tabs.Screen
        name='profile'
        options={{ title: "Profile" }}
      />
    </Tabs>
  );
}
