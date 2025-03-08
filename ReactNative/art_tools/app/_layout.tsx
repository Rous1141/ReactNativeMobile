import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useRouter } from 'expo-router'
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
   useEffect(() => {
    // Prevent the splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync();
  }, []);
  const onLayoutRootView = async () => {
    // Hide the splash screen once the root view has been laid out
    await SplashScreen.hideAsync();
  };


    const  navigation  = useRouter();
  return(
    <SafeAreaProvider>
    <Stack
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen
        name="index"
        redirect={true}
        options={{
          
        }}
        />
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Home",
        }}
      />
       <Stack.Screen
        name="details"
      />
    </Stack>
    <Toast/>
    </SafeAreaProvider>
    
  )
}

const styles  =StyleSheet.create({
 
})