// useFavorite.js
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

const useFavorite = (item:ArtToolProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const nav = useRouter();

  const checkFavorite = useCallback(async (itemId:string) => {
    try {
      const favoriteData = JSON.parse(await AsyncStorage.getItem('favorite') || '[]');
      const isFav = favoriteData.find((fav:ArtToolProps) => fav.id === itemId);
      setIsFavorite(!!isFav);
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  }, []);

  const saveToFavorites = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem('favorite');
      const favoriteList = data ? JSON.parse(data) : [];
      if (!favoriteList.some((fav:ArtToolProps) => fav.id === item.id)) {
        favoriteList.push(item);
        await AsyncStorage.setItem('favorite', JSON.stringify(favoriteList));
      }
    } catch (error) {
      console.error("Error saving to favorites:", error);
    }
  }, [item]);

  const removeFavorite = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem('favorite');
      const favoriteList = data ? JSON.parse(data) : [];
      const newFavoriteList = favoriteList.filter((fav:ArtToolProps) => fav.id !== item?.id);
      await AsyncStorage.setItem('favorite', JSON.stringify(newFavoriteList));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  }, [item]);

  const navToFavorite = () => {
    nav.replace("./favorite");
  };

  const successToast = () => {
    Toast.show({
      text1: 'Added to Favorites',
      text2: 'Press To Go To Favorite Tab?',
      text2Style: {
        textDecorationLine: "underline",
        fontStyle: "italic"
      },
      onPress: () => {
        Toast.hide();
        navToFavorite()
      },
      swipeable: true,
      type: 'success',
      position: 'bottom',
      visibilityTime: 3000
    })
  };

  const failedToast = () => {
    Toast.show({
      text1: 'Removed from Favorites',
      type: 'error',
      position: 'bottom',
      visibilityTime: 1000,
      swipeable: true
    })
  };

  const addFavorite = useCallback(async () => {
    let updatedFavorite = !isFavorite;
    setIsFavorite(updatedFavorite); // Update UI first

    if (updatedFavorite) {
      successToast();
      await saveToFavorites();
    } else {
      failedToast();
      await removeFavorite();
    }
  }, [isFavorite, saveToFavorites, removeFavorite]);

  return {
    isFavorite,
    addFavorite,
    checkFavorite,
  };
};

export default useFavorite;
