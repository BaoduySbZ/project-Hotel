/* eslint-disable no-useless-catch */
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// Lấy tất cả bản tin
export const getNews = async () => {
    try {
        const response = await axios.get(`${API_URL}/news`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy bản tin theo ID
export const getNewsById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/news/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Thêm mới bản tin
export const createNews = async (news) => {
    try {
        const response = await axios.post(`${API_URL}/news`, news);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Cập nhật bản tin
export const updateNews = async (id, news) => {
    try {
        const response = await axios.put(`${API_URL}/news/${id}`, news);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xóa bản tin
export const deleteNews = async (id) => {
    try {
        await axios.delete(`${API_URL}/news/${id}`);
    } catch (error) {
        throw error;
    }
};