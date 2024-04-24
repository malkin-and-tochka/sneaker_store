import apiManager from "./axiosManagers/apiManager";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import * as SecureStore from 'expo-secure-store';
import authManager from "./axiosManagers/authManager";
import {getRefreshToken, setAccessToken, setRefreshToken} from "../storageManager/storageManager";
import axios from "axios";

export const login = async ({username, password}) => {
    try {
        const res = await apiManager.post('auth/credentials', {username, password})
        await AsyncStorageNative.setItem('accessToken', res.data.accessToken)
        await SecureStore.setItemAsync('refreshToken', res.data.refreshToken)
        return res.status
    } catch (e) {
        console.log('ERROR: ', e.response.data)
        return e.response.data
    }
}
export const register = async ({email, firstName, lastName, password, confirmedPassword}) => {
    try {
        const res = await apiManager.post('/auth/register', {email, firstName, lastName, password, confirmedPassword})
        return res.status
    } catch (e) {
        console.log('ERROR: ', e.response.data)
        return e.response.data
    }
}
export const logout = async () => {
    try {
        return await authManager.post('/auth/self/logout')
    } catch (e) {
        console.log(e)
    }
}
export const credentials = async (username, password) => {
    try {
        const res = await authManager.post('/auth/credentials', {username, password})
        await AsyncStorageNative.setItem('accessToken', res.data.accessToken)
        await SecureStore.setItemAsync('refreshToken', res.data.refreshToken)
        return res.status
    } catch (e) {
        console.log(e)
    }
}
export const refresh = async () => {
    try {
        const refreshToken = await getRefreshToken()
        const res = await axios({
            url: "http://192.168.105.208:8080/sneakersShop/auth/refresh",
            method: "POST",
            data: {"refreshToken": refreshToken},
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        })
        return res.data
    } catch (e) {
        console.log('refresh error', e.response.status)
    }
}
