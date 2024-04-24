import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useSelector} from "react-redux";
import {
    selectProductsByCategory
} from "../../../redux/reducers/productsReducer";
import PaginatorView from "../home/Paginator/PaginatorView";
import GoBackButton from "../../navigation/GoBackButton";

const CategoryProductsScreen = (props) => {
        const category = props.route.params.category
        const products = useSelector(state => selectProductsByCategory(state, category))
        if (products) return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{rowGap: 25, paddingBottom: 200, paddingTop: 50}} alignItems='column'
                            style={styles.column}>
                    <GoBackButton/>
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

export default CategoryProductsScreen;
