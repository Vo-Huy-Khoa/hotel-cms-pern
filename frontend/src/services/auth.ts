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

const handleApiLogin = async (body: object) => {
  try {
    const response = await axiosInstance.post(
      `auth/login`,
      JSON.stringify(body)
    );
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("refresh_token", response.data.refresh_token);
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
    return response;
  } catch (error) {
    console.log(error);
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
