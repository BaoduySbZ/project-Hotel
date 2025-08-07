/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "http://localhost:3002/api";

// Lấy tất cả bình luận
export const getComments = async () => {
  try {
    const response = await axios.get(`${API_URL}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy bình luận theo ID
export const getCommentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/comments/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thêm mới bình luận
export const createComment = async (comment) => {
  try {
    const response = await axios.post(`${API_URL}/comments`, comment);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật bình luận
export const updateComment = async (id, comment) => {
  try {
    console.log("Updating comment with ID:", id, "Data:", comment); // Kiểm tra dữ liệu
    const response = await axios.put(`${API_URL}/comments/${id}`, comment);
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error); // In ra lỗi nếu có
    throw error;
  }
};

// Xóa bình luận
export const deleteComment = async (id) => {
  try {
    await axios.delete(`${API_URL}/comments/${id}`);
  } catch (error) {
    throw error;
  }
};
