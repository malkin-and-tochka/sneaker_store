import {View, StyleSheet, Image, Text, Pressable, TouchableOpacity} from "react-native"
import logo from '../../../assets/better_logo.jpg'
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, setAuth} from "../../redux/reducers/authReducer";
import {deleteTokens} from "../../storageManager/storageManager";
import {useNavigation} from "@react-navigation/native";

const Header = () => {
    const isUserAuth = useSelector(getIsAuth)
    const dispatch = useDispatch()
    const logout = async () => {
        await deleteTokens()
        dispatch(setAuth(false))
    }
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Image style={{height: 50, width: 50}} source={logo}/>
          {isUserAuth ?
            <TouchableOpacity style={{backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10}} onPress={logout}>
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
              :
              <TouchableOpacity style={{backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10}} onPress={()=>navigation.navigate('CombineForm')}>
                <Text style={styles.text}>Login</Text>
              </TouchableOpacity>
          }
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
