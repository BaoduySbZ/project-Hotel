import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createAccount } from "../service/accountService";
import Header from "../share-view/header";
import Footer from "../share-view/footer";

const Register = () => {
  const [formRegister, setFormRegister] = useState({
    userName: "",
    email: "",
    password: "",
    role: 2,
    score: 0,
    phoneNumber: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await createAccount(formRegister);
      console.log("Account created:", data);
      navigate("/login");
    } catch (err) {
      console.error(
        "Registration failed:",
        err.response ? err.response.data : err.message
      );
      setError("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
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

            <div className="col-lg-6 col-md-12 login-section-login my-auto">
              <h2 style={{ fontWeight: "bold" }}>Đăng ký</h2>
              <form onSubmit={handleRegister}>
                <div className="input-group-login mb-3">
                  <input
                    type="text"
                    name="userName"
                    className="form-control mb-2"
                    style={{ borderRadius: "8px" }}
                    placeholder="Tên tài khoản"
                    value={formRegister.userName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    className="form-control mb-2"
                    style={{ borderRadius: "8px" }}
                    placeholder="Email"
                    value={formRegister.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    className="form-control mb-2"
                    style={{ borderRadius: "8px" }}
                    placeholder="Mật khẩu"
                    value={formRegister.password}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control mb-2"
                    style={{ borderRadius: "8px" }}
                    placeholder="Số điện thoại"
                    value={formRegister.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <p className=" mb-2">
                  Đăng ký thành viên ngay để trải nghiệm dịch vụ đặt phòng dễ
                  dàng cùng nhiều ưu đãi hấp dẫn!
                </p>
                <button
                  type="submit"
                  className="btn btn-warning btn-block w-100 submit-btn-login"
                >
                  Đăng ký
                </button>
                <p className=" mt-3">
                  Bằng việc nhấn nút tiếp tục, bạn đã đồng ý với{" "}
                  <Link
                    to="/terms"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link
                    to="/privacy-policy"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Chính sách bảo mật
                  </Link>{" "}
                  của chúng tôi.
                </p>
              </form>

              {error && <p className="text-danger mt-3">{error}</p>}

              <p className="text-center mt-4 register-link-login">
                Bạn đã có tài khoản?
                <Link to="/login">Đăng nhập</Link>
              </p>

              {/* Social media login section */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
