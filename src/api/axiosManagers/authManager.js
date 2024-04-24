import axios from "axios";
import {refresh} from "../authApi";
import {getAccessToken, setAccessToken, setRefreshToken} from "../../storageManager/storageManager";
import {IP_ADDRESS} from "../../constants";


const authManager = axios.create({
    baseURL: `http://${IP_ADDRESS}:8080/sneakersShop/`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

authManager.interceptors.request.use(async config => {
    const token = await getAccessToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
})
authManager.interceptors.response.use(
    (response)   => response,
    async (error) => {
        try {
            const originalRequest = error.config
            console.log('INTERCEPTOR ========    ',error.response.data)
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const tokens = await refresh();
                await setAccessToken(tokens.accessToken)
                await setRefreshToken(tokens.refreshToken)
                return authManager(originalRequest)
            }
            return Promise.reject(error);
        } catch (e) {
            console.log(e)
        }
    }
);
export default authManager
