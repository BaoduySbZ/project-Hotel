import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

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

const BookingModal = ({ booking, onSave, open, onClose }) => {
  const [form, setForm] = useState({
    bookingName: "",
    userIdBooking: "",
    bookingPhone: "",
    checkInDate: "",
    checkOutDate: "",
    bookingRoomId: "",
    bookingStatus: 0,
    paymentStatus: 0,
    paymentMethod: 0,
    surcharge: 0.0,
    totalFee: 0.0,
  });

  useEffect(() => {
    if (booking) {
      setForm(booking);
    } else {
      setForm({
        bookingName: "",
        userIdBooking: "",
        bookingPhone: "",
        checkInDate: "",
        checkOutDate: "",
        bookingRoomId: "",
        bookingStatus: 0,
        paymentStatus: 0,
        paymentMethod: 0,
        surcharge: 0.0,
        totalFee: 0.0,
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "surcharge" || name === "totalFee"
          ? parseFloat(value) || 0
          : ["bookingStatus", "paymentStatus", "paymentMethod"].includes(name)
            ? parseInt(value) || 0
            : value,
    }));
  };

  const handleSubmit = () => {
    if (
      !form.bookingName ||
      !form.userIdBooking ||
      !form.bookingPhone ||
      !form.checkInDate ||
      !form.checkOutDate
    ) {
      alert("Vui lòng điền tất cả các trường bắt buộc.");
      return;
    }

    onSave(form);
    setForm({
      bookingName: "",
      userIdBooking: "",
      bookingPhone: "",
      checkInDate: "",
      checkOutDate: "",
      bookingRoomId: "",
      bookingStatus: 0,
      paymentStatus: 0,
      paymentMethod: 0,
      surcharge: 0.0,
      totalFee: 0.0,
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
          {booking ? "Cập nhật đặt phòng" : "Thêm đặt phòng mới"}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Tên người đặt"
          name="bookingName"
          value={form.bookingName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="ID Người đặt"
          name="userIdBooking"
          value={form.userIdBooking}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Số điện thoại"
          name="bookingPhone"
          value={form.bookingPhone}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Ngày nhận phòng"
          name="checkInDate"
          type="date"
          value={form.checkInDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Ngày trả phòng"
          name="checkOutDate"
          type="date"
          value={form.checkOutDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="ID Phòng"
          name="bookingRoomId"
          value={form.bookingRoomId}
          onChange={handleChange}
        />

        {/* Thay thế ô nhập trạng thái đặt phòng bằng Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="booking-status-label">
            Trạng thái đặt phòng
          </InputLabel>
          <Select
            labelId="booking-status-label"
            name="bookingStatus"
            value={form.bookingStatus}
            onChange={handleChange}
            label="Trạng thái đặt phòng"
          >
            <MenuItem value={0}>Chưa thanh toán</MenuItem>
            <MenuItem value={1}>Đã thanh toán</MenuItem>
            <MenuItem value={2}>Đã hủy</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Trạng thái thanh toán"
          select // Thay đổi thành select
          name="paymentStatus"
          value={form.paymentStatus}
          onChange={handleChange}
        >
          <MenuItem value={0}>thanh toán online</MenuItem>
          <MenuItem value={1}>thanh toán offline</MenuItem>
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Phương thức thanh toán"
          select // Thay đổi thành select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          <MenuItem value={0}>Chuyển khoản</MenuItem>
          <MenuItem value={1}>Thanh toán trực tiếp</MenuItem>
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Phụ phí"
          name="surcharge"
          value={form.surcharge}
          onChange={handleChange}
          type="number"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Tổng phí"
          name="totalFee"
          value={form.totalFee}
          onChange={handleChange}
          type="number"
        />

        <Box mt={2} display="flex" justifyContent="flex-end">
          <button className="btn btn-primary admin-btn" onClick={handleSubmit}>
            {booking ? "Cập nhật" : "Tạo mới"}
          </button>
          <button className="btn btn-danger admin-btn" onClick={onClose}>
            Huỷ
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookingModal;
