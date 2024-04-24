import {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import GoBackButton from "../../../navigation/GoBackButton";
import FormElement from "../../user/admin/FormElement";
import CustomButton from "../../../reused/CustomButton";
import NextStepButton from "./NextStepButton";
import {
    getTempAddress,
    setOrderAddress, setOrderAddressData, setOrderCustomerNotes, setOrderShipping,
} from "../../../../redux/reducers/tempOrderReducer";
import {useDispatch, useSelector} from "react-redux";

const OrderAddress = ({nextButtonHandler}) => {
    const {address, shippingType, customerNotes} = useSelector(getTempAddress)
    const setAddress = text => dispatch(setOrderAddress(text))
    const setCustomerNotes = text => dispatch(setOrderCustomerNotes(text))
    const setShippingType = value => dispatch(setOrderShipping(value))
    const [isValid, setIsValid] = useState(true)
    const dispatch = useDispatch()
    const setOrderAddressHandler = () => {
        dispatch(setOrderAddressData(address, shippingType, customerNotes))
    }
    const combineHandlers = () => {
        let validator = true
        if (address.length < 10) validator = false
        if (validator) {
            setIsValid(true)
            nextButtonHandler()
            setOrderAddressHandler()
        } else {
            setIsValid(false)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.inputsNames}>Shipping Type:</Text>
            <View style={[styles.row, {width: '70%', gap: 0}]}>
                <CustomButton propStyles={styles.rowButtons} buttonText={'Pickup'}
                              handle={() => setShippingType('SELF_PICK_UP')} fill={shippingType !== 'SELF_PICK_UP'}/>
                <CustomButton propStyles={styles.rowButtons} buttonText={'Delivery'}
                              handle={() => setShippingType('DELIVERY_BY_COURIER ')}
                              fill={shippingType !== 'DELIVERY_BY_COURIER '}/>
            </View>
            <FormElement validatorStyles={{color: isValid ? '#000' : 'red'}} validator={'Size between 10 and 120'} inputStyles={{borderColor: '#000', color: '#000'}} placeholderColor='#000' handle={(text) => setAddress(text)} value={address}
                         title={shippingType === 'SELF_PICK_UP' ? 'Store address' : 'Your address'} label={'Address'}/>
            <FormElement inputStyles={{borderColor: '#000', color: '#000'}} placeholderColor='#000' handle={(text) => setCustomerNotes(text)} value={customerNotes}
                         title={'Customer Notes'} label={'Customer Notes'}/>
            <View style={styles.row}>
                <GoBackButton/>
                <NextStepButton handler={combineHandlers}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        padding: 10,
        gap: 10,
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
        justifyContent: "space-between"
    },
    rowButtons: {
        width: '45%'
    }
})

export default OrderAddress;
