/* eslint-disable no-useless-catch */
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// Lấy tất cả các loại phòng
export const getRoomTypes = async () => {
  try {
    const response = await axios.get(`${API_URL}/roomtypes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy loại phòng theo ID
export const getRoomTypeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/roomtypes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thêm mới loại phòng
export const createRoomType = async (roomType) => {
  try {
    const response = await axios.post(`${API_URL}/roomtypes`, roomType);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật loại phòng
export const updateRoomType = async (id, roomType) => {
  try {
    const response = await axios.put(`${API_URL}/roomtypes/${id}`, roomType);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa loại phòng
export const deleteRoomType = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/roomtypes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
