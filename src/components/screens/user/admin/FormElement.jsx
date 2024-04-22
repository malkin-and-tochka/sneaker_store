import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

const FormElement = ({title, handle, value, label}) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>
                {title}
            </Text>
            <TextInput
                label={label}
                placeholder={label}
                value={value}
                onChangeText={handle}
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        gap: 5,
    },
    input: {
        width: '100%',
        height: 40,
        fontSize: 20,
        fontWeight: '500',
        borderColor: '#100F14',
        borderWidth: 2,
        padding: 5,
        borderRadius: 5
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: '#100F14',
        textAlign: "left",
        width: '90%'
    },
});
export default FormElement;
