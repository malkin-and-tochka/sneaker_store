import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Pressable,
} from "react-native";
import tessImg from "../../../assets/sneakers.png";

const Product = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wrapper}>
        <Image style={styles.image} source={tessImg} />
        <Text style={styles.name}>Sneakers</Text>
        <Text style={styles.description}>Check new Skechers collaboration</Text>
      </TouchableOpacity>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Buy now</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    height: 350,
    width: "100%",
    gap: 10
  },
  image: {
    width: 200,
    height: 150,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#100F14",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#F5F5F5'
  },
  name: {
    fontSize: 30,
    fontWeight: "500",
  },
  description: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: 'center',
    color: '#B3B4B6'
  },
  wrapper: {
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 300,
    padding: 20
  }
});

export default Product;
