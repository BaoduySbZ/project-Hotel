import React, { useState, useEffect } from "react";
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../service/bookingService"; // Import the booking service functions
import BookingModal from "../modal-view/booking-modal"; // Import the modal for bookings

const BookingComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const bookingsPerPage = 10; // Number of bookings per page

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleCreate = () => {
    setSelectedBooking(null);
    setOpenModal(true);
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setOpenModal(true);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedBookings = [...bookings].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.bookingName.localeCompare(b.bookingName);
      } else {
        return b.bookingName.localeCompare(a.bookingName);
      }
    });
    setBookings(sortedBookings);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đặt phòng này?")) {
      try {
        await deleteBooking(id);
        setSelectedBooking(null);
        fetchBookings();
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const handleSave = async (booking) => {
    try {
      if (selectedBooking) {
        await updateBooking(selectedBooking.id, booking);
      } else {
        await createBooking(booking);
      }

      setSelectedBooking(null);
      setOpenModal(false);
      fetchBookings();
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings
    .filter((booking) =>
      booking.bookingName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstBooking, indexOfLastBooking);

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  return (
    <div>
      <h5 className="card-title mb-4">Quản lý đặt phòng</h5>
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
              onChange={handleSearch}
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
              Tên đặt phòng
              {sortOrder === "asc" ? (
                <i className="fas fa-sort-alpha-down ml-2"></i>
              ) : (
                <i className="fas fa-sort-alpha-up ml-2"></i>
              )}
            </th>
            <th>Số điện thoại</th>
            <th>Ngày nhận phòng</th>
            <th>Ngày trả phòng</th>
            <th>Phòng</th>
            {/* <th>Trạng thái đặt phòng</th> */}
            {/* <th>Trạng thái thanh toán</th> */}
            <th>Phương thức thanh toán</th>
            <th>Tổng phí</th>
            {/* <th>Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.bookingName}</td>
              <td>{booking.bookingPhone}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              <td>{booking.bookingRoomId}</td>
              {/* <td>
                {(() => {
                  switch (booking.bookingStatus) {
                    case 0:
                      return "Chưa thanh toán"; // chưa thanh toán
                    case 1:
                      return "Đã thanh toán"; // confirm
                    case 2:
                      return "Đã hủy";
                    default:
                      return "Không xác định"; // Để xử lý trường hợp không nằm trong các giá trị trên
                  }
                })()}
              </td> */}
              {/* <td>
                {booking.paymentStatus
                  ? "thanh toán offline" // 1
                  : "thanh toán online"}
              </td> */}
              <td>
                {booking.paymentMethod === 1
                  ? " thanh toán trực tiếp" // 1
                  : "Chuyển khoản"}
              </td>
              <td>
                {parseFloat(booking.totalFee).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td>
                <div className="d-flex">
                  <button
                    className="admin-btn"
                    onClick={() => handleEdit(booking)}
                  >
                    <i class="fa-solid fa-wrench"></i>{/* Sửa */}
                  </button>
                  <button
                    className="btn btn-danger admin-btn"
                    onClick={() => handleDelete(booking.id)}
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
      <BookingModal
        booking={selectedBooking}
        open={openModal}
        onSave={handleSave}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default BookingComponent;
