import {postDiscount} from "../../../../api/adminApi";
import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import FormElement from "./FormElement";
import CustomButton from "../../../reused/CustomButton";


const CreateDiscount = () => {
    const [discountName, setDiscountName] = useState('')
    const [discountPrice, setDiscountPrice] = useState('')
    const [validator, setValidator] = useState(false)
    const createDiscountOnClick = async () => {
        if (discountName && discountPrice) {
            const categoryId = await postDiscount(discountName, discountPrice)
            if (categoryId) {
                setValidator(false)
            } else {
                setValidator(true)
            }
        } else {
            setValidator(true)
        }
    }
    const clearAll = () => {
        setDiscountName('')
        setDiscountPrice('')
    }
    return (
        <View style={styles.inputsWrapper}>
            <Text style={styles.title}>Create discount</Text>
            <FormElement textStyles={styles.text} handle={(text) => setDiscountName(text)} value={discountName} title={'Discount name'}
                         label={'Discount name'}/>
            <FormElement textStyles={styles.text} handle={(text) => setDiscountPrice(text)} value={discountPrice}
                         title={'Discount price'} label={'Discount price'}/>
            {validator && <Text style={styles.error}>Please, check the valid values of the fields</Text>}
            <View style={styles.row}>
                <CustomButton propStyles={[styles.rowButtons, {backgroundColor: '#ABDD48', borderWidth: 0}]}
                              buttonText={'Create'} handle={createDiscountOnClick} fill={false}/>
                <CustomButton propStyles={[styles.rowButtons, {backgroundColor: '#E84929', borderWidth: 0}]}
                              buttonText={'Clear all'} handle={clearAll} fill={false}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputsWrapper: {
        backgroundColor: '#5552FF',
        // flexDirection: "column",
        gap: 10,
        // alignItems: "flex-start",,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10
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
        color: '#fff',
        textAlign: "left",
        width: '90%'
    },
    title: {
        fontSize: 30,
        color: '#fff',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%'
    },
    rowButtons: {
        width: '45%'
    },
    error: {
        fontSize: 20,
        fontWeight: '500',
        color: 'red'
    }
});

export default CreateDiscount;
