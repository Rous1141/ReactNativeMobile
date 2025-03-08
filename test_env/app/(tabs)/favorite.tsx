import { View, Text, Image, Pressable, StyleSheet, ImageBackground, FlatList, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { shortenDescription } from '@/service/itemService';
//import PriceTag from '@/components/priceTag';
import LimitedDeal from '@/components/limitedDeal';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Favorite() {
  const nav = useRouter();
  const navigation = useNavigation(); // custom Header
  const [refresh, setRefresh] = useState(false);
  const [deleteUi, setDeleteUi] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [favorite, setFavorite] = useState<ArtToolProps[]>([]);
  const [selectedItems, setSelectedItems] = useState<{[key: string]: boolean}>({});

  const fetchData = async() => {
    // LocalData is an array of ids
    const localData = await AsyncStorage.getItem("favorite");

    if (localData) {
      setFavorite(JSON.parse(localData));
    } else {
      setFavorite([]);
    }
    // Reset selected items when fetching new data
    setSelectedItems({});
  }
      
  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [refresh])
  )

  const onNavigate = (id: string) => {
    if (!deleteUi) {
      nav.navigate(`../../details?id=${id}`, {})
    }
  }

  // Toggle individual item selection
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }
  useEffect(() => {
    if (deleteUi) {
      const newSelectedItems: {[key: string]: boolean} = {};
      
      favorite.forEach(item => {
        newSelectedItems[item.id] = selectAll;
      });
      
      setSelectedItems(newSelectedItems);
    }
  }, [selectAll, favorite, deleteUi]);

  // Delete selected items
  const deleteSelectedItems = () => {
    const selectedIds = Object.keys(selectedItems).filter(id => selectedItems[id]);
    
    if (selectedIds.length === 0) {
      Alert.alert("No Items Selected", "Please select items to delete");
      return;
    }

    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete ${selectedIds.length} selected item(s)?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            const updatedFavorites = favorite.filter(item => !selectedItems[item.id]);
            await AsyncStorage.setItem("favorite", JSON.stringify(updatedFavorites));
            setRefresh(!refresh);
            if (updatedFavorites.length === 0) {
              setDeleteUi(false);
            }
          },
          style: "destructive",
          
        }
      ]
    );
  }

    // Calculate discounted price
    const getDiscountedPrice = (item:ArtToolProps) => {
      if (!item) return 0;
      if (!item.limitedTimeDeal || item.limitedTimeDeal === 0) return item.price;
      return  item.price * (1 - item.limitedTimeDeal);
    }
    
    // Format price with currency symbol
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
          {[...Array(5)].map((_, i) => {
            if (i < fullStars) {
              return <FontAwesome key={i} name="star" size={16} color="#FFD700" />;
            } else if (i === fullStars && halfStar) {
              return <FontAwesome key={i} name="star-half-o" size={16} color="#FFD700" />;
            } else {
              return <FontAwesome key={i} name="star-o" size={16} color="#FFD700" />;
            }
          })}
        </View>
        <Text style={styles.ratingText}>
          {averageRating > 0 ? `${averageRating} (${feedbacks.length})` : 'No ratings'}
        </Text>
      </View>
    );
  };
  

  const favoriteView = () => {
    return (
      <View style={{padding: 15}}>
        {deleteUi && (
          <Pressable 
            style={styles.deleteButton}
            onPress={deleteSelectedItems}
          >
            <Text style={styles.deleteButtonText}>Delete Selected</Text>
          </Pressable>
        )}
        <GridView />
      </View>
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: deleteUi ? "Delete Mode" : "Favorite Supplies",
      headerLeft: () => (
        deleteUi ? 
        <Pressable 
          onPress={() => {
            if (selectAll) {
              Alert.alert(
                "Confirm Deletion",
                "Are you sure you want to delete all favorites?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => {
                      setSelectAll(false);
                    }
                  },
                  { 
                    text: "Delete All", 
                    onPress: async () => {
                      await AsyncStorage.removeItem("favorite");
                      setRefresh(!refresh);
                      setDeleteUi(false);
                    },
                    style: "destructive"
                  }
                ]
              );
            } else {
              setSelectAll(!selectAll);
            }
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <Text style={{ color: "red", marginRight: 5, fontSize: 16 }}>Delete All</Text>
            <Checkbox
              value={selectAll}
              onValueChange={() => {
                setSelectAll(!selectAll);
              }}
              color={selectAll ? 'red' : undefined}
            />
          </View>
        </Pressable>
        : null
      ),
      headerRight: () => (
        favorite.length !== 0 ?
        <Pressable 
          onPress={() => {
            setDeleteUi(!deleteUi);
            setSelectAll(false);
            setSelectedItems({});
          }}
        >
          <Text style={{ 
            color: deleteUi?'blue':"red",
            fontSize: 18,
            marginRight: 10,
            fontWeight: deleteUi ? 'bold' : 'normal',
          }}>
            {deleteUi ? "Cancle" : "Delete"}
          </Text>
        </Pressable>
        : null
      )
    });
  }, [favorite.length, deleteUi, selectAll, selectedItems]);

  function GridView() {
    return (
      <View style={styles.container}>
        <FlatList
          data={favorite}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: ArtToolProps }) => {
            return (
              <Pressable 
              onPress={() => onNavigate(item.id)}
              >
                <View style={[styles.card,
                 selectedItems[item.id]?{opacity:0.8}:""
                ]} key={item.id}>
                  {deleteUi && (
                    <Checkbox
                      style={styles.checkbox}
                      value={selectedItems[item.id] || false}
                      onValueChange={() => toggleItemSelection(item.id)}
                      color={selectedItems[item.id] ? 'red' : undefined}
                    />
                  )}
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.textView}>
                    <Text style={styles.nameText}>
                      {shortenDescription(item.artName)}
                    </Text>
                     <View style={styles.priceContainer}>
                                  {item && item.limitedTimeDeal > 0 ? (
                                    <>
                                      <Text style={styles.originalPrice}>{formatPrice(item?.price || 0)}</Text>
                                      <Text style={styles.discountedPrice}>{formatPrice(getDiscountedPrice(item))}</Text>
                                    </>
                                  ) : (
                                    <Text style={styles.price}>{formatPrice(item?.price || 0)}</Text>
                                  )}
                                </View>
                    <LimitedDeal discount={item.limitedTimeDeal} />
                     { item.feedbacks?
                                    <StarRating
                                    feedbacks={item.feedbacks}
                                  />:<Text style={styles.noRatingText}>No Review Yet</Text>
                      }
                  </View>
                </View>
              </Pressable>
            )
          }}
        />
      </View>
    )
  }

  const emptyView = () => {
    return (
      <View style={styles.empty_view}>
        <Image
          style={styles.empty_image}
          source={require("@/assets/rabbit_frown.png")}
        />
        <Text style={styles.empty_text}>
          You Have No Favorite Tools... Shame
        </Text>
      </View>
    )
  }

  return (
    <ImageBackground
      source={require("@/assets/favorite.jpg")}
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
      width: '100%',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal:10,
    },
    card: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "100%",
      height: "auto",
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderRadius: 10,
      marginVertical: 5,
      position: "relative",
    },
    image: {
      width: 150,
      height: 180,
      borderRadius: 8,
      objectFit: "contain"
    },
    checkbox: {
      position: "absolute",
      left: 10,
      top: 10,
      zIndex: 1,
    },
    textView: {
      width:"55%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      height: "auto",
      padding: 10,
      marginVertical: 5,
      paddingHorizontal: 10,
    },
    nameText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "black",
      flexWrap: "wrap",
      marginVertical: 5,
    },
    empty_image: {
      width: "90%",
      height: 150,
      borderRadius: 8,
      objectFit: "contain",
      backgroundColor: "rgba(0,0,0,0.8)"
    },
    empty_text: {
      textAlign: "center",
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      padding: 10,
      backgroundColor: "rgba(0, 0, 0, 0.8)"
    },
    empty_view: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50
    },
    background: {
      width: 'auto',
      height: "100%",
      objectFit: 'contain',
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      alignSelf: 'center',
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
      marginBottom: 5,
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
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    price: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#FF3B30",
    },
    originalPrice: {
      fontSize: 18,
      color: "#999",
      textDecorationLine: "line-through",
      marginRight: 8,
    },
    discountedPrice: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#FF3B30",
    },
});