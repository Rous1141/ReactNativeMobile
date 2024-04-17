import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  
  return (
    <View style={styles.container}>
      <Text>This is my first project. Glory To Gensokyo!</Text>
      <StatusBar style="auto" />
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
