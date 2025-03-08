import { View, Text, Pressable,StyleSheet } from 'react-native'
import React from 'react'
import { router, useGlobalSearchParams } from 'expo-router'

export default function Profile() {
   // const {user,extra} = useLocalSearchParams<{user : string,extra?:string}>()
    const {user,message} = useGlobalSearchParams<{
      user: string
      message:string
    }>()
    //console.log("In Profile "+user)
    const logout = () => {
      router.dismissAll()
    }
  return (
    <View style={styles.container}>
      <Text style={styles.userText}>
        User: {user} {message?  `- ${message}`:``}
      </Text>
      <Pressable 
        style={styles.logoutButton}
      onPress={() => logout()}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding:15,
    flex: 1,
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  logoutButton: {
    width:100,
    backgroundColor: '#ff6b6b',  // Nice red shade for logout
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,  // Adds shadow for Android
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',  // White text on red background
    textAlign: 'center',
  },
});