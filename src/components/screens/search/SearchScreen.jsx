import {View, StyleSheet, ScrollView} from "react-native"
import ProductSearch from "../../Product/ProductSearch/ProductSearch";
import SearchInput from "./Search_Input";
import {useState} from "react";


const SearchScreen = () => {
    const [searchString, setSearchString] = useState('')

    return (
        <View style={styles.container}>
            <SearchInput setSearchString={setSearchString} searchString={searchString}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{rowGap: 25, paddingBottom: 200, paddingTop: 50}} alignItems='column' style={styles.column}>
                <ProductSearch/>
                <ProductSearch/>
                <ProductSearch/>
                <ProductSearch/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EBEE",
        alignItems: 'center'
    },
    column: {
        rowGap: 20,
        backgroundColor: "#E8EBEE",
        flex: 1,
        paddingLeft: 50,
        paddingRight: 50
    },
})

export default SearchScreen
