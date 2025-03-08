import { View, Text, Pressable,StyleSheet, FlatList,ImageBackground,Image,Button } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useRouter,useNavigation } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { lunar } from '../../../assets/data/dummy.js'
import { CustomTagsFilter } from '../../../components/lab03/CustomTagsFilter';
export default function Index() {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [lunarList, setLunarList] = useState(lunar);
  const [filterTag, setFilterTag] = useState("")
  const navigation = useNavigation();
  const nav = useRouter();
  const onNavigate = (id:string)=>{
    nav.navigate(`../enlist/details?id=${id}`,{
    }
    )
  }
  const setFilterView =() => {
    setFilterVisible(!isFilterVisible)
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
        <Pressable
          style={styles.filterButton}
        onPress={() => setFilterView()}>
          <MaterialCommunityIcons name="filter-menu-outline" size={20} color="black" />
        </Pressable>
        </>
      ),
    });
  }, [navigation]);
  useEffect(()=>{
    if(filterTag !== ""){
      console.log("Filter on: "+filterTag)
      const filterList = lunar.filter((item)=>item.tags.includes(filterTag))
      setLunarList(filterList)
    }
    else{
      console.log("Filter off")
      setLunarList(lunar)
    }
  },[filterTag])
  return (
      <ImageBackground
                    source={{uri:"https://w0.peakpx.com/wallpaper/400/844/HD-wallpaper-two-moons-moons-cloud-sky-two.jpg"}}
                    style={styles.background}
                >
    <CustomTagsFilter
      onClose={setFilterView}
      visible={isFilterVisible}
      tagselect={setFilterTag}
    />
      {
        filterTag!==""? 
          <Text
            style={styles.filterTextView}
          >Filter By Tag: #{filterTag}</Text>
        :""
      }
    <View 
      style={{
          padding:15,
          marginBottom:10
        }}
    >
     <FlatList
             numColumns={2}
             data={lunarList}
             keyExtractor={(item) => item.id}
             renderItem={({ item })=>{
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
  },
  card: {
    width:"auto",
    height:200,
    backgroundColor: "rgba(189, 195, 199, 0.8)",
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
  background: {
    width: 'auto',
    height:"100%",
    objectFit: 'cover',
},
filterButton: {
  marginRight: 10,
  paddingHorizontal: 10,
  paddingVertical: 5,
  backgroundColor: "rgb(160, 200, 255)", // Soft transparent background
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "rgb(0, 47, 255)",
  alignItems: "center",
  justifyContent: "center",
  elevation: 2, // For Android shadow
},
filterText: {
  fontSize: 16,
  fontWeight: "600",
  color: "ghostwhite",
},
filterTextView:{
  backgroundColor: "rgba(189, 195, 199, 1)",
  color:"blue",
  textAlign:"center",
  paddingVertical:5
}
  });