import {postDiscount} from "../../../../api/adminApi";
import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import FormElement from "./FormElement";
import CustomButton from "../../../reused/CustomButton";
import {Ionicons} from "@expo/vector-icons";

const CreateDiscount = () => {
    const [discountName, setDiscountName] = useState('')
    const [discountPrice, setDiscountPrice] = useState('')
    const [validator, setValidator] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [status, setStatus] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')
    const createDiscountOnClick = async () => {
        let valid = true
        if (discountName.length < 5 || discountName > 12) {
            valid = false
            setIsValid(false)
        }
        if (!(/\d/.test(discountName)) || !(/\D/.test(discountName))) {
            valid = false
            setIsValid(false)
        }
        if (valid) {
            const status = await postDiscount(discountName, discountPrice)
            if (status === 201) {
                setStatus(status)
                setDiscountPrice('')
                setDiscountName('')
                setValidator(false)
            } else {
                setValidator(true)
            }
        }
    }
    const clearAll = () => {
        setDiscountName('')
        setDiscountPrice('')
    }
    return (
        <View style={styles.inputsWrapper}>
            <Text style={styles.title}>Create discount</Text>
            <FormElement validatorStyles={{color: isValid ? '#000' : 'red'}}
                         validator={'At least 1 digit and 1 other character \nFrom 5 to 12'}
                         inputStyles={{borderColor: '#000', color: '#000'}}
                         placeholderColor='#000'
                         handle={(text) => setDiscountName(text)}
                         value={discountName}
                         title={'Discount name'}
                         label={'Discount name'}
            />
            <FormElement inputStyles={{borderColor: '#000', color: '#000'}}
                         placeholderColor='#000'
                         handle={(text) => setDiscountPrice(text)}
                         value={discountPrice}
                         title={'Discount price'}
                         label={'Discount price'}
            />
            {/*<FormElement textStyles={styles.text} handle={(text) => setDiscountPrice(text)} value={discountPrice}*/}
            {/*             title={'Discount price'} label={'Discount price'}/>*/}
            {validator && <Text style={styles.error}>Please, check the valid values of the fields</Text>}
            <View style={styles.row}>
                {status === 201 ?

                <CustomButton propStyles={[styles.rowButtons, {backgroundColor: '#ABDD48', borderWidth: 0}]}
                              buttonText={'Create'} handle={createDiscountOnClick} fill={false}>
                    <Ionicons name="checkmark-circle-outline" size={40} color="black"/>
                </CustomButton> :
                <CustomButton propStyles={[styles.rowButtons, {backgroundColor: '#ABDD48', borderWidth: 0}]}
                              buttonText={'Create'} handle={createDiscountOnClick} fill={false}/>}
                <CustomButton propStyles={[styles.rowButtons, {backgroundColor: '#E84929', borderWidth: 0}]}
                              buttonText={'Clear all'} handle={clearAll} fill={false}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputsWrapper: {
        // flexDirection: "column",
        gap: 10,
        // alignItems: "flex-start",,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D9D9D9',
        backgroundColor: 'rgba(0, 0, 0, 0.03)'
    },
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        textAlign: "center",
    },
    imageText: {
        marginTop: 10,
        color: "gray",
    },
    imageContainer: {
        marginVertical: 24,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
        textAlign: "left",
        width: '90%'
    },
    title: {
        fontSize: 30,
        color: '#000',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%'
    },
    rowButtons: {
        minWidth: '45%'
    },
    error: {
        fontSize: 20,
        fontWeight: '500',
        color: 'red'
    }
});

export default CreateDiscount;
