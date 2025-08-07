import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
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

const AccountModal = ({ account, onSave, open, onClose }) => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    score: "",
    password: "",
    role: "",
    phoneNumber: "", // Thêm phoneNumber vào trạng thái
  });

  useEffect(() => {
    if (account) {
      setForm(account);
    } else {
      setForm({
        userName: "",
        email: "",
        score: "",
        password: "",
        role: "",
        phoneNumber: "", // Đặt giá trị mặc định cho phoneNumber
      });
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    setForm({
      userName: "",
      email: "",
      score: "",
      password: "",
      role: "",
      phoneNumber: "", // Thêm phoneNumber vào trạng thái
    })
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
          {account ? "Cập nhật tài khoản" : "Thêm tài khoản mới"}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Tên tài khoản"
          name="userName"
          value={form.userName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Điểm số"
          type="number"
          name="score"
          value={form.score}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mật khẩu"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          {" "}
          {/* Sử dụng margin ở đây */}
          <InputLabel id="role-select-label">Vai trò</InputLabel>
          <Select
            labelId="role-select-label"
            name="role"
            value={form.role}
            onChange={handleChange}
            label="Vai trò" // Thêm label vào Select
          >
            <MenuItem value={0}>Admin</MenuItem>
            <MenuItem value={1}>Staff</MenuItem>
            <MenuItem value={2}>User</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Số điện thoại" // Thêm trường Số điện thoại
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        <Box mt={2} display="flex" justifyContent="flex-end">
          <button className="btn btn-primary admin-btn" onClick={handleSubmit}>
            {" "}
            {account ? "Cập nhật" : "Tạo mới"}
          </button>
          <button className="btn btn-danger admin-btn" onClick={onClose}>
            Huỷ
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AccountModal;