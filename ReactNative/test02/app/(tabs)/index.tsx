import { View, Text, TextInput, Button } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

export default function Login() {
    // TODO: Implement Login functionality with secure storage and error handling.
    const onPressLogin = () => {
        return <Redirect href={"/(tabs)/(items)/homepage"} />
    }

  return (
    <View>
      <Text>Login Page</Text>
      <TextInput
            placeholder='Username'
      />
      <TextInput
            placeholder='Password'
            secureTextEntry={true}
      />
      <Button
        title="Login"
        onPress={() => {onPressLogin()}}
      />
    </View>
  )
}