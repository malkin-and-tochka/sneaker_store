import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import CustomButton from "../../../reused/CustomButton";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {getTotalPrice, resetCart} from "../../../../redux/reducers/cartReducer";
import GoBackButton from "../../../navigation/GoBackButton";
import {
    getTempOrder,
    getTempOrderPayment,
    resetTempOrder,
    setOrderPayment, setOrderPaymentCardNumber, setOrderPaymentCvv, setOrderPaymentValid
} from "../../../../redux/reducers/tempOrderReducer";
import {postOrder} from "../../../../api/orderApi";

const OrderPayment = ({prevButtonHandler}) => {
    const {cardNumber, validFor, cvv} = useSelector(getTempOrderPayment)
    const setCardNumber = cardNumber => dispatch(setOrderPaymentCardNumber(cardNumber))
    const setValidData = validFor => dispatch(setOrderPaymentValid(validFor))
    const setCvv = cvv => dispatch(setOrderPaymentCvv(cvv))
    const [paymentErrors, setPaymentErrors] = useState({
        cardNumber: "",
        validFor: "",
        cvv: ""
    });
    const [isValid, setIsValid] = useState(true)
    const [status, setStatus] = useState(0)
    const totalPrice = useSelector(getTotalPrice)
    const dispatch = useDispatch()
    const orderState = useSelector(getTempOrder)
    const discountValue = orderState.discountCodeValue
    const validDataHandle = text => {
        let newText = text;
        if (text.length === 2 && validFor.length === 1) {
            newText = text + '/';
        }
        setValidData(newText);
    }
    const cardHandler = text => {
        let newText = text;
        if ((text.length === 4 && cardNumber.length === 3) || (text.length === 9 && cardNumber.length === 8) || (text.length === 14 && cardNumber.length === 13)) {
            newText = text + ' ';
        }
        setCardNumber(newText);
    }
    const Submit = async () => {
        setStatus(0)
        setPaymentErrors({
            cardNumber: "",
            validFor: "",
            cvv: ""
        })
        setIsValid(false)
        let valid = true
        if (cardNumber.length !== 19) {
            setPaymentErrors(prevState => ({
                ...prevState,
                cardNumber: ['Size has to be 16']
            }))
            valid = false
        }
        if (validFor.length !== 5) {
            setPaymentErrors(prevState => ({
                ...prevState,
                validFor: ['Size has to be 4']
            }))
            valid = false
        }
        if (cvv.length !== 3) {
            setPaymentErrors(prevState => ({
                ...prevState,
                cvv: ['Size has to be 3']
            }))
            valid = false
        }
        if (valid) {
            dispatch(setOrderPayment(cardNumber, validFor, cvv))
            const status = await postOrder({
                ...orderState,
                paymentDetailsRequest: {cardNumber: cardNumber.replace(/ /g, ''), validFor, cvv}
            })
            setPaymentErrors({
                cardNumber: "",
                validFor: "",
                cvv: ""
            })
            setStatus(status)
            if (status === 201) {
                setCardNumber('')
                setValidData('')
                setCvv('')
                dispatch(resetCart())
                dispatch(resetTempOrder())
            }
        }
    }
    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                <Text style={styles.cardText}>Credit card</Text>
                <View>
                    {paymentErrors.cardNumber && <Text
                        style={[styles.validator, isValid ? {} : styles.error]}>{paymentErrors.cardNumber[0]}</Text>}
                    <TextInput
                        style={styles.input}
                        value={cardNumber}
                        onChangeText={cardHandler}
                        // keyboardType="numeric"
                        placeholder={'**** **** **** ****'}
                        placeholderTextColor={'#FDFFFA'}
                        maxLength={19}
                    />
                </View>
                <View style={styles.row}>
                    <View>
                        {paymentErrors.validFor && <Text
                            style={[styles.validator, isValid ? {} : styles.error]}>{paymentErrors.validFor[0]}</Text>}
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
                        {paymentErrors.cvv &&
                            <Text style={[styles.validator, isValid ? {} : styles.error]}>{paymentErrors.cvv[0]}</Text>}
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
                {status === 201 ?
                    <CustomButton fill={false} propStyles={{
                        minHeight: discountValue ? 150 : 100,
                        minWidth: 100,
                        padding: 5,
                        backgroundColor: '#ABDD48',
                        borderWidth: 0,
                        borderRadius: 15,
                        flexDirection: 'column',
                        gap: 5
                    }}>

                        <Ionicons name="checkmark-circle-outline" size={40} color="black"/>
                    </CustomButton>
                    :
                    <CustomButton handle={Submit} fill={false} propStyles={{
                        minHeight: discountValue ? 150 : 100,
                        minWidth: 100,
                        padding: 5,
                        backgroundColor: '#ABDD48',
                        borderWidth: 0,
                        borderRadius: 15,
                        flexDirection: 'column',
                        gap: 5
                    }}>
                        {discountValue ?
                            <Text
                                style={{fontSize: 25, textDecorationLine: 'line-through'}}>${totalPrice}
                            </Text>
                            :
                            null
                        }
                        <Text style={{fontSize: 25}}>${totalPrice - discountValue}
                        </Text>
                        <Ionicons name="bag-handle-outline" size={40} color="black"/>
                    </CustomButton>
                }


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
        shadowOffset: {width: 0, height: 2},
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
    },
    validator: {
        position: "absolute",
        right: 0,
        top: -15,
        fontWeight: '500',
        minWidth: 100,
        fontSize: 10,
        color: '#fff',
        textAlign: 'right'
    },
    error: {
        color: 'red'
    }
});

export default OrderPayment;
