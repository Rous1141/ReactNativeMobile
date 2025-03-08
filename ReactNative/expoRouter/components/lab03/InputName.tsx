import { View, Text,StyleSheet, TextInput,Pressable } from 'react-native'
import {SetStateAction, useState} from 'react'


interface onPressButtonProps{
  onPressButton: (name:string,message:string)=>void;
}
export default function InputField({onPressButton}:onPressButtonProps) {
    const [name, setName] = useState('');
    const onChange = (text: SetStateAction<string>)=>{
        setName(text)
    }
  const onPress = () => {
      alert(`Welcome, ${name}!`)
      onPressButton(name,"")
  }
  const onLongPress = () =>{
      alert(`You hold the button too long, but Welcome, ${name}! anyway...`)
      onPressButton(name,"Long Button Holder");
  }

  return (
    <View style={styles.container}>
      <TextInput
            placeholder='Enter your name...'
            style={styles.input}
            onChangeText={(text)=>onChange(text)}
            placeholderTextColor="gray"
      />
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
    },
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