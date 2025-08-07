import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
} from "@mui/material";

// Style for the modal box
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const RoomTypeModal = ({ roomType, onSave, open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (roomType) {
      setForm(roomType);
    } else {
      setForm({
        name: "",
        description: "",
      });
    }
  }, [roomType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    setForm({
      name: "",
      description: "",
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
          {roomType ? "Cập nhật loại phòng" : "Thêm loại phòng mới"}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Tên loại phòng"
          name="name"
          value={form.name}
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

        <Box mt={2} display="flex" justifyContent="flex-end">
          <button className="btn btn-primary admin-btn" onClick={handleSubmit}>
            {roomType ? "Cập nhật" : "Tạo mới"}
          </button>
          <button className="btn btn-danger admin-btn" onClick={onClose}>
            Huỷ
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RoomTypeModal;
