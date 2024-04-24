import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import CustomButton from "../../../reused/CustomButton";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const getFileInfo = async (fileURI) => await FileSystem.getInfoAsync(fileURI)
const ImagePick = ({image, setImage, setFormDataErrors}) => {
    const saveImage = async image => {
        try {
            setImage(image)
        } catch (e) {
            console.log(e)
        }
    }
    const pickImage = async () => {
    try {
        await ImagePicker.requestMediaLibraryPermissionsAsync()
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        })
        const imgInfo = await getFileInfo(result.assets[0].uri)
        if (imgInfo.size <= 1048576) {
            if (!result.canceled) {
                await saveImage(result.assets[0])
            }
        } else {
            setFormDataErrors(prevState => ({
                ...prevState, image: 'Image size can not be more then 1048576 bytes'
            }))
        }
    } catch (e) {
        console.log(e)
    }
}
    return (
        <View style={styles.wrapper}>
            {image && <View style={styles.imgWrapper}>
                <Image source={{uri: image.uri}} style={styles.img}/>
            </View>}
            <CustomButton buttonText={'Pick image'} handle={pickImage} fill={true}/>
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
