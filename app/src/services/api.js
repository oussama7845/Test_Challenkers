import axios from "axios";

const createAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

const get = (route, options = {}) => {
  const authHeader = store.getState().auth
    ? { Authorization: store.getState().auth.token }
    : {};
  const headers = { ...authHeader, ...options.headers };

  return createAxiosInstance.get(route, { headers, ...options });
};

const post = (route, body = {}, isUpload = false) => {
  const authHeader = store.getState().auth
    ? { Authorization: store.getState().auth.token }
    : {};
  let headers = { ...authHeader };

  if (isUpload) {
    headers = {
      ...headers,
      "Content-Type": "multipart/form-data",
    };
  }

  return createAxiosInstance.post(route, body, { headers });
};

const patch = (route, body = {}) => {
  const authHeader = store.getState().auth
    ? { Authorization: store.getState().auth.token }
    : {};
  const headers = { ...authHeader };

  return createAxiosInstance.patch(route, body, { headers });
};

const put = (route, body = {}) => {
  const authHeader = store.getState().auth
    ? { Authorization: store.getState().auth.token }
    : {};
  const headers = { ...authHeader };

  return createAxiosInstance.put(route, body, { headers });
};

const del = (route) => {
  const authHeader = store.getState().auth
    ? { Authorization: store.getState().auth.token }
    : {};
  const headers = { ...authHeader };

  return createAxiosInstance.delete(route, { headers });
};

export { get, post, patch, put, del };
