import React, { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_BASE_API_URL;
import {
    Box,
    Modal,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    ListItemText,
    TextField,
} from "@mui/material";

import { getHotels } from "../service/hotelService";
// import { getRoomTypes } from "../service/roomTypeService";
// import { getServices } from "../service/servicesService";
// import { getPromotions } from "../service/promotionsService";
// import { getDevices } from "../service/deviceService";
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxHeight: "90vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
};

const HotelDetailModal = ({ hotel, open, onClose }) => {
    const [form, setForm] = useState({
        name: "",
        location: "",
        rating: "",
        description: "",
        totalRooms: "",
        reviewScore: "",
        image: "",
    });

    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        fetchHotels();
        if (hotel) {
            setForm({
                ...hotel,
            });
        }
    }, [hotel]);

    console.log(hotel);
    const fetchHotels = async () => {
        try {
            const data = await getHotels();
            setHotels(data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    if (
        !hotels.length
    ) {
        return <div>Loading...</div>;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx=
                {{
                    ...modalStyle,
                    maxHeight: '95vh',
                    height: '95vh',
                }}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Chi tiết phòng
                </Typography>

                {form.image && hotel?.image && (
                    <div className="text-center mb-3">
                        <img
                            src={`${API_URL}/hotel_images/${hotel.image}`}
                            alt={hotel.name}
                            style={{ width: "300px", height: "190px" }}
                        />
                    </div>
                )}

                <FormControl fullWidth margin="normal">
                    <TextField
                        id="hotel-text-field"
                        value={form.name}
                        label="Khách sạn"
                        disabled
                        sx={{
                            '& .MuiInputBase-input': {
                                height: '10px', // Chỉnh độ cao của input
                            },
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="hotel-text-field"
                        value={form.location}
                        label="Vị trí"
                        disabled
                        sx={{
                            '& .MuiInputBase-input': {
                                height: '10px', // Chỉnh độ cao của input
                            },
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="hotel-text-field"
                        value={form.rating}
                        label="Xếp hạng"
                        disabled
                        sx={{
                            '& .MuiInputBase-input': {
                                height: '10px', // Chỉnh độ cao của input
                            },
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="hotel-text-field"
                        value={form.reviewScore}
                        label="Điểm đánh giá"
                        disabled
                        sx={{
                            '& .MuiInputBase-input': {
                                height: '10px', // Chỉnh độ cao của input
                            },
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="hotel-text-field"
                        value={form.totalRooms}
                        label="Tổng số phòng"
                        disabled
                        sx={{
                            '& .MuiInputBase-input': {
                                height: '10px', // Chỉnh độ cao của input
                            },
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="hotel-text-field"
                        value={form.description}
                        label="Mô tả"
                        disabled
                        sx={{
                            '& .MuiInputBase-input': {
                                height: '10px', // Chỉnh độ cao của input
                            },
                        }}
                    />
                </FormControl>
            </Box>
        </Modal>
    );
};

export default HotelDetailModal;
