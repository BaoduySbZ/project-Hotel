import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  Input,
} from "@mui/material";

// Style for the modal box
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "90vh", // Đặt chiều cao tối đa để tránh vượt quá màn hình
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto", // Thêm thuộc tính này để có thanh cuộn dọc khi cần
};

const HotelModal = ({ hotel, onSave, open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    rating: "",
    totalRooms: "",
    reviewScore: "",
    image: null, // Khởi tạo null cho ảnh dưới dạng File
    description: ""
  });

  useEffect(() => {
    if (hotel) {
      setForm(hotel);
    } else {
      setForm({
        name: "",
        location: "",
        rating: "",
        totalRooms: "",
        reviewScore: "",
        image: null,
        description: ""
      });
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = () => {
    onSave(form);
    setForm({
      name: "",
      location: "",
      rating: "",
      totalRooms: "",
      reviewScore: "",
      image: null,
      description: ""
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {hotel ? "Cập nhật khách sạn" : "Thêm khách sạn mới"}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr", // Hai cột bằng nhau
            gap: "16px", // Khoảng cách giữa các phần tử
          }}
        >
          <TextField
            label="Tên khách sạn"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Địa điểm"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Xếp hạng (1-5)"
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Tổng số phòng"
            type="number"
            name="totalRooms"
            value={form.totalRooms}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Điểm đánh giá"
            type="number"
            name="reviewScore"
            value={form.reviewScore}
            onChange={handleChange}
            fullWidth
          />
          <Box sx={{ gridColumn: "1 / span 2", marginTop: 1 }}>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                width: "100%",
                padding: "16.5px 14px",
                fontSize: "1rem",
                lineHeight: "1.4375em",
                backgroundColor: "#fff",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "4px",
                color: "rgba(0, 0, 0, 0.87)",
                boxSizing: "border-box",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.border = "2px solid #3f51b5")}
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(0, 0, 0, 0.23)")
              }
            />
          </Box>
          <TextField
            label="Mô tả"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            sx={{ gridColumn: "1 / span 2" }}
          />
        </Box>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <button className="btn btn-primary admin-btn" onClick={handleSubmit}>
            {hotel ? "Cập nhật" : "Tạo mới"}
          </button>
          <button className="btn btn-danger admin-btn" onClick={onClose}>
            Huỷ
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default HotelModal;