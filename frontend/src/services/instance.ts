import axios from "axios";

/**
 * URL of the API server.
 * Change this to the production URL when deploying to production.
 */
// const apiUrl = "http://localhost:3001/api";
const apiUrl = "https://cmshotel.onrender.com/api";
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
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
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
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      /**
       * Get a new access token using the refresh token.
       */
      const id = JSON.parse(sessionStorage.getItem("user") || "")?.id;
      const refresh_token = sessionStorage.getItem("refresh_token") || "";
      const body = { id, refresh_token };
      axiosInstance
        .post("auth/refreshtoken", JSON.stringify(body))
        .then((response) => {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          sessionStorage.setItem("token", response.data.refresh_token);
          axiosInstance.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.refresh_token;
          return axiosInstance(originalRequest);
        });
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
