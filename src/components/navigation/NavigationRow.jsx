import {useNavigation, useRoute} from "@react-navigation/native"
import {StyleSheet, View, Text, TouchableOpacity, useWindowDimensions} from "react-native"
import {AntDesign} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import {useState} from "react";

const NavigationRow = () => {
    const [target, setTarget] = useState('Home')
    const navigation = useNavigation()
    const {height, width} = useWindowDimensions();
    const combineHandle = targetText => {
        setTarget(targetText)
        navigation.navigate(targetText)
    }
    return (
        <View style={[styles.container, {top: height - 90}]}>
            <TouchableOpacity style={target === 'Home' ? styles.target : {padding: 10}}
                              onPress={() => combineHandle('Home')}>
                <AntDesign name="home" size={30} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity style={target === 'Cart' ? styles.target : {padding: 10}}
                              onPress={() => combineHandle('Cart')}>
                <Feather name="shopping-cart" size={30} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity style={target === 'Account' ? styles.target : {padding: 10}}
                              onPress={() => combineHandle('Account')}>
                <MaterialIcons name="account-circle" size={30} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity style={target === 'Favorites' ? styles.target : {padding: 10}}
                              onPress={() => combineHandle('Favorites')}>
                <Feather name="bookmark" size={30} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity style={target === 'Categories' ? styles.target : {padding: 10}}
                              onPress={() => combineHandle('Categories')}>
                <Entypo name="list" size={30} color="white"/>
            </TouchableOpacity>
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
    },
    target: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        borderRadius: 10
    }
})

export default NavigationRow
