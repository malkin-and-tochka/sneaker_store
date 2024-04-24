import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getProductsSelector, setProducts} from "../../../redux/reducers/productsReducer";
import {useEffect} from "react";
import {getAllProducts} from "../../../api/productsApi";
import FilterAndSorting from "./FilterAndSorting/FilterAndSorting";

const HomeScreen = () => {
        const dispatch = useDispatch()
        const products = useSelector(getProductsSelector)
        useEffect(() => {
            (async () => {
                const data = await getAllProducts()
                if (data.length !== 0) dispatch(setProducts(data))
            })()
        }, []);
        if (!products) return <Text>Loading...</Text>
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.column}
                            >
                    <FilterAndSorting initialProducts={products}/>
                    {/*<PaginatorView items={products}/>*/}
                </ScrollView>
            </View>
        )
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
        rowGap: 25,
        backgroundColor: "#E8EBEE",
        gap: 25,
        paddingBottom: 200,
        paddingTop: 50
        // flex: 1,
        // paddingBottom: 200
    },
});

export default HomeScreen;
