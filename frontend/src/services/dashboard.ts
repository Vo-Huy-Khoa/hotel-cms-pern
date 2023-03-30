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
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const handleApiCreate = async (url: string, body: object) => {
  try {
    const response = await axiosInstance.post(url, JSON.stringify(body));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const handleApiGetItem = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const handleApiEdit = async (url: string, body: object) => {
  try {
    const response = await axiosInstance.put(url, JSON.stringify(body));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getUsers, getData, handleApiCreate, handleApiGetItem, handleApiEdit };
