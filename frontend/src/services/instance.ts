import axios from "axios";

/**
 * URL of the API server.
 * Change this to the production URL when deploying to production.
 */
const apiUrl = "http://localhost:3001/api";
// const apiUrl = "https://cmshotel.onrender.com/api";
/**
 * Axios instance with custom configuration.
 */
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

/**
 * Request interceptor that adds the authentication token to the request headers.
 */
axiosInstance.interceptors.request.use(
  function (config) {
    /**
     * Modify the request config before sending the request.
     * The `config` parameter is an Axios request config object.
     */
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

/**
 * Response interceptor that refreshes the access token if the response status is 403 (Forbidden).
 */
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const id = JSON.parse(sessionStorage.getItem("user") || "")?.id;
      const refresh_token = sessionStorage.getItem("refresh_token");

      const body = {
        id: id,
        refresh_token: refresh_token,
      };

      const response = await axiosInstance.post(
        `auth/refreshtoken`,
        JSON.stringify(body)
      );
      sessionStorage.removeItem("refresh_token");
      sessionStorage.setItem("refresh_token", response.data.refresh_token);
      const access_token = response.data.refresh_token;
      console.log(access_token);

      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + access_token;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
