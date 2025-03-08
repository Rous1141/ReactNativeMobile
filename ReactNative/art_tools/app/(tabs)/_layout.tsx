
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function _layouts() {

  return (
    <Tabs>
        <Tabs.Screen name="index" 
        
        options={{
                title: "Home",
                href:"./",
                tabBarIcon: () => <AntDesign name="home" size={24} color="black" />
                
            }}
            />
        <Tabs.Screen name="favorite"
        
        options={{
                headerShown: true,
                title: "Favorite",
                href:"./favorite",
                tabBarIcon: () =><AntDesign name="hearto" size={24} color="black" /> 
        }}
        />
    </Tabs>
  )
}