import {TextInput, View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {useState} from "react";
import FormButton from "./FormButton";
import {login, register} from "../../../api/authApi";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setAuth} from "../../../redux/reducers/authReducer";

const LoginForm = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const handleLoginChange = (field) => (value) => {
        setLoginData({...loginData, [field]: value});
    }
    const onLoginSubmit = async () => {
        const statusCode = await login(loginData)
        if (statusCode === 200) {
            navigation.navigate('Home')
            dispatch(setAuth(true))
        }
    }
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    return (<>
            <Text style={styles.title}>
                Login
            </Text>
            <View style={styles.inputsWrapper}>
                <TextInput
                    label="Username"
                    placeholder="Username"
                    value={loginData.username}
                    onChangeText={handleLoginChange("username")}
                    style={styles.input}
                />
                <TextInput
                    secureTextEntry
                    label="Password"
                    placeholder="Password"
                    value={loginData.password}
                    onChangeText={handleLoginChange("password")}
                    style={styles.input}
                />
            </View>
            <FormButton text={'Login'} handler={onLoginSubmit}/>
            <TouchableOpacity>
                <Text style={styles.subtitle}>
                    Forgot your password?
                </Text>
            </TouchableOpacity>
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
})

export default LoginForm;
