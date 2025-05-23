import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const create = (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, blogObject, config);
  return request.then((response) => response.data);
};

const update = (id, blogObject) => {
  const request = axios.put(`${baseUrl}/${id}`, blogObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};
const addComment = (id, comment) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, { comment })
  return request.then((response) => response.data)
}

export default { getAll, create, setToken, update, remove ,addComment};
