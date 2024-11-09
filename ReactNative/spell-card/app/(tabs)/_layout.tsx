import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
                headerStyle: {
                  backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                backgroundColor: '#25292e',
                },
              }}
        >
              <Tabs.Screen name="index"
               options={{ title: "Home Page",
                tabBarIcon:({color,focused})=>(
                    <Ionicons name = {focused? 'home-sharp' : 'home-outline'}
                    color={color}
                    size={24}
                    />
                )
                }} 
               
               />
              <Tabs.Screen
               name="aboutus"
                options={{ title: "About Us",
                    tabBarIcon:({color,focused})=>(
                        <Ionicons name = {focused? 'information-circle' : 'information-circle-outline'}
                        color={color}
                        size={24}
                        />
                    )
                 }} />
        </Tabs>
    )
}
