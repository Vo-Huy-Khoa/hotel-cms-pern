import axios from "axios";
const url = "https://cmshotel.onrender.com/api";
const getUsers = async () => {
  const response = await axios.get(`${url}/users`);
  return response.data;
};

export { getUsers };
