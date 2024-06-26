import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

const FormElement = ({title, handle, value, label, textStyles, inputStyles, placeholderColor, validator, validatorStyles}) => {
    return (
        <View style={styles.wrapper}>
            <Text style={[styles.validator, validatorStyles]}>{validator}</Text>
            <Text style={[styles.text, textStyles]}>
                {title}
            </Text>
            <TextInput
                label={label}
                placeholder={label}
                value={value}
                onChangeText={handle}
                style={[styles.input, inputStyles]}
                placeholderTextColor={'#000'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        gap: 5,
    },
    input: {
        minWidth: '100%',
        minHeight: 40,
        fontSize: 20,
        fontWeight: '500',
        borderColor: '#000',
        borderWidth: 2,
        padding: 5,
        borderRadius: 5,
        color: '#000'
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#100F14',
        textAlign: "left",
        maxWidth: '40%',
    },
    validator: {
        position: "absolute",
        right: 0,
        top: 5,
        fontWeight: '500',
        maxWidth: '60%',
        fontSize: 12,
        color: 'red',
        textAlign: 'right'
    }
});
export default FormElement;
