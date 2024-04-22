import {View, StyleSheet} from "react-native";
import DescriptionProductSearch from "./DescriptionProductSearch";
import ButtonAndPrice from "./ButtonAndPrice";
import Slider from "./Slider";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorites, isProductInFavorites, removeFromFavorites} from "../../redux/reducers/favoritesReducer";
import {deleteFavorite, postFavorite} from "../../api/favoritesApi";

const Product = ({name, description, colors, images, price, sizes, categoryName, id}) => {
    const navigate = useNavigation()
    const urls = images.map(el => el.url)
    const goToProductPageHandler = () => navigate.navigate('productPage', {name, description, images: urls, category: categoryName, sizes, colors, id, price})
    return (
        <View style={styles.wrapper}>
            <Slider images={urls}/>
            <DescriptionProductSearch description={description} price={price} name={name}/>
            <ButtonAndPrice goToProductPage={goToProductPageHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 5
    },
    img: {
        flex: 1,
        resizeMode: 'contain',
        height: 200,
        width: '100%'
    },
    row: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    column: {
        flexDirection: 'column',
        // justifyContent: 'space-between'
    }
})

export default Product;
