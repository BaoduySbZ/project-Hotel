import React, { useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Hotel from "../admin-view/hotelComponent";
import Account from "../admin-view/accountComponent";
import Dashboard from "./dashboardComponent";
import Revenue from "../admin-view/revenueComponent"; // Nhập component doanh thu
import Rooms from "../admin-view/roomsComponent"; // Nhập component phòng
import Invoice from "../admin-view/invoiceComponent"; // Nhập component hóa đơn
import Services from "../admin-view/servicesComponent"; // Nhập component dịch vụ
import Reviews from "../admin-view/reviewsComponent"; // Nhập component đánh giá
import Inventory from "../admin-view/inventoryComponent"; // Nhập component kho
import Promotions from "../admin-view/promotionComponent"; // Nhập component quản lý khuyến mãi
import RoomType from "../admin-view/roomTypeComponent";
import News from "../admin-view/newsComponent";
import Comment from "../admin-view/commentComponent";
import Booking from "../admin-view/bookingComponent";
import Logo from "../assets/logo.jpg";
import DeviceComponent from "../admin-view/deviceComponent";
function Admin() {
  const navigate = useNavigate(); // Khai báo useNavigate để điều hướng

  useEffect(() => {
    const authToken = localStorage.getItem("authToken"); // Lấy token từ localStorage
    if (!authToken) {
      // Nếu không có token, điều hướng đến trang đăng nhập
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwt_decode(authToken); // Giải mã token
      const role = decodedToken.role; // Lấy role từ token
      if (role === 1 || role === 0) {
        // Nếu role là 1 hoặc 0, ở lại trang quản trị
        return;
      } else if (role === 2) {
        // Nếu role là 2, điều hướng đến trang khác
        navigate("/home"); // Đổi thành đường dẫn thực tế
      }
    } catch (error) {
      console.error("Token không hợp lệ hoặc đã hết hạn", error);
      navigate("/login"); // Điều hướng nếu token không hợp lệ
    }
  }, [navigate]); // Chạy khi component được mount hoặc navigate thay đổi

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Xóa token khỏi localStorage
    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  return (
    <>
      <div className="sidebar">
        <div style={{ padding: "15px" }}>
          <Link to="/">
            <img src={Logo} width={150} alt="Logo" />
          </Link>
        </div>

        <ul>
          <li className="dashboard-li active">
            <Link to="/admin/dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/hotel">
              <i className="fas fa-hotel"></i> Khách Sạn
            </Link>
          </li>
          <li>
            <Link to="/admin/category">
              <i className="fas fa-list"></i> Danh mục
            </Link>
          </li>
          <li>
            <Link to="/admin/promotions">
              <i className="fas fa-bullhorn"></i> Quản lý khuyến mãi
            </Link>
          </li>
          <li>
            <Link to="/admin/services">
              <i className="fas fa-concierge-bell"></i> Dịch vụ
            </Link>
          </li>
          <li>
            <Link to="/admin/rooms">
              <i className="fas fa-bed"></i> Quản lý phòng
            </Link>
          </li>
          <li>
            <Link to="/admin/revenue">
              <i className="fas fa-chart-line"></i> Quản lý doanh thu
            </Link>
          </li>
          <li>
            <Link to="/admin/invoice">
              <i className="fas fa-file-invoice-dollar"></i> Quản lý hóa đơn đặt
              phòng
            </Link>
          </li>
          <li>
            <Link to="/admin/reviews">
              <i className="fas fa-star"></i> Quản lý đánh giá
            </Link>
          </li>
          <li>
            <Link to="/admin/device">
              <i className="fa-regular fa-newspaper"></i> Quản lý thiết bị
            </Link>
          </li>
          {/* <li>
            <Link to="/admin/news">
              <i className="fa-regular fa-newspaper"></i> Tin tức
            </Link>
          </li> */}
          <li>
            <Link to="/admin/account">
              <i className="fas fa-user"></i> Tài khoản
            </Link>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Đăng Xuất
            </a>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="">
          <div className="admin-header shadow">
            {/* Sidebar Toggle (Topbar) */}
            <button
              id="sidebarToggleTop"
              className="btn btn-link  rounded-circle mr-3"
              style={{ color: "white", fontSize: "20px" }}
            >
              <i className="fa fa-bars"></i>
            </button>

            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto d-flex">
              {/* Nav Item - Alerts */}
              <li className="nav-item dropdown no-arrow mx-1">
                <a
                  className="nav-link dropdown-toggle"
                  id="alertsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell fa-fw"></i>
                  {/* Counter - Alerts */}
                  <span className="badge badge-danger badge-counter">3+</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="alertsDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>

              {/* Nav Item - Messages */}
              <li className="nav-item dropdown no-arrow mx-1">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="messagesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-envelope fa-fw"></i>
                  {/* Counter - Messages */}
                  <span className="badge badge-danger badge-counter">7</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="messagesDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Message 1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Message 2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Message 3
                    </a>
                  </li>
                </ul>
              </li>

              <div className="topbar-divider d-none d-sm-block"></div>

              {/* Nav Item - User Information */}
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link dropdown-toggle d-after-none"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="img-profile rounded-circle mr-4"
                    src="https://startbootstrap.github.io/startbootstrap-sb-admin-2/img/undraw_profile.svg"
                    alt="User Profile"
                  />
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    {/* <strong> Admintrations</strong> */}
                  </span>
                </a>
                {/* Dropdown - User Information */}
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
                      Activity Log
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <section>
          <div className="admin-content">
            <div className="container-admin-content">
              <Routes>
                <Route path="" element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="hotel" element={<Hotel />} />
                <Route path="category" element={<RoomType />} />
                <Route path="account" element={<Account />} />
                <Route path="revenue" element={<Revenue />} />{" "}
                {/* Route cho doanh thu */}
                <Route path="rooms" element={<Rooms />} />{" "}
                {/* Route cho phòng */}
                <Route path="invoice" element={<Booking />} />{" "}
                {/* Route cho hóa đơn */}
                <Route path="services" element={<Services />} />{" "}
                {/* Route cho dịch vụ */}
                <Route path="reviews" element={<Comment />} />{" "}
                {/* Route cho đánh giá */}
                {/* <Route path="inventory" element={<Inventory />} />{" "} */}
                {/* Route cho kho */}
                <Route path="promotions" element={<Promotions />} />
                {/* Route cho tin tức */}
                {/* <Route path="news" element={<News />} /> */}
                <Route path="device" element={<DeviceComponent />} />
                {/* Thêm các route khác tương ứng nếu cần */}
              </Routes>
            </div>
          </div>
        </section>
        <div className="admin-footer">
          All Rights Reserved by Elite Admin. Designed and Developed by
          WrapPixel.
        </div>
      </div>
    </>
  );
}

export default Admin;
