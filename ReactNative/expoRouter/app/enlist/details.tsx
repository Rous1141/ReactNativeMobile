import { View, Text,StyleSheet,Image, Pressable,ImageBackground, FlatList } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { lunar } from '../../assets/data/dummy.js'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

interface favoriteProps {
  id: string,
  name: string,
  image: string,
  description: string,
  tags:string[]
}

export default function Details() {
    const {id} = useLocalSearchParams<{id:string}>()
    const [item,setItem] = React.useState<favoriteProps>(lunar[0])
    const [likeColor, setLikeColor] = useState("black");
    const [heartColor, setHeartColor] = useState("red");
    const [commentColor, setCommentColor] = useState("black");
    const [isLike, setIsLike] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const nav = useRouter();
    useEffect(()=>{
      const checkFavorite = async () => {
        const foundItem = lunar.find((item:favoriteProps) => id == item.id);
        if(foundItem){
          const favoriteData:favoriteProps[] = JSON.parse(await AsyncStorage.getItem('favorite') || '[]')
          //console.log("Favorite List: ",favoriteData)
          const isFavorite = favoriteData.find((item:favoriteProps)=> item.id === foundItem.id)
          //console.log("In Favorite List? ",isFavorite)
          if(isFavorite){
            setIsFavorite(true)
          }else{
            setIsFavorite(false)
          }
        }
         setItem(foundItem ? foundItem : lunar[0]);
      }
        checkFavorite()
    },[])
   
  const addFavorite = async() => {
    let updatedFavorite = !isFavorite;
    setIsFavorite(updatedFavorite); // Update UI first
   
    if(updatedFavorite){
      //console.log("Adding Favorite: "+isFavorite)
      successToast()
      await saveToFavorites()
    }else{
      //console.log("Removing Favorite: "+isFavorite)
      failedToast()
      await removeFavorite()
    }
  }
  const onLikePress = () => {
    setIsLike(!isLike)
  }
  const navToFavorite = () =>{
    nav.replace("./favorite")
  }
  const successToast = () => {
    Toast.show({
      text1: 'Added to Favorites',
      text2: 'Press To Go To Favorite Tab?',
      text2Style:{
        textDecorationLine:"underline",
        fontStyle:"italic"
      },
      onPress:()=>navToFavorite(),
      swipeable: true,
      type: 'success',
      position: 'bottom',
      visibilityTime:3000
    }
  )
  }
  const failedToast = () => {
    Toast.show({
      text1: 'Removed from Favorites',
      type: 'error',
      position: 'bottom',
      visibilityTime:1000,
      swipeable:true
    }
  )
  }

  const saveToFavorites = async() => {
    const data = await AsyncStorage.getItem('favorite')
    const favoriteList = data ? JSON.parse(data) : [];
    if (!favoriteList.includes(item)) {
      favoriteList.push(item);
      AsyncStorage.setItem('favorite', JSON.stringify(favoriteList));
      //console.log("Added to Favorites: "+item)
    }
  }
  const removeFavorite = async () => {
    const data = await AsyncStorage.getItem('favorite')
    const favoriteList = data ? JSON.parse(data) : [];
    const newFavoriteList = favoriteList.filter((fav:favoriteProps) => fav.id !== item.id);
    AsyncStorage.setItem('favorite', JSON.stringify(newFavoriteList));
    //console.log("Removed from Favorites: "+item)
  }
    
  
  return (
    <>
     <ImageBackground
                        source={{uri:"https://w0.peakpx.com/wallpaper/400/844/HD-wallpaper-two-moons-moons-cloud-sky-two.jpg"}}
                        style={styles.background}
      >
    <View
        style={{
            padding:15,
            flex:1
        }}
    >

        <View style={styles.container}>
            <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={[
              styles.description,{
                marginTop:10,
                fontWeight:"bold",
                fontSize:16,
              }
            ]}
            >
              Relevent Tags:
            </Text>
            <View
              style={styles.tag_container}
            >
            {
             <FlatList
             numColumns={3}
             data={item.tags}
             keyExtractor={(item) => item}
             renderItem={(tags)=>{
               return (
                 <Text style={styles.tag}>#{tags.item}</Text>
               )
              }}
             />
            }
            </View>
            </View>   
        </View>
       
        <View style={styles.button_container}>
            <Pressable
              onPressIn={() => setLikeColor("lightblue")}
              onPressOut={() => setLikeColor("black")}
              onPress={()=>{onLikePress()}}
            >
               <AntDesign name="like1" size={24} color={isLike? "blue": likeColor} />
            </Pressable>
            <Pressable
               onPressIn={() => setHeartColor("pink")}
               onPressOut={() => setHeartColor("red")}
               onPress={()=>{addFavorite()}}
            >
              {isFavorite?
               <AntDesign name="heart" size={24} color={heartColor} />
              :
              <AntDesign name="hearto" size={24} color={"black"} />
              }
            </Pressable>
            <Pressable
              onPressIn={() => setCommentColor("gray")}
              onPressOut={() => setCommentColor("black")}
            >
              <FontAwesome name="comments" size={24} color={commentColor} />
              </Pressable>
        </View>
    </View>
    </ImageBackground>
    </>
  )
}


const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      paddingHorizontal: 50,
    },
    card: {
      width:350,
      height:"auto",
      padding: 15,
      borderRadius: 5,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
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
      color: "black"
    },
    description: {
      fontSize: 14,
      color: "black"
    },
    tag_container:{
      width:"100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop:10,
      marginBottom: 10,
      padding:10,
      backgroundColor: "rgba(255, 255, 255,0.8)",
      borderRadius: 10,
    },
    tag:{
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 5,
      color: "blue",
      fontSize: 12,
      marginHorizontal: 5,
      fontStyle:"italic",
    },
    button_container:{
        bottom: 0,
        width: "50%",
        alignSelf:"center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "auto",
        backgroundColor: "rgb(255, 255, 255)",
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
    },
    background: {
      width: 'auto',
      height:"100%",
      objectFit: 'cover',
      marginBottom:20
    },
  });