import { axiosInstance } from "./instance";

const getToken = () => sessionStorage.getItem("token");

const refresh_token = () => {
  const userID = JSON.parse(sessionStorage.getItem("user") || "")?.id;
  const refresh_token = sessionStorage.getItem("refresh_token");
  const body = {
    id: userID,
    token: refresh_token,
  };

  const response = axiosInstance.post("refresh_token", JSON.stringify(body));
  return response;
};

const handleRegister = async (body: object) => {
  const response = await axiosInstance.post(
    `auth/register`,
    JSON.stringify(body)
  );
  return response;
};

const handleLogin = async (body: object) => {
  const response = await axiosInstance.post(`auth/login`, JSON.stringify(body));
  sessionStorage.setItem("token", response.data.token);
  sessionStorage.setItem("refresh_token", response.data.refresh_token);
  sessionStorage.setItem("user", JSON.stringify(response.data.user));
  return response;
};

const handleLogout = async () => {
  const userID = JSON.parse(sessionStorage.getItem("user") || "")?.id;
  const body = {
    id: userID,
  };

  const response = axiosInstance.post("auth/logout", JSON.stringify(body));
  return response;
};

export { getToken, refresh_token, handleLogout, handleLogin, handleRegister };
