import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import CustomButton from "../../reused/CustomButton";
import {deleteFavorite} from "../../../api/favoritesApi";
import {useDispatch} from "react-redux";
import {removeFromFavorites} from "../../../redux/reducers/favoritesReducer";
import {FontAwesome6} from "@expo/vector-icons";

const FavoritesItem = ({img, name, price, categoryName, id}) => {
    const dispatch = useDispatch()
    const removeFromFavList = async () => {
        await deleteFavorite(id)
        dispatch(removeFromFavorites(id))
    }
    return (
        <View style={styles.column}>
            <View style={[styles.row, styles.bottomLine]}>
                <View style={styles.imageWrapper}>
                    <Image resizeMethod={'resize'} style={styles.img} source={{uri: img}}/>
                </View>
                <View style={styles.column}>
                    <Text style={[styles.text, {maxWidth: 120}]}>{name}</Text>
                    <Text style={styles.text}>Category: {categoryName}</Text>
                </View>
                <FontAwesome6 onPress={removeFromFavList} name="trash" size={30} color="black" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: 10
    },
    bottomLine: {
        borderBottomColor: '#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    column: {
        flexDirection: 'column'
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    imageWrapper: {
        height: 100,
        width: 160
    },
    text: {
        fontSize: 16,
        fontWeight: '500'
    },
    price: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: '500'
    },
    circle: {
        height: 36,
        width: 36,
        borderRadius: 1000,
        borderWidth: 2
    },
    subRow: {
        flexDirection: "row",
        alignItems: "center",
        width: '50%',
        gap: 20
    },
    paramText: {
        fontSize: 20,
        fontWeight: '500'
    }
})

export default FavoritesItem;
