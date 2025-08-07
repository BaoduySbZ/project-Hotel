import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Logo from "../assets/logo.jpg";
const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [avatarAdmin, setAvatarAdmin] = useState(
    "../../public/assets/img/adminLogo.jpg"
  );
  const [avatar, setAvatar] = useState("../../public/assets/img/userLogo.png"); // Đặt đường dẫn avatar cố định

  useEffect(() => {
    const token = localStorage.getItem("authToken");
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
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Go2Joy Logo" width="120" />
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <ul className="navbar-nav ms-auto">
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
                    ) : (
                      ""
                    )}
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
