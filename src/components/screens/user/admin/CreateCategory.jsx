import {postCategory} from "../../../../api/adminApi";
import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import FormElement from "./FormElement";
import CustomButton from "../../../reused/CustomButton";


const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')
    const [createOrUpdate, setCreateOrUpdate] = useState('create')
    const [categoryId, setCategoryId] = useState('')
    const [validator, setValidator] = useState(false)
    const createCategoryOnClick = async () => {
        if (categoryName && categoryDescription) {
            const categoryId = await postCategory(categoryName, categoryDescription)
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
        setCategoryName('')
        setCategoryDescription('')
        setCategoryId('')
    }
    return (
        <View style={styles.inputsWrapper}>
            <View style={styles.row}>
                <CustomButton propStyles={styles.rowButtons} buttonText={'Create category'}
                              handle={() => setCreateOrUpdate('create')} fill={createOrUpdate !== 'create'}/>
                <CustomButton propStyles={styles.rowButtons} buttonText={'Update category'}
                              handle={() => setCreateOrUpdate('update')} fill={createOrUpdate !== 'update'}/>
            </View>
            <FormElement textStyles={styles.text} handle={(text) => setCategoryName(text)} value={categoryName}
                         title={'Category name'}
                         label={'Category name'}/>
            <FormElement textStyles={styles.text} handle={(text) => setCategoryDescription(text)}
                         value={categoryDescription}
                         title={'Category description'} label={'Category description'}/>
            {createOrUpdate === 'update' ?
                <FormElement textStyles={styles.text} handle={text => setCategoryId(text)} value={categoryId}
                             title={'Category Id'}
                             label={'Category Id'}/> : null}
            {validator && <Text style={styles.error}>Please, check the valid values of the fields</Text>}
            <View style={styles.row}>
                <CustomButton propStyles={[styles.rowButtons, {backgroundColor: '#ABDD48', borderWidth: 0}]}
                              buttonText={'Create'} handle={createCategoryOnClick} fill={false}/>
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
        borderColor: '#D9D9D9',
        borderWidth: 2
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
        fontSize: 30
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

export default CreateCategory;
