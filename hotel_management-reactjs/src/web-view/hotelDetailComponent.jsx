import React from "react";
import Header from "../share-view/header";
import Footer from "../share-view/footer";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from "../service/commentService";
import { useEffect, useState } from "react";
import { getHotelsFull } from "../service/hotelService";
import axios from "axios";
import jwtDecode from "jwt-decode";
const API_URL = import.meta.env.VITE_BASE_API_URL;

const HotelDetail = () => {
  const location = useLocation();
  const hotel = location.state?.hotel;
  const navigate = useNavigate();
  const updatedRoom = location.state?.updatedRoom;
  const roomid = location.state?.roomid;
  const token = localStorage.getItem("authToken");
  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = React.useState(1);
  const [decoded, setDecoded] = useState(null);
  const itemsPerPage = 3; // Số lượng phòng mỗi trang
  const [rooms, setRooms] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const [editingComment, setEditingComment] = useState(null); // State để lưu bình luận cần sửa
  const [avatar, setAvatar] = useState("../../public/assets/img/userLogo.png"); // Đặt đường dẫn avatar cố định
  const commentsPerPage = 4;
  useEffect(() => {
    console.log("check hotel", hotel);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        setDecoded(decodedToken);
        if (decoded.role === 0) {
          setAvatar("../../public/assets/img/adminLogo.jpg");
        } else {
          setAvatar("../../public/assets/img/userLogo.png");
        }
      } catch (error) {
        console.error("Token không hợp lệ", error);
      }
    }
  }, [token]);

  // useEffect(() => {

  // }, [decoded.role]);

  const [newComment, setNewComment] = useState({
    userName: "",
    roomId: hotel.rooms[0].id,
    hotelName: hotel.name,
    rating: 0,
    comment: "",
    is_removed: 0,
  });

  const roomsWithPromotions = hotel.rooms.filter(
    (room) => room.promotions.length > 0
  );

  useEffect(() => {
    // if (updatedRoom && roomid) {
    //   setRooms((prevRooms) =>
    //     prevRooms.map((room) => {
    //       // Chỉ cập nhật statusRooms của phòng có id trùng với roomid
    //       if (room.id === roomid) {
    //         // Kiểm tra và cập nhật lại chỉ statusRooms của phòng đang được chọn
    //         return { ...room, statusRooms: updatedRoom.statusRooms };
    //       }
    //       return room; // Các phòng khác không thay đổi
    //     })
    //   );
    // }
    fecthHotelById();
  }, [updatedRoom, roomid]);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [comments]);

  useEffect(() => {
    if (decoded && decoded.userName) {
      setNewComment((prevComment) => ({
        ...prevComment,
        userName: decoded.userName,
      }));
    }
  }, [decoded]);

  const fetchComments = async () => {
    try {
      const data = await getComments();
      // console.log(data);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fecthHotelById = async () => {
    const responsive = await getHotelsFull();

    setRooms(responsive.find((x) => x.id == hotel.id).rooms);
  };
  // Tính toán số phòng cần hiển thị cho trang hiện tại
  const indexOfLastRoom = currentPage * itemsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - itemsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handleViewDetails = (roomData) => {
    const room = {
      ...roomData,
      hotelName: hotel.name,
      hotelLocation: hotel.location,
    };
    navigate("/booking", { state: { room: room, hotel: hotel } });
  };

  // Chuyển trang

  // Tính số trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Tính số trang cần hiển thị (giới hạn số trang trước và sau trang hiện tại)
  const pageNumbers = [];
  const pageRange = 2; // Số trang trước và sau trang hiện tại

  for (let i = 1; i <= Math.ceil(rooms.length / itemsPerPage); i++) {
    if (
      i <= pageRange ||
      i > Math.ceil(rooms.length / itemsPerPage) - pageRange ||
      (i >= currentPage - pageRange && i <= currentPage + pageRange)
    ) {
      pageNumbers.push(i);
    }
  }

  if (pageNumbers[0] > 1) {
    pageNumbers.unshift("..."); // Thêm "..." nếu có trang trước
  }

  if (
    pageNumbers[pageNumbers.length - 1] < Math.ceil(rooms.length / itemsPerPage)
  ) {
    pageNumbers.push("..."); // Thêm "..." nếu có trang sau
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(rooms.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(Math.ceil(rooms.length / itemsPerPage));
  };

  //comment
  const handleAddComment = async () => {
    try {
      const data = await createComment(newComment);
      setComments([...comments, data]);
      // console.log("newComment: ", newComment)
      setNewComment({ ...newComment, comment: "", rating: 0 }); // Reset form, giữ lại userName
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      setComments(comments.filter((cmt) => cmt.comment_id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleUpdateComment = async (id, updatedComment) => {
    try {
      console.log("checkking đaadasdad", decoded.userName);
      await updateComment(id, updatedComment);
      setNewComment({
        userName: decoded.userName,
        roomId: hotel.rooms[0].id,
        hotelName: hotel.name,
        rating: 0,
        comment: "",
        is_removed: 0,
      });
      fetchComments(); // Cập nhật lại danh sách bình luận sau khi sửa
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const indexOfLastComment = currentCommentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handleNextCommentPage = () => {
    if (currentCommentPage < Math.ceil(comments.length / commentsPerPage)) {
      setCurrentCommentPage(currentCommentPage + 1);
    }
  };

  const handlePrevCommentPage = () => {
    if (currentCommentPage > 1) {
      setCurrentCommentPage(currentCommentPage - 1);
    }
  };

  const handleFirstCommentPage = () => {
    setCurrentCommentPage(1);
  };

  const handleLastCommentPage = () => {
    setCurrentCommentPage(Math.ceil(comments.length / commentsPerPage));
  };

  return (
    <>
      <Header />
      <section>
        <div className="container">
          {/* Hotel Header */}
          <div className="hotel-header-detail mt-4">
            <div>
              <h1 className="text-hotel-color">{hotel?.name}</h1>
              <p className="address-detail">
                <i className="fa-solid fa-map"></i> {hotel?.location}
              </p>
            </div>

            <div className="rating-detail">
              <h2 className="hotel-header-favorite-text">
                <i className="fa-regular fa-heart"></i> Yêu thích
              </h2>
              <div className="hotel-header-details">
                <i className="fa-solid fa-star"></i>
                <span className="star-detail">{hotel?.rating}/5</span>
                <span className="review-count-detail">
                  ({hotel?.reviewScore} Đánh giá)
                </span>
              </div>
            </div>
          </div>

          {/* Hotel Image Gallery */}
          <div className="row mt-3">
            <div className="col-lg-12 col-md-12 d-flex justify-content-center">
              <img
                className="main-detail-img img-fluid"
                src={`${API_URL}/hotel_images/${hotel?.image}`}
                alt="Main Hotel Image"
              />
            </div>

            {/* <div className="col-lg-12 col-md-12 mt-4">
              <span className="idea w-100">Phòng Khuyến Mãi</span>
              <div className="row">
                {roomsWithPromotions.map((room) => {
                  const promotion = room.promotions[0]; // Assuming only one active promotion per room
                  const originalPrice = room.price;
                  const discount = parseFloat(promotion.discount);
                  const discountedPrice =
                    originalPrice - (originalPrice * discount) / 100;

                  return (
                    <div className="room-list-detail" key={room.id}>
                      <div className="room-item-detail">
                        <img
                          src={`${API_URL}/room_images/${room.image}`}
                          alt={room.name}
                          className="img-fluid"
                        />
                        <div className="room-details-detail">
                          <h5>{room.name}</h5>
                          <p>{room.description}</p>
                          <a href="#">Xem chi tiết phòng</a>
                        </div>
                        <div>
                          <p className="room-price-detail">
                            {discountedPrice.toLocaleString("vi-VN")}₫ <br />
                            <span className="original-price-detail">
                              {originalPrice.toLocaleString("vi-VN")}₫
                            </span>
                          </p>
                          <button className="btn btn-book-detail">
                            Đặt phòng
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div> */}

          </div>

          <div className="amenities">
            <div style={{ width: "100%" }}>
              <p>
                <strong>Giới thiệu :</strong>
              </p>
              <div className="amenities-text">{hotel?.description}</div>
            </div>
          </div>

          {/* Room List */}
          <h3 className="mt-4">Danh sách phòng</h3>
          <div className="room-list-detail">
            <div className="container">
              <div className="row">
                {currentRooms.map((room) => (
                  <div className="col-lg-12 col-md-12 mb-4" style={{ padding: "0px" }} key={room.id}>
                    <div className="hotel-item d-flex">
                      <img
                        src={`${API_URL}/room_images/${room.image}`}
                        alt={room.name}
                        className="img-fluid"
                        width="600"
                        style={{ height: "auto" }}
                      />

                      <div className="hotel-info">
                        <h2>Thông tin phòng</h2>
                        <h3>{room.name}</h3>
                        <p>{room.description}</p>

                        {/* <h5
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            if (parseInt(room.statusRooms) === 1) {
                              alert("Phòng này đã được đặt trước.");
                            } else {
                              handleViewDetails(room);
                            }
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.color = "#FFA07A"; // Màu cam nhạt khi hover
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = "inherit"; // Trở lại màu mặc định khi không hover
                          }}
                        >
                          Xem chi tiết phòng
                        </h5> */}
                      </div>
                      <div className="hotel-info">
                        <h2>Đặc điểm nổi bật</h2>
                        {room.services &&
                          room.services.length > 0 &&
                          room.services.map((service) => {
                            return <p key={service.id}>{service.name}</p>;
                          })}
                        {/* <h3>{room.name}</h3>
                        <p>{room.description}</p> */}
                      </div>
                      <div className="hotel-info">
                        <h2>Giá phòng</h2>
                        <p
                          className="price"
                          style={{
                            fontSize: "19px",
                            marginBottom: "20px",
                          }}
                        >
                          1 Giờ
                        </p>
                        <p
                          // className="price"
                          style={{
                            fontSize: "29px",
                            color: "black",
                            marginTop: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          {room.price.toLocaleString()}đ
                        </p>
                        <button
                          className="btn btn-book-detail"
                          onClick={() => {
                            if (parseInt(room.statusRooms) !== 0) {
                              alert("Phòng này đã được đặt trước.");
                            } else {
                              handleViewDetails(room);
                            }
                          }}
                        >
                          Đặt phòng
                        </button>
                        <p className="price">
                          {parseInt(room.statusRooms) === 0 ||
                            parseInt(room.statusRooms) === 2 ||
                            parseInt(room.statusRooms) === 4
                            ? "Phòng trống"
                            : parseInt(room.statusRooms) === 1
                              ? "Đã đặt trước"
                              : parseInt(room.statusRooms) === 3
                                ? "Đang sử dụng"
                                : "Không xác định"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  {/* Nút Trang 1 */}
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={handleFirstPage}
                      disabled={currentPage === 1}
                    >
                      Trang 1
                    </button>
                  </li>

                  {/* Nút Trang trước */}
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      Trang trước
                    </button>
                  </li>

                  {/* Số trang hiện tại */}
                  <li className="page-item disabled">
                    <span className="page-link">
                      Trang {currentPage} /{" "}
                      {Math.ceil(rooms.length / itemsPerPage)}
                    </span>
                  </li>

                  {/* Nút Trang sau */}
                  <li
                    className={`page-item ${currentPage === Math.ceil(rooms.length / itemsPerPage)
                      ? "disabled"
                      : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={handleNextPage}
                      disabled={
                        currentPage === Math.ceil(rooms.length / itemsPerPage)
                      }
                    >
                      Trang sau
                    </button>
                  </li>

                  {/* Nút Trang cuối */}
                  <li
                    className={`page-item ${currentPage === Math.ceil(rooms.length / itemsPerPage)
                      ? "disabled"
                      : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={handleLastPage}
                      disabled={
                        currentPage === Math.ceil(rooms.length / itemsPerPage)
                      }
                    >
                      Trang cuối
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="comment-section mt-5">
            <h1>Đánh giá</h1>
            <div
              className="d-flex align-items-baseline"
              style={{ gap: "10px" }} // Khoảng cách giữa các phần tử
            >
              {/* Ngôi sao màu vàng */}
              <i
                className="fa-solid fa-star"
                style={{
                  color: "gold",
                  fontSize: "1.5rem", // Kích thước ngôi sao lớn hơn
                }}
              ></i>

              {/* Điểm đánh giá lớn */}
              <span
                className="star-detail"
                style={{
                  fontWeight: "bold",
                  fontSize: "2.5rem", // Chữ to hơn
                }}
              >
                {hotel?.rating}
              </span>

              {/* /5 phần */}
              <span style={{ fontWeight: "bold", fontSize: "1.5rem", lineHeight: "2.5rem" }}>
                /5
              </span>

              {/* Số lượng đánh giá */}
              <span style={{ fontSize: "1.2rem", color: "black", lineHeight: "2.5rem" }}>
                ●
              </span>
              <span
                className="review-count-detail"
                style={{
                  fontSize: "1.5rem",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                {hotel?.reviewScore} Đánh giá
              </span>
            </div>

            {/* Hiển thị bình luận đã có */}
            <div className="existing-comments mt-3 row">
              {currentComments.map((cmt) => (
                <div className="comment col-md-6 " key={cmt.comment_id}>
                  <div className="comment-author row">
                    <div className=" d-flex col-6">
                      <img
                        src={
                          cmt.role === 0
                            ? "../../public/assets/img/adminLogo.jpg"
                            : "../../public/assets/img/userLogo.png"
                        }
                        alt="Avatar"
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          marginRight: "8px",
                        }}
                      />
                      <div className="row">
                        {" "}
                        <span style={{ color: "#A9A9A9" }}>
                          {new Date().toLocaleDateString()}
                        </span>
                        <span style={{ fontSize: "18px" }}>
                          <span style={{ fontWeight: "300" }}>Khách hàng:</span>{" "}
                          <strong> {cmt.account_userName}</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-6 row">
                      <span style={{ fontSize: "18px" }}>
                        <span style={{ fontWeight: "300" }}>Khách sạn: </span>
                        <span style={{ fontWeight: "590", fontSize: "22px" }}>
                          {cmt.hotel_name}
                        </span>
                      </span>
                      <div className="d-flex">
                        <span style={{ fontSize: "18px", fontWeight: "300" }}>
                          Đánh giá:
                        </span>

                        {Math.floor(cmt.comment_rating) > 0 ? (
                          [...Array(Math.floor(cmt.comment_rating))].map(
                            (_, index) => (
                              <i
                                className="fa fa-star star-orange"
                                key={index}
                                style={{ marginTop: "5px" }}
                              ></i>
                            )
                          )
                        ) : (
                          <span>Chưa có đánh giá</span>
                        )}
                      </div>
                    </div>

                    {/* <div className="comment-info"></div> */}
                  </div>
                  <div className="comment-text row">
                    <p className="col-md-6" style={{ fontSize: "17px" }}>
                      {cmt.comment_text}
                    </p>
                    {decoded && decoded.userName === cmt.account_userName && (
                      <div className="comment-actions col-md-2">
                        <i
                          className="fas fa-edit btn-edit"
                          onClick={() => {
                            // Khi chỉnh sửa, set dữ liệu vào form newComment
                            setNewComment({
                              userName: decoded.userName,
                              comment_id: cmt.comment_id,
                              comment: cmt.comment_text,
                              rating: cmt.comment_rating,
                              hotelName: hotel.name,
                              roomId: hotel.rooms[0].id,
                              is_removed: 0,
                            });
                          }}
                        ></i>
                        <i
                          className="fas fa-trash btn-delete"
                          onClick={() => handleDeleteComment(cmt.comment_id)}
                        ></i>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="add-comment mt-4">
              <label htmlFor="commentText">Nhập bình luận của bạn:</label>
              <textarea
                id="commentText"
                value={newComment.comment}
                onChange={(e) =>
                  setNewComment({ ...newComment, comment: e.target.value })
                }
                placeholder="Bình luận..."
                rows="4"
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
              />
              <label htmlFor="commentRating" className="mt-2">
                Đánh giá:
              </label>
              <div className="rating-stars" style={{ marginTop: "5px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fa-star ${star <= newComment.rating ? 'fas' : 'far'}`}
                    style={{
                      color: star <= newComment.rating ? "#FFD700" : "#D3D3D3",
                      fontSize: "24px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                    onClick={() => setNewComment({ ...newComment, rating: star })}
                  ></i>
                ))}
              </div>
              <button
                className="btn admin-btn mt-3"
                onClick={() => {
                  if (newComment.comment_id) {
                    handleUpdateComment(newComment.comment_id, newComment);
                  } else {
                    handleAddComment();
                  }
                }}
              >
                <strong>{newComment.comment_id ? "Cập nhật bình luận" : "Bình luận"}</strong>
              </button>
            </div>

            <nav aria-label="Comment page navigation">
              <ul className="pagination">
                <li
                  className={`page-item ${currentCommentPage === 1 ? "disabled" : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={handleFirstCommentPage}
                    disabled={currentCommentPage === 1}
                  >
                    Trang đầu
                  </button>
                </li>
                <li
                  className={`page-item ${currentCommentPage === 1 ? "disabled" : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={handlePrevCommentPage}
                    disabled={currentCommentPage === 1}
                  >
                    Trang trước
                  </button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">
                    Trang {currentCommentPage} /{" "}
                    {Math.ceil(comments.length / commentsPerPage)}
                  </span>
                </li>
                <li
                  className={`page-item ${currentCommentPage ===
                    Math.ceil(comments.length / commentsPerPage)
                    ? "disabled"
                    : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={handleNextCommentPage}
                    disabled={
                      currentCommentPage ===
                      Math.ceil(comments.length / commentsPerPage)
                    }
                  >
                    Trang sau
                  </button>
                </li>
                <li
                  className={`page-item ${currentCommentPage ===
                    Math.ceil(comments.length / commentsPerPage)
                    ? "disabled"
                    : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={handleLastCommentPage}
                    disabled={
                      currentCommentPage ===
                      Math.ceil(comments.length / commentsPerPage)
                    }
                  >
                    Trang cuối
                  </button>
                </li>
              </ul>
            </nav>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default HotelDetail;
