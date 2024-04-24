import {View, Text, StyleSheet, Image} from "react-native";
import {IP_ADDRESS} from "../../../../../constants";

const OrderProductItem = ({img, name, price, amount, categoryName, id, color, size}) => {
    const validImg = img.replace('localhost', IP_ADDRESS)
    return (
        <View style={styles.column}>
            <View style={[styles.row, styles.bottomLine]}>
                <View style={styles.imageWrapper}>
                    <Image resizeMethod={'resize'} style={styles.img} source={{uri: validImg}}/>
                </View>
                <View style={[styles.column, {maxWidth: '25%'}]}>
                    <Text style={[styles.text, {maxWidth: 140}]}>{name}</Text>
                </View>
                <View>
                    <Text style={styles.price}>{price}$</Text>
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
                <Text style={styles.amount}>Amount: {amount}</Text>
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
        resizeMode: 'contain',
    },
    imageWrapper: {
        height: 100,
        width: 160,
        maxWidth: '50%'
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
        minWidth: '20%',
        maxWidth: '30%',
        gap: 20
    },
    paramText: {
        fontSize: 20,
        fontWeight: '500'
    },
    amount: {
        fontSize: 18,
        maxWidth: '30%'
    }
})

export default OrderProductItem;
