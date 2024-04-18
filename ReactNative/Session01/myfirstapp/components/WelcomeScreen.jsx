import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
export default function WelcomeScreen() {
    const [text, setText] = useState('')
    return (
        <>
            <Image
                style={customStyles.image}
                source={require('../assets/sagume.jpeg')}
            />
            <View style={customStyles.view}>
                <Text style={customStyles.textHeader}>
                    Lunarian's Constription
                </Text>
                <Text style={customStyles.textBody}>
                    Greeting, human of Earth. This is the almighty Lunarian Corps of the Moon. I'm Sagume Kishin, heron of lunatic, ambassidor of Watasuki's Clan. And I want you, to be a part of the Lunarian Army! We got cute lunar rabbits as the frontline units!
                </Text>
                <TextInput
                    value={text}
                    onChangeText={(text) => setText(text)}
                    style={customStyles.textInput}
                    placeholder='Enter your name to participate...'
                />
                {text &&
                    (<Text>
                        {text}
                    </Text>)
                }

            </View>
        </>
    )
}
// Remember to import StyleSheet from native
// StyleSheet.create to create a custome style components like a separate CSS file
const customStyles = StyleSheet.create({
    view: {
        position: 'absolute',
        backgroundColor: "rgba(144, 192, 223,0.5)",
        display: "flex",
        alignItems: 'center',
        width: '100%',
        height: "100%",
        paddingTop: "50%",
    },
    textHeader: {
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: 30,
        marginBottom: "10%",
        fontWeight: "bold",
    },
    textBody: {
        paddingLeft: "2%",
        paddingRight: "2%",
        paddingTop: "10%",
        paddingBottom: "10%",
        backgroundColor: "rgba(144, 192, 223,0.7)",
        fontSize: 20,
        textAlign: "center",
        color: 'white',
        height: "auto"
    },
    image: {

    },
    textInput: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        border: "1px solid black",
        borderRadius: "2px",
        marginTop: "10%",
        width: "80%",
        paddingLeft:"1%"
    },
})