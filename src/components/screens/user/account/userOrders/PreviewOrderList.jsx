import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import InfoRow from "./InfoRow";

const PreviewOrderList = ({order}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('UserOrders', order)} style={styles.wrapper}>
            <Text style={styles.title}>
                Order details:
            </Text>
            <InfoRow title={'Date:'} text={order.date}/>
            {order.discountCode ?
            <InfoRow title={'Price:'} text={order.totalPrice - order.discountCode.discountPrice}/>
                :
                <InfoRow title={'Price:'} text={order.totalPrice}/>}
            <InfoRow title={'Address:'} text={order.address}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderColor: '#D9D9D9'
    },
    title: {
        fontSize: 20
    }
})
export default PreviewOrderList;
