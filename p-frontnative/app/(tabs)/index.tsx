import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Main from "@/components/main";
import * as SecureStore from "expo-secure-store";
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function index() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     const token = await SecureStore.getItemAsync("access_token");
  //     setLoggedIn(token ? true : false);
  //     setLoading(false);
  //   };
  //   checkLoggedIn();
  // }, []);

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <Main />
    </View>
  );
}
