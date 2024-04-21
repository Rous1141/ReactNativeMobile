import React from 'react'
import { View,Text } from 'react-native'
export default function Header() {
  return (
    <View style={{
      position: 'absolute',
      display:"flex",
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height:80,
      top:0,
    }}>
        <Text style={{
          position: 'absolute',
          bottom:10,
          color:"white",
        }}>
            Navigation Bar
        </Text>
    </View>
  )
}
