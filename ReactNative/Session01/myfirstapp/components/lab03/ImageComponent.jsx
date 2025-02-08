import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'

export default function ImageComponent() {
  return (
    <View 
        style={styles.imageView}
    >
      <Image 
        source={
            require("../../assets/sagume.jpeg")
            // {
            //uri:'https://images.unsplash.com/photo-1463043254199-7a3efd782ad1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            // }
            }
        style={styles.landingImage}
      />
      <Text style={styles.header}>Copyrights@: Commissioned By Kishin Sagume</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    imageView:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"rgba(0, 0, 0, 0.6)",
        padding: 10,
        marginBottom: 10,
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        top: 0,
    },
    landingImage:{
      width: 200,
      height: 200,
     marginBottom: 5,
     borderRadius: 5,
    },
    header:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: 10,
  }
    
  }
)