import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import CustomButton from "../../../reused/CustomButton";

const ImagePick = ({image, pickImageHandler}) => {
    return (
        <View style={styles.wrapper}>
            {image && <View style={styles.imgWrapper}>
                <Image source={{uri: image.uri}} style={styles.img}/>
            </View>}
            <CustomButton buttonText={'Pick image'} handle={pickImageHandler} fill={true}/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        gap: 10,
        backgroundColor: '#E8EBEE',
        padding: 10,
        borderRadius: 10
    },
    img: {
        resizeMode: 'contain',
        height: 200,
        width: '100%'
    },
    imgWrapper: {
        height: 200
    }
})

export default ImagePick;
