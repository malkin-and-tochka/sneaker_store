import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getProductsSelector, setProducts} from "../../../redux/reducers/productsReducer";
import {useEffect} from "react";
import {getAllProducts} from "../../../api/productsApi";
import PaginatorView from "./Paginator/PaginatorView";

const HomeScreen = () => {
        const dispatch = useDispatch()
        const products = useSelector(getProductsSelector)
        useEffect(() => {
            (async () => {
                const data = await getAllProducts()
                if (data) dispatch(setProducts(data))
            })()
        }, []);
        if (products) return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{rowGap: 25, paddingBottom: 200, paddingTop: 50}} alignItems='column'
                            style={styles.column}>
                    <PaginatorView items={products}/>
                </ScrollView>
            </View>
        );
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{rowGap: 25, paddingBottom: 200, paddingTop: 50}} alignItems='column'
                            style={styles.column}>

                    <Text>Loading...</Text>
                </ScrollView>
            </View>
        );
    }
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EBEE",
        alignItems: 'center'
    },
    row: {
        flex: 1,
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