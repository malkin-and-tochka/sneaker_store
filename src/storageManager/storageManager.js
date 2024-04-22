import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import * as SecureStore from 'expo-secure-store';

export const setAccessToken = async accessToken => {
    if (accessToken) await AsyncStorageNative.setItem('accessToken', accessToken)
}
export const setRefreshToken = async refreshToken => {
    if (refreshToken) await SecureStore.setItemAsync('refreshToken', refreshToken)
}
export const getAccessToken = async () => await AsyncStorageNative.getItem('accessToken')
export const getRefreshToken = async () => await SecureStore.getItemAsync('refreshToken')
export const deleteTokens = async () => {
    await setAccessToken('')
    await setRefreshToken('')
}

export const checkIsAccessTokenExist = async () => {
    const token = await getAccessToken()
    return !!token
}
