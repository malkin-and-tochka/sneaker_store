import {Pressable, Text, StyleSheet} from "react-native";


const CustomButton = ({propStyles, buttonText, fill, handle, disabled, textStyles, children}) => {
    return (
        <Pressable disabled={disabled} onPress={handle} style={[styles.button, {backgroundColor: fill ? '#100F14' : '#F5F5F5'}, propStyles, disabled && {backgroundColor: '#B3B4B6', borderColor: '#B3B4B6'}]}>
            {children ? children : <Text style={[styles.text, {color: fill ? '#F5F5F5' : '#100F14'}, textStyles]}>{buttonText}</Text>}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#100F14',
        alignItems: "center",
        justifyContent: 'center',
        height: 40
    },
    text: {
        fontSize: 18,
        fontWeight: '500'
    }
})
export default CustomButton;
