import { View, Text,FlatList,Image,StyleSheet, Pressable,Animated } from 'react-native'
import React, { useState } from 'react'
import { lunar } from '../../assets/data/dummy'
import {flowers} from '../../assets/data/flowers'
import { CustomAlert } from './CustomAlert'
export default function FeaturedList() {
  const objectSelected = {
    name: "",
    description: "",
    image: "",
};
    const [selected,setSelected] = useState(objectSelected)
    const [open,setOpen] = useState(false)
    const [scaleValue] = useState(new Animated.Value(1));

  const onPressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 1.1, // Scale up
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1, // Scale back to normal
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
    const onLongPress = (selected)=>{
      setSelected(selected)
      onClose()
    }
    const onClose = ()=>{
      setOpen(!open)
    }

  return (
    <>
        <CustomAlert
          onClose={onClose}
          visible={open}
          title={selected.name}
          message={selected.description}
        />
        <View style={styles.container}>
            <FlatList
            horizontal={true}
            data={lunar}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Animated.View style={
                selected === item ?
                [styles.box, { transform: [{ scale: scaleValue }]}]
                :
                ""
                }>
                  <Pressable
                    onLongPress={()=>onLongPress(item)}
                    onPressIn={()=>onPressIn()}
                    onPressOut={()=>onPressOut()}
                  >
                      <View style={styles.card}>
                      <Image source={{ uri: item.image }} style={styles.image} />
                      </View>
                  </Pressable>
              </Animated.View>
            )}
            />
        </View>
      </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      marginBottom: 10,
    },
    card: {
      width:250,
      height:"auto",
      backgroundColor: "rgba(0,0,0,0.8)",
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 10,
      marginLeft: 10,
      justifyContent: "flex-start",
      alignItems: "center"
    },
    image: {
      width: "100%",
      height: 150,
      borderRadius: 8,
      marginBottom: 10,
      objectFit:"contain"
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      color: "ghostwhite"
    },
    description: {
      fontSize: 14,
      color: "lightgray"
    }
  });