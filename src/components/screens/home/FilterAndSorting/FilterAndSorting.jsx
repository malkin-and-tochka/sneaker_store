import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
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
    const [filteredProducts, setFilteredProducts] = useState(initialProducts);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minSize, setMinSize] = useState('');
    const [maxSize, setMaxSize] = useState('');
    const [substring, setSubstring] = useState('');
    const [ascending, setAscending] = useState(true);
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)

    const handleFilterAndSort = () => {
        const filteredResult = filterProducts(prodRed, Number(minPrice), Number(maxPrice), Number(minSize), Number(maxSize))
        const filteredSubstring = searchProducts(filteredResult, substring)
        const sortResult = sortByOrder(filteredSubstring, ascending)
        setFilteredProducts(sortResult)
    };

    const clearFilters = () => {
        setAscending(true)
        setMaxSize('')
        setMinSize('')
        setMaxPrice('')
        setMinPrice('')
        setSubstring('')
        setFilteredProducts(prodRed)
    }
    return (
        <View style={{gap: 20}}>
            <View style={[styles.advancedSettings, showAdvancedSettings && styles.advancedSettingsVisible]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextInput
                        style={styles.searchInput}
                        value={substring} onChangeText={setSubstring}
                        placeholder={'Search...'}
                    />
                    <View style={{flexDirection: 'row'}}>
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
                    <View style={styles.column}>
                        <View style={styles.row}>
                            <Text style={styles.text}>Price: </Text>
                            <Text style={styles.text}>from</Text>
                            <TextInput style={styles.input} value={minPrice.toString()} onChangeText={setMinPrice}
                                       inputMode={"numeric"} keyboardType="numeric"/>
                            <Text style={styles.text}>to</Text>
                            <TextInput style={styles.input} value={maxPrice.toString()} onChangeText={setMaxPrice}
                                       inputMode={"numeric"} keyboardType="numeric"/>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Sizes: </Text>
                            <Text style={styles.text}>from</Text>
                            <TextInput style={styles.input} value={minSize.toString()} onChangeText={setMinSize}
                                       inputMode={"numeric"} keyboardType="numeric"/>
                            <Text style={styles.text}>to</Text>
                            <TextInput style={styles.input} value={maxSize.toString()} onChangeText={setMaxSize}
                                       inputMode={"numeric"} keyboardType="numeric"/>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Sort by: </Text>
                            <CustomButton propStyles={{padding: 5}} handle={() => setAscending(true)}
                                          buttonText={'increasing'} fill={ascending}/>
                            <CustomButton handle={() => setAscending(false)} buttonText={'decreasing'}
                                          fill={!ascending}/>
                        </View>
                        <View style={styles.row}>
                            <CustomButton propStyles={{
                                backgroundColor: '#FDC467',
                                borderWidth: 0,
                                borderRadius: 15,
                                width: '40%'
                            }} buttonText={'Clear'} handle={clearFilters}/>
                            <CustomButton propStyles={{
                                backgroundColor: '#ABDD48',
                                borderWidth: 0,
                                borderRadius: 15,
                                width: '40%'
                            }} buttonText={'Search'} handle={handleFilterAndSort}/>
                        </View>
                    </View>}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <PageSizeSelector/>
            </View>
            {filteredProducts.length === 0 ? <Text>Empty</Text> : <PaginatorView items={filteredProducts}/>}
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
        backgroundColor: '#fff',
        gap: 5,
        marginBottom: 20
    },
    advancedSettingsVisible: {
        borderRadius: 20,
    },
    searchInput: {
        width: '80%',
        borderBottomWidth: 1
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    input: {
        borderWidth: 2,
        borderRadius: 5,
        padding: 5
    },
    text: {
        fontSize: 20
    },
    column: {
        flexDirection: 'column',
        gap: 10
    }
})

export default FilterAndSorting
