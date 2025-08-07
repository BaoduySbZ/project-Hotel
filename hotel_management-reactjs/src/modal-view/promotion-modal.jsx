import React, { useState, useEffect } from "react";
import { Box, TextField, Modal, Typography } from "@mui/material";

// Style cho modal
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

const PromotionModal = ({ promotion, onSave, open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    discount: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (promotion) {
      setForm(promotion);
    } else {
      setForm({
        name: "",
        discount: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    }
  }, [promotion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    setForm({
      name: "",
      discount: "",
      description: "",
      startDate: "",
      endDate: "",
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
        <Typography id="modal-title" variant="h6" component="h2">
          {promotion ? "Cập nhật khuyến mãi" : "Thêm khuyến mãi mới"}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Tên khuyến mãi"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Giảm giá (%)"
          name="discount"
          type="number"
          value={form.discount}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mô tả"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Ngày bắt đầu"
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Ngày kết thúc"
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <Box mt={2} display="flex" justifyContent="flex-end">
          <button className="btn btn-primary admin-btn" onClick={handleSubmit}>
            {promotion ? "Cập nhật" : "Tạo mới"}
          </button>
          <button className="btn btn-danger admin-btn" onClick={onClose}>
            Huỷ
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PromotionModal;
