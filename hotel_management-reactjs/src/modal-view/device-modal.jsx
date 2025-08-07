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

const DeviceModal = ({ device, onSave, open, onClose }) => {
  const [form, setForm] = useState({
    deviceName: "",
    deviceType: "",
    status: "",
    purchaseDate: "",
    warrantyPeriod: "",
  });

  useEffect(() => {
    if (device) {
      setForm(device);
    } else {
      setForm({
        deviceName: "",
        deviceType: "",
        status: "",
        purchaseDate: "",
        warrantyPeriod: "",
      });
    }
  }, [device]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    setForm({
      deviceName: "",
      deviceType: "",
      status: "",
      purchaseDate: "",
      warrantyPeriod: "",
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
          {device ? "Cập nhật thiết bị" : "Thêm thiết bị mới"}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Tên Thiết Bị"
          name="deviceName"
          value={form.deviceName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Loại Thiết Bị"
          name="deviceType"
          value={form.deviceType}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Trạng Thái"
          name="status"
          value={form.status}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Ngày Mua"
          name="purchaseDate"
          type="date"
          value={form.purchaseDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Thời Hạn Bảo Hành (tháng)"
          name="warrantyPeriod"
          type="number"
          value={form.warrantyPeriod}
          onChange={handleChange}
        />

        <Box mt={2} display="flex" justifyContent="flex-end">
          <button className="btn btn-primary admin-btn" onClick={handleSubmit}>
            {device ? "Cập nhật" : "Tạo mới"}
          </button>
          <button className="btn btn-danger admin-btn" onClick={onClose}>
            Huỷ
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeviceModal;
