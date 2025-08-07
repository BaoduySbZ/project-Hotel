import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3002/api";

const Revenue = () => {
  const [datecheck, setDatecheck] = useState(""); // Ngày chọn
  const [monthcheck, setMonthcheck] = useState(""); // Tháng chọn
  const [revenueDataDay, setRevenueDataDay] = useState([]); // Doanh thu theo ngày
  const [revenueDataMonth, setRevenueDataMonth] = useState([]); // Doanh thu theo tháng
  const [averageEarnings, setAverageEarnings] = useState(0); // Thu nhập trung bình
  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [error, setError] = useState(""); // Thông báo lỗi
  const [revenueallDataDay, setRevenueallDataDay] = useState([]);
  // Hàm gọi API để lấy doanh thu theo ngày

  useEffect(() => {
    if (datecheck) {
      fetchRevenueAllWithDay(); // Gọi lại API để lấy dữ liệu chi tiết theo ngày
      fetchRevenueByDay();
    }
  }, [datecheck]); // Chỉ gọi lại khi datecheck thay đổi

  useEffect(() => {
    if (monthcheck) {
      fetchRevenueByMonth(); // Gọi lại API để lấy dữ liệu chi tiết theo ngày
    }
  }, [monthcheck]); // Chỉ gọi lại khi datecheck thay đổi

  const fetchRevenueByDay = async () => {
    if (!datecheck) {
      alert("Vui lòng nhập ngày kiểm tra!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/revenuewithday`, {
        datecheck,
      });
      setRevenueDataDay(response.data);
    } catch (err) {
      setError("Có lỗi xảy ra khi lấy dữ liệu doanh thu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Hàm gọi API để lấy doanh thu theo tháng
  const fetchRevenueByMonth = async () => {
    if (!monthcheck) {
      alert("Vui lòng nhập tháng kiểm tra!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/revenuewithmonth`, {
        monthcheck,
      });
      setRevenueDataMonth(response.data);
    } catch (err) {
      setError("Có lỗi xảy ra khi lấy dữ liệu doanh thu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenueAllWithDay = async () => {
    if (!datecheck) {
      alert("Vui lòng nhập ngày kiểm tra!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/revenueallwithday`, {
        datecheck,
      });
      setRevenueallDataDay(response.data);
    } catch (err) {
      setError("Có lỗi xảy ra khi lấy dữ liệu doanh thu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Tính tổng thu nhập trung bình của tháng
  useEffect(() => {
    const calculateAverageEarnings = () => {
      if (revenueDataMonth.length > 0) {
        const totalEarnings = revenueDataMonth.reduce(
          (sum, item) => sum + parseFloat(item.totalFeeSum),
          0
        );
        setAverageEarnings(totalEarnings / revenueDataMonth.length);
      }
    };
    calculateAverageEarnings();
  }, [revenueDataMonth]);

  return (
    <div>
      <h5 className="card-title mb-4">Quản lý doanh thu</h5>

      <div className="row mb-4 ">
        <div className="col-md-5 mx-md-3">
          <label htmlFor="datecheck">Chọn ngày</label>
          <input
            id="datecheck"
            type="date"
            className="form-control"
            value={datecheck}
            onChange={(e) => setDatecheck(e.target.value)}
          />
        </div>
        <div className="col-md-5 mx-md-3">
          <label htmlFor="monthcheck">Chọn tháng</label>
          <input
            id="monthcheck"
            type="month"
            className="form-control"
            value={monthcheck}
            onChange={(e) => setMonthcheck(e.target.value)}
          />
        </div>
      </div>

      {/* Card doanh thu theo tháng */}
      <div className="row ">
        {/* Card doanh thu theo ngày */}
        <div className="col-md-5 mx-3">
          <div className="card p-3 dashboard-card card-earnings-monthly d-flex">
            <div>
              <h5 className="card-title-earnings-monthly">
                Doanh thu theo ngày
              </h5>
              <h4>
                {revenueDataDay.length > 0
                  ? parseFloat(revenueDataDay[0].totalFeeSum).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                      }
                    )
                  : "0"}{" "}
                VNĐ
              </h4>
            </div>
            <div>
              <i className="fas fa-calendar-day card-title-earnings-monthly"></i>
            </div>
          </div>
        </div>
        <div className="col-md-5 mx-3">
          <div className="card p-3 dashboard-card card-earnings-monthly d-flex">
            <div>
              <h5 className="card-title-earnings-monthly">
                Thu nhập trong một tháng
              </h5>
              <h4>
                {revenueDataMonth.length > 0
                  ? parseFloat(revenueDataMonth[0].totalFeeSum).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                      }
                    )
                  : "0"}{" "}
                VNĐ
              </h4>
            </div>
            <div>
              <i className="fas fa-calendar-alt card-title-earnings-monthly"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Table doanh thu chi tiết theo ngày */}
      <div className="table-responsive">
        <table className="table table-bordered center-text">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên đặt phòng</th>
              <th>Số điện thoại</th>
              <th>Ngày nhận phòng</th>
              <th>Ngày trả phòng</th>
              <th>Phòng</th>
              <th>Trạng thái đặt phòng</th>
              <th>Trạng thái thanh toán</th>
              <th>Phương thức thanh toán</th>
              <th>Tổng phí</th>
            </tr>
          </thead>
          <tbody>
            {revenueallDataDay.length > 0 ? (
              revenueallDataDay.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.bookingName}</td>
                  <td>{item.bookingPhone}</td>
                  <td>{item.checkInDate}</td>
                  <td>{item.checkOutDate}</td>
                  <td>{item.bookingRoomId}</td>
                  <td>
                    {(() => {
                      switch (item.bookingStatus) {
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
                  </td>
                  <td>
                    {item.paymentStatus
                      ? "thanh toán offline" // 1
                      : "thanh toán online"}
                  </td>
                  <td>
                    {item.paymentMethod === 1
                      ? " thanh toán trực tiếp" // 1
                      : "Chuyển khoản"}
                  </td>
                  <td>
                    {item.totalFee
                      ? `${parseFloat(item.totalFee).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })} VNĐ`
                      : "0 VNĐ"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">Không có dữ liệu cho ngày này.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Revenue;
