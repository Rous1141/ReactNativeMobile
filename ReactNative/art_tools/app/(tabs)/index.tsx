import { View, Text, Pressable, FlatList,StyleSheet,Image,ImageBackground } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
import { getArtTools } from '@/api/ArtTools';
import { shortenDescription } from '../../service/itemService';
import LimitedDealIndex from '@/components/limitedDealIndex';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomTagsFilter } from '@/components/CustomTagsFilter';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '@/components/loadingScreen';
import {DrawerHomeScreen} from '@/components/drawerHomeScreen';
export default function index() {
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const nav = useRouter()
    const header = useNavigation();
    const [item,setItem] = useState<ArtToolProps[]>([]);
    const [filteredItem,setFilteredItem] = useState<ArtToolProps[]>([])
    const [filterTag, setFilterTag] = useState("")
    const [numcolumn,setNumColumn] = useState(2)
    const [openMenu,setOpenMenu] = useState(false)
    const [search, setSearch] = useState("");
    //Pagination
    const [page, setPage] = useState(1);
    const pageSize = 8; // Number of items per page
    //AsyncStorage.removeItem('favorite')

    const setFilterView =() => {
      setFilterVisible(!isFilterVisible)
    }
    const toDetail = (id:string)=>{
        nav.navigate(`../details?id=${id}`)
    }
    
    useFocusEffect(
      useCallback(() => {
        const fetchData = async () => {
          setIsLoading(true);
          const data = await getArtTools();
          //await new Promise(resolve => setTimeout(resolve, 5000)); // Add a 2-second delay
          if (data != null) {
            setItem(data);
            setFilteredItem(data)
          }
          setIsLoading(false);
        };
        fetchData();        
      }, [])
    )
    useFocusEffect(
      useCallback(() => {
      header.setOptions({
        headerTitle: isFilterVisible?"Filter Brand": filterTag?`Items By Brand: ${filterTag}`:"Art Supplies",
        headerRight: () => (
          <>
          <View style={styles.utilsContainer} >
          <Pressable
            style={styles.filterButton}
            onPress={()=>{setOpenMenu(!openMenu)}}
            >
            <Ionicons name="search" size={20} color="black" />
          </Pressable>
          <Pressable
            style={styles.filterButton}
          onPress={() => {setFilterView(),setOpenMenu(false)}}>
            <MaterialCommunityIcons name="filter-menu-outline" size={20} color="black" />
          </Pressable>
          </View>
        
          </>
        ),
        headerLeft:()=>(
          <View>
            <Pressable
               style={styles.menuButton}
               onPress={()=>{setOpenMenu(!openMenu)}}
            >
              <MaterialIcons name={openMenu?"menu-open":"menu"} size={24} color="black" />
            </Pressable>
          </View>
        )
      });
    }, [isFilterVisible,openMenu,search])
  )
   
  useFocusEffect(
    useCallback(() => {
      if(filterTag !== ""){
        console.log("Filter on: "+filterTag)
        const filterList = item.filter((item)=>item.brand.includes(filterTag))
        setFilteredItem(filterList)
        filterList.length<2?setNumColumn(1):setNumColumn(2)
      }
      else{
        setNumColumn(2)
        console.log("Filter off")
        setFilteredItem(item)
      }
      if(search.trim()!==""){
        const filterList = item.filter((item)=>item.artName.toLowerCase().includes(search.toLowerCase()))
        setFilteredItem(filterList)
        filterList.length<2?setNumColumn(1):setNumColumn(2)
      }
    }, [filterTag,item,search])
    // Why the extra "item" condition is to when focus again from diffrent page,
    //  data got loaded again and we want to check if any filter still available
  )
    const formatPrice = (price: number) => {
      return `$${price.toFixed(2)}`;
    }

    const StarRating = ({ feedbacks }: { feedbacks: FeedBackProps[] }) => {
      // Calculate average rating
      const calculateAverageRating = (): number => {
        if (!feedbacks || feedbacks.length === 0) return 0;
        
        const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
        return parseFloat((totalRating / feedbacks.length).toFixed(1));
      };
    
      const averageRating = calculateAverageRating();
      const fullStars = Math.floor(averageRating);
      const halfStar = averageRating - fullStars >= 0.5;
      
      return (
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {feedbacks.length>0?[...Array(5)].map((_, i) => {
              if (i < fullStars) {
                return <FontAwesome key={i} name="star" size={16} color="#FFD700" />;
              } else if (i === fullStars && halfStar) {
                return <FontAwesome key={i} name="star-half-o" size={16} color="#FFD700" />;
              } else {
                return <FontAwesome key={i} name="star-o" size={16} color="#FFD700" />;
              }
            }):""}
          </View>
          <Text style={styles.ratingText}>
            {averageRating > 0 ? `${averageRating} (${feedbacks.length})` : 'No ratings'}
          </Text>
        </View>
      );
    };

    const loadMoreData = () => {
      if (filteredItem.length > page * pageSize) {
        setPage(prevPage => prevPage + 1);
      }
    };
    const paginatedData = filteredItem.slice(0, page * pageSize);
    function HaveData(){
      return(
        <>
     <View 
       style={styles.container}
     >
         <FlatList
         onEndReached={()=>loadMoreData()} // Load more data when near the end
         onEndReachedThreshold={0.9} // When is the end to load => 80% end reached
         key={numcolumn}
         numColumns={numcolumn}
           data={paginatedData}
           keyExtractor={(item) => item.id}
           renderItem={({item})=>{
             return (
               <>
               <View
               style={[styles.card]}
               key={item.id}>
                 <LimitedDealIndex discount={item.limitedTimeDeal} />
               <Pressable
               onPress={()=>{toDetail(item.id)}}
               >
               <Image style={styles.image} source={{uri: item.image}} />
                <Text style={styles.nameText}>{
                           shortenDescription(item.artName)
                         }
               </Text>
                <Text style={styles.originalPrice}>{formatPrice(item?.price || 0)}</Text>
                <View style={styles.ratingContainer}>
                { item.feedbacks?
                 <StarRating
                 feedbacks={item.feedbacks}
               />:<Text style={styles.noRatingText}>No Review Yet</Text>
               }
               </View>
               </Pressable>
               </View>
               </>
             )
           }}
         />  
     </View>
    
     </>
      )
    }
    function NoData(){
      return(
        <View style={styles.container}>
          <Text style={styles.noDataText}>No Art Supplies Found</Text>
        </View>
      )
    }
    
  return (
    <>
      <CustomTagsFilter
       onClose={setFilterView}
       visible={isFilterVisible}
       tagselect={setFilterTag}
       data={item}
     />
       <DrawerHomeScreen
         openMenu={openMenu}
         setOpenMenu={setOpenMenu}
         setSearch={setSearch}
        >
     <ImageBackground
           source={require("@/assets/favorite.jpg")}
           style={styles.background}
         >
            {isLoading? <LoadingScreen/>:""}
   {filteredItem.length!=0?<HaveData/>:<NoData/>}
   </ImageBackground>
   </DrawerHomeScreen>
   </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width:"100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal:10,
  },
  card: {
    width:"48%",
    minWidth:170,
    height:"auto",
    minHeight:250,
    padding: 5,
    borderRadius: 3,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 3,
    marginHorizontal:3,
    backgroundColor: "rgb(255, 255, 255)",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    objectFit:"cover",
    marginBottom:10,
    borderBlockColor: "rgb(0, 0, 0)",
    alignSelf: "center",
  },
  nameText:{
    textAlign: "center",
    fontSize: 12,
    marginBottom: 5,
    color: "black"
  },
  utilsContainer:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
    gap:10
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgb(160, 200, 255)", 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(0, 47, 255)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2, // For Android shadow
  },
  menuButton:{
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10, 
    alignItems: "center",
    justifyContent: "center",
  },
  originalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF3B30",
    textAlign:"center"
  },
  ratingContainer: {
    display:"flex",
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 5,
    justifyContent:"center"
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  noRatingText:{
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
    textAlign: 'center',
    fontStyle:"italic",
  },
  background: {
    width: 'auto',
    height: "100%",
    objectFit: 'contain',
  },
  noDataText:{
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginTop: 100,
    marginBottom: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgb(255, 255, 255)"
  }
})