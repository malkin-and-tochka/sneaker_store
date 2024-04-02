import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"

const NavigationRow = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}><Text style={styles.text}>Home</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Cart')}><Text style={styles.text}>Cart</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Account')}><Text style={styles.text}>Account</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Search')}><Text style={styles.text}>Search</Text></TouchableOpacity>
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
    bottom: 80,
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