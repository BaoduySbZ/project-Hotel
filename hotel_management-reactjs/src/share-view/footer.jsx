import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="footer-section py-5 bg-light">
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Hỗ trợ</h5>
            <ul className="list-unstyled">
              <li>
                <strong>Hotline:</strong> 1900 638 838
              </li>
              <li>
                Liên hệ hỗ trợ:{" "}
                <a href="mailto:support@go2joy.vn">support@go2joy.vn</a>
              </li>
              <li>
                <Link to="/dispute-resolution">
                  Cơ chế giải quyết tranh chấp, khiếu nại
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Giới thiệu</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about">Về chúng tôi</Link>
              </li>
              <li>
                <Link to="/terms">Quy chế hoạt động website</Link>
              </li>
              <li>
                <Link to="/careers">Cơ hội nghề nghiệp</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Tải ứng dụng</h5>
            <div className="d-flex">
              <div className="ms-3">
                <i class="fa-solid fa-qrcode"></i> <span>Qr code</span>
                <i
                  class="fa-brands fa-app-store-ios "
                  style={{ marginLeft: "10px" }}
                ></i>{" "}
                <span>App store</span>
                <i
                  class="fa-brands fa-google-play"
                  style={{ marginLeft: "10px" }}
                ></i>
                <span>Google play</span>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <p>Copyright © 2023 GO2JOY Vietnam, Jsc. - Điều khoản - Bảo mật</p>
          <div className="social-links">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
