/* eslint-disable no-useless-catch */
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// Lấy tất cả dịch vụ
export const getServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/services`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy dịch vụ theo ID
export const getServiceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/services/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thêm mới dịch vụ
export const createService = async (service) => {
  try {
    const response = await axios.post(`${API_URL}/services`, service);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật dịch vụ
export const updateService = async (id, service) => {
  try {
    console.log("id: ", id, " service: ", service)
    const response = await axios.put(`${API_URL}/services/${id}`, service);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa dịch vụ
export const deleteService = async (id) => {
  try {
    await axios.delete(`${API_URL}/services/${id}`);
  } catch (error) {
    throw error;
  }
};
