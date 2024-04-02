import {View, StyleSheet} from "react-native";
import DescriptionProductSearch from "./DescriptionProductSearch";
import ButtonAndPrice from "./ButtonAndPrice";
import Slider from "./Slider";
import {useNavigation} from "@react-navigation/native";
import shoos1 from "../../../../assets/Adidas Iniki Runner_prime.jpg";
import shoos2 from "../../../../assets/Adidas Iniki Runner_2.jpg"

const ProductSearch = () => {
    const navigate = useNavigation()
    const goToProductPageHandler = () => navigate.navigate('productPage', {name: 'Adidas Iniki Runner', description: 'loooooooooooongloooooooooooongloooooooooooongloooooooooooongloooooooooooongloooooooooooongloooooooooooong loooooooooooong descriptionloooooooooooong loooooooooooong descriptionloooooooooooong loooooooooooong descriptionloooooooooooong loooooooooooong descriptionloooooooooooong loooooooooooong descriptionloooooooooooong loooooooooooong descriptionloooooooooooong loooooooooooong descriptionloooooooooooong loooooooooooong description  ', images: [shoos1, shoos2]})
    return (
        <View style={styles.wrapper}>
            <Slider images={[shoos1, shoos2]}/>
            <DescriptionProductSearch/>
            <ButtonAndPrice goToProductPage={goToProductPageHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        width: 300,
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

export default ProductSearch;
