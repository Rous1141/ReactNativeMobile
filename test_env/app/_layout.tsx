 
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  )
}