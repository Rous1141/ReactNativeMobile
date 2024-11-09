import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TextInput, Button, Alert, ScrollView, Switch, ImageBackground } from 'react-native'
import { Searchbar } from 'react-native-paper'
import Separator from './Customized/Separator'
import Recommend from './Recommend'
import WatchList from './WatchList'
import Footer from './Footer'
export default function WelcomeScreen() {
    const [text, setText] = useState('')
    const [searchValue, setSearchValue] = useState('')
    return (
        <ScrollView vertical={true}>
            {/* <ImageBackground
                style={customStyles.image}
                source={require('../assets/watchCollection.jpg')}
            > */}
            <View style={customStyles.view}>
                <Text style={customStyles.textHeader}>Find The Best Watches For You!</Text>
                <Searchbar
                    style={customStyles.searchbar}
                    placeholder="Search Something You Like..."
                    onChangeText={setSearchValue}
                    value={searchValue}
                    mode='bar' />

                <Separator />

                <Recommend />
                <Separator />
                <WatchList />
                <Separator />
                <View
                    style={customStyles.form}
                >
                    <TextInput
                        value={text}
                        onChangeText={(text) => setText(text)}
                        style={customStyles.textInput}
                        placeholder='Enter your name to participate in our newsletter...'
                    />
                    <Button
                        color="white"
                        title='Submit'
                        onPress={() => { Alert.alert(`You are: ${text}`); }}
                    />

                </View>

            </View>
            {/* </ImageBackground> */}
            <Footer />
        </ScrollView>
    )
}
// Remember to import StyleSheet from native
// StyleSheet.create to create a custome style components like a separate CSS file
const customStyles = StyleSheet.create({
    view: {
        position: 'relative',
        display: "flex",
        width: '100%',
        height: "100%",
        paddingTop: "25%",
        alignItems: "center",
    },
    searchbar: {
        width: "90%",
    },
    textHeader: {
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: 30,
        marginBottom: "5%",
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
        height: 1050,
        objectFit: 'contain',
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
    switch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-evenly'
    }
})