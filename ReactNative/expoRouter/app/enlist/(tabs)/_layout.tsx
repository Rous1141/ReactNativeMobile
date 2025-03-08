
import React from 'react'
import { Tabs, useGlobalSearchParams } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function EnlistTabs() {
  return (
   <>
   <Tabs
      screenOptions={{
        headerShown: true,
       headerStyle:{
        height: 50,
       }
      }}
   >
    <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color="black" />,
        }}
    />
     <Tabs.Screen
        name= {`favorite`}
        options={{
          href: `./favorite`,
          title: `Favorite`,
          tabBarIcon: ({ color }) => <AntDesign name="heart" size={24} color="black" />
        }}
    />
     <Tabs.Screen
        name='about'
        options={{
          href:"./about",
          title: 'About',
          tabBarIcon: ({ color }) => <MaterialIcons name="info" size={24} color="black" />
        }}
    />
     <Tabs.Screen
        name= {`profile`}
        options={{
          href: `./profile`,
          title: `Profile`,
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color="black" />
        }}
    />
    </Tabs>
    </>
  )
}