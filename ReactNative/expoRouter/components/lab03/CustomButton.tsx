import { View, Text,StyleSheet, Pressable } from 'react-native'
import {router, useRouter} from 'expo-router'
import React from 'react'

interface Props{
    name: string;
}

export default function CustomButton({name}:Props) {
    if(name===''){
        name = "lunarian"
    }
    const nav = useRouter()
    const navigate = (alert? : string) =>{
        nav.navigate({
            pathname:`./enlist/(tabs)/`,
            params:{
                user:name,
                extra: alert,
            }
        })
    }
    
    const onPress = () => {
        alert(`Welcome, ${name}!`)
        navigate()
    }
    const onLongPress = () =>{
        alert(`You hold the button too long, but Welcome, ${name}! anyway...`)
        navigate("You pressed too long huh?")
    }
  return (
    <View>
        <Pressable
            onPress={()=>onPress()}
            onLongPress={()=>onLongPress()}
        >
            <Text
                style={styles.button}
            >Enlist Now</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    ,
    button: {
        textAlign: 'center',
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 10,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})