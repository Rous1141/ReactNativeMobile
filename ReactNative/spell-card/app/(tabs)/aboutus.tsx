
import { Link } from 'expo-router'
import {Text,View, StyleSheet} from 'react-native'

export default function Aboutus() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Us: An cellcular application to capture and record Gensokyo's residents used Spell Cards in their danmaku</Text>
    <Link href={"/"} style={styles.button}>Return to Home Page!</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e"
  },
  text: {
    fontSize: 30,
    color: "white",
  },
  button:{
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 10,
    color: "white",
    fontWeight: "bold"
  }
})
