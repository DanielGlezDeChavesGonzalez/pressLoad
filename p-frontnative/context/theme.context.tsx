import { View, Text, useColorScheme } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LightTheme = {
  dark: false,
  colors: {
    background: "#ffffff",
    text: "#000000",
    // primary: "#6200ee",
    // card: "#f8f8f8",
    // border: "#cccccc",
    // notification: "#ff80ab",
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    background: "#121212",
    text: "#ffffff",
    // primary: "#bb86fc",
    // card: "#1f1f1f",
    // border: "#333333",
    // notification: "#ff80ab",
  },
};

const ThemeContext = createContext({
  theme: LightTheme,
  toggleTheme: () => {},
});

export default function ThemeProvider({ children } : any) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme === "dark" ? DarkTheme : LightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme === "dark" ? DarkTheme : LightTheme);
      } else {
        setTheme(systemColorScheme === "dark" ? DarkTheme : LightTheme);
      }
    }
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme.dark ? LightTheme : DarkTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme.dark ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
