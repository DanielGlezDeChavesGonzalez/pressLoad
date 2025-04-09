import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Main() {
  return (
    <View style={{ flex: 1, backgroundColor: "#7387a4" }}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 20,
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
    marginBottom: 20,
  },
  titleText: {
    position: "absolute",
    top: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
