import { View, Text, TouchableOpacity,StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function CustomButton({name}) {
    if(name===''){
        name = "lunarian"
    }
    const onPress = () => {
        alert(`Welcome, ${name}!`)
    }
    const onLongPress = () =>{
        alert(`You hold the button too long, but Welcome, ${name}! anyway...`)
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