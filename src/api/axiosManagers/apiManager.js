import axios from "axios";


const apiManager = axios.create({
    baseURL: 'http://192.168.105.208:8080/sneakersShop/',
    withCredentials: true,
    headers: {
        "response": "application/json"
    }
})

export default apiManager
