import React, { useState, useEffect } from "react";
import Header from "../share-view/header";
import Footer from "../share-view/footer";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { getAccountById, updateAccount } from "../service/accountService";

const API_URL = import.meta.env.VITE_BASE_API_URL;

const Booking = () => {
  const location = useLocation();
  const room = location.state?.room;
  const hotel = location.state?.hotel;
  const token = localStorage.getItem("authToken");
  // Tính tổng giá dịch vụ
  const totalServicePrice = room.services.reduce((acc, service) => acc + service.service_price, 0);
  const navigate = useNavigate();

  const [decoded, setDecoded] = useState(null);
  const [account, setAccount] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    departureDate: "",
    Numberofnights: "",
    info: "",
    paymentMethod: "",
    totalScore: 0,
  });

  useEffect(() => {
    if (token) {
      try {
        console.log("room: ", room);
        const decodedToken = jwtDecode(token);

        setDecoded(decodedToken);

        if (decodedToken) {
          fetchDataUser(decodedToken.id);
        }
      } catch (error) {
        console.error("Token không hợp lệ", error);
      }
    }
  }, [token]);

  const fetchDataUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/accounts/${userId}`);
      setAccount(response.data);
      console.log("check response", response);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng", error);
    }
  };



  const createBooking = async (updatedRoom) => {
    try {
      const {
        name,
        contact,
        departureDate,
        Numberofnights,
        paymentMethod,
        totalScore,
      } = formData;

      const checkOutDate = dayjs(departureDate)
        .add(Numberofnights, "day")
        .format("YYYY-MM-DD");

      const totalFee = calculateTotalPrice();
      const finalFee = totalFee < 0 ? 1000 : totalFee;

      const booking = {
        bookingName: name,
        userIdBooking: decoded.id,
        bookingPhone: contact,
        checkInDate: departureDate,
        checkOutDate,
        bookingRoomId: room.id,
        bookingStatus: paymentMethod === "direct" ? 0 : 1,
        paymentStatus: paymentMethod === "direct" ? 1 : 0,
        paymentMethod: paymentMethod === "direct" ? 1 : 0,
        surcharge: 0,
        totalFee: finalFee,
        score:
          account.score -
          totalScore +
          Math.max((room.price * Numberofnights - totalScore) * 0.1, 1000),
      };
      const response = await axios.post(
        `http://localhost:3002/api/bookings/status`,
        { orderDetails: booking }
      );
      console.log("Đặt phòng thành công", response);
      if (response.data.EC === 200) {
        const responseScore = await axios.post(`${API_URL}/api/updatescore`, {
          id: decoded.id,
          score: booking.score,
        });

        alert("bạn đã đặt phòng thành công");
        navigate("/hotel-detail", {
          state: { hotel: hotel, updatedRoom: updatedRoom, roomid: room.id },
        }); // Điều hướng về trang chính khi thành công
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn đặt phòng", error);
      alert("Đặt phòng không thành công. Vui lòng thử lại.");
      navigate("/");
    }
  };

  const generateUniqueOrderId = (length, userId) => {
    const now = new Date();
    const dateTimeString =
      String(now.getFullYear()).slice(-2) +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");

    const uniqueOrderId = `${dateTimeString}${userId}`;
    return uniqueOrderId.length > length
      ? uniqueOrderId.slice(0, length)
      : uniqueOrderId;
  };

  const handlesubmitbooking = async () => {
    try {
      const updatedRoom = { ...room, statusRooms: "1" };
      const { paymentMethod } = formData;
      console.log("decoded: ", decoded);
      console.log("formData: ", formData);
      console.log("updatedRoom: ", updatedRoom);

      if (paymentMethod === "direct") {
        createBooking(updatedRoom);
      } else if (paymentMethod === "bankTransfer") {
        const orderId = generateUniqueOrderId(15, decoded.id);

        const { name, contact, departureDate, Numberofnights, totalScore } =
          formData;
        const checkOutDate = dayjs(departureDate)
          .add(Numberofnights, "day")
          .format("YYYY-MM-DD");

        const totalFee = calculateTotalPrice();
        const finalFee = totalFee < 0 ? 1000 : totalFee;

        const booking = {
          bookingName: name,
          userIdBooking: decoded.id,
          bookingPhone: contact,
          checkInDate: departureDate,
          checkOutDate,
          bookingRoomId: room.id,
          bookingStatus: 1,
          paymentStatus: 0,
          paymentMethod: 0,
          surcharge: 0,
          totalFee: finalFee,
          email: decoded.email,
          hotel: hotel,
          updatedRoom: updatedRoom,
          score:
            account.score -
            totalScore +
            Math.max((room.price * Numberofnights - totalScore) * 0.1, 1000),
        };
        console.log("booking: ", booking)
        localStorage.setItem("booking", JSON.stringify(booking));

        if (orderId) {
          const response = await axios.post(
            "http://emailserivce.somee.com/api/Momo/CreatePaymentUrl",
            {
              fullName: decoded.email,
              options: "mutil",
              orderId: orderId,
              orderInfo: `${room.name
                } tổng ngày đặt ${Numberofnights} tổng tiền ${room.price * Numberofnights
                }`,
              returnUrl: "http://localhost:5173/checkout",
              amount: finalFee,
            }
          );

          const getAccount = await getAccountById(decoded.id);
          console.log("getAccount: ", getAccount);
          updateAccount(decoded.id, getAccount)
          const paymentUrl = response.data.url;
          window.location.href = paymentUrl;
        }
      }
    } catch (error) {
      console.log("Lỗi khi xử lý đặt phòng:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "departureDate") {
      // Kiểm tra nếu `value` có độ dài đúng (định dạng YYYY-MM-DD)
      // Kiểm tra nếu giá trị đã đầy đủ
      if (value && value.length === 10) {
        const today = new Date();
        const selectedDate = new Date(value);

        // Ngày hiện tại
        const todayISO = today.toISOString().split("T")[0];

        // Tính ngày tối đa (giới hạn đặt phòng trong 1 năm)
        const maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() + 1);
        const maxDateISO = maxDate.toISOString().split("T")[0];

        // Kiểm tra ngày nhỏ hơn hôm nay
        if (value < todayISO) {
          alert("Ngày đặt phòng không được nhỏ hơn ngày hôm nay.");
          return;
        }

        // Kiểm tra ngày vượt quá giới hạn 1 năm
        if (value > maxDateISO) {
          // alert("Bạn không thể đặt phòng trước quá xa (tối đa 1 năm).");
          alert("Thời gian đặt quá xa, khách sạn chúng tôi có khi đã phá sản trước khi bạn đến, Không cho =)");
          return;
        }
      }
    }

    // Xử lý giá trị nhập vào cho trường "persons" (totalScore)
    if (id === "persons") {
      const numericValue = Number(value);

      // Kiểm tra xem giá trị có phải là một số hợp lệ
      if (!isNaN(numericValue)) {
        // Nếu giá trị lớn hơn số điểm hiện tại, giới hạn nó lại bằng account?.score
        const clampedValue = Math.min(numericValue, account?.score);

        // Kiểm tra nếu giá trị hợp lệ và trong phạm vi từ 0 đến account?.score
        if (clampedValue >= 0) {
          setFormData({ ...formData, totalScore: clampedValue });
        }
      } else if (value === "") {
        // Nếu trường bị xóa (giá trị rỗng), đặt lại về 0
        setFormData({ ...formData, totalScore: 0 });
      }
    } else {
      // Cập nhật các trường khác
      setFormData({ ...formData, [id]: value });
    }
  };

  const calculateTotalPrice = () => {
    let { totalScore } = formData;
    const nights = formData.Numberofnights || 0;
    const total = (room.price + totalServicePrice) * nights - totalScore;
    if (total < 0) {
      return 1000;
    }
    return total;
  };

  return (
    <>
      <Header />
      <section >
        <div className="container">
          <div className="hotel-header-detail mt-4">
            <div>
              <h1 className="text-hotel-color">
                {room.hotelName} - {room.name}
              </h1>
              <p className="address-detail">{room.location}</p>
            </div>
            <div className="rating-detail">
              {/* <span className="star-detail">⭐ 4.6/5</span> */}
              <h1 className="text-hotel-color">⭐ 4.6/5</h1>
              <span className="review-count-detail">(383 Đánh giá)</span>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-lg-8 col-md-12">
              <div className="room-detail-container p-4 rounded shadow">
                <img
                  className="main-detail-img img-fluid rounded-5 mb-4"
                  src={`${API_URL}/room_images/${room.image}`}
                  alt={room.name}
                />

                <div className="room-info">
                  <h3 className="text-center text-dark mb-3">{room.name}</h3>
                  <p className="price text-dark">
                    <strong>Giá phòng:</strong> <span className="text-danger">{room.price.toLocaleString()}₫</span>
                  </p>
                  <p className="price text-dark">
                    <strong>Giá dịch vụ:</strong>{" "}
                    <span className="text-danger">
                      {room.services
                        .map((service) => service.service_price)
                        .reduce((acc, curr) => acc + curr, 0)
                        .toLocaleString()}₫
                    </span>
                  </p>
                  <p className="price text-dark">
                    <strong>Tổng giá:</strong>{" "}
                    <span className="text-danger">
                      {(room.price +
                        room.services.map((service) => service.service_price).reduce((acc, curr) => acc + curr, 0)).toLocaleString()}₫
                    </span>
                  </p>

                  <div className="amenities mt-4">
                    <h4 className="text-dark">Tiện ích</h4>
                    <ul className="list-group list-group-flush">
                      {room.services.map((service) => (
                        <li className="list-group-item" key={service.id}>
                          {service.name} - <span className="text-danger">{service.service_price.toLocaleString()}₫</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="promotions mt-4">
                    <h4 className="text-dark">Khuyến mãi</h4>
                    <ul className="list-group list-group-flush">
                      {room.promotions.map((promo) => (
                        <li className="list-group-item" key={promo.id}>
                          {promo.name} - Giảm <span className="text-danger">{promo.discount}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="description mt-4">
                    <h4 className="text-dark">Giới thiệu</h4>
                    <p className="text-secondary">{room.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="form-booking p-4 shadow rounded">
                <h2 className="text-center mb-4">Đặt ngay hôm nay</h2>
                <form>
                  {["name", "email", "contact"].map((field) => (
                    <div className="form-group mb-3" key={field}>
                      <label htmlFor={field} className="form-label">
                        {field === "contact" ? "Số điện thoại" : field === "email" ? "Email" : "Họ và tên"}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        id={field}
                        className="form-control"
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={field === "contact" ? "Nhập số điện thoại" : field === "email" ? "Nhập email" : "Nhập họ và tên"}
                        required={field !== "contact"}
                      />
                    </div>
                  ))}

                  <div className="form-group mb-3">
                    <label htmlFor="departureDate" className="form-label">Ngày đặt phòng</label>
                    <input
                      type="date"
                      id="departureDate"
                      className="form-control"
                      value={formData.departureDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]} // Giới hạn ngày nhỏ nhất
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="Numberofnights" className="form-label">Số ngày ở</label>
                    <input
                      type="number"
                      id="Numberofnights"
                      className="form-control"
                      value={formData.Numberofnights}
                      onChange={handleChange}
                      required
                      min="1"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="persons" className="form-label">
                      Số điểm thưởng muốn sử dụng (Hiện tại: {account?.score || 0})
                    </label>
                    <input
                      type="number"
                      id="persons"
                      className="form-control"
                      value={formData.totalScore}
                      onChange={handleChange}
                      min="0"
                      max={account?.score}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="info" className="form-label">Thông tin thêm</label>
                    <textarea
                      id="info"
                      rows="3"
                      className="form-control"
                      value={formData.info}
                      onChange={handleChange}
                      placeholder="Nhập các yêu cầu đặc biệt (Hotel/Diet/Other)"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="paymentMethod" className="form-label">Phương thức thanh toán</label>
                    <select
                      id="paymentMethod"
                      className="form-select"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>-- Chọn phương thức --</option>
                      <option value="direct">Thanh toán trực tiếp</option>
                      <option value="bankTransfer">Chuyển khoản</option>
                    </select>
                  </div>
                  <div className="form-group mb-4">
                    <h5 className="form-label">Tổng tiền hiện tại: {calculateTotalPrice()} VNĐ</h5>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handlesubmitbooking}
                  >
                    Đặt ngay
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Booking;
