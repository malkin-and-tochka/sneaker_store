import {postCategory, postCategoryImage} from "../../../../api/adminApi";
import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import FormElement from "./FormElement";
import CustomButton from "../../../reused/CustomButton";
import ImagePick from "./ImagePick";
import {prepareImg} from "../../../../helpFunctions/prepareImageToRequest";


const CreateCategory = () => {
    const [createOrUpdate, setCreateOrUpdate] = useState('create')
    const [categoryName, setCategoryName] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [image, setImage] = useState()
    const [answerMessage, setAnswerMessage] = useState('')
    const [formDataErrors, setFormDataErrors] = useState({
        categoryName: '',
        categoryDescription: '',
        categoryId: '',
        img: ''
    });
    const createCategoryOnClick = async () => {
        // if (categoryName && categoryDescription) {
        setFormDataErrors({
            categoryName: '',
            categoryDescription: '',
            categoryId: '',
            img: ''
        })
        setAnswerMessage('')
        let valid = true
        if (categoryName.length === 0 || categoryName.length > 120) {
            setFormDataErrors(prevState => ({...prevState, categoryName: 'Size has to be between 1 and 120'}))
            valid = false
        }
        if (categoryDescription.length === 0 || categoryDescription.length > 240) {
            setFormDataErrors(prevState => ({...prevState, categoryDescription: 'Size has to be between 1 and 240'}))
            valid = false
        }
        // if (!image) {
        //     setFormDataErrors(prevState => ({...prevState, img: 'Null is not allowed'}))
        //     valid = false
        // }
        if (createOrUpdate === 'update' && categoryId.length === 0) {
            setFormDataErrors(prevState => ({...prevState, categoryId: 'Null not allowed'}))
            valid = false
        }
        if (valid) {
            const categoryId = await postCategory(categoryName, categoryDescription)
            if (categoryId.code === '400') {
                setAnswerMessage(categoryId.value)
            }
            if (createOrUpdate === 'create') {
                const [formImageData, config] = prepareImg(image, categoryId.id)
                const imageRes = await postCategoryImage(formImageData, config)
                if (imageRes) {
                    setAnswerMessage('Category was created')
                }
            }
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
            <FormElement validator={formDataErrors.categoryName} textStyles={styles.text}
                         handle={(text) => setCategoryName(text)} value={categoryName}
                         title={'Category name'}
                         label={'Category name'}/>
            <FormElement validator={formDataErrors.categoryDescription} textStyles={styles.text}
                         handle={(text) => setCategoryDescription(text)}
                         value={categoryDescription}
                         title={'Category description'} label={'Category description'}/>
            {createOrUpdate === 'update' ?
                <FormElement validator={formDataErrors.categoryId} textStyles={styles.text}
                             handle={text => setCategoryId(text)} value={categoryId}
                             title={'Category Id'}
                             label={'Category Id'}/> : null}
            <ImagePick image={image} setImage={setImage} setFormDataErrors={setFormDataErrors}/>
            {answerMessage && <Text>{answerMessage}</Text>}
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
        gap: 10,
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
