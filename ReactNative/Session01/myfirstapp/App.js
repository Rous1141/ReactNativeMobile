import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeScreen from './components/WelcomeScreen';
export default function App() {

  return (
    <View style={styles.container}>
      <WelcomeScreen />
      <Header />
      <Footer />
    </View>
  );
}
const image = 'url("/images/flirt.jpg")'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: image,
  },
});
