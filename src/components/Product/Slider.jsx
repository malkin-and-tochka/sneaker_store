import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {useState} from "react";

import { AntDesign } from '@expo/vector-icons';
const Slider = ({images}) => {
    const [slideIndex, setSlideIndex] = useState(0)
    const increment = () => {
        if (slideIndex + 1 === images.length) setSlideIndex(0)
        else {
            setSlideIndex(prevState => prevState + 1)
        }
    }
    const decrement = () => {
        if (slideIndex === 0) setSlideIndex(images.length - 1)
        else {
            setSlideIndex(prevState => prevState - 1)
        }
    }
    return (
        <View style={{flex: 1, width: '100%'}}>
            <Image resizeMethod={'resize'} style={styles.img} source={{uri:images[slideIndex]}}/>
            <ArrowButton onClickHandler={increment} styles={{position: 'absolute', top: '50%', right: 10}}>
                <AntDesign name="right" size={24} color="white" />
            </ArrowButton>
            <ArrowButton onClickHandler={decrement} styles={{position: 'absolute', top: '50%', left: 10}}>
                <AntDesign name="left" size={24} color="white" />
            </ArrowButton>
        </View>
    );
};

const ArrowButton = ({children, onClickHandler, styles}) => {
    return (
        <TouchableOpacity style={[styles, {backgroundColor: 'rgba(0,0,0,0.5)', height: 40, width: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}]} onPress={onClickHandler}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        width: 300,
        borderRadius: 5
    },
    img: {
        flex: 1,
        resizeMode: 'contain',
        height: 200,
        width: '100%'
    },
})

export default Slider;
