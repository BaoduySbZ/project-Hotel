/* eslint-disable no-useless-catch */
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// Lấy tất cả account
export const getAccounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/accounts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy account theo id
export const getAccountById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/accounts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thêm mới account
export const createAccount = async (account) => {
  try {
    const response = await axios.post(`${API_URL}/accounts`, account);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật account
export const updateAccount = async (id, account) => {
  try {
    const response = await axios.put(`${API_URL}/accounts/${id}`, account);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa account
export const deleteAccount = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/accounts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Đăng nhập (Login)
export const login = async (email, password) => {
  try {
    console.log("email, password: ", email, "   ", password)
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Assuming the response includes a token
    const { token } = response.data;

    // Optionally, store the token in localStorage for future use
    localStorage.setItem('authToken', token);

    return response.data;
  } catch (error) {
    throw error;
  }
};