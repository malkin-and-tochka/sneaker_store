import {TextInput, View, StyleSheet, Text} from "react-native";
import {useState} from "react";
import FormButton from "./FormButton";
import {login, register} from "../../../api/authApi";
import {useNavigation} from "@react-navigation/native";
import {setAuth} from "../../../redux/reducers/authReducer";
import {useDispatch} from "react-redux";
import FormElement from "../user/admin/FormElement";
import {getAllProducts} from "../../../api/productsApi";
import {setProducts} from "../../../redux/reducers/productsReducer";

const RegisterForm = () => {
    const dispatch = useDispatch()
    const [registerData, setRegisterData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmedPassword: "",
    });
    const [registerErrors, setRegisterErrors] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmedPassword: "",
    });
    const [status, setStatus] = useState('')
    const navigation = useNavigation()
    const handleRegisterChange = (field) => (value) => {
        setRegisterData({...registerData, [field]: value});
    };
    const onRegistrationSubmit = async () => {
        let isValid = true
        setRegisterErrors({
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmedPassword: "",
        })
        if (/[A-ZА-Я]/.test(registerData.email)) {
            setRegisterErrors(prevState => ({
                ...prevState,
                email: ['Must not contain uppercase']
            }))
            isValid = false
        }
        if (!registerData.email.length) {
            setRegisterErrors(prevState => ({
                ...prevState,
                email: ['Must not be empty']
            }))
            isValid = false
        }
        if (!(/\d/.test(registerData.password)) || !(/\D/.test(registerData.password))) {
            setRegisterErrors(prevState => ({
                ...prevState,
                confirmedPassword: ['Password has to contain at least 1 digit and 1 other character']
            }))
            isValid = false
        }
        if (registerData.password.length < 8) {
            setRegisterErrors(prevState => ({
                ...prevState,
                password: ['Size has to be between at least 8 characters']
            }))
            isValid = false
        }
        if (registerData.lastName.length === 0 || registerData.lastName.length > 120) {
            setRegisterErrors(prevState => ({
                ...prevState,
                lastName: ['Size has to be between 1 and 120']
            }))
            isValid = false
        }
        if (registerData.firstName.length === 0 || registerData.firstName.length > 120) {
            setRegisterErrors(prevState => ({
                ...prevState,
                firstName: ['Size has to be between 1 and 120']
            }))
            isValid = false
        }
        if (registerData.password !== registerData.confirmedPassword) {
            setRegisterErrors(prevState => ({
                ...prevState,
                confirmedPassword: ['Passwords has to be equal']
            }))
            isValid = false
        }

        if (isValid) {
            const res = await register(registerData)
            if (res === 201) {
                const loginResponse = await login({username:registerData.email, password: registerData.password})
                if (loginResponse === 200) {
                    const products = await getAllProducts()
                    if  (products) dispatch(setProducts(products))
                    dispatch(setAuth(true))
                    navigation.navigate('Home')
                }
                dispatch(setAuth(true))
            } else {
                setStatus(res.value)
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Register
            </Text>
            <View style={styles.inputsWrapper}>
                {registerErrors.email && <Text style={styles.errorText}>{registerErrors.email[0]}</Text>}
                <TextInput
                    label="Email"
                    placeholder="Email"
                    value={registerData.email}
                    onChangeText={handleRegisterChange("email")}
                    style={styles.input}
                />
                {registerErrors.firstName && <Text style={styles.errorText}>{registerErrors.firstName[0]}</Text>}
                <TextInput
                    label="First name"
                    placeholder="First name"
                    value={registerData.firstName}
                    onChangeText={handleRegisterChange("firstName")}
                    style={styles.input}
                />
                {registerErrors.lastName && <Text style={styles.errorText}>{registerErrors.lastName[0]}</Text>}
                <TextInput
                    label="Last name"
                    placeholder="Last name"
                    value={registerData.lastName}
                    onChangeText={handleRegisterChange("lastName")}
                    style={styles.input}
                />
                {registerErrors.password ? <Text style={styles.errorText}>{registerErrors.password[0]}</Text> : null}
                <TextInput
                    secureTextEntry
                    label="Password"
                    placeholder="Password"
                    value={registerData.password}
                    onChangeText={handleRegisterChange("password")}
                    style={styles.input}
                />
                {registerErrors.confirmedPassword &&
                    <Text style={styles.errorText}>{registerErrors.confirmedPassword[0]}</Text>}
                <TextInput
                    secureTextEntry
                    label="Confirmed password"
                    placeholder="Confirmed password"
                    value={registerData.confirmedPassword}
                    onChangeText={handleRegisterChange("confirmedPassword")}
                    style={styles.input}
                />
            </View>
            {status && <Text style={styles.errorText}>{status}</Text>}
            <FormButton text="Register" handler={onRegistrationSubmit}/>
        </View>
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
        gap: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: '500',
        marginTop: 20
    },
    subtitle: {
        fontSize: 16,
        color: '#B3B4B6'
    },
    input: {
        width: '100%',
        height: 35,
        fontSize: 18,
        fontWeight: '500',
        borderColor: '#100F14',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5
    },
    errorText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'red',
    },
    container: {
        paddingLeft: '5%',
        paddingRight: '5%',
        marginBottom: 20
    }
})

export default RegisterForm;
