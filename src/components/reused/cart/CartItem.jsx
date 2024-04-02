import {View, Text, StyleSheet, Image} from "react-native";

const CartItem = ({img}) => {
    return (
        <View style={styles.row}>
            <View style={styles.imageWrapper}>
                <Image resizeMethod={'resize'} style={styles.img} source={img}/>
            </View>
            <View style={styles.column}>
                <Text>Asics Gel-Skycount</Text>
                <Text>Cotton T-shirt</Text>
            </View>
            <Text>72.75</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '100%',
        height: 100
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
    }
})

export default CartItem;
