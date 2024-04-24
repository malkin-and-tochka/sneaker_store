import {useState} from 'react';
import {postProduct, postProductImage, updateProduct} from "../../../../api/adminApi";
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import FormElement from "./FormElement";
import CustomButton from "../../../reused/CustomButton";
import ImagePick from "./ImagePick";
import {prepareImg} from "../../../../helpFunctions/prepareImageToRequest";
import {colorsList} from "../../../../constants";
import CirclesCarouselElement from "./CirclesCarouselElement";
import {updateArray} from "../../../../helpFunctions/toggleArray";


const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        categoryId: "",
        price: "",
        colors: [],
        sizes: [],
    })
    const [formDataErrors, setFormDataErrors] = useState({
        name: '',
        description: '',
        categoryId: '',
        price: '',
        colors: '',
        sizes: '',
        image: '',
        productId: ''
    })
    const [newSize, setNewSize] = useState()
    const [newColor, setNewColor] = useState()
    const [image, setImage] = useState()
    const [createOrUpdate, setCreateOrUpdate] = useState('create')
    const [productId, setProductId] = useState('')
    const [answerMessage, setAnswerMessage] = useState('')
    const addSize = () => {
        setFormDataErrors(prevState => ({...prevState, sizes: ''}))
        if (newSize <= 50 && newSize > 0) {
            setFormData({...formData, sizes: [...formData.sizes, newSize]})
            setNewSize('')
        } else {
            setFormDataErrors(prevState => ({...prevState, sizes: 'Not allow more than 50'}))
        }
    }
    const toggleColor = (color) => {
        const newColorsArray = updateArray(formData.colors, color)
        setFormData(prevState => ({...prevState, colors: newColorsArray}))
    }
    const handleChange = (field) => (value) => {
        setFormData({...formData, [field]: value});
    };
    const onSubmit = async () => {
        let valid = true
        setFormDataErrors({
            name: '',
            description: '',
            categoryId: '',
            price: '',
            colors: '',
            sizes: '',
            image: '',
            productId: ''
        })
        if (formData.name.length === 0 || formData.name.length > 120) {
            valid = false
            setFormDataErrors(prevState => ({...prevState, name: 'Size has to be between 1 and 120'}))
        }
        if (formData.description.length === 0 || formData.description.length > 1200) {
            valid = false
            setFormDataErrors(prevState => ({...prevState, description: 'Size has to be between 1 and 1200'}))
        }
        if (formData.price.length === 0) {
            valid = false
            setFormDataErrors(prevState => ({...prevState, price: 'Null not allowed'}))
        }
        if (formData.categoryId.length === 0) {
            valid = false
            setFormDataErrors(prevState => ({...prevState, categoryId: 'Null not allowed'}))
        }
        // if (formData.sizes.length !== 0) {
        //
        //     valid = false
        //     setFormDataErrors(prevState => ({...prevState, categoryId: 'Null not allowed'}))
        // }
        if (createOrUpdate === 'update' && productId === '') {
            valid = false
            setFormDataErrors(prevState => ({...prevState, productId: 'Null not allowed'}))
        }
        if (createOrUpdate === 'create') {
            if (valid) {
                const productCode = await postProduct({...formData})

                if (productCode.code === '400') {
                    setAnswerMessage("Request body is missing")
                } else {
                    const [formImageData, config] = prepareImg(image, productCode.id)
                    const imageRes = await postProductImage(formImageData, config)
                    if (imageRes) {
                        setAnswerMessage('Product was created')
                    }
                }
            } else if (valid) {
                const res = await updateProduct({...formData, productId})
            }

        }
    }
    const clearAllFields = () => {
        setFormData({
            name: "",
            description: "",
            categoryId: "",
            price: "",
            colors: [],
            sizes: [],
        })
        setImage(null)
    }
    return (
        <View style={styles.inputsWrapper}>
            <View style={styles.row}>
                <CustomButton propStyles={styles.rowButtons} buttonText={'Create product'}
                              handle={() => setCreateOrUpdate('create')} fill={createOrUpdate !== 'create'}/>
                <CustomButton propStyles={styles.rowButtons} buttonText={'Update product'}
                              handle={() => setCreateOrUpdate('update')} fill={createOrUpdate !== 'update'}/>
            </View>
            <FormElement validator={formDataErrors.name} textStyles={styles.text} handle={handleChange("name")}
                         value={formData.name} title={'Name'}
                         label={'Name'}/>
            <FormElement validator={formDataErrors.description} textStyles={styles.text}
                         handle={handleChange("description")} value={formData.description}
                         title={'Description'}
                         label={'Description'}/>
            <FormElement validator={formDataErrors.categoryId} textStyles={styles.text}
                         handle={handleChange("categoryId")} value={formData.categoryId}
                         title={'Category ID'}
                         label={'Category ID'}/>
            <FormElement validator={formDataErrors.price} textStyles={styles.text} handle={handleChange("price")}
                         value={formData.price} title={'Price'}
                         label={'Price'}/>
            {createOrUpdate === 'update' ?
                <FormElement validator={formDataErrors.productId} textStyles={styles.text}
                             handle={text => setProductId(text)} value={productId}
                             title={'Product Id'}
                             label={'Product Id'}/> : null}
            <Text style={styles.text}>
                Colors: {formData.colors.map((el, index) => index + 1 !== formData.colors.length ?
                <Text key={el} id={el}>{el}, </Text> : <Text key={el} id={el}>{el}</Text>)}
            </Text>
            <ScrollView style={{maxHeight: 40}} showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{columnGap: 5, padding: 0}}>
                {colorsList.map(color => <CirclesCarouselElement key={color} color={color} toggleColor={toggleColor}/>)}
            </ScrollView>
            <Text style={styles.text}>
                Sizes: {formData.sizes.map((el, index) => index + 1 !== formData.sizes.length ?
                <Text key={el} id={el}>{el}, </Text> : <Text key={el} id={el}>{el}</Text>)}
            </Text>
            {formDataErrors.sizes && <Text style={styles.error}>{formDataErrors.sizes}</Text>}
            <View style={styles.row}>
                <TextInput
                    label="Size"
                    placeholder="Size"
                    value={newSize}
                    onChangeText={text => setNewSize(text)}
                    style={[styles.input, {width: '70%'}]}
                    placeholderTextColor={'#000'}
                />
                <CustomButton buttonText={'Add'} handle={addSize} propStyles={styles.microButton} fill={true}/>
            </View>
            {formDataErrors.image && <Text>{formDataErrors.image}</Text>}
            <ImagePick image={image} setImage={setImage} setFormDataErrors={setFormDataErrors}/>
            {answerMessage && <Text>{answerMessage}</Text>}
            <View style={styles.row}>
                <CustomButton propStyles={[styles.rowButtons, {backgroundColor: '#ABDD48', borderWidth: 0}]}
                              buttonText={'Submit'} handle={onSubmit} fill={false}/>
                <CustomButton propStyles={[styles.rowButtons, {backgroundColor: '#E84929', borderWidth: 0}]}
                              buttonText={'Clear all'} handle={clearAllFields} fill={false}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    inputsWrapper: {
        // backgroundColor: '#5552FF',
        // flexDirection: "column",
        gap: 10,
        // alignItems: "flex-start",,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        borderWidth: 2
    },
    input: {
        width: '90%',
        height: 40,
        fontSize: 20,
        fontWeight: '500',
        borderColor: '#000',
        borderWidth: 2,
        padding: 5,
        borderRadius: 5,
        color: '#000'
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '90%'
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
        textAlign: "left",
        maxWidth: '90%'
    },
    title: {
        fontSize: 30
    },
    microButton: {
        width: 70
    },
    rowButtons: {
        width: '45%'
    },
    error: {
        fontSize: 16,
        color: 'red'
    },
});

export default CreateProduct;
