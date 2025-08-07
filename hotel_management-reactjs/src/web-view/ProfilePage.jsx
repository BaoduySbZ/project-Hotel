import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Header from "../share-view/header";
import Footer from "../share-view/footer";
import { Table, Pagination } from 'react-bootstrap';
import {
    Box,
    Button,
    TextField,
    Modal,
    Typography,
    Card,
} from "@mui/material";
import { getAccountById, updateAccount } from '../service/accountService';
import { getBookingHistory } from '../service/bookingService'
import jwt_decode from 'jwt-decode';

const ProfilePage = () => {
    const [accounts, setAccounts] = useState(null);
    const [BookingHistory, setBookingHistory] = useState([]);

    const [updateProfile, setUpdateProfile] = useState({
        userName: "",
        email: "",
        score: "",
        password: "",
        role: "",
        phoneNumber: ""
    });

    const [errors, setErrors] = useState({
        userName: false,
        phoneNumber: false,
    });

    const [view, setView] = useState("profile"); // Thêm state view
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Số lượng mục mỗi trang
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwt_decode(token);
                fetchProfile(decoded.id);
                fetchBookingHistory(decoded.id);
            } catch (error) {
                console.error("Error decoding token:", error);
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [navigate]);

    const fetchProfile = async (id) => {
        try {
            const data = await getAccountById(id);
            setAccounts(data);
            setUpdateProfile({
                userName: data.userName,
                email: data.email,
                score: data.score,
                role: data.role,
                phoneNumber: data.phoneNumber
            });
        } catch (error) {
            console.error('Error fetching accounts:', error);
            navigate("/");
        }
    };

    const fetchBookingHistory = async (id) => {
        try {
            const data = await getBookingHistory(id);
            setBookingHistory(data);
            console.log("Fetched booking history data: ", data);
            console.log("Updated BookingHistory state: ", BookingHistory); // Kiểm tra ngay sau setState
        } catch (error) {
            console.error('Error fetching booking history:', error);
            navigate("/");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateProfile((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: false })); // Reset error when input changes
    };

    const validateInputs = () => {
        const newErrors = {
            userName: !updateProfile.userName.trim(),
            phoneNumber: !updateProfile.phoneNumber.trim(),
        };
        setErrors(newErrors);
        return Object.values(newErrors).some(error => error); // Returns true if there are any errors
    };

    const handleSubmit = async () => {
        if (validateInputs()) {
            return; // Nếu có lỗi, không thực hiện cập nhật
        }

        try {
            const token = localStorage.getItem("authToken");
            if (token) {
                const decoded = jwt_decode(token);
                await updateAccount(decoded.id, updateProfile);
                alert("Cập nhật thông tin thành công!");
                fetchProfile(decoded.id); // Tải lại dữ liệu để cập nhật UI
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error updating account:", error);
            alert("Cập nhật thông tin thất bại!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setuserName(null);
        navigate("/login");
    };

    if (!accounts) {
        navigate("/");
        return 0;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = BookingHistory.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(BookingHistory.length / itemsPerPage);

    return (
        <>
            <Header />
            <div className="profile-container">
                <aside className="profile-sidebar">
                    <ul className="profile-sidebar__list">
                        <li className="profile-sidebar__item">
                            <button onClick={() => setView("profile")} className="btn profile-sidebar__link profile-sidebar__link--active">Chào {accounts.role === 0 ? "Admin" : "Khách hàng"}</button>
                        </li>
                        <li className="profile-sidebar__item">
                            <button onClick={() => setView("booking-history")} className="btn profile-sidebar__link">Lịch sử đặt phòng</button>
                        </li>
                        <li className="profile-sidebar__item">
                            <button className="btn profile-sidebar__link" onClick={handleLogout}>Đăng xuất</button>
                        </li>
                    </ul>
                </aside>

                <div className="profile-content">
                    {view === "profile" && (
                        <>
                            <div className="profile-content">
                                <h1 className="profile-content__title">Tài khoản</h1>

                                <section className="profile-section">
                                    <h2 className="profile-section__title">Thông tin tài khoản</h2>
                                    <p className="profile-section__description">
                                        Bạn có thể cập nhật Hồ sơ Công khai của mình tại đây
                                    </p>

                                    <div className="profile-info-box">
                                        <div className="profile-info-box__item">
                                            <TextField
                                                disabled={accounts.role !== 0} // Chỉ cho phép sửa khi role là 0
                                                helperText={accounts.role !== 0 ? "Bạn không được phép sửa" : "Chỉ Admin có thể sửa"}
                                                required
                                                error={errors.userName}
                                                fullWidth
                                                margin="normal"
                                                label="Tên đăng nhập"
                                                name="userName"
                                                value={updateProfile.userName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section className="profile-section">
                                    <h2 className="profile-section__title">Thông tin cá nhân</h2>
                                    <p className="profile-section__description">Bạn đã khai báo thông tin sau</p>

                                    <div className="profile-info-box">
                                        <div className="profile-info-box__item">
                                            <TextField
                                                disabled={accounts.role !== 0} // Chỉ cho phép sửa khi role là 0
                                                helperText={accounts.role !== 0 ? "Bạn không được phép sửa" : "Chỉ Admin có thể sửa"}
                                                fullWidth
                                                margin="normal"
                                                label="Email"
                                                name="email"
                                                value={updateProfile.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="profile-info-box__item">
                                            <TextField
                                                disabled={accounts.role !== 0} // Chỉ cho phép sửa khi role là 0
                                                helperText={accounts.role !== 0 ? "Bạn không được phép sửa" : "Chỉ Admin có thể sửa"}
                                                fullWidth
                                                margin="normal"
                                                label="Điểm tích lũy"
                                                name="score"
                                                value={updateProfile.score}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="profile-info-box__item">
                                            <TextField
                                                required
                                                error={errors.phoneNumber}
                                                helperText={errors.phoneNumber ? "Vui lòng nhập số điện thoại" : ""}
                                                fullWidth
                                                margin="normal"
                                                label="Số điện thoại"
                                                name="phoneNumber"
                                                value={updateProfile.phoneNumber}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="profile-info-box__item">
                                            <TextField
                                                helperText="Để trống nếu không đổi mật khẩu"
                                                fullWidth
                                                type="password"
                                                margin="normal"
                                                label="Đổi mật khẩu"
                                                name="password"
                                                value={updateProfile.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="profile-info-box__item">
                                            <span className="profile-info-box__label">Quyền</span>
                                            <span className="profile-info-box__value">
                                                {accounts.role === 0 ? "Admin" : "Khách hàng"}
                                            </span>
                                        </div>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmit}
                                        >
                                            Cập nhật
                                        </Button>
                                    </div>
                                </section>
                            </div>
                        </>
                    )}
                    {view === "booking-history" && (
                        <>
                            {BookingHistory.length > 0 ? (
                                <Box sx={{ maxWidth: '100%', padding: '20px' }}>
                                    <Typography variant="h4" gutterBottom>
                                        Lịch sử Đặt Phòng
                                    </Typography>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên người đặt</th>
                                                <th>Ngày nhận phòng</th>
                                                <th>Ngày trả phòng</th>
                                                <th>Tổng phí</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentBookings.map((booking, index) => (
                                                <tr key={booking.id}>
                                                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                    <td>{booking.bookingName}</td>
                                                    <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                                    <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                                                    <td>{parseFloat(booking.totalFee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                    <td>{booking.bookingStatus === 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Phân trang */}
                                    <Pagination>
                                        <Pagination.Prev
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        />
                                        {[...Array(totalPages)].map((_, index) => (
                                            <Pagination.Item
                                                key={index + 1}
                                                active={index + 1 === currentPage}
                                                onClick={() => handlePageChange(index + 1)}
                                            >
                                                {index + 1}
                                            </Pagination.Item>
                                        ))}
                                        <Pagination.Next
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        />
                                    </Pagination>
                                </Box>
                            ) : (
                                <Card sx={{ maxWidth: 500, padding: 2, marginTop: 2 }}>
                                    <Typography variant="h6" color="textSecondary">
                                        Không có lịch sử đặt phòng.
                                    </Typography>
                                </Card>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;