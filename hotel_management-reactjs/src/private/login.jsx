import React, { useState, useEffect } from "react";
import { login } from "../service/accountService"; // Assuming the login function is in api-service.js
import { Link, useNavigate } from "react-router-dom";
import Header from "../share-view/header";
import Footer from "../share-view/footer";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin
import jwt_decode from "jwt-decode";

const Login = () => {
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize navigate for redirection
  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Call login API
      const data = await login(email, password);

      // Assuming the token is returned in data.token
      if (data.token) {
        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);

        // Redirect to the admin page after successful login
        navigate("/admin");
      } else {
        setError("Failed to log in. Please try again.");
      }
    } catch (err) {
      console.error(
        "Login failed:",
        err.response ? err.response.data : err.message
      );
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      // Giải mã token từ Google
      const decoded = jwt_decode(response.credential);
      console.log("Google User Info:", decoded);
      console.log("Check decoded email:", decoded.email);

      // Call login API
      const autoLogin = "1412"
      const data = await login(decoded.email, autoLogin);
      // Assuming the token is returned in data.token
      if (data.token) {
        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);

        // Redirect to the admin page after successful login
        navigate("/admin");
      } else {
        setError("Failed to log in. Please try again.");
      }

      // Điều hướng đến trang admin
      navigate("/admin");
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Đăng nhập Google thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <Header />
      <section className="section-defaut section-login">
        <div className="container container-login">
          <div className="row">
            <div className="col-lg-6 col-md-12 welcome-section-login d-none d-md-block">
              <div className="image-login">
                <img
                  src="https://go2joy.vn/_nuxt/wellcome.9770d0e7.png"
                  alt="Welcome to Hotel"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 login-section-login">
              <h2 style={{ fontWeight: "bold" }}>Đăng nhập</h2>
              <form onSubmit={handleLogin}>
                <div className="input-group-login mb-3">
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email đăng nhập"
                    style={{ borderRadius: "8px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="form-control"
                    style={{ borderRadius: "8px" }}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-warning btn-block w-100 submit-btn-login"
                >
                  Tiếp tục
                </button>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}

              <div className="alternative-login text-center ">
                <div className="login-options-login d-flex justify-content-center flex-wrap">
                  <div className="social-login mt-4">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                      <span className="divider">
                        <hr />
                      </span>
                      <div className="d-flex align-items-center my-3">
                        <hr className="flex-grow-1 me-2" />
                        <span>Hoặc đăng nhập bằng</span>
                        <hr className="flex-grow-1 ms-2" />
                      </div>
                      <span className="divider">
                        <hr />
                      </span>
                    </div>
                    <div className="d-flex justify-content-between ms-3">
                      {/* <button className="btn btn-outline-primary flex-grow-1 mx-1">
                        <i className="fab fa-facebook-f"></i> Facebook
                      </button> */}

                      {/* Sử dụng render prop để tùy chỉnh nút Google */}
                      <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={() => setError("Đăng nhập Google thất bại.")}
                        render={(renderProps) => (
                          <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="btn btn-outline-danger flex-grow-1 mx-1"
                          >
                            <i className="fab fa-google"></i> Google
                          </button>
                        )}
                      />

                      {/* <button className="btn btn-outline-dark flex-grow-1 mx-1">
                        <i className="fab fa-apple"></i> Apple
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center mt-4 register-link-login">
                Bạn chưa có tài khoản Go2Joy?
                <Link to="/register">Đăng ký</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
