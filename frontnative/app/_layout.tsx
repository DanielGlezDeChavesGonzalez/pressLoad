import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemeProvider from "@/context/theme.context";
import { Link, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function _layout() {
  const pathname = usePathname();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={{ theme: "dark" }}>
        <Stack
          screenOptions={{
            headerShown: true,
            headerTitle: pathname === "/about" ? "About" : "pressLoad", // Cambia el título dinámicamente
            contentStyle: { backgroundColor: "#7387a4" },
            headerStyle: {
              backgroundColor: "#355a8e",
            },
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: "bold",
              color: "#fff",
            },
            headerRight: () =>
              pathname !== "/about" && ( // Ocultar icono en la página About
                <Link
                  asChild
                  href="/about"
                >
                  <Pressable>
                    <FontAwesome5
                      name="info-circle"
                      size={24}
                      color="black"
                    />
                  </Pressable>
                </Link>
              ),
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="about" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
