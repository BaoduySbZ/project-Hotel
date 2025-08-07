import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_BASE_API_URL;
const CheckOutMoMo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [check, setCheck] = useState(true);
  const [orderDetails, setOrderDetails] = useState();
  const bookingInfor = JSON.parse(localStorage.getItem("booking"));

  useEffect(() => {
    if (bookingInfor) {
      setOrderDetails(bookingInfor);
    }
  }, []);

  useEffect(() => {
    if (orderDetails && check) {
      handleOrder();
    }
  }, [orderDetails, check]);

  const handleOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3002/api/bookings/status`,
        {
          orderDetails, // Pass booking details to API
        }
      );

      localStorage.removeItem("booking");
      setCheck(false); // Ensure `handleOrder` runs only once

      if (response.data.EC === 200) {
        // await axios.post("http://localhost:3002/api/rooms/changeStatus", {
        //   id: orderDetails.bookingRoomId,
        //   status: 1,
        // });
        const responseScore = await axios.post(`${API_URL}/api/updatescore`, {
          id: orderDetails.userIdBooking,
          score: orderDetails.score,
        });
        alert("You have successfully booked a room");

        navigate("/hotel-detail", {
          state: {
            hotel: orderDetails.hotel,
            updatedRoom: orderDetails.updatedRoom,
            roomid: orderDetails.bookingRoomId,
          },
        });
      } else {
        console.error("Booking error:", response.data);
      }
    } catch (error) {
      console.error("Error when booking:", error);
    }
  };

  return null;
};

export default CheckOutMoMo;
