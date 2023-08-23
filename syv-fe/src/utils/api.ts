import axios from "axios";
import { LocalStorage } from "./localStorage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    if (config.url?.includes("auth") || config.url === "/video") {
      return Promise.resolve(config);
    }

    const accessToken = LocalStorage.get("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const { data } = response;

    return data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.error === "Access token has expired"
    ) {
      try {
        const _id = LocalStorage.get("_id");

        const response = await api.post("/auth/refresh", { _id });

        console.log({ response });

        LocalStorage.set("accessToken", response.data.accessToken);

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.response?.data?.error);
  }
);

export default api;
