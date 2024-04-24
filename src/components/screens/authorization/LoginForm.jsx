import {TextInput, View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {useState} from "react";
import FormButton from "./FormButton";
import {login, register} from "../../../api/authApi";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setAuth} from "../../../redux/reducers/authReducer";
import {getAllProducts} from "../../../api/productsApi";
import {setProducts} from "../../../redux/reducers/productsReducer";
import navigation from "../../navigation/Navigation";

const LoginForm = () => {
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [loginErrors, setLoginErrors] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState('')
    const [disable, setDisable] = useState(false)
    const navigation = useNavigation()
    const handleLoginChange = (field) => (value) => {
        setLoginData({...loginData, [field]: value});
    }
    const onLoginSubmit = async () => {
        let isValid = true
        setDisable(true)
        setError('')
        setLoginErrors({
            username: "",
            password: "",
        })
        if (!(/\d/.test(loginData.password)) || !(/\D/.test(loginData.password))) {
            setLoginErrors(prevState => ({
                ...prevState,
                password: ['Password has to contain at least 1 digit and 1 other character']
            }))
            isValid = false
        }
        if (loginData.password.length < 8) {
            setLoginErrors(prevState => ({
                ...prevState,
                password: ['Size has to be at least 8 characters']
            }))
            isValid = false
        }
        if (loginData.username.length === 0) {
            setLoginErrors(prevState => ({
                ...prevState,
                username: ['Invalid name']
            }))
            isValid = false
        }
        if (isValid) {
            const res = await login(loginData)
            if (res === 200) {
                const products = await getAllProducts()
                if (products) dispatch(setProducts(products))
                dispatch(setAuth(true))
                navigation.navigate('Home')
            } else {
                setError(res.value)
            }
        }
        setDisable(false)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Login
            </Text>
            <View style={styles.inputsWrapper}>
                {loginErrors.username && <Text style={styles.errorText}>{loginErrors.username[0]}</Text>}
                <TextInput
                    label="Username"
                    placeholder="Username"
                    value={loginData.username}
                    onChangeText={handleLoginChange("username")}
                    style={styles.input}
                />
                {loginErrors.password && <Text style={styles.errorText}>{loginErrors.password[0]}</Text>}
                <TextInput
                    secureTextEntry
                    label="Password"
                    placeholder="Password"
                    value={loginData.password}
                    onChangeText={handleLoginChange("password")}
                    style={styles.input}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <FormButton disable={disable} text={'Login'} handler={onLoginSubmit}/>
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
        width: 240,
        gap: 10
    },
    title: {
        fontSize: 26,
        fontWeight: '500',
        marginTop: 20
    },
    subtitle: {
        fontSize: 16,
        color: '#808080'
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

export default LoginForm;
