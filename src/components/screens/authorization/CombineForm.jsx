import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {login, refresh, register} from "../../../api/authApi";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import GoBackButton from "../../navigation/GoBackButton";
import {useDispatch} from "react-redux";
import {setAuth} from "../../../redux/reducers/authReducer";

const CombineForm = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        (async ()=>{
            const res = await refresh()
            if (res) dispatch(setAuth(true))
        })()
    }, []);
    const [loginOrRegister, setLoginOrRegister] = useState('login')
    return (
        <View style={styles.highWrapper}>
            <ScrollView showsVerticalScrollIndicator={false}
                        alignItems='column' contentContainerStyle={{paddingBottom: 200}}>
                <View style={styles.loginFormWrapper}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[styles.toggleButtons, loginOrRegister === 'login' ? styles.activeButton : {}]}
                            onPress={() => setLoginOrRegister('login')}>
                            <Text
                                style={[styles.toggleButtonsText, loginOrRegister === 'login' ? styles.activeText : {}]}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleButtons, loginOrRegister === 'register' ? styles.activeButton : {}]}
                            onPress={() => setLoginOrRegister('register')}>
                            <Text
                                style={[styles.toggleButtonsText, loginOrRegister === 'register' ? styles.activeText : {}]}>register</Text>
                        </TouchableOpacity>
                    </View>
                    {loginOrRegister === 'login' ? <LoginForm/> : <RegisterForm/>}
                </View>
                <GoBackButton/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create(({
    loginFormWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        width: 300,
        marginTop: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        gap: 10,
        paddingTop: 50,
        marginBottom: 20
    },
    highWrapper: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E8EBEE'
    },
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
    row: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '90%',
        backgroundColor: '#E8EBEE',
        borderRadius: 5,
        marginTop: 0,
        position: "absolute",
        top: 10,
    },
    toggleButtons: {
        width: '50%',
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        minHeight: 40,
        borderRadius: 5
    },
    toggleButtonsText: {
        fontSize: 18,
        fontWeight: '500'
    },
    activeButton: {
        backgroundColor: '#100F14',
    },
    activeText: {
        color: '#F5F5F5'
    }
}))

export default CombineForm;
