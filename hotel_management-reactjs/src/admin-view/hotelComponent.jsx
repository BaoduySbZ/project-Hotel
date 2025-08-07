import React, { useState, useEffect } from "react";
import {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../service/hotelService"; // Assuming you have a hotel service
import { uploadSingleFile } from "../service/fileService";
import HotelModal from "../modal-view/hotel-modal"; // Assuming you have a modal for hotels
import HotelDetailModal from "../modal-view/hotels-detail-modal";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [oldImgUrl, setImgUrl] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState(""); // Thêm state cho tìm kiếm vị trí
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const hotelsPerPage = 5; // Số lượng khách sạn trên mỗi trang
  const [locations, setLocations] = useState([]); // State for storing location options
  useEffect(() => {
    fetchHotels();
    fetchLocations(); // Fetch the list of locations
  }, []);

  const fetchHotels = async () => {
    try {
      const data = await getHotels();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const data = await getHotels();
      const uniqueLocations = [...new Set(data.map((hotel) => hotel.location))];
      setLocations(uniqueLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleCreate = () => {
    setSelectedHotel(null);
    setOpenModal(true);
  };

  const handleViewDetails = (hotel) => {
    setSelectedHotel(hotel);
    setOpenDetailModal(true);
  };

  const handleEdit = (hotel) => {
    setImgUrl(hotel.image);
    setSelectedHotel(hotel);
    setOpenModal(true);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"; // Đảo ngược thứ tự sắp xếp
    setSortOrder(newSortOrder);

    const sortedHotels = [...hotels].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setHotels(sortedHotels);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khách sạn này?")) {
      try {
        await deleteHotel(id);
        setSelectedHotel(null);
        fetchHotels();
      } catch (error) {
        console.error("Error deleting hotel:", error);
      }
    }
  };

  const handleSave = async (hotel) => {
    try {
      let imageUrl = oldImgUrl;
      // Nếu `hotel.image` là File, gọi hàm upload ảnh
      if (hotel.image instanceof File) {
        // Gọi API upload file và lấy tên file trả về từ server
        const uploadResponse = await uploadSingleFile(
          imageUrl,
          "hotel_images",
          hotel.image
        ); // 'hotel_images' là folder lưu trữ trên server
        imageUrl = uploadResponse.fileName; // Giả sử server trả về fileName của ảnh
      }

      // Chuẩn bị dữ liệu khách sạn với đường dẫn ảnh mới
      const hotelData = {
        ...hotel,
        image: imageUrl, // Cập nhật đường dẫn ảnh mới
      };

      if (selectedHotel) {
        await updateHotel(selectedHotel.id, hotelData); // Gọi API cập nhật khách sạn
      } else {
        await createHotel(hotelData); // Gọi API tạo mới khách sạn
      }

      setSelectedHotel(null);
      setOpenModal(false);
      fetchHotels(); // Lấy lại danh sách khách sạn
    } catch (error) {
      console.error("Error saving hotel:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  const handleSearchLocation = (e) => {
    setSearchLocation(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;

  const currentHotels = hotels
    .filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        hotel.location.toLowerCase().includes(searchLocation.toLowerCase()) // Thêm lọc cho vị trí
    )
    .slice(indexOfFirstHotel, indexOfLastHotel);

  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  return (
    <div>
      <h5 className="card-title mb-4">Quản lý khách sạn</h5>
      <div className="mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center mt-3">
          <div
            style={{ width: "350px" }}
            className="col-3 input-group admin-input-group"
          >
            <input
              type="text"
              className="col-3 form-control admin-input"
              placeholder="Tìm tên khách sạn"
              value={searchTerm}
              onChange={handleSearch} // Gọi hàm tìm kiếm khi nhập
            />

            <select
              className="form-control"
              value={searchLocation}
              onChange={handleSearchLocation}
            >
              <option value="">Chọn vị trí</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-success admin-btn" onClick={handleCreate}>
            {/* Thêm */}<i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <table className="table table-bordered center-text">
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>ID</th>
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Tên khách sạn
              {sortOrder === "asc" ? (
                <i className="fas fa-sort-alpha-down ml-2"></i> // Icon sắp xếp tăng dần
              ) : (
                <i className="fas fa-sort-alpha-up ml-2"></i> // Icon sắp xếp giảm dần
              )}
            </th>
            <th>Vị trí</th>
            <th>Xếp hạng</th>
            <th>Điểm đánh giá</th>
            <th>Tổng số phòng</th>
            {/* <th>Hình ảnh</th> */}
            {/* <th className="col-2">Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {currentHotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.id}</td>
              <td>{hotel.name}</td>
              <td>{hotel.location}</td>
              <td>{hotel.rating}</td>
              <td>{hotel.reviewScore}</td>
              <td>{hotel.totalRooms}</td>
              {/* <td>
                <img
                  src={`http://localhost:3002/hotel_images/${hotel.image}`}
                  alt={hotel.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td> */}
              <td className="text-center align-middle">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-info admin-btn"
                    onClick={() => handleViewDetails(hotel)}
                  >
                    <i className="fa-solid fa-eye"></i>{/* Xem */}
                  </button>
                  <button
                    className="btn btn-primary admin-btn"
                    onClick={() => handleEdit(hotel)}
                  >
                    <i className="fa-solid fa-wrench"></i>{/* Sửa */}
                  </button>
                  <button
                    className="btn btn-danger admin-btn"
                    onClick={() => handleDelete(hotel.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>{/* Xóa */}
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
      <HotelModal
        hotel={selectedHotel}
        open={openModal}
        onSave={handleSave}
        onClose={() => setOpenModal(false)}
      />
      <HotelDetailModal
        hotel={selectedHotel}
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
      />
    </div>
  );
};

export default Hotel;
