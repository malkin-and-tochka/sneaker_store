import {Pressable, Text, StyleSheet} from "react-native";


const CustomButton = ({propStyles, buttonText, fill, goToProductPage}) => {
    return (
        <Pressable onPress={goToProductPage} style={[styles.button, {backgroundColor: fill ? '#100F14' : '#F5F5F5'}, propStyles]}>
            <Text style={[styles.text, {color: fill ? '#F5F5F5' : '#100F14'}]}>{buttonText}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#100F14',
        width: '100%',
        alignItems: "center",
        justifyContent: 'center'
    },
    text: {
        fontSize: 18
    }
})
export default CustomButton;
