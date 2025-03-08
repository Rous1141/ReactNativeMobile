import { View, Text } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'

export default function LoadingScreen() {
  return (
    <View>
      <Image
      style={{ width: '100%', height: '100%', resizeMode: 'cover',opacity:0.8 }}  // This will stretch the image to cover the full screen
            source={require('@/assets/images/loading.gif')}
      />
    </View>
  )
}