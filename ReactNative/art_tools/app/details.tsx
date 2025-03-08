import { View, Text, StyleSheet, Image, Pressable, ScrollView ,Animated} from 'react-native'
import React, { useCallback, useState,useRef, useEffect } from 'react'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { getArtToolById } from '@/api/ArtTools';
import ReviewSection from '@/components/feedbackBox';
export default function Details() {
    const {id} = useLocalSearchParams<{id:string}>()
    console.log(id)
    const [item, setItem] = React.useState<ArtToolProps>()
    const [heartColor, setHeartColor] = useState("red");
    const [isFavorite, setIsFavorite] = useState(false);
    const [sortedFeedback, setSortedFeedback] = useState<FeedBackProps[]>([]);
    const nav = useRouter();
    const commentRef = useRef<ScrollView>(null);
  // Create a ref to store the Y position of the review section
  const reviewSectionY = useRef(0);
  
  // Function to scroll to the review section
  const scrollToReviews = () => {
    if (commentRef.current) {
      // Scroll to the stored Y position of the review section
      commentRef.current.scrollTo({
        y: reviewSectionY.current,
        animated: true,
      });
    }
  };
    useFocusEffect(useCallback(()=>{
      const checkFavorite = async () => {
        const foundItem = await getArtToolById(id)
        if(foundItem){
          setItem(foundItem ? foundItem : null);
          starLowestSorted(foundItem)
          const favoriteData:ArtToolProps[] = JSON.parse(await AsyncStorage.getItem('favorite') || '[]')
          //console.log("Favorite List: ",favoriteData)
          const isFavorite = favoriteData.find((item:ArtToolProps)=> item.id === foundItem.id)
          //console.log("In Favorite List? ",isFavorite)
          if(isFavorite){
            setIsFavorite(true)
          }else{
            setIsFavorite(false)
          }
        }
        else{
          errorToast()
        }
        
      }
        checkFavorite()
    },[isFavorite]))
   
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
      onPress:()=>{
        Toast.hide();
        navToFavorite()},
      swipeable: true,
      type: 'success',
      position: 'bottom',
      visibilityTime:3000
    })
  }
  
  const failedToast = () => {
    Toast.show({
      text1: 'Removed from Favorites',
      type: 'error',
      position: 'bottom',
      visibilityTime:1000,
      swipeable:true
    })
  }
  
  const errorToast = () => {
    Toast.show({
      text1: 'Cannot Load Data',
      text2:"Please Return To HomePage",
      type: 'error',
      position: 'bottom',
      visibilityTime:1000,
      swipeable:true,
      onPress:()=>nav.replace('./(tabs)'),
    })
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
    const newFavoriteList = favoriteList.filter((fav:ArtToolProps) => fav.id !== item?.id);
    AsyncStorage.setItem('favorite', JSON.stringify(newFavoriteList));
    //console.log("Removed from Favorites: "+item)
  }
  
  // Calculate discounted price
  const getDiscountedPrice = () => {
    if (!item) return 0;
    if (!item.limitedTimeDeal || item.limitedTimeDeal === 0) return item.price;
    return  item.price * (1 - item.limitedTimeDeal);
  }
  
  // Format price with currency symbol
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  }
  
  // Render star rating (placeholder for future implementation)
  const renderRating = (rating: number = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FontAwesome key={i} name="star" size={16} color="#FFD700" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FontAwesome key={i} name="star-half-o" size={16} color="#FFD700" />);
      } else {
        stars.push(<FontAwesome key={i} name="star-o" size={16} color="#FFD700" />);
      }
    }
    
    return (
      <View style={styles.ratingContainer}>
        {stars}
      </View>
    );
  }

  
  // Render individual feedback item
  const renderFeedbackItem = (feedback: FeedBackProps) => {
    return (
      <View key={feedback.author} style={styles.feedbackItem}>
        <View style={styles.feedbackHeader}>
          <Text style={styles.feedbackUser}>{feedback.author}</Text>
          <Text style={styles.feedbackDate}>{feedback.date.split("T")[0]}</Text>
        </View>
        {renderRating(feedback.rating)}
        <Text style={styles.feedbackComment}>{feedback.comment}</Text>
      </View>
    );
  }
  // Sort Reviews by Lowest Rating 
  const starLowestSorted = (foundItem:ArtToolProps) => {
    if(foundItem.feedbacks){
      const sortedReviews = foundItem.feedbacks.sort((a, b) => a.rating - b.rating);
      setSortedFeedback(sortedReviews);
      //console.log(sortedFeedback);
    }
  }
  


  //Auto hide the navigate UI as scrolldown
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerWidth=100
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [0, -headerWidth], // Moves up by its height (out of screen)
    extrapolate: 'clamp'
  });

  // Render Add Review Form
  const CustomHeader = ()=>{
    return(
      <Animated.View style={[
        styles.header,
        {
          transform: [{ translateX: headerTranslate }],
          opacity:headerOpacity
        }
        ]}>
      <View style={styles.button_container}>
      <Pressable 
        onPress={() => nav.back()} 
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>
      <Pressable
       style={styles.backButton}
        onPressOut={() => setHeartColor("red")}
        onPress={addFavorite}
      >
        {isFavorite ?
          <AntDesign name="heart" size={24} color={heartColor} /> :
          <AntDesign name="hearto" size={24} color={"black"} />
        }
      </Pressable>
      
      <Pressable
       style={styles.backButton}
       onPress={()=>{scrollToReviews()}}
      >
        <FontAwesome name="comments" size={24} />
      </Pressable>
    </View>
</Animated.View>
    )
  }
  
  return (
    <>
      <CustomHeader/>

    <Animated.ScrollView 
    // Detect if user scrolling 
    ref={commentRef}  // use the reference to the comment sestion
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: false }
    )}
    scrollEventThrottle={16}
    contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.image_view}>
            <Image source={{ uri: item?.image }} style={styles.image} />
          </View>
          
        <View style={styles.text_container}>
            <Text style={styles.name}>{item?.artName}</Text>
            
            <View style={styles.brandContainer}>
              <Text style={styles.brandLabel}>Brand:</Text>
              <Text style={styles.brandValue}>{item?.brand}</Text>
            </View>
            
            <View style={styles.priceContainer}>
              {item && item.limitedTimeDeal > 0 ? (
                <>
                  <Text style={styles.discountedPrice}>{formatPrice(getDiscountedPrice())}</Text>
                  <Text style={styles.originalPrice}>{formatPrice(item?.price || 0)}</Text>
                  {item && item.limitedTimeDeal > 0 && (
                  <View style={styles.dealBadge}>
                   <Text style={styles.dealText}>{item?.limitedTimeDeal * 100}% OFF</Text>
                  </View>
                  )}
                </>
              ) : (
                <Text style={styles.price}>{formatPrice(item?.price || 0)}</Text>
              )}
            </View>
            
            {item?.glassSurface ? (
              <View style={styles.featureContainer}>
                <MaterialIcons name="warning" size={18} color="yellow" />
                <Text style={styles.featureText}>Warning: Glass Surface</Text>
              </View>
            ):""}
            
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.description}>{item?.description}</Text>
            </View>
          <View>
         
            </View >
                {item?.feedbacks && item.feedbacks.length > 0 ? (
                  <View style={styles.feedbacksContainer}
                  onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    reviewSectionY.current = layout.y;
                  }}
                  >
                      <ReviewSection
                          feedbacks={sortedFeedback}
                      />
                  </View>
                ) : (
                  <View style={styles.noFeedbackContainer}>
                    <Text style={styles.noFeedbackText}>No reviews yet</Text>
                  </View>
                )}
          </View>
        </View>   
      </View>
    </Animated.ScrollView >
    </>
  )
}

const styles = StyleSheet.create({
  header:{
    position: "absolute",
    top:"5%",
    left:"5%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  button_container: {
    width: "auto",
    height: "auto",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  
  },
  backButton:{
    backgroundColor: "white", 
    borderRadius: 50, 
    shadowColor: "#000", // Shadow effect
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // for Android?
    alignItems: "center", 
    justifyContent: "center", 
    width: 40, // Fixed width
    height: 40, // Fixed height
    marginVertical:5,
  },
  scrollContainer: {
    width:"auto", 
    height:"auto", 
    flexGrow: 1,
    paddingVertical: 30,
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  card: {
    width: "100%",
    height: "auto",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image_view: {
    width: "100%",
    height: "auto",
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
    position: "relative",
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "contain",
  },
  dealBadge: {
    width: "auto",
    height:"auto",
    backgroundColor: "#FF3B30",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontWeight:"600",
  },
  dealText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  text_container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign:"center",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  brandLabel: {
    fontSize: 16,
    color: "#666",
    marginRight: 5,
  },
  brandValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  originalPrice: {
    fontSize: 16,
    color: "#999",
    textDecorationLine: "line-through",
    marginLeft: 8,
  },
  discountedPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF3B30",
  },
  featureContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "orange",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 5,
    color: "white",
    fontWeight: "bold",
  },
  descriptionContainer: {
    width: "100%",
    marginTop: 5,
    marginBottom: 15,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
  feedbackButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#F0F0F0",
    borderRadius: 15,
    marginVertical:10,
  },
  feedbackRatingButton:{

  },
  feedbackRatingText:{

  },
  feedbackButtonText: {
    color: "#007AFF",
    fontWeight: "500",
    marginVertical: 5,
    marginRight: 5,

  },
  feedbacksContainer: {
    width: "100%",
    marginTop: 5,
  },
  feedbackItem: {
    padding: 10,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    marginBottom: 10,
  },
  feedbackHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  feedbackUser: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },
  feedbackDate: {
    fontSize: 12,
    color: "#888",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  feedbackComment: {
    fontSize: 14,
    color: "#555",
  },
  noFeedbackContainer: {
    alignItems: "center",
    padding: 15,
  },
  noFeedbackText: {
    color: "#999",
    fontStyle: "italic",
  },
  background: {
    width: 'auto',
    height: "100%",
    objectFit: 'cover',
    marginBottom: 20
  },
 
});