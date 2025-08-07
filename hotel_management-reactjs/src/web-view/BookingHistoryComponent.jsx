import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { Card, Typography, Box } from '@mui/material';

const BookingHistoryComponent = ({ BookingHistory, view }) => {
    const [accounts, setAccounts] = useState(null);
    const [BookingHistory, setBookingHistory] = useState([]);

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
            console.log("data: ", data);
            console.log("BookingHistory: ", BookingHistory); // Kiểm tra ngay sau setState
        } catch (error) {
            console.error('Error fetching booking history:', error);
            navigate("/");
        }
    };

    if (!accounts) {
        navigate("/");
        return 0;
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Số mục hiển thị mỗi trang

    // Tính toán các mục cần hiển thị cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = BookingHistory.slice(indexOfFirstItem, indexOfLastItem);

    // Hàm xử lý chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Tổng số trang
    const totalPages = Math.ceil(BookingHistory.length / itemsPerPage);

    return (
        <>
            {BookingHistory.length > 0 ? (
                <Box sx={{ maxWidth: '100%', padding: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Lịch sử Đặt Phòng
                    </Typography>
                    <Table striped bordered hover responsive>
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
                            {currentItems.map((booking, index) => (
                                <tr key={booking.id}>
                                    <td>{index + 1 + indexOfFirstItem}</td>
                                    <td>{booking.bookingName}</td>
                                    <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                    <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                                    <td>{parseFloat(booking.totalFee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td>{booking.bookingStatus === 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

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
    )
};

export default BookingHistoryComponent;