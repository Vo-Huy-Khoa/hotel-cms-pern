import axios from "axios";

const apiUrl = "http://localhost:3001/api";
// const apiUrl = "https://cmshotel.onrender.com/api";

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
    const token = sessionStorage.getItem("token") || "";
    if (token !== "") {
      config.headers["Authorization"] = `Bearer ${token}`;
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
        const access_token = response.data.refresh_token;
        sessionStorage.setItem("token", access_token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
