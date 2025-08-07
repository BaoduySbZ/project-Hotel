import axios from "axios";

const API_URL = "http://localhost:3002/api";

// Lấy tất cả các khách sạn
export const getRevenue = async () => {
  try {
    const response = await axios.get(`${API_URL}/revenue`);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy danh sách khách sạn:", error); // Ghi lại lỗi
    throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi hàm
  }
};

export const getCircleRevenue = async () => {
  try {
    const response = await axios.get(`${API_URL}/roomtop`);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy danh sách khách sạn:", error); // Ghi lại lỗi
    throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi hàm
  }
};
