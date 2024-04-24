import axios from "axios";
import {IP_ADDRESS} from "../../constants";


const apiManager = axios.create({
    baseURL: `http://${IP_ADDRESS}:8080/sneakersShop/`,
    withCredentials: true,
    headers: {
        "response": "application/json"
    }
})

export default apiManager
