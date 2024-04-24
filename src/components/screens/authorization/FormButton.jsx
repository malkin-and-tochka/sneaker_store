import {StyleSheet, Text, TouchableOpacity} from "react-native";

const FormButton = ({handler, text, disable}) => {
    return (
        <TouchableOpacity disabled={disable} style={styles.loginButton} onPress={handler}>
            <Text style={styles.loginButtonText}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create(({
    loginButton: {
        width: 240,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#100F14',
        borderRadius: 10,
        marginTop: 10
    },
    loginButtonText: {
        color: '#F5F5F5',
        fontSize: 18
    }
}))

export default FormButton
