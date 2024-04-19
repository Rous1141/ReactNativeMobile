import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TextInput, Button, Alert, ScrollView, Switch,ImageBackground } from 'react-native'
import Separator from './Customized/Separator'
import ProfileScroll from './ProfileScroll'
import EnemiesProfile from './EnemiesProfile'
export default function WelcomeScreen() {
    const [text, setText] = useState('')
    const [switchValue, setSwitchValue] = useState(false)
    return (
        <ScrollView vertical={true}>
            <ImageBackground
                style={customStyles.image}
                source={require('../assets/sagume.jpeg')}
            >
            <View style={customStyles.view}>
                <Text style={customStyles.textHeader}>
                    Lunarian's Constription
                </Text>
                <Text style={customStyles.textBody}>
                    Greeting, human of Earth. This is the almighty Lunarian Corps of the Moon. I'm Sagume Kishin, heron of lunatic, ambassidor of Watasuki's Clan. And I want you, to be a part of the Lunarian Army! We got cute lunar rabbits as the frontline units!
                </Text>
                <Separator />
                <View
                    style={customStyles.form}
                >
                    <TextInput
                        value={text}
                        onChangeText={(text) => setText(text)}
                        style={customStyles.textInput}
                        placeholder='Enter your name to participate...'
                    />
                    <Button
                        color="white"
                        title='Submit'
                        onPress={() => { Alert.alert(`You are: ${text}`);}}
                    />

                </View>
                <View
                    style={customStyles.switch}
                >
                    <Text
                        style={{
                            color: '#000000',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginRight:10
                        }}
                    >Want To Recieve Daily Reports?</Text>
                    <Switch
                        trackColor={{ false: "black", true: "cyan" }}
                        thumbColor={!switchValue ? "red" : "yellow"}
                        ios_backgroundColor="black"
                        onValueChange={(value) => { setSwitchValue(value) }}
                        value={switchValue}
                    />
                </View>
                <Separator />
                <ProfileScroll />
                <Separator />
                <EnemiesProfile/>
                <Separator />
            </View>
            </ImageBackground>
        </ScrollView>
    )
}
// Remember to import StyleSheet from native
// StyleSheet.create to create a custome style components like a separate CSS file
const customStyles = StyleSheet.create({
    view: {
        position: 'relative',
        backgroundColor: "rgba(144, 192, 223,0.5)",
        display: "flex",
        alignItems: 'center',
        width: '100%',
        height: "100%",
        paddingTop: "25%",
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
        height: "auto",
    },
    image: {
        width: 'auto',
        height: 1120,
        objectFit: 'cover',
    },
    form: {
    },
    textInput: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "black",
        borderRadius: 2,
        marginTop: 5,
        width: "70%",
        paddingLeft: "1%",
        height: 30,
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    switch:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:"center",
        justifyContent: 'space-evenly'
    }
})