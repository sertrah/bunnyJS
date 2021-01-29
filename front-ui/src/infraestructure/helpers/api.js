import { fetchJSON } from "./fetch-json";

const API_URL = `${process.env.REACT_APP_API_URL}`;
function call(path, options = {}) {
  const url = `${API_URL}/${path}`;

  return fetchJSON(url, options).catch(error => {
    if (error.status === 401) {
      console.error("AAAAA problems :D ")
    }
    return Promise.reject(error);
  });
}

function get(path) {
  return call(path, { method: "GET" });
}

function post(path, body) {
  return call(path, { method: "POST", body });
}

function put(path, body) {
  return call(path, { method: "PUT", body });
}
function remove(path, body) {
  return call(path, { method: "DELETE", body });
}

export const api = { call, get, post, put, remove };
