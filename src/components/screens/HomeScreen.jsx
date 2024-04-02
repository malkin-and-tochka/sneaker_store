import {View, Text, StyleSheet, ScrollView} from "react-native";
import Product from "../Product/Product";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{rowGap: 25, paddingBottom: 200, paddingTop: 50}} alignItems='column'
                        style={styles.column}>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EBEE",
        alignItems: 'center'
    },
    row: {
        felx: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    column: {
        width: '80%',
        rowGap: 20,
        backgroundColor: "#E8EBEE",
        flex: 1,
        // paddingBottom: 200
    },
});

export default HomeScreen;
