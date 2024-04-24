import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import InfoRow from "./InfoRow";
import GoBackButton from "../../../../navigation/GoBackButton";
import OrderProductItem from "./OrderProductItem";

const UserOrderScreen = (props) => {
    const {
        address,
        shippingType,
        shippingCost,
        discountCode,
        customerNotes,
        date,
        id,
        status,
        totalPrice,
        cardNumber,
        orderProductList,
    } = props.route.params
    const orderProductsView = orderProductList.map(prod => <OrderProductItem
        key={`${prod.id}${prod.color}${prod.quantity}`}
        id={prod.id}
        color={prod.color}
        size={prod.size}
        name={prod.name}
        amount={prod.quantity}
        categoryName={prod.categoryName}
        price={prod.price}
        img={prod.imageResponseList[0].url}
    />)
    return (
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 200, paddingTop: 20, alignItems: 'center', rowGap: 10}}
                    alignItems='column'>
            <GoBackButton propsStyles={{alignSelf: 'flex-start', marginLeft: '5%'}}/>
            <View style={styles.userOrderContainer}>
                <View style={[styles.subContainer, styles.addressData]}>
                    <Text style={styles.title}>Address info:</Text>
                    <InfoRow text={shippingType} title={'Shipping type:'}/>
                    <InfoRow text={address} title={'Address:'}/>
                    <InfoRow text={customerNotes} title={'Customer notes:'}/>
                </View>
                <View style={[styles.subContainer, styles.paymentData]}>
                    <Text style={styles.title}>Payment info:</Text>
                    <InfoRow text={date} title={'Date:'}/>
                    <InfoRow text={cardNumber} title={'Card number:'}/>
                    <InfoRow text={totalPrice} title={'Price:'}/>
                    {discountCode && <InfoRow text={`${discountCode.discountPrice}$`} title={`Discount: ${discountCode.name}`}/>}
                    <InfoRow text={discountCode.discountPrice ? `${totalPrice - discountCode.discountPrice}$` : `${totalPrice}`}
                             title={'Final price'}/>
                </View>
                <View style={[styles.subContainer, styles.productsData]}>
                    <Text style={styles.title}>Cart info:</Text>
                    {orderProductsView}
                </View>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    userOrderContainer: {
        borderWidth: 2,
        width: '90%',
        padding: 10,
        borderRadius: 10,
        borderColor: '#D9D9D9',
    },
    subContainer: {
        flexDirection: 'column',
        gap: 10,
        marginBottom: 20
    },
    addressData: {},
    paymentData: {},
    productsData: {},
    row: {
        flexDirection: "row",
        gap: 10,
        width: '100%',
    },
    rowText: {
        fontSize: 20,
        fontWeight: '500'
    },
    rowSubText: {
        fontSize: 18,
    },
    title: {
        fontSize: 20
    }
})

export default UserOrderScreen;
