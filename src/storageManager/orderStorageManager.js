import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";

export const setOrderProducts = async data => {
    if (data) await AsyncStorageNative.setItem('orderProducts', data)
}
export const getOrderProducts = async () => await AsyncStorageNative.getItem('orderProducts')
