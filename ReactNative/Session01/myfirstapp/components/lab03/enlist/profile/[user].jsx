import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Profile() {
    const user = useLocalSearchParams();
  return (
    <View>
      <Text>[user]</Text>
    </View>
  )
}