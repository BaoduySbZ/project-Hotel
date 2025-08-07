// news-modal.jsx
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

const NewsModal = ({ news, open, onSave, onClose }) => {
    const [form, setForm] = useState({
        topic: "",
        title: "",
        newsImage: "",
        description: "",
    });

    useEffect(() => {
        if (news) {
            setForm(news);
        } else {
            setForm({
                topic: "",
                title: "",
                newsImage: "",
                description: "",
            });
        }
    }, [news]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(form);
        setForm({
            topic: "",
            title: "",
            newsImage: "",
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
                    {news ? "Cập nhật tin tức" : "Thêm tin tức mới"}
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Chủ đề"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Tiêu đề"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Ảnh đại diện URL"
                    name="newsImage"
                    value={form.newsImage}
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
                        {news ? "Cập nhật" : "Tạo mới"}
                    </button>
                    <button className="btn btn-danger admin-btn" onClick={onClose}>
                        Huỷ
                    </button>
                </Box>
            </Box>
        </Modal>
    );
};

export default NewsModal;