/* eslint-disable no-useless-catch */
import axios from 'axios';

// const API_URL = 'http://localhost:3002/api';
const API_URL = import.meta.env.VITE_API_URL;
// Lấy tất cả phòng
export const getRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thêm mới phòng
export const createRoom = async (room) => {
  try {
    const response = await axios.post(`${API_URL}/rooms`, room);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật phòng
export const updateRoom = async (id, room) => {
  try {
    const response = await axios.put(`${API_URL}/rooms/${id}`, room);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa phòng
export const deleteRoom = async (id) => {
  try {
    await axios.delete(`${API_URL}/rooms/${id}`);
  } catch (error) {
    throw error;
  }
};

// Thêm dịch vụ vào phòng
export const addServiceToRoom = async (roomId, serviceId) => {
  try {
    await axios.post(`${API_URL}/rooms/${roomId}/services/${serviceId}`);
  } catch (error) {
    throw error;
  }
};

// Xóa dịch vụ khỏi phòng
export const removeServiceFromRoom = async (roomId, serviceId) => {
  try {
    await axios.delete(`${API_URL}/rooms/${roomId}/services/${serviceId}`);
  } catch (error) {
    throw error;
  }
};

// Thêm khuyến mãi vào phòng
export const addPromotionToRoom = async (roomId, promotionId) => {
  try {
    await axios.post(`${API_URL}/rooms/${roomId}/promotions/${promotionId}`);
  } catch (error) {
    throw error;
  }
};

// Xóa khuyến mãi khỏi phòng
export const removePromotionFromRoom = async (roomId, promotionId) => {
  try {
    await axios.delete(`${API_URL}/rooms/${roomId}/promotions/${promotionId}`);
  } catch (error) {
    throw error;
  }
};
