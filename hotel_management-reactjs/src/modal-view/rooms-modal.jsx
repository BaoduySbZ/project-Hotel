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
  Checkbox,
  ListItemText,
  Grid,
} from "@mui/material";
import { getHotels } from "../service/hotelService"; // Importing the hotel service
import { getRoomTypes } from "../service/roomTypeService"; // Importing the room type service
import { getServices } from "../service/servicesService"; // Importing the service service
import { getPromotions } from "../service/promotionsService"; // Importing the service service
import { getDevices } from "../service/deviceService";
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

const RoomModal = ({ room, onSave, open, onClose }) => {
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
    statusRooms: "", // Thêm trường statusRooms
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
      const data = {
        ...room,
        promotionIds:
          room.promotions && room.promotions.length !== 0
            ? room.promotions.map((x) => x.id)
            : [],
        serviceIds:
          room.services && room.services.length !== 0
            ? room.services.map((x) => x.id)
            : [],

        deviceIds:
          room.device && room.device.length !== 0
            ? room.device.map((x) => x.deviceId)
            : [],
        statusRooms: room.statusRooms || "", // Lấy giá trị statusRooms từ room
      };
      setForm(data);
    } else {
      setForm({
        name: "",
        description: "",
        image: "",
        price: "",
        location: "",
        roomtypeId: "",
        hotelId: "",
        serviceIds: [],
        promotionIds: [],
        statusRooms: "", // Khởi tạo trạng thái statusRooms
        deviceIds: [],
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (event) => {
    const {
      target: { value },
    } = event;
    setForm((prev) => ({
      ...prev,
      serviceIds: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handlePromotionChange = (event) => {
    const {
      target: { value },
    } = event;
    setForm((prev) => ({
      ...prev,
      promotionIds: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleDeviceChange = (event) => {
    const {
      target: { value },
    } = event;
    setForm((prev) => ({
      ...prev,
      deviceIds: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = () => {
    onSave(form);
    setForm({
      name: "",
      description: "",
      image: "",
      price: "",
      location: "",
      roomtypeId: "",
      hotelId: "",
      serviceIds: [],
      promotionIds: [],
      statusRooms: "", // Reset statusRooms
      deviceIds: [],
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
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {room ? "Cập nhật phòng" : "Thêm phòng mới"}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="hotel-select-label">Khách sạn</InputLabel>
              <Select
                labelId="hotel-select-label"
                name="hotelId"
                value={form.hotelId}
                onChange={handleChange}
                label="Khách sạn"
              >
                {hotels.map((hotel) => (
                  <MenuItem key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Tên phòng"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="roomtype-select-label">Loại phòng</InputLabel>
              <Select
                labelId="roomtype-select-label"
                name="roomtypeId"
                value={form.roomtypeId}
                onChange={handleChange}
                label="Loại phòng"
              >
                {roomTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
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
                name="statusRooms"
                value={form.statusRooms}
                onChange={handleChange}
                label="Trạng thái phòng"
              >
                <MenuItem value="0">Phòng trống</MenuItem>
                <MenuItem value="1">Đã đặt</MenuItem>
                <MenuItem value="3">Đang sử dụng</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ marginTop: 1, marginBottom: 1 }}>
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={handleFileChange}
                required
                style={{
                  width: "100%",
                  padding: "16.5px 14px",
                  fontSize: "1rem",
                  lineHeight: "1.4375em",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  borderRadius: "4px",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="service-select-label">Thiết bị</InputLabel>
              <Select
                labelId="service-select-label"
                multiple
                name="deviceIds"
                value={form.deviceIds}
                onChange={handleDeviceChange}
                renderValue={(selected) =>
                  selected
                    .map((id) => device.find((s) => s.deviceId === id)?.deviceName)
                    .join(", ")
                }
                label="Thiết bị"
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
              <InputLabel id="service-select-label">Dịch vụ</InputLabel>
              <Select
                labelId="service-select-label"
                multiple
                name="serviceIds"
                value={form.serviceIds}
                onChange={handleServiceChange}
                renderValue={(selected) =>
                  selected
                    .map((id) => services.find((s) => s.id === id)?.name)
                    .join(", ")
                }
                label="Dịch Vụ"
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
              <InputLabel id="promotion-select-label">Khuyến mãi</InputLabel>
              <Select
                labelId="promotion-select-label"
                multiple
                name="promotionIds"
                value={form.promotionIds}
                onChange={handlePromotionChange}
                renderValue={(selected) =>
                  selected
                    .map((id) => promotion.find((p) => p.id === id)?.name)
                    .join(", ")
                }
                label="Khuyến mãi"
              >
                {promotion.map((promotion) => (
                  <MenuItem key={promotion.id} value={promotion.id}>
                    <Checkbox
                      checked={form.promotionIds.indexOf(promotion.id) > -1}
                    />
                    <ListItemText primary={promotion.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Mô tả"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Giá"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Địa điểm"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Button
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
        >
          {room ? "Cập nhật" : "Thêm"}
        </Button>
      </Box>
    </Modal>
  )
};

export default RoomModal;