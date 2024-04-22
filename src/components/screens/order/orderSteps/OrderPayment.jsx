import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import CustomButton from "../../../reused/CustomButton";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {getTotalPrice} from "../../../../redux/reducers/cartReducer";
import GoBackButton from "../../../navigation/GoBackButton";
import {getTempOrder, setOrderPayment} from "../../../../redux/reducers/tempOrderReducer";
import {postOrder} from "../../../../api/orderApi";

const OrderPayment = ({prevButtonHandler}) => {
    const [cardNumber, setCardNumber] = useState('');
    const [validFor, setValidData] = useState('');
    const [cvv, setCvv] = useState('');
    const totalPrice = useSelector(getTotalPrice)
    const dispatch = useDispatch()
    const orderState = useSelector(getTempOrder)
    const validDataHandle = text => {
        let newText = text;
        if (text.length === 2 && validFor.length === 1) {
            newText = text + '/';
        }
        setValidData(newText);
    }
    const setOrderPaymentHandler = () => {
        if (cardNumber.length === 16 && validFor.length === 5 && cvv.length === 3) dispatch(setOrderPayment(cardNumber, validFor, cvv))
    }
    const postOrderHandler = async () => {
        const res = await postOrder({...orderState, paymentDetailsRequest: {cardNumber, validFor, cvv}})
        return res
    }
    const combineHandler = async () => {
        setOrderPaymentHandler()
        const res = await postOrderHandler()
    }
    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                <Text style={styles.cardText}>Credit card</Text>
                <TextInput
                    style={styles.input}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType="numeric"
                    placeholder={'**** **** **** ****'}
                    placeholderTextColor={'#FDFFFA'}
                    maxLength={16}
                />
                <View style={styles.row}>
                    <View>
                        <TextInput
                            style={styles.input}
                            value={validFor}
                            onChangeText={validDataHandle}
                            placeholder="MM/YY"
                            placeholderTextColor={'#FDFFFA'}
                            maxLength={5}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            value={cvv}
                            onChangeText={setCvv}
                            keyboardType="numeric"
                            secureTextEntry
                            placeholder="***"
                            placeholderTextColor={'#FDFFFA'}
                            maxLength={3}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <GoBackButton handler={prevButtonHandler}/>
                <CustomButton handle={combineHandler} fill={false} propStyles={{minHeight: 50, padding: 5, backgroundColor: '#ABDD48', borderWidth: 0, borderRadius: 15, flexDirection: 'row', gap: 10}}>
                    <Ionicons name="bag-handle-outline" size={40} color="black" />
                    <Text style={{fontSize: 25}}>${totalPrice}</Text>
                </CustomButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 30,
        width: '90%',
        backgroundColor: '#060319',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 30,
        gap: 10,
        marginBottom: 30
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FDFFFA'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
        fontSize: 18,
        color: '#FDFFFA',
        padding: 5
    },
    row: {
        flexDirection: "row",
        gap: 20,
        width: '90%',
        justifyContent: "space-between",
        alignItems: "center",
    },
    wrapper: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
    },
    cardText: {
        fontSize: 18,
        color: '#FDFFFA',
    }
});

export default OrderPayment;
