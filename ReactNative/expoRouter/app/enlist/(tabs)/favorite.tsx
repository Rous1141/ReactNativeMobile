import { View, Text,Image,Pressable,StyleSheet,ImageBackground, FlatList } from 'react-native'
import React,{useCallback,useState} from 'react'
import { useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lunar } from '../../../assets/data/dummy.js';

interface FavoriteProps {
  id: string,
  name: string,
  image: string,
  description: string,
  tags:string[]
}

export default function favorite() {
  const [favorite,setFavorite] = useState<FavoriteProps[]>([])
  
      const fetchData = async()=>{
      // LocalData is an array of ids
        const localData = await AsyncStorage.getItem("favorite");
        if (localData) {
          setFavorite(JSON.parse(localData));
        } else {
          setFavorite(lunar);
        }
      }
      // useFocusEffect is a special hook to detect if THIS screen is focused
  useFocusEffect(
    useCallback(()=>{
      fetchData()
    },[])
  )

   const nav = useRouter();
    const onNavigate = (id:string)=>{
      nav.navigate(`../../enlist/details?id=${id}`,{
      }
      )
    }

  const favoriteView = () => {
    return (
      <View 
        style={{padding:15}}
      >
      
       <GridView/>

      </View>
    )
  }
  function GridView(){
    return(
      <FlatList
        numColumns={2}
        data={favorite}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: FavoriteProps })=>{
          return (
            <View
            style={styles.container}
          key={item.id}>
                      <Pressable
                        onPress={()=>onNavigate(item.id)}
                      >
                          <View key={item.id} style={styles.card}>
                          <Image source={{ uri: item.image }} style={styles.image} />
                           <Text style={styles.nameText}>{item.name}</Text>
                          </View>
                      </Pressable>
                  </View>
          )
        }}
      >
      </FlatList>
    )
  }

  
  const emptyView = () => {
    return (
      <View
        style={styles.empty_view}>
        <Image
          style={styles.empty_image}
          source={require("../../../assets/rabbit_frown.png")}
        />
        <Text
          style={styles.empty_text}
        >You Have No Favorite Authorian... Shame</Text>
      </View>
    )
  }

  return (
      <ImageBackground
          source={{uri:"https://w0.peakpx.com/wallpaper/400/844/HD-wallpaper-two-moons-moons-cloud-sky-two.jpg"}}
          style={styles.background}
                        >
    <View>
      {favorite.length > 0 ? favoriteView() : emptyView()}
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginVertical: 10,
      marginHorizontal:10,
      width:150,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    card: {
      width:"auto",
      height:"auto",
      backgroundColor: "rgba(252, 190, 172, 0.8)",
      padding: 5,
      borderRadius: 10,
      justifyContent: "flex-start",
      alignItems: "center"
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 8,
      objectFit:"cover",
      marginBottom:10
    },
    nameText:{
      textAlign: "center",
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
      color: "blue"
    },
    empty_image:{
      width: "100%",
      height: 150,
      borderRadius: 8,
      objectFit:"contain",
      backgroundColor:"rgba(0,0,0,0.8)"
    },
    empty_text:{
      textAlign: "center",
      color:"white",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      padding: 10,
      backgroundColor:"rgba(0, 0, 0, 0.8)"
    },
    empty_view:{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50
    },
    background: {
      width: 'auto',
      height:"100%",
      objectFit: 'cover',
      marginBottom:20
    },
  });

