import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.withCredentials = true;
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Cache-Control"] = "no-cache";
    }
    return config;
  },
  function (error) {
    // Handle request errors.
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 403 && !originalRequest._retry) ||
      (error.response.status === 401 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      const id = JSON.parse(sessionStorage.getItem("user") || "")?.id;
      const refresh_token = sessionStorage.getItem("refresh_token");

      const body = {
        id,
        refresh_token,
      };
      sessionStorage.removeItem("refresh_token");

      try {
        const response = await axiosInstance.post(
          `auth/refreshtoken`,
          JSON.stringify(body)
        );
        const token = response.data.refresh_token;
        sessionStorage.setItem("token", token);
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
