import 'react-native-gesture-handler';
//MUST IMPORT THIS AT THE TOP OF App.js TO RUN. DON'T ASK WHY 
import { StyleSheet, View,SafeAreaView } from 'react-native';
import LandingPage from './components/lab03/LandingPage';


export default function App() {

  return (
   
    //Note: SafeAreaView is specifically for IOS devices, for the UI can get covered by the devices desgin 
    <SafeAreaView style={styles.container}>
      {/* <WelcomeScreen />
      <Header />
      <Footer /> 
      <Navigator/> */}
      <LandingPage/>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
