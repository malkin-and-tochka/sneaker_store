import {useState} from 'react';
import {postProduct, postProductImage, updateProduct} from "../../../../api/adminApi";
import * as ImagePicker from "expo-image-picker";
import {StyleSheet, Text, TextInput, View} from "react-native";
import FormElement from "./FormElement";
import CustomButton from "../../../reused/CustomButton";
import ImagePick from "./ImagePick";

const FormData = global.FormData

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        categoryId: "",
        price: "",
        colors: [],
        sizes: [],
    });
    const [newSize, setNewSize] = useState()
    const [newColor, setNewColor] = useState()
    const [image, setImage] = useState()
    const [validator, setValidator] = useState(false)
    const [createOrUpdate, setCreateOrUpdate] = useState('create')
    const [productId, setProductId] = useState('')
    const saveImage = async image => {
        try {
            setImage(image)
        } catch (e) {
            console.log(e)
        }
    }
    const addSize = () => {
        if (newSize) {
            setFormData({...formData, sizes: [...formData.sizes, newSize]})
            setNewSize('')
        }
    }
    const addColor = () => {
        if (newColor) {
            setFormData({...formData, colors: [...formData.colors, newColor]})
            setNewColor('')
        }
    }
    const handleChange = (field) => (value) => {
        setFormData({...formData, [field]: value});
    };
    const onSubmit = async () => {
        if (createOrUpdate === 'create') {
            if (formData.colors.length && formData.sizes.length && formData.name && formData.price && formData.categoryId && formData.description && image) {
                const productCode = await postProduct({...formData})
                const formImageData = new FormData()
                formImageData.append(`multipartFile`, {
                    uri: image.uri,
                    type: image.mimeType,
                    name: 'testFile'
                })
                formImageData.append('isPrime', true)
                formImageData.append('id', productCode)
                const config = {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    }
                }
                const imageRes = await postProductImage(formImageData, config)
                if (!!productCode) {
                    setValidator(false)
                } else {
                    setValidator(true)
                }
            } else {
                setValidator(true)
            }
        } else {
            if (formData.colors.length && formData.sizes.length && formData.name && formData.price && formData.categoryId && formData.description && productId) {
                const res = await updateProduct({...formData, productId})
                setValidator(true)
            } else {
                setValidator(false)
            }
        }
    }
    const pickImage = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync()
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })
            if (!result.canceled) {
                await saveImage(result.assets[0])
            }
        } catch (e) {
            console.log(e)
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
            <FormElement handle={handleChange("name")} value={formData.name} title={'Name'} label={'Name'}/>
            <FormElement handle={handleChange("description")} value={formData.description} title={'Description'}
                         label={'Description'}/>
            <FormElement handle={handleChange("categoryId")} value={formData.categoryId} title={'Category ID'}
                         label={'Category ID'}/>
            <FormElement handle={handleChange("price")} value={formData.price} title={'Price'} label={'Price'}/>
            {createOrUpdate === 'update' ?
                <FormElement handle={text => setProductId(text)} value={productId} title={'Product Id'}
                             label={'Product Id'}/> : null}
            <Text style={styles.text}>
                Colors: {formData.colors.map((el, index) => index + 1 !== formData.colors.length ?
                <Text key={el} id={el}>{el}, </Text> : <Text key={el} id={el}>{el}</Text>)}
            </Text>
            <View style={styles.row}>
                <TextInput
                    label="Color"
                    placeholder="Color"
                    value={newColor}
                    onChangeText={text => setNewColor(text)}
                    style={[styles.input, {width: '70%'}]}
                />
                <CustomButton buttonText={'Add'} handle={addColor} propStyles={styles.microButton} fill={true}/>
            </View>
            <Text style={styles.text}>
                Sizes: {formData.sizes.map((el, index) => index + 1 !== formData.sizes.length ?
                <Text key={el} id={el}>{el}, </Text> : <Text key={el} id={el}>{el}</Text>)}
            </Text>
            <View style={styles.row}>
                <TextInput
                    label="Size"
                    placeholder="Size"
                    value={newSize}
                    onChangeText={text => setNewSize(text)}
                    style={[styles.input, {width: '70%'}]}
                />
                <CustomButton buttonText={'Add'} handle={addSize} propStyles={styles.microButton} fill={true}/>
            </View>
            <ImagePick image={image} pickImageHandler={pickImage}/>
            {validator && <Text style={styles.error}>Please, check the valid values of the fields</Text>}
            <View style={styles.row}>
                <CustomButton propStyles={[styles.rowButtons, {backgroundColor: '#ABDD48', borderWidth: 0}]}
                              buttonText={'Submit'} handle={onSubmit} fill={false}/>
                <CustomButton propStyles={[styles.rowButtons, {backgroundColor: '#E84929', borderWidth: 0}]}
                              buttonText={'Clear all'} handle={clearAllFields} fill={false}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputsWrapper: {
        backgroundColor: '#F5F5F5',
        // flexDirection: "column",
        gap: 10,
        // alignItems: "flex-start",
        marginBottom: 20
    },
    input: {
        width: '90%',
        height: 40,
        fontSize: 20,
        fontWeight: '500',
        borderColor: '#100F14',
        borderWidth: 2,
        padding: 5,
        borderRadius: 5
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '90%'
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: '#100F14',
        textAlign: "left",
        width: '90%'
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
        fontSize: 20,
        fontWeight: '500',
        color: 'red'
    }
});

export default CreateProduct;
