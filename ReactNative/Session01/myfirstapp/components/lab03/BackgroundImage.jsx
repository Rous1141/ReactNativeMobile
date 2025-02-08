import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

export default function BackgroundImage({...props}) {
  return (
    <View>
      <ImageBackground
        source={{uri:"https://w0.peakpx.com/wallpaper/400/844/HD-wallpaper-two-moons-moons-cloud-sky-two.jpg"}}
      >
        {...props}
      </ImageBackground>
    </View>
  )
}