import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Image, FlatList } from 'react-native'
import { Surface } from 'react-native-paper'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { watchdata } from './FetchData'
import Separator from './Customized/Separator'
export default function Recommend() {
    //ScrollView is to make your specific elements scrollable. 
    //Becareful when using this to make a large amount of content scrollable, 
    //there are better ways to impliment that. 
    //This is for only small quantity to maintain performance
    const [watchlist, setWatchlist] = useState()
    useEffect(() => {
        const getWatchList = async () => {
            let watchlist = watchdata
            const updatedWatchList = watchlist.map(watch => {
                if (!watch.feedbacks || !Array.isArray(watch.feedbacks)) {
                    console.error('The feedbacks property is missing or not an array in watch with id:', watch.id);
                    return { ...watch, averageRating: 0 }; // if the watch have no feedback at all
                }
                const totalRating = watch.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
                const averageRating = watch.feedbacks.length > 0 ? (totalRating / watch.feedbacks.length).toFixed(1) : 0;
                return { ...watch, averageRating };
            });
            //kys
            setWatchlist(updatedWatchList.filter(watch => watch.averageRating >= 2))
        }
        getWatchList()
    }, [])
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
                    We Reccommend These Just For You</Text>
            </View>
            <FlatList
                horizontal={true}
                data={watchlist}
                renderItem={
                    //renderItem is like map()
                    //inside must be name item? WHY?
                    ({ item }) =>
                        <View style={{
                            borderRadius: 10,
                            marginBottom: 10,
                            marginTop: 10,
                        }}>
                            <Surface
                                elevation={2}
                                style={customizedStyles.imageFrame}
                            >
                                <Image
                                    style={customizedStyles.image}
                                    source={{ uri: item.image }}
                                />
                                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                                    <Text style={{ textAlign: 'center' }}>{item.watchName}</Text>
                                    <StarRatingDisplay color='red' starSize={20} rating={item.averageRating} maxStars={5} />
                                    <Separator />
                                </View>
                                <Text style={{color:"green"}}>Price: {item.price}$</Text>
                            </Surface>
                        </View>
                }
                keyExtractor={(image) => image.id}
            />
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
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        display: "flex",
        flexDirection: 'column',
        justifyContent: "flex-start",
        maxWidth: 210,
        minHeight: 280
    }
    ,
    image: {
        borderRadius: 10,
        width: 200,
        height: 200,
        objectFit: "cover"
    },
})
