import { View,ScrollView,StyleSheet,ImageBackground } from 'react-native'
import {useRouter} from 'expo-router'
import React from 'react'
import InputName from '../components/lab03/InputName'
import ImageComponent from '../components/lab03/ImageComponent'

export default function Index() {
        const nav = useRouter()
    function onPressButton(name:string,message:string) {
        nav.navigate({
            pathname:`./enlist/(tabs)/`,
            params:{
                user:name,
                message: message,
            }
        })
    }
  return (
    <ScrollView 
        showsVerticalScrollIndicator={true}
        style={{flex:1}}
    >
         <ImageBackground
            source={{uri:"https://w0.peakpx.com/wallpaper/400/844/HD-wallpaper-two-moons-moons-cloud-sky-two.jpg"}}
            style={styles.background}
        >
        <View
        style={styles.container}>
            <View style={styles.header}/>
            <InputName
                onPressButton={onPressButton}
            />
        </View>
        <View 
            style={styles.footer}>
        <ImageComponent/>
        </View>
        </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:"auto",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        paddingTop: 20,
        paddingBottom: 20,
    },
    header:{
    },
    footer:{
        position: 'absolute',
        display:"flex",
        bottom: 0,
        left: 0,
        right: 0,
    },
    background: {
        width: 'auto',
        height:"100%",
        minHeight:600,
        objectFit: 'fill',
    },
})