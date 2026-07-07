import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getTasks = () => {
  return axios.get(`${API_BASE_URL}/gettasks`);
};

export const createTask = (task) => {
  return axios.post(`${API_BASE_URL}/createtask`, task);
};

export const updateTask = (task) => {
  return axios.put(`${API_BASE_URL}/updatetask`, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
