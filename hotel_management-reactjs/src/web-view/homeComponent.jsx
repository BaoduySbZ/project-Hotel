import React, { useEffect, useState } from "react";
import Header from "../share-view/header";
import Footer from "../share-view/footer";
import { useNavigate } from "react-router-dom";
import { searchHotel, HotelLocation } from "../service/hotelService";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:3002/api";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const results = await searchHotel(value);
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.location);
    setSuggestions([]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Tìm kiếm:", searchTerm);
    // Điều hướng đến trang tìm kiếm với tham số tìm kiếm
    navigate(`/hotel/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const fetchDataLocation = async () => {
    const results = await HotelLocation();
    console.log(results);
    setLocation(results);
  };

  useEffect(() => {
    fetchDataLocation();
  }, []);

  return (
    <>
      <Header />
      {/* Banner Section */}
      <section className="banner-section">
        <div className="container py-5 text-white d-flex align-items-center justify-content-center">
          <div className="row align-items-center">
            <div className="col-md-9">
              <h1 className="mb-4">
                Đặt phòng khách sạn linh hoạt - Giá tốt nhất
              </h1>
              <p className="lead">
                Phòng yêu ứng ý không lo cháy ví. Hoàn phí ngay nếu giá khách
                sạn rẻ hơn!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container search-section py-3">
        <div className="bg-white shadow p-4 rounded-3">
          <ul className="nav nav-pills justify-content-center mb-4">
            <li className="nav-item" style={{ marginRight: "45px" }}>
              <a className="nav-link active" href="#">
                <i className="fas fa-clock"></i> Theo giờ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-calendar-day"></i> Theo ngày
              </a>
            </li>
          </ul>
          <form
            className="row g-2 justify-content-center"
            onSubmit={handleSearchSubmit}
          >
            <div className="col-md-12">
              <div
                className="input-group"
                style={{
                  padding: "6px 16px",
                  border: "1px solid lightgray",
                  borderRadius: "30px",
                }}
              >
                <TextField
                  variant="standard"
                  placeholder="Bạn muốn ở đâu?"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  size="medium"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <>
                        <div className="d-flex justify-content-between w-50 custom-border-left btn" onClick={handleSearchSubmit}>
                          <span style={{ borderLeft: '1px solid black', marginRight: '10px' }}></span>
                          <div className="d-flex align-items-center gap-4 col-6">
                            <span><i class="fa-solid fa-arrow-right-to-bracket"></i></span>
                            <div className="d-flex flex-column">
                              <label style={{ fontSize: '12px' }} className="fw-bold">Nhận phòng</label>
                              <label className="fw-bold">Bất kỳ</label>
                            </div>
                          </div>
                          <span style={{ borderLeft: '1px solid black', marginRight: '10px' }}></span>
                          <div className="d-flex align-items-center gap-4 col-6">
                            <span><i class="fa-solid fa-arrow-right-from-bracket"></i></span>
                            <div className="d-flex flex-column">
                              <label style={{ fontSize: '12px' }} className="fw-bold">Trả phòng</label>
                              <label className="fw-bold">Bất kỳ</label>
                            </div>
                          </div>
                        </div>
                        <IconButton
                          onClick={handleSearchSubmit}
                          aria-label="search"
                        >
                          <button
                            className="btn btn-warning btn-hotel"
                            type="submit"
                          >
                            Tìm kiếm <i className="fas fa-search"></i>
                          </button>
                        </IconButton>
                      </>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      backgroundColor: "#fff",
                      transition: "background-color 0.3s ease",
                    },
                    "& .MuiInputBase-root:focus-within": {
                      backgroundColor: "#f3f3f3", // Màu nền nhẹ khi click vào
                    },
                  }}
                />
              </div>
              {/* Hiển thị danh sách gợi ý */}
              {suggestions.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    backgroundColor: "white",
                    width: { xs: "90%", sm: "50%", md: "20%" },
                    maxHeight: 200,
                    overflowY: "auto",
                    border: "1px solid lightgray",
                    borderRadius: 1,
                    boxShadow: 2,
                  }}
                >
                  <List>
                    {suggestions.map((hotel, index) => (
                      <ListItem
                        button
                        key={index}
                        onClick={() => handleSuggestionClick(hotel)}
                      >
                        <ListItemText
                          primary={hotel.name}
                          secondary={
                            <>
                              <div>Địa chỉ: {hotel.location}</div>
                              <div>{`Đánh giá: ${hotel.rating}`}</div>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card border-0 shadow">
              <img
                src="https://s3.go2joy.vn/350w/banner/8707_1727751259_66fb645b1491d.webp"
                className="card-img-top"
                alt="Deal Banner"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow">
              <img
                src="https://s3.go2joy.vn/350w/banner/8707_1727758030_66fb7ecee300b.webp"
                className="card-img-top"
                alt="Discount Banner"
                width={255}  // Sửa từ '255px' thành số nguyên 255
                height={255} // Sửa từ '255px' thành số nguyên 255
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow">
              <img
                src="https://s3.go2joy.vn/350w/banner/8707_1727751436_66fb650ca4716.webp"
                className="card-img-top"
                alt="Promo Banner"
                width={255}  // Sửa từ '255px' thành số nguyên 255
                height={255} // Sửa từ '255px' thành số nguyên 255
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container border bg-orange text-white text-center py-5 rounded-5 shadow-lg">
        <div className="d-flex align-items-center justify-content-center">
          <div className="me-5">
            <img
              src="https://go2joy.vn/images/sign-up-cover.png"
              alt=""
              width="440"
              height="318"
              className="rounded-3"
            />
          </div>
          <div className="benefits-section text-start">
            <h2 className="fw-bold mb-4">Đăng ký tài khoản và nhận các quyền lợi</h2>
            <ul className="list-unstyled my-4">
              <li className="mb-3 d-flex align-items-center">
                <i className="fas fa-check-circle text-green bg-light rounded-circle p-2 me-3"></i>
                Nhận và sử dụng ưu đãi từ Go2Joy và đối tác
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="fas fa-check-circle text-green bg-light rounded-circle p-2 me-3"></i>
                Tích Joy Xu và tham gia chương trình tem tại khách sạn để đổi những ưu đãi hấp dẫn
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="fas fa-check-circle text-green bg-light rounded-circle p-2 me-3"></i>
                Nhận ngay coupon giảm giá 55% với người dùng mới
              </li>
            </ul>
            <button className="btn btn-light btn-lg rounded-pill px-4 py-2 shadow-sm hover-shadow">Đăng ký & Nhận ưu đãi</button>
          </div>
        </div>
      </section>

      {/* Hotel Categories */}
      <section className="container my-5">
        <div className="category-hotel">
          <h2 className="text-center mb-4">Danh mục khách sạn</h2>
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-bed fa-3x text-orange"></i>
                  <h5 className="card-title">Tình yêu</h5>
                  <p className="card-text">
                    Hơn 300 khách sạn kèm nhiều ưu đãi cho các cặp đôi.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-star fa-3x text-orange"></i>
                  <h5 className="card-title">Hot review</h5>
                  <p className="card-text">
                    Khám phá các khách sạn đang nhận được nhiều review gần đây
                    nhất.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-plane fa-3x text-orange"></i>
                  <h5 className="card-title">Du lịch</h5>
                  <p className="card-text">
                    Khám phá những vùng đất mới, tận hưởng và tăng chuyến đi.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-heart fa-3x text-orange"></i>
                  <h5 className="card-title">Mới mà chất</h5>
                  <p className="card-text">
                    Hàng trăm khách sạn mới trên Go2Joy đang chờ bạn khám phá.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="category-hotel">
          <h2 className="mb-4"><strong> Trải nghiệm cùng Go2Joy</strong></h2>
          <div className="row">

            <div className="col-md-6 mb-4">
              <div
                className="card bg-image rounded-5"
                style={{
                  backgroundImage:
                    "url('https://s3.go2joy.vn/350w/hotel/9078_1723781409_66bed121993bb.webp')",
                }}
              >
                <div className="card-body text-white">
                  {/* <i className="fas fa-bolt fa-3x"></i> */}
                  <h3 className="card-title">Giá sốc Đêm nay</h3>
                  <button className="btn btn-light">Xem thêm</button>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div
                className="card bg-image rounded-5"
                style={{
                  backgroundImage:
                    "url('https://s3.go2joy.vn/350w/hotel/9078_1723781430_66bed1368bf64.webp')",
                }}
              >
                <div className="card-body text-white">
                  {/* <i className="fas fa-tags fa-3x"></i>  */}
                  <h3 className="card-title">Ưu đãi hấp dẫn</h3>
                  <button className="btn btn-light">Xem thêm</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Blog Promotion Section */}
      <section className="container boder blog-section py-5 brg-blog d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="text-white">
                Những điều thú vị có thể bạn chưa biết
              </h2>
              <p className="lead text-white">
                Khám phá những điều mới mẻ, thú vị từ các bài viết của chúng
                tôi.
              </p>
              <a
                href="#"
                className="btn btn-outline-dark text-white"
                style={{ border: "1px solid white" }}
              >
                Danh sách bài blog
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* City Section */}
      <section className="city-section py-5">
        <div className="container">
          <h3 className="mb-4">Cảm hứng cho những lần tiếp theo</h3>
          <div className="row">
            <div className="col-md-12">
              <ul className="nav">
                <li className="nav-item TpHCM">
                  <span>
                    <strong>TP Hồ Chí Minh</strong>
                  </span>
                </li>
                {/* <li className="nav-item">
                  <a href="#" className="nav-link">
                    Hà Nội
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Đà Nẵng
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Bà Rịa - Vũng Tàu
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Hải Phòng
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="row text-center mt-4">
            {location &&
              location.length > 0 &&
              location.map((loc, index) => (
                <div key={index} className="col-md-2">
                  <p>
                    <span>{loc.location}</span>
                    <br />
                    {loc.totalHotels} khách sạn
                  </p>
                </div>
              ))}
          </div>
          {/* <div className="row text-center mt-4">
            <div className="col-md-2">
              <p>
                <strong>Quận 4</strong>
                <br />
                746 khách sạn
              </p>
            </div>
            <div className="col-md-2">
              <p>
                <strong>Quận 3</strong>
                <br />
                378 khách sạn
              </p>
            </div>
            <div className="col-md-2">
              <p>
                <strong>Quận 10</strong>
                <br />
                117 khách sạn
              </p>
            </div>
            <div className="col-md-2">
              <p>
                <strong>Quận 7</strong>
                <br />
                442 khách sạn
              </p>
            </div>
            <div className="col-md-2">
              <p>
                <strong>Thủ Đức</strong>
                <br />
                195 khách sạn
              </p>
            </div>
            <div className="col-md-2">
              <p>
                <strong>Bình Chánh</strong>
                <br />
                102 khách sạn
              </p>
            </div>
          </div> */}
        </div>
      </section>

      <Footer></Footer>
    </>
  );
};

export default Home;
