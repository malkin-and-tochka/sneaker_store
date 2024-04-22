import {Text, View, StyleSheet, ScrollView, Pressable} from "react-native";
import Slider from "./Slider";
import CustomButton from "../reused/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, isProductInCart, removeFromCart} from "../../redux/reducers/cartReducer";
import {useState} from "react";
import GoBackButton from "../navigation/GoBackButton";
import {Ionicons} from '@expo/vector-icons';
import {deleteFavorite, postFavorite} from "../../api/favoritesApi";
import {addToFavorites, isProductInFavorites, removeFromFavorites} from "../../redux/reducers/favoritesReducer";

const ProductPage = (props) => {
    const dispatch = useDispatch()
    const {name, description, images, category, sizes, colors, id, price} = props.route.params
    const isProductInFavList = useSelector(isProductInFavorites(id))
    const [size, setSize] = useState(null)
    const [color, setColor] = useState(null)
    const addProductToCart = () => dispatch(addToCart(props.route.params, color, size))
    const addToFavoritesHandler = async () => {
        await postFavorite(id)
        dispatch(addToFavorites({name, description, colors, imageResponseList: images, price, sizes, category, id}))
    }
    const removeFromFavoritesHandler = async () => {
        await deleteFavorite(id)
        dispatch(removeFromFavorites(id))
    }
    return (
        <ScrollView contentContainerStyle={{rowGap: 25, paddingBottom: 200}} alignItems='column' style={styles.wrapper}>
            <View style={styles.row}>
                <GoBackButton/>
                {isProductInFavList ?
                    <Ionicons onPress={removeFromFavoritesHandler} name="heart-sharp" size={50} color="black"/>
                    :
                    <Ionicons onPress={addToFavoritesHandler} name="heart-outline" size={50} color="black"/>
                }
            </View>
            <View style={{height: 200}}>
                <Slider images={images}/>
            </View>
            <View style={styles.row}>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={{fontSize: 15, fontWeight: 500, color: 'rgba(0,0,0,0.5)'}}>Category: {category}</Text>
                </View>
                <Text style={styles.price}>{price}$</Text>
            </View>
            <Text style={{fontSize: 25, fontWeight: 500}}>Description:</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.row}>
                <Text style={styles.textColors}>Choose color:</Text>
                <View style={[styles.row, {gap: 10}]}>
                    {colors.map(el => <Pressable key={el} style={[styles.circle, {
                        backgroundColor: `${el}`.toLowerCase(),
                        borderColor: el === color ? '#100F14' : '#E8EBEE',
                    }]} onPress={() => setColor(el)}/>)}
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.textColors}>Choose size:</Text>
                <View style={[styles.row, {gap: 10}]}>
                    {sizes.map(el => <Pressable onPress={() => setSize(el)} key={el}><Text
                        style={[styles.textSize, el === size ? {backgroundColor: '#B3B4B6'} : {}]}>{el}</Text></Pressable>)}
                </View>
            </View>
            {size ? <Text style={styles.warning}/> :
                <Text style={styles.warning}>
                    Please, choose the size
                </Text>}
            {color ? <Text style={styles.warning}/> :
                <Text style={styles.warning}>
                    Please, choose the color
                </Text>}
            <CustomButton disabled={!color || !size} handle={addProductToCart} fill={true} buttonText='Add to cart'
                          propStyles={{height: 40}}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        flexDirection: 'column',
        gap: 20
    },
    row: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    description: {
        fontSize: 20
    },
    price: {
        color: '#100F14',
        fontSize: 40,
    },
    textColors: {
        fontSize: 25,
        fontWeight: '500',
        width: '50%'
    },
    textSize: {
        fontSize: 25,
        borderRadius: 10,
        padding: 5
    },
    warning: {
        fontSize: 16,
        color: 'red',
        fontWeight: '500'
    },
    circle: {
        height: 36,
        width: 36,
        borderRadius: 1000,
        borderWidth: 2
    },
    name: {
        maxWidth: 200,
        fontSize: 25
    }
})

export default ProductPage;
