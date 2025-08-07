import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Home from "./web-view/homeComponent";
import Admin from "./admin-view/adminComponent";
import Hotel from "./web-view/hotelComponent";
import HotelDetail from "./web-view/hotelDetailComponent";
import Booking from "./web-view/bookingComponent";
import ProfilePage from "./web-view/ProfilePage.jsx";
import BookingHistory from "./web-view/BookingHistory.jsx";

import Login from "./private/login";
import Register from "./private/register.jsx";
import CheckOutMoMo from "./web-view/checkOutMomo.jsx";
import BoxChat from "./share-view/chat-box/chat-box.jsx";
import "./App.css";

function ProtectedRoute({ element, allowedRoles }) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/login" replace />; // Điều hướng nếu không có token
  }

  try {
    const decoded = jwt_decode(token);
    if (allowedRoles.includes(decoded.role)) {
      return element; // Hiển thị thành phần nếu vai trò hợp lệ
    } else {
      return <Navigate to="/" replace />; // Điều hướng nếu vai trò không hợp lệ
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    return <Navigate to="/login" replace />; // Điều hướng nếu có lỗi
  }
}

function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hotel/search" element={<Hotel />} />
          <Route path="/hotel-detail" element={<HotelDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Profile/BookingHistory" element={<BookingHistory />} />
          <Route path="/checkout" element={<CheckOutMoMo />} />

          {/* Trang quản trị, chỉ cho phép role = 0 */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute element={<Admin />} allowedRoles={[0, 1]} />
            }
          />

          {/* Đăng nhập và đăng ký */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* Box chat */}
        <BoxChat />
      </div>
    </Router>
  );
}

export default App;
