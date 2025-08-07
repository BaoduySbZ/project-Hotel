import React, { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_BASE_API_URL;
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../service/roomsService"; // Import the service functions
import { Modal } from "@mui/material";
import { uploadSingleFile } from "../service/fileService";
import RoomModal from "../modal-view/rooms-modal"; // Import the modal for rooms
import RoomDetailModal from "../modal-view/rooms-detail-modal"; // Import RoomDetailModal

import { getHotels } from "../service/hotelService";
const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHotel, setSearchHotel] = useState(""); // State for hotel search
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [oldImgUrl, setImgUrl] = useState([]);
  const roomsPerPage = 5; // Number of rooms per page
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    fetchRooms();
    fetchHotels();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      console.log("rooms:", data); // Kiểm tra dữ liệu
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchHotels = async () => {
    try {
      const hotelData = await getHotels();
      setHotels(hotelData);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleCreate = () => {
    setSelectedRoom(null);
    setOpenModal(true);
  };

  const handleEdit = (room) => {
    setImgUrl(room.image);
    setSelectedRoom(room);
    setOpenModal(true);
  };

  // Hàm mở modal chi tiết
  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setOpenDetailModal(true);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"; // Toggle sort order
    setSortOrder(newSortOrder);

    const sortedRooms = [...rooms].sort((a, b) => {
      return newSortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setRooms(sortedRooms);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phòng này?")) {
      try {
        await deleteRoom(id);
        setSelectedRoom(null);
        fetchRooms(); // Refresh the list
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  const handleSave = async (room) => {
    try {
      let imageUrl = oldImgUrl;
      // If `room.image` is a File, upload the image
      if (room.image instanceof File) {
        const uploadResponse = await uploadSingleFile(
          imageUrl,
          "room_images",
          room.image
        );
        imageUrl = uploadResponse.fileName;
      }

      const roomData = { ...room, image: imageUrl }; // Update image URL
      if (selectedRoom) {
        await updateRoom(selectedRoom.id, roomData);
      } else {
        await createRoom(roomData);
      }

      setSelectedRoom(null);
      setOpenModal(false);
      fetchRooms(); // Refresh the list
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  const handleSearchHotel = (e) => {
    setSearchHotel(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value); // Cập nhật trạng thái lọc
    setCurrentPage(1); // Reset trang về 1 khi lọc
  };

  const getStatusLabel = (status) => {
    switch (Number(status)) {
      case 0:
        return "Phòng trống";
      case 1:
        return "Đã đặt";
      case 2:
        return "Đã hủy";
      case 3:
        return "Đang sử dụng";
      case 4:
        return "Đang dọn dẹp";
      default:
        return "Không xác định";
    }
  };

  // Pagination logic
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms
    .filter(
      (room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        room.Hotel_Name.toLowerCase().includes(searchHotel.toLowerCase()) &&
        (filterStatus === "" || room.statusRooms === String(filterStatus)) // So sánh dưới dạng chuỗi
    )
    .slice(indexOfFirstRoom, indexOfLastRoom);

  console.log("Kiểm tra filterStatus:", filterStatus);
  console.log("Kiểm tra rooms:", rooms);
  console.log("Kiểm tra kết quả lọc:", currentRooms);

  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  return (
    <div>
      <h5 className="card-title mb-4">Quản lý phòng</h5>
      <div className="mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center mt-3">
          <div
            className="input-group admin-input-group"
            style={{ width: "100%", maxWidth: "700px", gap: "10px" }}
          >
            <input
              type="text"
              className="form-control admin-input"
              placeholder="Tìm kiếm phòng..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ flex: 1 }}
            />

            <select
              className="form-control admin-input"
              value={filterStatus}
              onChange={handleFilterStatus}
              style={{ flex: 1 }}
            >
              <option value="">Lọc tình trạng phòng...</option>
              <option value="0">Phòng trống</option>
              <option value="1">Đã đặt</option>
              <option value="3">Đang sử dụng</option>
            </select>

            <select
              className="form-control admin-input"
              value={searchHotel}
              onChange={handleSearchHotel}
              style={{ flex: 1 }}
            >
              <option value="">Chọn khách sạn</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.name}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-success admin-btn"
            onClick={handleCreate}
            style={{ marginLeft: "15px" }}
          >
            {/* Thêm */}<i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <table className="table table-bordered center-text">
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Tên phòng
              {sortOrder === "asc" ? (
                <i className="fas fa-sort-alpha-down ml-2"></i>
              ) : (
                <i className="fas fa-sort-alpha-up ml-2"></i>
              )}
            </th>
            <th>Khách sạn</th>
            <th>Tình trạng</th>
            <th>Giá</th>
            <th>Địa chỉ</th>
            {/* <th>Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {currentRooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.Hotel_Name}</td>
              <td className="text-center">{room.description}</td>
              <td>{getStatusLabel(room.statusRooms)}</td>
              <td>{room.price}</td>
              <td>{room.location}</td>
              <td className="text-center align-middle">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-info admin-btn"
                    onClick={() => handleViewDetails(room)}
                  >
                    <i class="fa-solid fa-eye"></i>{/* Xem */}
                  </button>
                  <button
                    className="btn btn-warning admin-btn"
                    onClick={() => handleEdit(room)}
                  >
                    <i class="fa-solid fa-wrench"></i>{/* Sửa */}
                  </button>
                  <button
                    className="btn btn-danger admin-btn"
                    onClick={() => handleDelete(room.id)}
                  >
                    <i class="fa-solid fa-trash-can"></i>{/* Xóa */}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end admin-pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </a>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""
                }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""
              }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>

      {/* Modal component */}
      <RoomModal
        room={selectedRoom}
        open={openModal}
        onSave={handleSave}
        onClose={() => setOpenModal(false)}
      />

      <RoomDetailModal
        room={selectedRoom}
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
      />
    </div>
  );
};

export default Rooms;
