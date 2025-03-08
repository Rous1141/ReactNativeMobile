import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Home from "./index";  // Adjust paths based on your project structure
import Favorite from "./favorite";  

const Tab = createMaterialTopTabNavigator();

export default function Layout() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: "white" },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarIndicatorStyle: { backgroundColor: route.name === "Favorite" ? "red" : "blue", height: 3 },
          tabBarInactiveTintColor: "black",
          tabBarActiveTintColor: route.name === "Favorite" ? "red" : "blue",
          tabBarIcon: ({ focused }) => {
            let iconName: "home" | "hearto" | undefined;
            let color = focused ? (route.name === "Favorite" ? "red" : "blue") : "black";

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Favorite") {
              iconName = "hearto";
            }
            return iconName ? <AntDesign name={iconName} size={24} color={color} /> : <React.Fragment />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorite" component={Favorite} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
