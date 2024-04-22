import {View, StyleSheet, Image, Text, Pressable} from "react-native"
import logo from '../../../assets/logo.png'
import {useSelector} from "react-redux";
import {getIsAuth} from "../../redux/reducers/authReducer";

const Header = () => {
  const isUserAuth = useSelector(getIsAuth)
  return (
    <View style={styles.container}>
      <Image style={{height: 50, width: 50}} source={logo}/>
      <Pressable>
        <Text style={styles.text}>{isUserAuth ? 'Logout' : 'Login'}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#100F14',
    alignSelf: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  text: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '500',
    padding: 15
  }
})

export default Header
