import { axiosInstance } from "./instance";

const getUsers = async () => {
  const response = await axiosInstance.get(`user`);
  return response.data;
};

export { getUsers };
