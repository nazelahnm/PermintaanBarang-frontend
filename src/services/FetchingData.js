const url = import.meta.env.VITE_API_URL;
import axios from "axios";

const getToken = () => {
  return localStorage.getItem("accessToken");
};
const getUserLogged = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const user = JSON.parse(window.atob(base64));
    return user;
  } else {
    return null;
  }
};
const setToken = (token) => {
  localStorage.setItem("accessToken", token);
};
const removeToken = () => {
  localStorage.removeItem("accessToken");
};
const loginAdmin = async (username, password) => {
  const res = await axios.post(`${url}users/login`, { username, password });
  return res;
};

// Order
const getOrders = async () => {
  const res = await axios.get(`${url}orders`);
  return res;
};
const countByStatus = async () => {
  const res = await axios.get(`${url}orders/countByStatus`);
  return res;
};
const showOrder = async (id) => {
  const res = await axios.get(`${url}orders/${id}`);
  return res;
};
const deleteOrder = async (id) => {
  const res = await axios.delete(`${url}orders/${id}`);
  return res;
};
const getByStatus = async (status) => {
  const res = await axios.get(`${url}orders/getByStatus/${status}`);
  return res;
};
const getHistory = async (month) => {
  const res = await axios.get(`${url}orders/history/${month}`);
  return res;
};
const showHistoryByUser = async (id) => {
  const res = await axios.get(`${url}orders/history/getByUser/${id}`);
  return res;
};
const exportData = async (id, month) => {
  const res = await axios.get(`${url}orders/export/${id}/${month}`);
  return res;
 }

// Order Details
const deleteOrderDetail = async (id) => {
  const res = await axios.delete(`${url}orders/${id}`);
  return res;
};
const showOrderDetail = async (id) => {
  const res = await axios.get(`${url}orders/byId/${id}`);
  return res;
};
const updateOrderDetail = async (id, data) => {
  const res = await axios.put(`${url}orders/updateStatus/${id}`, data);
  return res;
};
export {
  getToken,
  setToken,
  removeToken,
  loginAdmin,
  getUserLogged,
  getOrders,
  countByStatus,
  showOrder,
  deleteOrder,
  deleteOrderDetail,
  showOrderDetail,
  updateOrderDetail,
  getByStatus,
  getHistory,
  showHistoryByUser,
  exportData
};
