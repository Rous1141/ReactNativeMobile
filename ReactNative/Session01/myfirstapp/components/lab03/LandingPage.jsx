import { View, Text,ScrollView,StyleSheet,ImageBackground } from 'react-native'
import React from 'react'
import ImageComponent from './ImageComponent'
import InputComponent from './InputComponent'
import FeaturedList from './FeaturedList'
import CustomButton from './CustomButton'
import InputName from './InputName'
export default function LandingPage() {
  return (
    
    <ScrollView vertical={true}>
         <ImageBackground
            source={{uri:"https://w0.peakpx.com/wallpaper/400/844/HD-wallpaper-two-moons-moons-cloud-sky-two.jpg"}}
            style={styles.background}
        >
        <View
        style={styles.container}>
            <Text style={styles.header}>Lunarian Corps Enlistment</Text>
            <InputComponent/>
            <FeaturedList/>
            <InputName/>
        </View>
        <ImageComponent/>
        </ImageBackground>
        </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:"auto"
    },
    header:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"rgba(255, 255, 255, 0.8)",
        padding: 10,
        marginBottom: 10,
        width: '100%',
        height: 50,
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 20,
    },
    background: {
        width: 'auto',
        height:"auto",
        minHeight:600,
        objectFit: 'fill',
    },
})