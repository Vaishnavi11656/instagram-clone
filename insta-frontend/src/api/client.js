import axious from "axios";
import { LS_KEY } from "../contexts/AuthContext";

// Debug helper
window.debugAuth = () => {
    const stored = sessionStorage.getItem(LS_KEY);
    console.log("=== DEBUG AUTH ===");
    console.log("LS_KEY:", LS_KEY);
    console.log("sessionStorage contents:", stored ? JSON.parse(stored) : "EMPTY");
    console.log("=== END DEBUG ===");
};


function getToken() {
    try {
        const stored = sessionStorage.getItem(LS_KEY);
        if (!stored) {
            console.warn("✗ Nothing in sessionStorage at key:", LS_KEY);
            return null;
        }

        const user = JSON.parse(stored);
        const token = user?.token;

        if (!token) {
            console.warn("✗ Stored user has no token field");
            return null;
        }

        console.log("✓ Token found:", token.substring(0, 20) + "...");
        return token;
    } catch (err) {
        console.error(" Error reading token from storage:", err.message);
        return null;
    }
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
            console.log(` Sending ${config.method.toUpperCase()} ${config.url}`);
            console.log(`   Header: Authorization: Bearer ${token.substring(0, 30)}...`);
        } else {
            console.warn(` No token! Request to ${config.method.toUpperCase()} ${config.url} will fail`);
        }
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => {
        console.log(` Response from ${response.config.url}:`, response.status);
        return response.data;
    },
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url;
        const serverMessage = error.response?.data?.message;

        if (status === 401) {
            console.error(` 401 Unauthorized on ${url}`);
            console.error(`   Server message: ${serverMessage || "No message"}`);
            console.error(`   Authorization header was: ${error.config?.headers?.Authorization ? "Present ✓" : "Missing ✗"}`);
            // DON'T automatically clear sessionStorage - let the component handle auth errors
        } else if (status === 403) {
            console.error(`403 Forbidden on ${url}`);
            console.error(`   Server message: ${serverMessage || "No message"}`);
        } else {
            console.error(` Error (${status}) on ${url}:`, serverMessage || error.message);
        }
        return Promise.reject(error);
    }
);
