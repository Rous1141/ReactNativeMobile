import { View, Text, Pressable,StyleSheet, TextInput, Animated } from 'react-native'
import React, { useEffect,useRef,ReactNode, useState } from 'react'
import MenuDrawer from 'react-native-side-drawer'
import Feather from '@expo/vector-icons/Feather';

type Props = {
    children: ReactNode;
    openMenu?: boolean; 
    setOpenMenu?: (open: boolean) => void;
    setSearch?: (search: string) => void;
}


export const DrawerHomeScreen = ({
    setSearch = () => {""},
    openMenu = false, 
    setOpenMenu = () => {}, 
    children 
}: Props)=> {
    const [value,setValue] = useState("")
    const fadeOut = useRef(new Animated.Value(1)).current; // Start opacity at 0

    useEffect(() => {
      Animated.timing(fadeOut, {
        toValue: openMenu ? 0 : 1, // Animate to 1 when open, 0 when closed
        duration: 300, // Adjust duration for a smoother effect
        useNativeDriver: true,
      }).start();
    }, [openMenu]);

    const drawerContent = () => {
        return (
     
           
            <View  style={styles.body}>
            <Text style={styles.title}>Search By Name</Text>
            <View style={styles.searchContainer}>
            <TextInput placeholder='Search...' style={styles.input}
                value={value}
                editable={openMenu}
                onChangeText={(value)=>{setValue(value)}}
            />
                <Pressable onPress={()=>{setSearch(value);setOpenMenu(false)}} style={styles.searchButton}>
                <Feather name="search" size={24} color="white" />
                </Pressable>
            </View>
            <Pressable onPress={()=>{setValue("");setSearch("");setOpenMenu(false)}} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Clear Search</Text>
                </Pressable>
            </View>
           

          );
      };
  return (
    <>
    <View style={styles.container}>
      <Animated.View style={[styles.animatedBox,{  backgroundColor: openMenu?"rgba(0, 0, 0,0.7)":`rgba(0, 0, 0,0)`,width:openMenu?"200%":0}]}>
        <MenuDrawer
          open={openMenu}
          position={'left'}
          drawerContent={drawerContent()}
          drawerPercentage={60}
          animationTime={300}
          overlay={true}
          opacity={0.4}
        />
        </Animated.View>
        <View>
          {children}
        </View>
      </View>
      </>
  )
}


const styles = StyleSheet.create({
    container: {
      display:"flex",
      zIndex: 0,
      width: "100%",
    },
    animatedBox: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      zIndex: 1000,
    width: "100%",
    },
    body: {
        paddingTop:"5%",
        paddingHorizontal:10,
        width:"100%",
        display:"flex",
        flex: 1,
        backgroundColor:"rgb(235, 235, 235)",
    },
    searchContainer:{
        flexDirection: "row",
        alignItems: "center",  // Ensure vertical alignment
        width: "100%", // Ensure full width
  },
    title:{
        color: "black",
        fontSize: 14,
        fontWeight: "bold",
        marginVertical:5,
        marginHorizontal:1,
      },
      deleteText:{
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        marginVertical:5,
        marginHorizontal:1,
      },
    input:{
        width: "70%",
        height:40,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: "rgb(255, 255, 255)",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingHorizontal: 10,
      },
      searchButton:{
        width: "30%",
        height:40,
        borderLeftWidth: 0,
        borderWidth: 1,
        backgroundColor: "rgb(0, 47, 255)",
        alignItems: "center",
        justifyContent: "center",
        borderColor: 'black',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      },
      searchButtonText:{
        color: "white",
        fontWeight: "bold",
      },
      deleteButton:{
        marginTop:5,
        marginBottom:20,
        width: "100%",
        height:40,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
      }
  })