import {TextInput, View, StyleSheet, Text} from "react-native";
import {useState} from "react";
import FormButton from "./FormButton";
import {register} from "../../../api/authApi";
import {useNavigation} from "@react-navigation/native";
import {setAuth} from "../../../redux/reducers/authReducer";
import {useDispatch} from "react-redux";

const RegisterForm = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [registerData, setRegisterData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmedPassword: "",
    });
    const handleRegisterChange = (field) => (value) => {
        setRegisterData({...registerData, [field]: value});
    };
    const onRegistrationSubmit = async () => {
        if(registerData.confirmedPassword === registerData.password){
            const res = await register(registerData)
            if (res.status === 200) {
                navigation.navigate('Home')
                dispatch(setAuth(true))
            }
        }
    }
    return (
        <>
            <Text style={styles.title}>
                Register
            </Text>
            <View style={styles.inputsWrapper}>
                <TextInput
                    label="Email"
                    placeholder="Email"
                    value={registerData.email}
                    onChangeText={handleRegisterChange("email")}
                    style={styles.input}
                />
                <TextInput
                    label="First name"
                    placeholder="First name"
                    value={registerData.firstName}
                    onChangeText={handleRegisterChange("firstName")}
                    style={styles.input}
                />
                <TextInput
                    label="Last name"
                    placeholder="Last name"
                    value={registerData.lastName}
                    onChangeText={handleRegisterChange("lastName")}
                    style={styles.input}
                />
                <TextInput
                    secureTextEntry
                    label="Password"
                    placeholder="Password"
                    value={registerData.password}
                    onChangeText={handleRegisterChange("password")}
                    style={styles.input}
                />
                <TextInput
                    secureTextEntry
                    label="Confirmed password"
                    placeholder="Confirmed password"
                    value={registerData.confirmedPassword}
                    onChangeText={handleRegisterChange("confirmedPassword")}
                    style={styles.input}
                />
            </View>
            <FormButton text="Register" handler={onRegistrationSubmit}/>
        </>
    );
};

const styles = StyleSheet.create({
    formInput: {
        fontSize: 16,
        borderBottomWidth: 2,
        height: 40,
        fontWeight: '500'
    },
    inputsWrapper: {
        width: 240,
        gap: 10
    },
    title: {
        fontSize: 26,
        fontWeight: '500',
    },
    subtitle: {
        fontSize: 16,
        color: '#B3B4B6'
    },
    input: {
        width: '90%',
        height: 35,
        fontSize: 18,
        fontWeight: '500',
        borderColor: '#100F14',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5
    },
})

export default RegisterForm;
