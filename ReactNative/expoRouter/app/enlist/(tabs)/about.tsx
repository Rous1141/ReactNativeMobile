import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function About() {
  return (
    <View
    >
      <Image
         style={styles.image}
        source={require('../../../assets/flirt.jpg')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    width: "100%",
    height:"100%",
    objectFit:"fill"
  }
})