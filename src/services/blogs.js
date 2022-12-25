import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (newEntry) => {
  const config = { headers: { Authorization: token } };
  const request = await axios.post(baseUrl, newEntry, config);
  return request;
};

export default { setToken, getAll, addBlog };
