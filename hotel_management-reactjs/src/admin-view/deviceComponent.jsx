import React, { useState, useEffect } from "react";
import {
  getDevices,
  getHotelDevices,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../service/deviceService"; // Import the device service functions
import DeviceModal from "../modal-view/device-modal"; // Import the modal for devices

const DeviceComponent = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHotel, setsearchHotel] = useState("");
  const [searchHotelRooms, setsearchHotelRooms] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const devicesPerPage = 5; // Number of devices per page

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const data = await getHotelDevices();
      setDevices(data);
      console.log("devices: ", devices)
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const handleCreate = () => {
    setSelectedDevice(null);
    setOpenModal(true);
  };

  const handleEdit = (device) => {
    setSelectedDevice(device);
    setOpenModal(true);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"; // Toggle sort order
    setSortOrder(newSortOrder);

    const sortedDevices = [...devices].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.deviceName.localeCompare(b.deviceName);
      } else {
        return b.deviceName.localeCompare(a.deviceName);
      }
    });
    setDevices(sortedDevices);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thiết bị này?")) {
      try {
        await deleteDevice(id);
        setSelectedDevice(null);
        fetchDevices(); // Refresh the list
      } catch (error) {
        console.error("Error deleting device:", error);
      }
    }
  };

  const handleSave = async (device) => {
    try {
      if (selectedDevice) {
        await updateDevice(selectedDevice.deviceId, device); // Update existing device
      } else {
        await createDevice(device); // Create new device
      }

      setSelectedDevice(null);
      setOpenModal(false);
      fetchDevices(); // Refresh the list
    } catch (error) {
      console.error("Error saving device:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  const handleSearchHotel = (e) => {
    setsearchHotel(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  const handleSearchHotelRooms = (e) => {
    setsearchHotelRooms(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  // Pagination logic
  const indexOfLastDevice = currentPage * devicesPerPage;
  const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
  const currentDevices = devices
    .filter((device) =>
      device.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      device.hotelName.toLowerCase().includes(searchHotel.toLowerCase()) &&
      device.roomsName.toLowerCase().includes(searchHotelRooms.toLowerCase())
    )
    .slice(indexOfFirstDevice, indexOfLastDevice);

  const totalPages = Math.ceil(devices.length / devicesPerPage);

  return (
    <div>
      <h5 className="card-title mb-4">Quản lý thiết bị</h5>
      <div className="mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center mt-3">
          <div
            style={{ width: "750px" }}
            className="col-3 input-group admin-input-group"
          >
            <input
              type="text"
              className="col-3 form-control admin-input"
              placeholder="Tìm kiếm khách sạn"
              value={searchHotel}
              onChange={handleSearchHotel} // Search on input change
            />
            <input
              type="text"
              className="col-3 form-control admin-input"
              placeholder="Tìm kiếm phòng"
              value={searchHotelRooms}
              onChange={handleSearchHotelRooms} // Search on input change
            />
            <input
              type="text"
              className="col-3 form-control admin-input"
              placeholder="Tìm kiếm tên thiết bị"
              value={searchTerm}
              onChange={handleSearch} // Search on input change
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
            <th>Khách sạn</th>
            <th>Phòng</th>
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Tên Thiết Bị
              {sortOrder === "asc" ? (
                <i className="fas fa-sort-alpha-down ml-2"></i> // Ascending sort icon
              ) : (
                <i className="fas fa-sort-alpha-up ml-2"></i> // Descending sort icon
              )}
            </th>
            {/* <th>Trạng Thái</th> */}
            <th>Ngày Mua</th>
            <th>Thời Hạn Bảo Hành (tháng)</th>
            {/* <th className="col-2">Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {currentDevices.map((device) => (
            <tr key={device.deviceId}>
              <td>{device.hotelName}</td>
              <td>{device.roomsName}</td>
              <td>{device.deviceName}</td>
              {/* <td>{device.status}</td> */}
              <td>{device.purchaseDate}</td>
              <td>{device.warrantyPeriod}</td>
              <td className="text-center align-middle">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-primary admin-btn"
                    onClick={() => handleEdit(device)}
                  >
                    <i class="fa-solid fa-wrench"></i>{/* Sửa */}
                  </button>
                  <button
                    className="btn btn-danger admin-btn"
                    onClick={() => handleDelete(device.deviceId)}
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
      <DeviceModal
        device={selectedDevice}
        open={openModal}
        onSave={handleSave}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default DeviceComponent;