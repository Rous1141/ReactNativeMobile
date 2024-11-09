import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
export default function Separator() {
  return (
    <View style={styles.separator} >
        <Text>
        </Text>
    </View>
  )
}
const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: '90%',
        backgroundColor: 'blue',
        margin:"auto",
        marginTop: 10,
        marginBottom: 10,

    }
})