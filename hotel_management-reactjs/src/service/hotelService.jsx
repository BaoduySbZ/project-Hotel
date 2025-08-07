/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "http://localhost:3002/api";

// Lấy tất cả các khách sạn
export const getHotels = async () => {
  try {
    const response = await axios.get(`${API_URL}/hotels`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getHotelsFull = async () => {
  try {
    const response = await axios.get(`${API_URL}/hotelsFull`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//danh sách hotels chưa đặt
export const getHotelsFulldata = async () => {
  try {
    const response = await axios.get(`${API_URL}/hotelsFull/Data`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotelsDropdow = async () => {
  try {
    const response = await axios.get(`${API_URL}/hotels/header`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy khách sạn theo ID
export const getHotelById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/hotels/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thêm mới khách sạn
export const createHotel = async (hotel) => {
  try {
    const response = await axios.post(`${API_URL}/hotels`, hotel);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật khách sạn
export const updateHotel = async (id, hotel) => {
  try {
    const response = await axios.put(`${API_URL}/hotels/${id}`, hotel);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa khách sạn
export const deleteHotel = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/hotels/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchHotel = async (location) => {
  try {
    const response = await axios.get(`${API_URL}/hotels/location/search`, {
      params: { location }, // Sử dụng params để truyền location
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const HotelLocation = async () => {
  try {
    const response = await axios.get(`${API_URL}/hotels/location/count`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
