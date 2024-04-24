import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import GoBackButton from "../../../navigation/GoBackButton";
import CustomButton from "../../../reused/CustomButton";
import FormElement from "../../user/admin/FormElement";
import NextStepButton from "./NextStepButton";
import {getDiscountByName} from "../../../../api/orderApi";
import {useDispatch, useSelector} from "react-redux";
import {
    getTempDiscount,
    setOrderDiscountCode, setOrderDiscountCodeName
} from "../../../../redux/reducers/tempOrderReducer";
import InfoRow from "../../user/account/userOrders/InfoRow";

const OrderDiscount = ({nextButtonHandler, prevButtonHandler}) => {
    const discountCode = useSelector(getTempDiscount)
    const [discountCodeValue, setDiscountCodeValue] = useState('')
    const [successTry, setSuccessTry] = useState('')
    const [isValid, setIsValid] = useState(true)
    const dispatch = useDispatch()
    const setDiscountCode = (text) => dispatch(setOrderDiscountCodeName(text))
    const checkTheDiscountCode = async () => {
        setIsValid(true)
        let valid = true
        if (discountCode.length < 5 || discountCode.length > 12) {
            valid = false
            setIsValid(false)
        }
        if (!(/\d/.test(discountCode)) || !(/\D/.test(discountCode))) {
            valid = false
            setIsValid(false)
        }
        if (valid) {
            const res = await getDiscountByName(discountCode)
            if (res.code === '404') {
                setSuccessTry('wrong')
                setDiscountCodeValue('')
            } else {
                setDiscountCodeValue(res.discountPrice)
                setSuccessTry('success')
            }
        }
    }
    const setOrderDiscountCodeHandler = async () => {
        let valid = true
        if (discountCode.length < 5 || discountCode.length > 12) {
            valid = false
            setIsValid(false)
        }
        if (!(/\d/.test(discountCode)) || !(/\D/.test(discountCode))) {
            valid = false
            setIsValid(false)
        }
        if (valid) {
            const res = await getDiscountByName(discountCode)
            if (res.discountPrice) {
                setDiscountCodeValue(res.discountPrice)
                dispatch(setOrderDiscountCode(discountCode, discountCodeValue))
            }
        } else {
            setDiscountCode('')
        }
    }
    const combineHandlers = async () => {
        nextButtonHandler()
        await setOrderDiscountCodeHandler()
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{rowGap: 10, paddingBottom: 200, padding: 10}} alignItems='column'>
            <FormElement validatorStyles={{color: isValid ? '#000' : 'red',minWidth: '50%'}}
                         validator={'At least 1 digit and 1 other character. From 5 to 12'}
                         inputStyles={{borderColor: '#000', color: '#000'}}
                         placeholderColor='#000'
                         handle={(text) => setDiscountCode(text)}
                         value={discountCode}
                         title={'Discount code'}
                         label={'Discount code'}
            />
            <View style={styles.row}>
                <Text style={styles.discountText}>
                    {successTry === 'success' && (<>Your discount is <Text
                        style={styles.discountSuccessText}>{discountCodeValue}$</Text></>)}
                    {successTry === 'wrong' && <Text
                        style={styles.discountWrongText}>This code is not exist</Text>}
                </Text>
                <CustomButton buttonText={'Check discount'} fill={true}
                              propStyles={{backgroundColor: '#FDC467',padding: 5 , borderWidth: 0, maxWidth: '50%'}}
                              textStyles={{color: '#000', fontSize: 20}} handle={checkTheDiscountCode}/>
            </View>
            <View style={styles.row}>
                <GoBackButton handler={prevButtonHandler}/>
                <NextStepButton handler={combineHandlers}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5552FF',
        // flexDirection: "column",
        gap: 10,
        // alignItems: "flex-start",,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10
    },
    input: {
        width: '80%',
        minHeight: 35,
        fontSize: 18,
        fontWeight: '500',
        borderColor: '#100F14',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        alignSelf: "flex-end"
    },
    inputsNames: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: "left"
        , alignSelf: "flex-start"
    },
    row: {
        flexDirection: "row",
        width: '100%',
        gap: 20,
        marginBottom: 20,
        justifyContent: "space-between",
        alignItems: "center"
    },
    rowButtons: {
        width: '30%'
    },
    discountSuccessText: {
        color: '#ABDD48',
    },
    discountWrongText: {
        color: '#E84929',
        fontSize: 18
    },
    discountText: {
        fontSize: 18,
        fontWeight: '500',
        maxWidth: '45%'
    }
})
export default OrderDiscount;
