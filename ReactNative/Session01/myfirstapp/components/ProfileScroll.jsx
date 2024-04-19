import React from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
export default function ProfileScroll() {
    //ScrollView is to make your specific elements scrollable. 
    //Becareful when using this to make a large amount of content scrollable, 
    //there are better ways to impliment that. 
    //This is for only small quantity to maintain performance
    const imageList = [
        "../assets/scrollview/lunacrops.png",
        "../assets/scrollview/lunarabbits.jpg",
        "../assets/scrollview/watastuki2.jpg",
        "../assets/scrollview/watatsuki.jpeg",
        "../assets/scrollview/watatsuki3.jpeg"
    ]
    return (
        <View 
            style={{
                height: 'auto',
                width: '100%',
            }}
        >
            <View>
                <Text
                    style={customizedStyles.textHeader}
                >
                    Here is what we look like!</Text>
            </View>
            <ScrollView horizontal={true}>
                <View style={customizedStyles.imageFrame}>
                    <Image
                        style={customizedStyles.image}
                        source={require('../assets/scrollview/lunacrops.png')}
                    />
                </View>
                <View style={customizedStyles.imageFrame}>
                    <Image
                        style={customizedStyles.image}
                        source={require('../assets/scrollview/lunarabbits.jpg')}
                    />
                </View>
                <View style={customizedStyles.imageFrame}>
                    <Image
                        style={customizedStyles.image}
                        source={require('../assets/scrollview/watastuki2.jpg')}
                    />
                </View>
                <View style={customizedStyles.imageFrame}>
                    <Image
                        style={customizedStyles.image}
                        source={require('../assets/scrollview/watatsuki.jpeg')}
                    />
                </View>
                <View style={customizedStyles.imageFrame}>
                    <Image
                        style={customizedStyles.image}
                        source={require('../assets/scrollview/watatsuki3.jpeg')}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
const customizedStyles = StyleSheet.create({
    textHeader: {
        color: 'black',
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: 30,
        fontWeight: "bold",
    },
    imageFrame: {
        marginLeft: 5,
        marginRight: 5,
    }
    ,
    image: {
        width: 200,
        height: 200,
        objectFit:"cover"
    },
})
