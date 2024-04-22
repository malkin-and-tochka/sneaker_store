import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import CustomButton from "./CustomButton";
import {useNavigation} from "@react-navigation/native";

const IsEmpty = ({context}) => {
    const navigation = useNavigation()
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{context} is empty</Text>
            <CustomButton buttonText={'Home page'} handle={() => navigation.navigate('Home')} fill={true}
                          propStyles={{padding: 5}}/>
            <CustomButton buttonText={'Categories page'} handle={() => navigation.navigate('Categories')} fill={true}
                          propStyles={{padding: 5}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#B3B4B6',
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        position: "absolute",
        alignSelf: 'center',
        top: '35%'
    },
    text: {
        fontSize: 25,
        fontWeight: '500'
    }
})

export default IsEmpty;
