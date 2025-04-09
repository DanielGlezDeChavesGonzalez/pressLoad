import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          borderTopWidth: 0,
          backgroundColor: "#4e698f",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color }}>Index</Text>,
          // href: "/",
        }}
      />
      <Tabs.Screen
        name="macros"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color }}>Macros</Text>,
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color }}>Routines</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color }}>Profile</Text>,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
