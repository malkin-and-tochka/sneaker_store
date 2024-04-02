import {Text, View, StyleSheet, ScrollView} from "react-native";
import Slider from "./ProductSearch/Slider";
import CustomButton from "../reused/CustomButton";

const ProductPage = (props) => {
    const {name, description, images} = props.route.params
    return (
        <ScrollView contentContainerStyle={{rowGap: 25, paddingBottom: 200}} alignItems='column' style={styles.wrapper}>
            <View>
                <Text style={{fontSize: 25}}>{name}</Text>
                <Text style={{fontSize: 15, fontWeight: 500, color: 'rgba(0,0,0,0.5)'}}>Category: {name}</Text>
            </View>
            <View style={{height: 200}}>
                <Slider images={images}/>
            </View>
            <Text style={{fontSize: 25, fontWeight: 500}}>Product description</Text>
            <Text style={styles.description}>{description}</Text>
            <CustomButton fill={true} buttonText={'Add to cart'} propStyles={{height: 40}}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        flexDirection: 'column',
        gap: 20,
        // minHeight: '50%'
        // paddingBottom: 200
    },
    row: {
        flexDirection: "row"
    },
    description: {
        fontSize: 20
    }
})

export default ProductPage;
