import React, {useEffect} from 'react';
import {getOrders} from "../../../../../api/orderApi";
import {useDispatch, useSelector} from "react-redux";
import {getUserOrdersList, setUserOrdersList} from "../../../../../redux/reducers/userOrdersReducer";
import {StyleSheet, View} from "react-native";
import PreviewOrderList from "./PreviewOrderList";

const UserOrdersList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            const orders = await getOrders()
            dispatch(setUserOrdersList(orders))
        })()
    }, []);
    const orderList = useSelector(getUserOrdersList)
    const orderListView = orderList.map(order => <PreviewOrderList
        key={order.id}
        order={order}/>
    )
    return (
        <View style={styles.container}>
            {orderListView}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        gap: 20,
        alignItems: "flex-start",
        padding: 20
    }
})

export default UserOrdersList;
