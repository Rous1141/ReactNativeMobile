import { View, Text,StyleSheet, TextInput } from 'react-native'
import {React, useState} from 'react'
import CustomButton from './CustomButton';

export default function InputName() {
    const [name, setName] = useState('');
    const onChange = (text)=>{
        setName(text)
    }
  return (
    <View style={styles.container}>
      <TextInput
            placeholder='Enter your name...'
            style={styles.input}
            onChangeText={(text)=>onChange(text)}
            placeholderTextColor="gray"
      />
      <CustomButton
        name={name}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    input:{
        width: 200,
        borderColor: 'cyan',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        fontSize: 18,
        color: 'white',
        margin:"auto",
        backgroundColor: "rgba(0,0,0,0.8)",
    }

})