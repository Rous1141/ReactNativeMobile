import React from "react";
import { View, Dimensions } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Layout() {
  const router = useRouter();
  const translateX = useSharedValue(0);

  // Handle Swipe Gestures
  const handleSwipe = (event: any) => {
    const { translationX, state } = event.nativeEvent;

    if (state === State.ACTIVE) {
      translateX.value = translationX; // Move tab while swiping
    } else if (state === State.END) {
      // Animate back to center
      if (Math.abs(translationX) < 10) {
        translateX.value = withTiming(0);
        return;
      }

      if (translationX < -10) {
        router.push("/favorite"); // Swipe Left → Next Tab
      } else if (translationX > 10) {
        router.push("/"); // Swipe Right → Previous Tab
      }
      translateX.value = withTiming(0); // Reset position after navigation
    }
  };

  // Animated Style for Swipe Transition
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(translateX.value*2, { duration: 100 }) }],
  }));

  return (
    <PanGestureHandler
      onGestureEvent={handleSwipe}
      onHandlerStateChange={handleSwipe}
      activeOffsetX={[-SCREEN_WIDTH * 0.2, SCREEN_WIDTH * 0.2]}
    >
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <Tabs screenOptions={{ tabBarInactiveTintColor: "black" }}>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarActiveTintColor: "blue",
              tabBarIcon: ({ focused }) => (
                <AntDesign name="home" size={24} color={focused ? "blue" : "black"} />
              ),
            }}
          />
          <Tabs.Screen
            name="favorite"
            options={{
              title: "Favorite",
              tabBarActiveTintColor: "red",
              tabBarIcon: ({ focused }) => (
                <AntDesign name="hearto" size={24} color={focused ? "red" : "black"} />
              ),
            }}
          />
        </Tabs>
      </Animated.View>
    </PanGestureHandler>
  );
}
