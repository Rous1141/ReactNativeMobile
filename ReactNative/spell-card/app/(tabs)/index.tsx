import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker'
import { useState } from "react";
const placeHolderImages = require("@/assets/images/background-image.png")
export default function Index() {
  const [selectedImage,setSelectedImage] = useState<string|undefined>(undefined);


  const chooseImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true, // User cna crop image before sent
      quality:1
    })

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri) // result is an array of selectio  or undefined
    }else{
      alert("You did not choose any image")
    }
  }
  
  return (
    <View
    style= {styles.container}
    >
      <ImageViewer
        imgSource={placeHolderImages}
        selectedImage={selectedImage}
      />
      <Button
      onPress={chooseImage}
        theme="primary"
        label={"Select A Photo"}
      />
       <Button
        label={"Use This Photo"}
      />
    

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e"
  },
  text: {
    fontSize: 30,
    color: "white",
    textAlign:"center"
  },
  button:{
    marginTop: 20,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
  },
})