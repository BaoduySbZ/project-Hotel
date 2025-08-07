import React, { useEffect, useState } from "react";
import Header from "../share-view/header";
import Footer from "../share-view/footer";
import { getHotelsFull } from "../service/hotelService";
import { useNavigate, useLocation } from "react-router-dom";
import { getServices } from "../service/servicesService"; // Import the service functions
const API_URL = import.meta.env.VITE_BASE_API_URL;

const Hotel = () => {
  const [hotelList, setHotelList] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServices, setSelectedServices] = useState([]); // Lưu các dịch vụ đã chọn
  const [selectedHotelIndex, setSelectedHotelIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [servicesList, setServicesList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Lấy searchTerm từ query string
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      setSearchTerm(query);
    } else if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location]);

  useEffect(() => {
    fetchHotelList();
    fetchServicesList();
  }, []);

  useEffect(() => {
    setFilteredHotels(hotelList); // Cập nhật danh sách lọc khi tải khách sạn
  }, [hotelList]);

  useEffect(() => {
    // Lọc khách sạn khi searchTerm hoặc dịch vụ thay đổi
    let filtered = hotelList.filter((hotel) =>
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Nếu có dịch vụ đã chọn, lọc thêm dựa trên dịch vụ
    if (selectedServices.length > 0) {
      filtered = filtered.filter((hotel) =>
        hotel.rooms.some((room) =>
          room.services.some((service) =>
            selectedServices.includes(service.name)
          )
        )
      );
    }
    console.log("check", filtered);

    setFilteredHotels(filtered);
    setCurrentPage(1); // Reset trang về đầu khi tìm kiếm hoặc dịch vụ thay đổi
  }, [searchTerm, hotelList, selectedServices]);

  const fetchHotelList = async () => {
    try {
      const data = await getHotelsFull();
      setHotelList(data);
    } catch (error) {
      console.error("Error fetching hotels", error);
    }
  };

  const fetchServicesList = async () => {
    try {
      const data = await getServices();
      setServicesList(data);
    } catch (error) {
      console.error("Error fetching hotels", error);
    }
  };

  const handleHotelClick = (index) => {
    setSelectedHotelIndex(index);
  };

  const handleViewDetails = (hotel) => {
    navigate("/hotel-detail", { state: { hotel } });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định
    navigate(`/hotel/search?query=${encodeURIComponent(searchTerm)}`); // Điều hướng đến trang tìm kiếm với query
  };

  const toggleService = (service) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.includes(service)
        ? prevSelectedServices.filter((s) => s !== service)
        : [...prevSelectedServices, service]
    );
  };

  const indexOfLastHotel = currentPage * itemsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - itemsPerPage;
  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const selectedHotel = hotelList[selectedHotelIndex];

  return (
    <>
      <Header />
      <section className="section-defaut brg-hotel">
        <div className="container container-fluid">
          <div className="row">
            <div className="search-header-container">
              <div className="search-filter-options">
                {/* Button cho từng dịch vụ */}
                {servicesList.map((service) => (
                  <button
                    key={service.id}
                    className={`search-option-button ${
                      selectedServices.includes(service.name) ? "active" : ""
                    }`}
                    onClick={() => toggleService(service.name)}
                  >
                    {service.name}
                  </button>
                ))}
              </div>
              <div className="search-actions">
                <form
                  onSubmit={handleSearchSubmit}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo địa điểm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
                    className="form-control"
                  />
                </form>
              </div>
            </div>

            {/* Hotel list section */}
            <div
              className="col-lg-7 col-md-12 d-flex flex-column"
              style={{ flexGrow: 1 }}
            >
              <div className="hotel-list flex-grow-1">
                {currentHotels.map((hotel, index) => (
                  <div
                    className="hotel-item row"
                    key={hotel.id}
                    onClick={() => handleHotelClick(indexOfFirstHotel + index)}
                  >
                    <div className="col-md-3">
                      <img
                        src={`${API_URL}/hotel_images/${hotel.image}`}
                        alt={hotel.name}
                        className="img-fluid"
                        width="100%"
                      />
                    </div>

                    <div className="hotel-info col-md-6 mx-1 row">
                      <div className="col-6">
                        {" "}
                        <h3
                          style={{
                            fontSize: "25px",
                            textTransform: "uppercase",
                          }}
                        >
                          {hotel.name}
                        </h3>
                        <div className="row" style={{ height: "50%" }}>
                          {hotel.rooms.map((room, roomIndex) => {
                            return room.services.map(
                              (service, serviceIndex) => {
                                return (
                                  <div key={serviceIndex} className="col-3">
                                    <div>{service.name}</div>
                                  </div>
                                );
                              }
                            );
                          })}
                        </div>
                        <a
                          className="more-infor"
                          onClick={() => handleViewDetails(hotel)}
                        >
                          <strong style={{ fontSize: "15px" }}>
                            Xem chi tiết{" "}
                          </strong>
                          <i className="fa-solid fa-eye"></i>
                        </a>
                        <br />
                        <span> {hotel.location}</span>
                      </div>
                      <div
                        className="col-6"
                        style={{ textAlign: "right", margin: "auto" }}
                      >
                        <div
                          className="d-flex"
                          style={{
                            textAlign: "right",
                            justifyContent: "flex-end",
                            fontSize: "20px",
                          }}
                        >
                          <p style={{ fontWeight: "540" }}>ĐÁNH GIÁ:</p>
                          <p>
                            {Math.floor(hotel.rating) > 0 ? (
                              [...Array(Math.floor(hotel.rating))].map(
                                (_, index) => (
                                  <i
                                    className="fa fa-star star-orange"
                                    key={index}
                                    // style={{ marginTop: "5px" }}
                                  ></i>
                                )
                              )
                            ) : (
                              <span>Chưa có đánh giá</span>
                            )}
                          </p>
                        </div>

                        <p
                          className="price"
                          style={{ fontSize: "17px", padding: "10px 0" }}
                        >
                          2 giờ
                        </p>
                        <span style={{ fontSize: "25px" }}>
                          {hotel.rooms.length > 0
                            ? hotel.rooms[0].price.toLocaleString() + "₫"
                            : "Chưa có giá"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                        key={index}
                      >
                        <a
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                          href="#"
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Hotel;
