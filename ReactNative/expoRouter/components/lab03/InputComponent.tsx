import { View, Text,StyleSheet, TextInput } from 'react-native'
import {useState} from 'react'

export default function InputComponent() {
    const [text, setText] = useState('');

  return (
    <View>
      <TextInput
    style={styles.input}
    placeholder="Search By Name..."
    onChangeText={(text) => setText(text)}
    placeholderTextColor={"gray"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input:{
        width: 300,
        borderColor: 'ghostwhite',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        fontSize: 18,
        color: 'ghostwhite',
        margin:"auto",
        backgroundColor:"rgba(0, 0, 0, 0.8)"
    },
  

})