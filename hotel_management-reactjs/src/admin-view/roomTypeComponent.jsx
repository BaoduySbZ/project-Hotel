import React, { useState, useEffect } from "react";
import {
  getRoomTypes,
  createRoomType,
  updateRoomType,
  deleteRoomType,
} from "../service/roomTypeService.jsx"; // Assuming you have a roomtype service
import RoomTypeModal from "../modal-view/roomtype-modal"; // Assuming you have a modal for room types

const RoomType = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const roomTypesPerPage = 5; // Số lượng loại phòng trên mỗi trang

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    try {
      const data = await getRoomTypes();
      setRoomTypes(data);
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  };

  const handleCreate = () => {
    setSelectedRoomType(null);
    setOpenModal(true);
  };

  const handleEdit = (roomType) => {
    setSelectedRoomType(roomType);
    setOpenModal(true);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"; // Đảo ngược thứ tự sắp xếp
    setSortOrder(newSortOrder);

    const sortedRoomTypes = [...roomTypes].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setRoomTypes(sortedRoomTypes);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa loại phòng này?")) {
      try {
        await deleteRoomType(id);
        setSelectedRoomType(null);
        fetchRoomTypes();
      } catch (error) {
        console.error("Error deleting room type:", error);
      }
    }
  };

  const handleSave = async (roomType) => {
    try {
      if (selectedRoomType) {
        await updateRoomType(selectedRoomType.id, roomType); // Gọi API cập nhật loại phòng
      } else {
        await createRoomType(roomType); // Gọi API tạo mới loại phòng
      }

      setSelectedRoomType(null);
      setOpenModal(false);
      fetchRoomTypes(); // Lấy lại danh sách loại phòng
    } catch (error) {
      console.error("Error saving room type:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  const indexOfLastRoomType = currentPage * roomTypesPerPage;
  const indexOfFirstRoomType = indexOfLastRoomType - roomTypesPerPage;
  const currentRoomTypes = roomTypes
    .filter((roomType) =>
      roomType.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstRoomType, indexOfLastRoomType);

  const totalPages = Math.ceil(roomTypes.length / roomTypesPerPage);

  return (
    <div>
      <h5 className="card-title mb-4">Quản lý loại phòng</h5>
      <div className="mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center mt-3">
          <div
            style={{ width: "350px" }}
            className="col-3 input-group admin-input-group"
          >
            <input
              type="text"
              className="col-3 form-control admin-input"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleSearch} // Gọi hàm tìm kiếm khi nhập
            />
          </div>
          <button className="btn btn-success admin-btn" onClick={handleCreate}>
            {/* Thêm */}<i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <table className="table table-bordered center-text">
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Tên loại phòng
              {sortOrder === "asc" ? (
                <i className="fas fa-sort-alpha-down ml-2"></i> // Icon sắp xếp tăng dần
              ) : (
                <i className="fas fa-sort-alpha-up ml-2"></i> // Icon sắp xếp giảm dần
              )}
            </th>
            <th>Mô tả</th>
            {/* <th className="col-2">Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {currentRoomTypes.map((roomType) => (
            <tr key={roomType.id}>
              <td>{roomType.id}</td>
              <td>{roomType.name}</td>
              <td>{roomType.description}</td>
              <td className="text-center align-middle">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-primary admin-btn"
                    onClick={() => handleEdit(roomType)}
                  >
                    <i class="fa-solid fa-wrench"></i>{/* Sửa */}
                  </button>
                  <button
                    className="btn btn-danger admin-btn"
                    onClick={() => handleDelete(roomType.id)}
                  >
                    <i class="fa-solid fa-trash-can"></i>{/* Xóa */}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end admin-pagination">
          <li
            className="page-item"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <a className="page-link" href="#">
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
                onClick={() => setCurrentPage(index + 1)}
                href="#"
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li
            className="page-item"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>

      {/* Modal component */}
      <RoomTypeModal
        roomType={selectedRoomType}
        open={openModal}
        onSave={handleSave}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default RoomType;
