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

const CommentModal = ({ comment, onSave, open, onClose }) => {
  const [form, setForm] = useState({
    userId: "",
    userName: "",
    roomId: "",
    hotelId: "",
    hotelName: "",
    rating: "",
    comment: "",
    is_removed: false,
  });

  useEffect(() => {
    if (comment) {
      setForm({
        ...comment,
        userName: comment.account_userName || "",
        hotelName: comment.hotel_name || "",
        roomId: comment.room_id || "",
        rating: comment.comment_rating || "",
        comment: comment.comment_text || "",
      });
    } else {
      setForm({
        userId: "",
        userName: "",
        roomId: "",
        hotelId: "",
        hotelName: "",
        rating: "",
        comment: "",
        is_removed: false,
      });
    }
  }, [comment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.userName || !form.hotelName) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    onSave(form);
    setForm({
      userId: "",
      userName: "",
      roomId: "",
      hotelId: "",
      hotelName: "",
      rating: "",
      comment: "",
      is_removed: false,
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
          {comment ? "Cập nhật bình luận" : "Thêm bình luận mới"}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="User Name"
          name="userName"
          value={form.userName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Hotel Name"
          name="hotelName"
          value={form.hotelName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Room ID"
          name="roomId"
          value={form.roomId}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Rating"
          name="rating"
          type="number"
          value={form.rating}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Comment"
          name="comment"
          value={form.comment}
          onChange={handleChange}
          multiline
          rows={4}
        />

        <Box mt={2} display="flex" justifyContent="flex-end">
          <button
            className="btn btn-primary admin-btn"
            onClick={handleSubmit}
            style={{ marginRight: "8px" }}
          >
            {comment ? "Cập nhật" : "Tạo mới"}
          </button>
          <button className="btn btn-danger admin-btn" onClick={onClose}>
            Huỷ
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentModal;
