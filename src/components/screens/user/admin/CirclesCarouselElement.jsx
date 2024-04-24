import React, {useState} from 'react';
import {Pressable, StyleSheet} from "react-native";

const CirclesCarouselElement = ({color, toggleColor}) => {
    const [isPicked, setIsPicked] = useState(false)
    const combineHandler = () => {
        toggleColor(color)
        setIsPicked(prev => !prev)
    }
    return (
        <Pressable style={[styles.circle, {
            backgroundColor: `${color}`.toLowerCase(),
            borderColor: isPicked ? '#100F14' : '#E8EBEE',
        }]} onPress={combineHandler}/>
    );
};

const styles = StyleSheet.create({
    circle: {
        height: 36,
        width: 36,
        borderRadius: 1000,
        borderWidth: 2
    },})

export default CirclesCarouselElement;
