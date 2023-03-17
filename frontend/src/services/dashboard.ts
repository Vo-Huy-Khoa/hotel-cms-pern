import axios from "axios";

const getUsers = async () => {
  const response = await axios.get(`http://localhost:3001/api/users`);
  return response.data;
};

export { getUsers };
