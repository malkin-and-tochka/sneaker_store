import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../redux/reducers/authReducer";

const NeedToAuth = () => {
    const navigation = useNavigation()
    const isAuth = useSelector(getIsAuth)
    useEffect(() => {
        if (isAuth) {
            navigation.navigate('Home')
        }
    })
    return (
        <View style={styles.modalWindow}>
            <View style={styles.subWrapper}>
                <Text style={styles.highTitle}>You need to log in</Text>
                <Pressable onPress={() => navigation.navigate('CombineForm')} style={styles.button}>
                    <Text style={styles.title}>
                        Log in/sign in
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalWindow: {
        flex: 1,
        zIndex: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    subWrapper: {
        flexDirection: "column",
        gap: 20
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#f5f5f5'
    },
    button: {
        backgroundColor: '#100F14',
        padding: 20,
        borderRadius: 5,
        alignItems: "center"
    },
    highTitle: {
        fontSize: 25,
        fontWeight: '500',
        color: '#100F14'
    }
})

export default NeedToAuth;
