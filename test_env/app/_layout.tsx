 
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";


export default function RootLayout() {
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