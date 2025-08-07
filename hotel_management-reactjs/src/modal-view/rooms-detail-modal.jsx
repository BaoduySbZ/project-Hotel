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
  Grid,
} from "@mui/material";

import { getHotels } from "../service/hotelService";
import { getRoomTypes } from "../service/roomTypeService";
import { getServices } from "../service/servicesService";
import { getPromotions } from "../service/promotionsService";
import { getDevices } from "../service/deviceService";

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

const RoomDetailModal = ({ room, open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    location: "",
    roomtypeId: "",
    hotelId: "",
    serviceIds: [],
    promotionIds: [],
    statusRooms: "",
    deviceIds: [],
  });

  const [hotels, setHotels] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [promotion, setPromotion] = useState([]);
  const [device, setDevice] = useState([]);

  useEffect(() => {
    fetchHotels();
    fetchRoomTypes();
    fetchServices();
    fetchPromotion();
    fetchDevice();
    if (room) {
      setForm({
        ...room,
        promotionIds: room.promotions ? room.promotions.map((x) => x.id) : [],
        serviceIds: room.services ? room.services.map((x) => x.id) : [],
        deviceIds: room.device ? room.device.map((x) => x.deviceId) : [],
        statusRooms: room.statusRooms || "",
      });
    }
  }, [room]);

  const fetchHotels = async () => {
    try {
      const data = await getHotels();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const fetchRoomTypes = async () => {
    try {
      const data = await getRoomTypes();
      setRoomTypes(data);
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchPromotion = async () => {
    try {
      const data = await getPromotions();
      setPromotion(data);
    } catch (error) {
      console.error("Error fetching Promotion:", error);
    }
  };

  const fetchDevice = async () => {
    try {
      const data = await getDevices();
      setDevice(data);
    } catch (error) {
      console.error("Error fetching Promotion:", error);
    }
  };

  if (
    !hotels.length ||
    !roomTypes.length ||
    !services.length ||
    !promotion.length
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
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Chi tiết phòng
        </Typography>

        {form.image && room?.image && (
          <div className="text-center mb-3">
            <img
              src={`${API_URL}/room_images/${room.image}`}
              alt={room.name}
              style={{ width: "100%", height: "auto", marginBottom: "16px" }}
            />
          </div>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="hotel-select-label">Khách sạn</InputLabel>
              <Select labelId="hotel-select-label" value={form.hotelId} disabled>
                {hotels.map((hotel) => (
                  <MenuItem key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="roomname-select-label">Tên phòng</InputLabel>
              <Select labelId="roomname-select-label" value={form.name} disabled>
                <MenuItem value={form.name}>{form.name}</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="description-select-label">Mô tả</InputLabel>
              <Select labelId="description-select-label" value={form.description} disabled>
                <MenuItem value={form.description}>{form.description}</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="price-select-label">Giá</InputLabel>
              <Select labelId="price-select-label" value={form.price} disabled>
                <MenuItem value={form.price}>{form.price}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="roomtype-select-label">Loại phòng</InputLabel>
              <Select labelId="roomtype-select-label" value={form.roomtypeId} disabled>
                {roomTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="service-select-label">Dịch vụ</InputLabel>
              <Select
                labelId="service-select-label"
                multiple
                value={form.serviceIds}
                renderValue={(selected) =>
                  selected
                    .map((id) => services.find((s) => s.id === id)?.name)
                    .join(", ")
                }
                disabled
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    <Checkbox
                      checked={form.serviceIds.indexOf(service.id) > -1}
                    />
                    <ListItemText primary={service.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="device-select-label">Thiết bị</InputLabel>
              <Select
                labelId="device-select-label"
                multiple
                value={form.deviceIds}
                renderValue={(selected) =>
                  selected
                    .map((id) => device.find((s) => s.deviceId === id)?.deviceName)
                    .join(", ")
                }
                disabled
              >
                {device.map((device) => (
                  <MenuItem key={device.deviceId} value={device.deviceId}>
                    <Checkbox
                      checked={form.deviceIds.indexOf(device.deviceId) > -1}
                    />
                    <ListItemText primary={device.deviceName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="status-rooms-select-label">
                Trạng thái phòng
              </InputLabel>
              <Select
                labelId="status-rooms-select-label"
                value={form.statusRooms}
                disabled
              >
                <MenuItem value="0">Phòng trống</MenuItem>
                <MenuItem value="1">Đã đặt</MenuItem>
                <MenuItem value="3">Đang sử dụng</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default RoomDetailModal;