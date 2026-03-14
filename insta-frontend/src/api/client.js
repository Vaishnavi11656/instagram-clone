import axious from "axios";
import { LS_KEY } from "../contexts/AuthContext";


function getToken() {
    const user = JSON.parse(localStorage.getItem(LS_KEY))
    return user?.token;
}
export const api = axious.create({
    baseURL: "http://127.0.0.1:4000",
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);
api.interceptors.response.use((response) => response.data);

