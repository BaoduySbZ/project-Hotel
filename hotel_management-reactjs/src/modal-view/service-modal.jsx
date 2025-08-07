import React, { useState, useEffect } from "react";
import { Box, TextField, Modal, Typography } from "@mui/material";

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

const ServiceModal = ({ service, onSave, open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    icon: "",
  });

  useEffect(() => {
    if (service) {
      setForm(service);
    } else {
      setForm({
        name: "",
        description: "",
        icon: "",
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Kiểm tra các trường bắt buộc
    if (!form.name || !form.service_price || !form.description || !form.icon) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Kiểm tra giá dịch vụ có phải là số và lớn hơn 0
    if (isNaN(form.service_price) || form.service_price <= 0) {
      alert("Giá dịch vụ phải là một số lớn hơn 0.");
      return;
    }

    // Gọi hàm onSave nếu dữ liệu hợp lệ
    onSave(form);

    // Reset form sau khi lưu
    setForm({
      name: "",
      service_price: 0,
      description: "",
      icon: "",
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
          {service ? "Cập nhật dịch vụ" : "Thêm dịch vụ mới"}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Tên dịch vụ"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Giá dịch vụ"
          name="service_price"
          value={form.service_price}
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
          label="Icon URL"
          name="icon"
          value={form.icon}
          onChange={handleChange}
        />

        <Box mt={2} display="flex" justifyContent="flex-end">
          <button className="btn btn-primary admin-btn" onClick={handleSubmit}>
            {service ? "Cập nhật" : "Tạo mới"}
          </button>
          <button className="btn btn-danger admin-btn" onClick={onClose}>
            Huỷ
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ServiceModal;
