import {View, Text, StyleSheet, Image} from "react-native";
import Counter from "./Counter";
import {useDispatch, useSelector} from "react-redux";
import {isProductInCart, removeFromCart} from "../../../../redux/reducers/cartReducer";
import {FontAwesome6} from "@expo/vector-icons";

const CartItem = ({img, name, price, amount, categoryName, id, color, size}) => {
    const dispatch = useDispatch()
    const removeFromCartHandler = () => dispatch(removeFromCart(id, color, size))
    return (
        <View style={styles.column}>
            <View style={[styles.row, styles.bottomLine]}>
                <View style={styles.imageWrapper}>
                    <Image resizeMethod={'resize'} style={styles.img} source={{uri: img}}/>
                </View>
                <View style={styles.column}>
                    <Text style={[styles.text, {maxWidth: 140}]}>{name}</Text>
                    <Text style={styles.text}>Category: {categoryName}</Text>
                </View>
                <View>
                    <Text style={styles.price}>{price}$</Text>
                    <Counter amount={amount} color={color} size={size} productId={id}/>
                </View>
            </View>
            <View style={[styles.row, styles.bottomLine]}>
                <View style={styles.subRow}>
                    <Text style={styles.paramText}>Color</Text>
                    <View style={[styles.circle, {backgroundColor: color.toLowerCase()}]}/>
                </View>
                <View style={styles.subRow}>
                    <Text style={styles.paramText}>Size: {size}</Text>
                </View>
                <FontAwesome6 onPress={removeFromCartHandler} name="trash" size={30} color="black"/>
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
        width: '30%',
        gap: 20
    },
    paramText: {
        fontSize: 20,
        fontWeight: '500'
    }
})

export default CartItem;
