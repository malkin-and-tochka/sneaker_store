import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import shoos1 from "../../../../assets/Adidas Iniki Runner_prime.jpg";
import shoos2 from "../../../../assets/Adidas Iniki Runner_2.jpg"

const Slider = ({images = [shoos1, shoos2]}) => {
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
            <Image resizeMethod={'resize'} style={styles.img} source={images[slideIndex]}/>
            <ArrowButton onClickHandler={increment} text={'>'} styles={{position: 'absolute', top: '50%', right: 10}}/>
            <ArrowButton onClickHandler={decrement} text={'<'} styles={{position: 'absolute', top: '50%', left: 10}}/>
        </View>
    );
};

const ArrowButton = ({text, onClickHandler, styles}) => {
    return (
        <TouchableOpacity style={[styles, {backgroundColor: 'rgba(0,0,0,0.5)', height: 40, width: 40, borderRadius: 50, alignItems: 'center'}]} onPress={onClickHandler}>
            <Text style={{fontSize: 30, color:'#fff'}}>{text}</Text>
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
