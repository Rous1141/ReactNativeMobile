import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
export default function ProfileScroll() {
    //ScrollView is to make your specific elements scrollable. 
    //Becareful when using this to make a large amount of content scrollable, 
    //there are better ways to impliment that. 
    //This is for only small quantity to maintain performance
    const imageList = []
    return (
        <ScrollView>
            <View>
                <Text
                    style={customizedStyles.textHeader}
                >
                    Here is what we look like!</Text>
            </View>
            <ScrollView horizontal={true} vertical={true}>
                
            </ScrollView>
        </ScrollView>
    )
}
const customizedStyles = StyleSheet.create({
    textHeader: {
        color:'black',
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: 30,
        marginBottom: "10%",
        fontWeight: "bold",
    },
})
