import axios from "axios";
const url = "https://chat-backend-7jgs.onrender.com/api";
const getUsers = async () => {
  const response = await axios.get(`${url}/users`);
  return response.data;
};

export { getUsers };
