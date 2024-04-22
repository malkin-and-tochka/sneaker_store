import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import CustomButton from "../../reused/CustomButton";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AntDesign} from "@expo/vector-icons";

const CategoryDescription = ({name, description, id, image}) => {
    const navigation = useNavigation()
    return (
        <View style={styles.column}>
        <Pressable onPress={()=>navigation.navigate('CategoryScreen', {category: name})} style={[styles.row, styles.bottomLine]}>
            <View>
                <Image resizeMethod={'resize'} style={styles.img} source={{uri:image.url}}/>
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.description}>{description}</Text>
            </View>
            <AntDesign name="right" size={30} color="black" />
        </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        flex: 1,
        resizeMode: 'contain',
        width: 70
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: '100%',
        padding: 20,
        alignItems: "center"
    },
    name: {
        fontSize: 25,
        fontWeight: '500'
    },
    description: {
        fontSize: 20,
        fontWeight: '500',
        color: '#808080'
    },
    textWrapper: {
        width: '40%'
    },
    bottomLine: {
        borderBottomColor: '#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    arrow: {
        fontSize: 30,
        fontWeight: '500',
        padding: 10
    },
    column: {
        width: '100%',
        flexDirection: "column"
    }
})
export default CategoryDescription;
