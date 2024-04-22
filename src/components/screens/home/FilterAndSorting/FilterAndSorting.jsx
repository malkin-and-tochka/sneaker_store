import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {filterProducts, searchProducts, sortByOrder} from "../../../../helpFunctions/SortingProducts";
import PaginatorView from "../Paginator/PaginatorView";
import PageSizeSelector from "../Paginator/PageSizeSelector";
import {AntDesign} from "@expo/vector-icons";
import CustomButton from "../../../reused/CustomButton";
import {useSelector} from "react-redux";
import {getProductsSelector} from "../../../../redux/reducers/productsReducer";

const FilterAndSorting = ({initialProducts}) => {
    const prodRed = useSelector(getProductsSelector)
    useEffect(() => {
        setFilteredProducts(prodRed)
    }, [prodRed]);
    const [filteredProducts, setFilteredProducts] = useState(initialProducts); // Отфильтрованный и отсортированный массив продуктов
    // console.log(prodRed)
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [minSize, setMinSize] = useState();
    const [maxSize, setMaxSize] = useState();
    const [substring, setSubstring] = useState('');
    const [ascending, setAscending] = useState(true);
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)

    const handleFilterAndSort = () => {
        const filteredResult = filterProducts(filteredProducts, minPrice, maxPrice, minSize, maxSize)
        const sortResult = sortByOrder(filteredResult, ascending)
        setFilteredProducts(sortResult);
    };

    const searchProduct = (text) => {
        setSubstring(text)
        // console.log(text, prodRed)
        setFilteredProducts(searchProducts(prodRed, substring))
    }

    return (
        <View>
            <View style={[styles.advancedSettings, showAdvancedSettings && styles.advancedSettingsVisible]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextInput
                        style={styles.searchInput}
                        value={substring} onChangeText={searchProduct}
                        placeholder={'Search...'}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <AntDesign name="search1" size={36} color="black"/>
                        {showAdvancedSettings ?
                            <AntDesign onPress={() => setShowAdvancedSettings(false)} name="caretup" size={36}
                                       color="black"/>
                            :
                            <AntDesign onPress={() => setShowAdvancedSettings(true)} name="caretdown" size={36}
                                       color="black"/>
                        }
                    </View>
                </View>
                {showAdvancedSettings &&
                    <View>
                        <View style={styles.row}>
                            <Text>Price: </Text>
                            <Text>from</Text>
                            <TextInput style={styles.input} value={minPrice} onChangeText={setMinPrice}
                                       keyboardType="numeric"/>
                            <Text>to</Text>
                            <TextInput style={styles.input} value={maxPrice} onChangeText={setMaxPrice}
                                       keyboardType="numeric"/>
                        </View>
                        <View style={styles.row}>
                            <Text>Sizes: </Text>
                            <Text>from</Text>
                            <TextInput style={styles.input} valvalue={minSize} onChangeText={setMinSize}
                                       keyboardType="numeric"/>
                            <Text>to</Text>
                            <TextInput style={styles.input} value={maxSize} onChangeText={setMaxSize}
                                       keyboardType="numeric"/>
                        </View>
                        <View style={styles.row}>
                            <Text>Sort by: </Text>
                            <CustomButton buttonText={'increasing'}/>
                            <CustomButton buttonText={'decreasing'}/>
                        </View>

                        <Button title="Фильтровать и сортировать" onPress={handleFilterAndSort}/>
                    </View>}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <PageSizeSelector/>
            </View>
            {filteredProducts.length !== 0 && <PaginatorView items={filteredProducts}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    advancedSettings: {
        flexDirection: "column",
        borderWidth: 2,
        borderRadius: 50,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 5,
        backgroundColor: '#fff'
    },
    advancedSettingsVisible: {
        borderRadius: 20,
    },
    searchInput: {
        backgroundColor: '#0f0',
        width: '70%'
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    input: {
        borderWidth: 2,
        borderRadius: 5
    }
})

export default FilterAndSorting
