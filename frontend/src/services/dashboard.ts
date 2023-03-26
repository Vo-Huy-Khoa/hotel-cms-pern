import { axiosInstance } from "./instance";

const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`user`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getData = async (url: string) => {
  try {
    const response = await axiosInstance.get(`${url}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getUsers, getData };
