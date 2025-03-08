import { ImageBackground ,StyleSheet} from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import EnlistTabs from './(tabs)/_layout'

export default function _layout() {
  return (
   
    <Stack
        screenOptions={{
            headerShown: false,
            headerStyle:{
                backgroundColor:"rgb(139, 160, 255)",
            }
        }}
    >  
      <Stack.Screen
          name='details'
          options={{
            headerShown: true,
            title: "Details",
          }}
          />
      
    </Stack>
 
  )
}
