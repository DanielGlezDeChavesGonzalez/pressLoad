import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Dimensions } from "react-native";

//react native paper y victoy charts

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

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
    <View style={{ flex: 1, backgroundColor: "#7387a4" }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <View style={styles.card}>
            <Text style={styles.titleText}>Macros</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.titleText}>Routines</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.titleText}>Profile Summary</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#46505f",
    borderRadius: 30,
    marginBottom: 10,
  },
  titleText: {
    position: "absolute",
    top: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
