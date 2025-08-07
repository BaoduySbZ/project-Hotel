/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "http://localhost:3002/api";

// Lấy tất cả thiết bị
export const getDevices = async () => {
  try {
    const response = await axios.get(`${API_URL}/devices`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotelDevices = async () => {
  try {
    const response = await axios.get(`${API_URL}/hotel/devices`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy thiết bị theo ID
export const getDeviceById = async (deviceId) => {
  try {
    const response = await axios.get(`${API_URL}/devices/${deviceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thêm mới thiết bị
export const createDevice = async (device) => {
  try {
    const response = await axios.post(`${API_URL}/devices`, device);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật thiết bị
export const updateDevice = async (deviceId, device) => {
  try {
    const response = await axios.put(`${API_URL}/devices/${deviceId}`, device);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa thiết bị
export const deleteDevice = async (deviceId) => {
  try {
    await axios.delete(`${API_URL}/devices/${deviceId}`);
  } catch (error) {
    throw error;
  }
};
