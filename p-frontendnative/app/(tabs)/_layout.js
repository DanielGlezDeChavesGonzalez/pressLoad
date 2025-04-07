import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="routinesRegister"
        options={{
          title: "Routines",
        }}
      />
      <Tabs.Screen
        name="foodRegister"
        options={{
          title: "Meals",
        }}
      />
    </Tabs>
  );
}
