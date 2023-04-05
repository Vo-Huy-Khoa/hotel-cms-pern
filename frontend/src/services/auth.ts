import { LoginRequestBody } from "../types";
import { axiosInstance } from "./instance";

const getToken = () => sessionStorage.getItem("token");

const refresh_token = () => {
  try {
    const userID = JSON.parse(sessionStorage.getItem("user") || "")?.id;
    const refresh_token = sessionStorage.getItem("refresh_token");
    const body = {
      id: userID,
      token: refresh_token,
    };

    const response = axiosInstance.post("refresh_token", JSON.stringify(body));
    return response;
  } catch (error) {
    console.log(error);
  }
};

const handleApiRegister = async (body: object) => {
  try {
    const response = await axiosInstance.post(
      `auth/register`,
      JSON.stringify(body)
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const handleApiLogin = async (body: LoginRequestBody) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, body);
    if (
      response.data &&
      response.data.token &&
      response.data.refresh_token &&
      response.data.user
    ) {
      const sessionData = {
        token: response.data.token,
        refresh_token: response.data.refresh_token,
        user: JSON.stringify(response.data.user),
      };
      return sessionData;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    const customError = new Error("Invalid username or password");
    customError.name = "LoginError";
    throw customError;
  }
};

const handleApiLogout = async () => {
  try {
    const userID = JSON.parse(sessionStorage.getItem("user") || "")?.id;
    const body = {
      id: userID,
    };
    const response = axiosInstance.post("auth/logout", JSON.stringify(body));
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  getToken,
  refresh_token,
  handleApiLogout,
  handleApiLogin,
  handleApiRegister,
};
