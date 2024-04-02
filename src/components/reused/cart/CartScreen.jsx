import {View, StyleSheet, Text} from "react-native";
import CartItem from "./CartItem";
import anotherShoes from '../../../../assets/Adidas Iniki Runner_2.jpg'
const CartScreen = () => {
    return (
        <View style={styles.column}>
            <CartItem img={anotherShoes}/>
            <CartItem img={anotherShoes}/>
            <CartItem img={anotherShoes}/>
            <CartItem img={anotherShoes}/>
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        gap: 10
    }
})

export default CartScreen;
