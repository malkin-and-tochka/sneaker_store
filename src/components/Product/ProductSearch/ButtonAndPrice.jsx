import {View, StyleSheet} from "react-native";
import CustomButton from "../../reused/CustomButton";


const ButtonAndPrice = ({goToProductPage}) => {
    return (
        <View style={styles.wrapper}>
            <CustomButton goToProductPage={goToProductPage} fill={true} buttonText={'More info'}/>
            <CustomButton fill={false} buttonText={'Add to wishlist'} propStyles={{height: 30}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        // width: '100%',
        padding: 5,
        gap: 5,
        // flex: 1
    },
    price: {
        color: '#000',
        fontSize: 30,
        textAlign: 'right'
    },
    available: {
        color: 'green',
        textAlign: 'right'
    },
    notAvailable: {

    }
})

export default ButtonAndPrice;
