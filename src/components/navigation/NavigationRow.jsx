import { useNavigation } from "@react-navigation/native"
import {StyleSheet, View, Text, TouchableOpacity, useWindowDimensions} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const NavigationRow = () => {
  const navigation = useNavigation()
  const {height, width} = useWindowDimensions();


  return (
    <View style={[styles.container, {top: height - 90}]}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}><AntDesign name="home" size={30} color="white" /></TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Cart')}><Feather name="shopping-cart" size={30} color="white" /></TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Account')}><MaterialIcons name="account-circle" size={30} color="white" /></TouchableOpacity>
      {/*<TouchableOpacity onPress={()=>navigation.navigate('Admin')}><Text style={styles.text}>Admin</Text></TouchableOpacity>*/}
      <TouchableOpacity onPress={()=>navigation.navigate('Favorites')}><Feather name="bookmark" size={30} color="white" /></TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Categories')}><Entypo name="list" size={30} color="white" /></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#100F14',
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 100,
    borderRadius: 15
  },
  text: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '500',
    padding: 15
  }
})

export default NavigationRow
