import {View, StyleSheet, Text} from "react-native";

const DescriptionProductSearch = ({description, name, price}) => {
    const finalDescription = description.slice(0, 20) + '...'
    return (
        <View style={styles.wrapper}>
            <View style={{maxWidth: '70%'}}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{finalDescription}</Text>
            </View>
            <View>
                <Text style={styles.price}>{price}$</Text>
                <Text style={styles.available}>Available</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        // width: '100%',
        padding: 5,
        // flex: 1
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        fontSize: 22,
        fontWeight: "400",
        color: '#000',
        textAlign: 'left'
    },
    description: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: 'left',
        color: '#000',
    },
    price: {
        color: '#000',
        fontSize: 30,
        textAlign: 'right'
    },
    available: {
        color: 'green',
        textAlign: 'right'
    },
    notAvailable: {

    }
})

export default DescriptionProductSearch;
