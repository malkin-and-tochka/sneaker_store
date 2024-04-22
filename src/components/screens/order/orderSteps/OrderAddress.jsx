import {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import GoBackButton from "../../../navigation/GoBackButton";
import FormElement from "../../user/admin/FormElement";
import CustomButton from "../../../reused/CustomButton";
import NextStepButton from "./NextStepButton";
import {
    getTempAddress,
    getTempOrder,
    setOrderAddress,
    setOrderProductsList
} from "../../../../redux/reducers/tempOrderReducer";
import {useDispatch, useSelector} from "react-redux";

const OrderAddress = ({nextButtonHandler}) => {
    const AddressDate = useSelector(getTempAddress)
    const [address, setAddress] = useState(AddressDate.address);
    const [customerNotes, setCustomerNotes] = useState(AddressDate.customerNotes);
    const [shippingType, setShippingType] = useState(AddressDate.shippingType);
    const dispatch = useDispatch()
    const setOrderAddressHandler = () => {
        dispatch(setOrderAddress(address, shippingType, customerNotes))
    }
    const combineHandlers = () => {
        nextButtonHandler()
        setOrderAddressHandler()
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{rowGap: 10, paddingBottom: 200, padding: 10}} alignItems='column'>
            <Text style={styles.inputsNames}>Shipping Type:</Text>
            <View style={[styles.row, {width: '70%', gap: 0}]}>
                <CustomButton propStyles={styles.rowButtons} buttonText={'Pickup'}
                              handle={() => setShippingType('SELF_PICK_UP')} fill={shippingType !== 'SELF_PICK_UP'}/>
                <CustomButton propStyles={styles.rowButtons} buttonText={'Delivery'}
                              handle={() => setShippingType('DELIVERY_BY_COURIER ')}
                              fill={shippingType !== 'DELIVERY_BY_COURIER '}/>
            </View>
            <FormElement handle={(text) => setAddress(text)} value={address}
                         title={shippingType === 'SELF_PICK_UP' ? 'Your address' : 'Store address'} label={'Address'}/>
            <FormElement handle={(text) => setCustomerNotes(text)} value={customerNotes}
                         title={'Customer Notes'} label={'Customer Notes'}/>
            <View style={styles.row}>
                <GoBackButton/>
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
        justifyContent: "space-between"
    },
    rowButtons: {
        width: '45%'
    }
})

export default OrderAddress;
