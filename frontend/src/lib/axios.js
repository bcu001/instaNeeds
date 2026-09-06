import axios from "axios";
import { server_url } from "./env";

let accessToken = null;
let refreshPromise = null;

export const setAxiosAccessToken = (token) => {
    accessToken = token;
}

const api = axios.create({
    baseURL: `${server_url}`,
    withCredentials: true
})

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
        const originalRequest = requestError.config;

        const isSignInRequest = originalRequest?.url?.endsWith("/auth/signin");
        const isRefreshRequest = originalRequest?.url?.endsWith("/auth/refresh");

        if (requestError.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !isSignInRequest &&
            !isRefreshRequest
        ) {
            originalRequest._retry = true;

            try {
                refreshPromise ??= axios.post(
                    `${server_url}/auth/refresh`,
                    {},
                    { withCredentials: true }
                ).finally(() => {
                    refreshPromise = null;
                });

                const refreshResponse = await refreshPromise;
                const data = refreshResponse.data?.data;

                if (!data?.accessToken) throw new Error("Refresh response did not include an access token");

                accessToken = data.accessToken;

                originalRequest.headers = originalRequest.headers ?? {};
                originalRequest.headers.Authorization =
                    `Bearer ${data.accessToken}`;

                return api(originalRequest);
            } catch {
                accessToken = null;
                return Promise.reject(requestError);
            }
        }

        return Promise.reject(requestError);
    })

export default api;