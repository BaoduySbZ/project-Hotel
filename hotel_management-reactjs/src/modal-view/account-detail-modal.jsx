import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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

const ViewAccountModal = ({ account, open, onClose }) => {
    const [form, setForm] = useState({
        userName: "",
        email: "",
        score: "",
        password: "",
        role: "",
        phoneNumber: "",
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
                phoneNumber: "",
            });
        }
    }, [account]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="view-modal-title"
            aria-describedby="view-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="view-modal-title" variant="h6" component="h2">
                    Thông tin tài khoản
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Tên tài khoản"
                    name="userName"
                    value={form.userName}
                    InputProps={{ readOnly: true }} // Chỉ xem
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    value={form.email}
                    InputProps={{ readOnly: true }} // Chỉ xem
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Điểm số"
                    type="number"
                    name="score"
                    value={form.score}
                    InputProps={{ readOnly: true }} // Chỉ xem
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Mật khẩu"
                    type="password"
                    name="password"
                    value={form.password}
                    InputProps={{ readOnly: true }} // Chỉ xem
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-view-label">Vai trò</InputLabel>
                    <Select
                        labelId="role-view-label"
                        name="role"
                        value={form.role}
                        readOnly
                        inputProps={{ readOnly: true }}
                    >
                        <MenuItem value={0}>Admin</MenuItem>
                        <MenuItem value={1}>Staff</MenuItem>
                        <MenuItem value={2}>User</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Số điện thoại"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    InputProps={{ readOnly: true }} // Chỉ xem
                />

                <Box mt={2} display="flex" justifyContent="flex-end">
                    <button className="btn btn-secondary admin-btn" onClick={onClose}>
                        Đóng
                    </button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ViewAccountModal;
