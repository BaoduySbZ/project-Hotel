/* eslint-disable no-useless-catch */
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// Lấy tất cả khuyến mãi
export const getPromotions = async () => {
  try {
    const response = await axios.get(`${API_URL}/promotions`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy khuyến mãi theo ID
export const getPromotionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/promotions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thêm mới khuyến mãi
export const createPromotion = async (promotion) => {
  try {
    const response = await axios.post(`${API_URL}/promotions`, promotion);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật khuyến mãi
export const updatePromotion = async (id, promotion) => {
  try {
    const response = await axios.put(`${API_URL}/promotions/${id}`, promotion);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa khuyến mãi
export const deletePromotion = async (id) => {
  try {
    await axios.delete(`${API_URL}/promotions/${id}`);
  } catch (error) {
    throw error;
  }
};
