import {useDispatch} from "react-redux";
import {decrementAmount, incrementAmount} from "../../../../redux/reducers/cartReducer";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

const Counter = ({productId, amount, color, size}) => {
    const dispatch = useDispatch()
    const handleIncrement = () => dispatch(incrementAmount(productId, color, size))

    const handleDecrement = () => {
        if (amount > 1) {
            dispatch(decrementAmount(productId, color, size));
        }
    };

    return (
        <View style={styles.row}>
            <Pressable style={styles.button} onPress={handleDecrement}><AntDesign name="minus" size={24} color="black" /></Pressable>
            <Text style={styles.amount}>{amount}</Text>
            <Pressable style={styles.button} onPress={handleIncrement}><AntDesign name="plus" size={24} color="black" /></Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 30,
        height: 30,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#100F14',
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row"
    },
    sign: {
        fontSize: 20
    },
    amount: {
        height: 30,
        width: 30,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20
    }
})

export default Counter;
