/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "http://localhost:3002/api";

// Lấy tất cả đặt phòng
export const getBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy đặt phòng theo ID
export const getBookingById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thêm mới đặt phòng
export const createBooking = async (booking) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, booking);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAnewBooking = async (booking) => {
  try {
    const response = await axios.post(`${API_URL}/bookings/status`, booking);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật đặt phòng
export const updateBooking = async (id, booking) => {
  try {
    const response = await axios.put(`${API_URL}/bookings/${id}`, booking);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa đặt phòng
export const deleteBooking = async (id) => {
  try {
    await axios.delete(`${API_URL}/bookings/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getBookingHistory = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/BookingHistory/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};