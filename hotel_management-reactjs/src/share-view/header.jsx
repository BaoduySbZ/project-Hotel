import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Logo from "../assets/logo.jpg";
import { searchHotel, getHotelsDropdow } from "../service/hotelService";
const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(null);
    const [role, setRole] = useState(null);
    const [avatarAdmin, setAvatarAdmin] = useState(
        "../../public/assets/img/adminLogo.jpg"
    );
    const [avatar, setAvatar] = useState("../../public/assets/img/userLogo.png"); // Đặt đường dẫn avatar cố định
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [dropdownData, setDropdownData] = useState([]);

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        console.log("value:", value, "<:")
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

    const handleDropdow = async (e) => {
        setSearchTerm(" ");
        try {
            const results = await getHotelsDropdow();
            console.log("Data: ", results)
            setDropdownData(results);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        }
    };

    const handleClickDropdow = (dropdown) => {
        navigate(`/hotel/search?query=${encodeURIComponent(dropdown.location)}`);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.location);
        setSuggestions([]);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/hotel/search?query=${encodeURIComponent(searchTerm)}`);
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        handleDropdow()
        if (token) {
            setIsLoggedIn(true);
            try {
                const decoded = jwt_decode(token);

                console.log("decoded: ", decoded);

                setUserName(decoded.userName);
                setRole(decoded.role);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setUserName(null);
        navigate("/login");
    };

    return (
        <header className="bg-gradient">
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="header-bar d-flex justify-content-around align-items-center">
                    {/* Logo và menu */}
                    <div className="d-flex align-items-center" style={{ gap: "20px" }}>
                        <Link className="navbar-brand" to="/">
                            <img src={Logo} alt="Go2Joy Logo" width="120" />
                        </Link>
                        <div>
                            <i className="fa-solid fa-gift"></i> Ưu đãi
                        </div>
                        <div className="dropdown">
                            <div
                                className="dropdown-toggle"
                                id="hotelDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ cursor: "pointer" }}
                            >
                                Danh mục khách sạn
                            </div>
                            <ul className="dropdown-menu" aria-labelledby="hotelDropdown">
                                {dropdownData.map((hotel, index) => (
                                    <li key={index}>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleClickDropdow(hotel)}
                                        >
                                            {hotel.location}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Thanh tìm kiếm */}
                    <div className="header-search d-flex align-items-center justify-content-between" style={{ position: "relative" }}>
                        {/* Input tìm kiếm */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Hồ Chí Minh"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{
                                border: "none",
                                maxWidth: "80%",
                                boxShadow: "none",
                                borderRadius: "30px",
                                flex: "1", // Input chiếm không gian còn lại
                            }}
                        />
                        {/* Gợi ý tìm kiếm */}
                        {suggestions.length > 0 && (
                            <ul
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: "0",
                                    backgroundColor: "white",
                                    border: "1px solid lightgray",
                                    borderRadius: "5px",
                                    zIndex: "10",
                                    width: "80%",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                }}
                            >
                                {suggestions.map((hotel, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(hotel)}
                                        style={{
                                            padding: "10px",
                                            cursor: "pointer",
                                            borderBottom: "1px solid #f0f0f0",
                                        }}
                                    >
                                        <strong>{hotel.name}</strong>
                                        <br />
                                        <small>Địa chỉ: {hotel.location}</small>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* Nút tìm kiếm */}
                        <button
                            className="btn btn-warning rounded-circle"
                            onClick={handleSearchSubmit}
                            style={{ marginLeft: "10px" }} // Khoảng cách với input
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>

                    {/* Tải ứng dụng và tài khoản */}
                    <div className="d-flex align-items-center" style={{ gap: "20px" }}>
                        <div><i class="fa-solid fa-download"></i> Tải ứng dụng</div>
                        <div><i class="fa-solid fa-flag"></i> Tiếng Việt</div>
                        <ul className="navbar-nav ms-auto d-flex align-items-center">
                            {!isLoggedIn ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Đăng nhập
                                    </Link>
                                </li>
                            ) : (
                                <li className="nav-item dropdown">
                                    <button
                                        className="nav-link dropdown-toggle btn btn-link"
                                        id="userDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src={role === 0 || role === 1 ? avatarAdmin : avatar}
                                            alt="Avatar"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                borderRadius: "50%",
                                                marginRight: "8px",
                                            }}
                                        />
                                        {userName ? userName : "Lỗi không lấy được userName"}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="userDropdown">
                                        {role === 0 || role === 1 ? (
                                            <li>
                                                <Link to="/admin" className="dropdown-item">
                                                    Trang Admin
                                                </Link>
                                            </li>
                                        ) : null}
                                        <li>
                                            <Link to="/Profile" className="dropdown-item">
                                                Thông tin tài khoản
                                            </Link>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>
                                                Đăng Xuất
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;