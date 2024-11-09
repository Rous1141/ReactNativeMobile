import { Link } from "expo-router"
import { View,StyleSheet,Text } from "react-native"

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page Not Found</Text>
      <Link style={styles.button} href={"/"}>Return To HomePage</Link>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5"
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20
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
