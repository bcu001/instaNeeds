import axios from "axios";
import { server_url, token } from "./env";


const api = axios.create({
    baseURL: `${server_url}`
})

api.interceptors.request.use((config)=>{
    const _token = token;
    if(token){
        config.headers.Authorization = `Bearer ${_token}`;
    }
    return config;
})

export default api;