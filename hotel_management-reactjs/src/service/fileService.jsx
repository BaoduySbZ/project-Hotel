/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "http://localhost:3002/api";
// Hàm upload file
export const uploadSingleFile = async (imageUrl, folderPath, file) => {
  try {
    const formData = new FormData();

    // Thêm các trường vào formData
    formData.append("imgName", imageUrl); // Thêm id
    formData.append("folderPath", folderPath); // Thêm folderPath
    formData.append("file", file); // Thêm file (file ở đây là đối tượng file từ input)

    // Gửi formData qua POST request
    const response = await axios.post(`${API_URL}/uploadSingleFile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt Content-Type cho multipart
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
