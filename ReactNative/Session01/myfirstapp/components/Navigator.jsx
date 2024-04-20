import React from 'react'
import { View,Text,Button,StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Root = createStackNavigator()
//The navigator is using Stack method to 'push' the new screen
//on top of the previous screen
//And 'pop' to return to the previous sreen
const Screen1 = ({navigation,route})=>(
    <View style={customStyles.screen}>
        <Text style={customStyles.title}>This Is Screen 1</Text>
        <Button
            title='Go To Screen 2'
            onPress={()=>{
                navigation.push('Screen2')
            }}
        />
    </View>
)

const Screen2 = ({navigation,route})=>(
    <View style={customStyles.screen}>
        <Text style={customStyles.title}>This is Screen 2</Text>
        <Button
            title='Go Back To Previous Screen'
            onPress={()=>{
                navigation.pop()
            }}
        />
    </View>
)

export default function Navigator() {
  return (
    <>
        <NavigationContainer>
            <Root.Navigator>
                <Root.Screen name='Screen1' component={Screen1}/>
                <Root.Screen name ='Screen2' component={Screen2}/>
            </Root.Navigator>
        </NavigationContainer>
    </>
  )
}

const customStyles = StyleSheet.create({
    screen:{
        marginTop: 40,
        alignItems:'center'
    },
    title:{
        padding:20,
        fontSize:30
    }
})
