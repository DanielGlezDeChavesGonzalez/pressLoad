import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#888",
        headerPressColor: "transparent",
        tabBarStyle: {
          position: "absolute",
          margin: 10,
          borderTopWidth: 0,
          borderRadius: 20,
          backgroundColor: "#4e698f",
        },
        tabBarIconStyle: {
          margin: 5,
        },
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="home"
              size={30}
              color={color}
            />
          ),
          // href: "/",
        }}
      />
      <Tabs.Screen
        name="macros"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name="bowl-food"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="dumbbell"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="user-alt"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

{
  /* 
  <Feather name="info" size={24} color="black" /> 
  <Feather name="heart" size={24} color="black" />
  <Feather name="log-out" size={24} color="black" />
  <Feather name="menu" size={24} color="black" />
  <Feather name="plus" size={24} color="black" />
  <Feather name="trash" size={24} color="black" />
  */
}

const styles = StyleSheet.create({});
