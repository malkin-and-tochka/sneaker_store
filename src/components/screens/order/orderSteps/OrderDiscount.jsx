import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import GoBackButton from "../../../navigation/GoBackButton";
import CustomButton from "../../../reused/CustomButton";
import FormElement from "../../user/admin/FormElement";
import NextStepButton from "./NextStepButton";
import {getDiscountByName} from "../../../../api/orderApi";
import {useDispatch, useSelector} from "react-redux";
import {
    getTempAddress,
    getTempDiscount,
    getTempOrder,
    setOrderDiscountCode
} from "../../../../redux/reducers/tempOrderReducer";

const OrderDiscount = ({nextButtonHandler, prevButtonHandler}) => {
    const discountCodeRedux = useSelector(getTempDiscount)
    const [discountCode, setDiscountCode] = useState(discountCodeRedux);
    const [discountCodeValue, setDiscountCodeValue] = useState('')
    const [successTry, setSuccessTry] = useState('')
    const dispatch = useDispatch()

    const checkTheDiscountCode = async () => {
        const res = await getDiscountByName(discountCode)
        if (res) {
            setDiscountCodeValue(res.discountPrice)
            setSuccessTry('success')
        } else {
            setSuccessTry('wrong')
        }
    }
    const setOrderDiscountCodeHandler = () => {
        if (successTry === 'success') {
            dispatch(setOrderDiscountCode(discountCode))
        }
    }
    const combineHandlers = () => {
        nextButtonHandler()
        setOrderDiscountCodeHandler()
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{rowGap: 10, paddingBottom: 200, padding: 10}} alignItems='column'>
            <FormElement handle={(text) => setDiscountCode(text)} value={discountCode}
                         title={'Discount code'} label={'Discount code'}/>
            <View style={styles.row}>
                <Text style={styles.discountText}>
                    {successTry === 'success' && (<>Your discount is <Text
                        style={styles.discountSuccessText}>{discountCodeValue}$</Text></>)}
                    {successTry === 'wrong' && <Text
                        style={styles.discountWrongText}>This code is not exist</Text>}
                </Text>
                <CustomButton buttonText={'Check discount'} fill={true}
                              propStyles={{backgroundColor: '#FDC467', borderWidth: 0, width: 160}}
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
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        padding: 10,
        gap: 10
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
        color: '#ABDD48'
    },
    discountWrongText: {
        color: '#E84929'
    },
    discountText: {
        fontSize: 20,
        fontWeight: '500'
    }
})
export default OrderDiscount;
