import 'react-native-gesture-handler';
//MUST IMPORT THIS AT THE TOP OF App.js TO RUN. DON'T ASK WHY 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeScreen from './components/WelcomeScreen';
import Navigator from './components/Navigator';


export default function App() {

  return (
   
    //Note: SafeAreaView is specifically for IOS devices, for the UI can get covered by the devices desgin 
    <SafeAreaView style={styles.container}>
      {/* <WelcomeScreen />
      <Header />
      <Footer /> */}
      <Navigator/>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
