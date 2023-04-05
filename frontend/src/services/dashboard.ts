import { axiosInstance } from "./instance";

const handleApiGetList = async (url: string) => {
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

const handleApiDelete = async (url: string) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const handleApiSearch = async (url: string, body: object) => {
  try {
    const response = await axiosInstance.post(url, JSON.stringify(body));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  handleApiGetList,
  handleApiCreate,
  handleApiGetItem,
  handleApiEdit,
  handleApiDelete,
  handleApiSearch,
};
