import axios from "axios";
import { getToken, removeToken } from "./auth";

const api = axios.create({ 
    baseURL: process.env.URL_API || "http://localhost:3001/v1"
});

//Intercepta apenas para enviar no header o token se for o login
api.interceptors.request.use(async (config) => {
    if (config.url !== api.baseURL + "login") {
        config.headers["x-access-token"] = await getToken();
    }    

    return config;
}, (error) => {
    return Promise.reject(error);
});  

//Qualquer resposta sem autorização, remete para login
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        removeToken();

        const requestConfig = error.config;
        return axios(requestConfig);
    }
    return Promise.reject(error);
});

export default api;