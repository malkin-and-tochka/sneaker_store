import {View, Text, StyleSheet, ScrollView, RefreshControl, SafeAreaView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getProductsSelector, setProducts} from "../../../redux/reducers/productsReducer";
import {useCallback, useEffect, useState} from "react";
import {getAllProducts} from "../../../api/productsApi";
import FilterAndSorting from "./FilterAndSorting/FilterAndSorting";
import {getCategories} from "../../../api/categoriesApi";
import {setCategories} from "../../../redux/reducers/categoriesReducer";

const HomeScreen = () => {
        const dispatch = useDispatch()
        const products = useSelector(getProductsSelector)
        const [refreshing, setRefreshing] = useState(false);

        const onRefresh = useCallback(() => {
            setRefreshing(true);
            (async () => {
                const data = await getAllProducts()
                if (data.length !== 0) dispatch(setProducts(data))
                const res = await getCategories()
                if(res) dispatch(setCategories(res))
                setRefreshing(false);
            })()
        }, []);

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
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >

                    <FilterAndSorting initialProducts={products}/>
                </ScrollView>
            </View>
        )
    }
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EBEE",
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    column: {
        width: '100%',
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
