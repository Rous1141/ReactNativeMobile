import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
export default function EnemiesProfile() {
    // A FlatList function similar to that of the ScrollView, though with better performance
    // By only render the elements only appear on the screen, the load time can sinificantly increase
    // By using FlatList, you have asscess to renderItem() prop. Function similar to object.map()
    const imageList = [
        { id: 0, url: "https://pm1.aminoapps.com/6315/1b8aa9131c54d6603563e27843e73ecb1e749b02_00.jpg" },
        { id: 1, url: "https://pbs.twimg.com/media/DGhkbcAUAAA9EZI?format=jpg&name=900x900" },
        { id: 2, url: "https://cdn.donmai.us/sample/a2/ac/__clownpiece_junko_and_hecatia_lapislazuli_touhou_drawn_by_daizu_melon_lemon__sample-a2ac7435b1148f0b0e3c98a95ffd2e8a.jpg" },
        { id: 3, url: "https://cdn.donmai.us/original/01/7c/__clownpiece_junko_and_hecatia_lapislazuli_touhou_drawn_by_sakikagami__017ca71c255a3585b0497677f5438bb7.png" },
        { id: 4, url: "https://cdn.donmai.us/sample/47/20/__clownpiece_junko_and_hecatia_lapislazuli_touhou_drawn_by_ikasoba__sample-47209da111b7058a7994d724339f4d84.jpg" },
    ]
    return (
        <View 
            style={{
            }}
        >
            <View>
                <Text style={customStyles.textHeader}>This is the face of our enemy</Text>
            </View>
            <FlatList
                horizontal={true}
                data={imageList}
                renderItem={
                    //renderItem is like map()
                    //inside must be name item? WHY?
                    ({ item }) =>
                        <View style={customStyles.imageFrame}>
                            <Image
                                style={customStyles.image}
                                source={{uri:item.url}}
                            />
                        </View>
                }
                keyExtractor={(image) => image.id}
            />
        </View>
    )
}
const customStyles = StyleSheet.create({
    textHeader: {
        color: 'black',
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: 30,
        fontWeight: "bold",
        textAlign:'center'
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
