import React, { useState } from 'react'
import { View,Text,Button,StyleSheet } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { BottomNavigation } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import WelcomeScreen from './WelcomeScreen'
import Detail from './Detail'
import Favorite from './Favorite'

export default function Navigator() {
    const [index,setIndex] = useState(0)
    const [routes] = useState(
        [
            {key: 'home',title:'Home',focusedIcon:'home',unfocusedIcon: 'home-outline'},
            {key: 'detail',title:'Detail',focusedIcon:'watch',unfocusedIcon: 'watch-variant'},
            {key: 'favorite',title:'Favorite',focusedIcon:'heart',unfocusedIcon: 'heart-outline'},
        ]
    )
    const renderScene = BottomNavigation.SceneMap({
        home: WelcomeScreen,
        detail: Detail,
        favorite: Favorite,
    })
  return (
    <>
        <BottomNavigation
            navigationState={{index,routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    </>
  )
}