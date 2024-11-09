import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
export default function Index() {
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
  return (
    <View
    style= {styles.container}
    >
      <Text
        style= {styles.text}
      >
        Hello World, This is the homescreen.
      </Text>
      <Link style={styles.button} href={"/aboutus"}>Go To About Page</Link>

    </View>
  );
}
