import React, { useState, useEffect } from "react";
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../service/promotionsService"; // Import các hàm dịch vụ cho khuyến mãi
import PromotionModal from "../modal-view/promotion-modal"; // Import modal cho khuyến mãi

const Promotions = () => {
  const [promotions, setPromotions] = useState([]); // Danh sách khuyến mãi
  const [selectedPromotion, setSelectedPromotion] = useState(null); // Khuyến mãi được chọn cho sửa
  const [openModal, setOpenModal] = useState(false); // Trạng thái modal
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [sortOrder, setSortOrder] = useState("asc"); // Thứ tự sắp xếp
  const promotionsPerPage = 5; // Số khuyến mãi mỗi trang

  // Lấy khuyến mãi khi component được mount
  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const data = await getPromotions();
      setPromotions(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khuyến mãi:", error);
    }
  };

  // Mở modal để tạo khuyến mãi mới
  const handleCreate = () => {
    setSelectedPromotion(null);
    setOpenModal(true);
  };

  // Mở modal để sửa khuyến mãi
  const handleEdit = (promotion) => {
    setSelectedPromotion(promotion);
    setOpenModal(true);
  };

  // Xử lý sắp xếp khuyến mãi
  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"; // Đảo ngược thứ tự
    setSortOrder(newSortOrder);

    const sortedPromotions = [...promotions].sort((a, b) => {
      return newSortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setPromotions(sortedPromotions);
  };

  // Xóa khuyến mãi
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khuyến mãi này?")) {
      try {
        await deletePromotion(id);
        fetchPromotions(); // Refresh danh sách
      } catch (error) {
        console.error("Lỗi khi xóa khuyến mãi:", error);
      }
    }
  };

  // Lưu khuyến mãi
  const handleSave = async (promotion) => {
    // Chuyển đổi định dạng ngày tháng
    const formattedPromotion = {
      ...promotion,
      startDate: new Date(promotion.startDate).toISOString().slice(0, 19).replace('T', ' '),
      endDate: new Date(promotion.endDate).toISOString().slice(0, 19).replace('T', ' '),
    };

    try {
      if (selectedPromotion) {
        await updatePromotion(selectedPromotion.id, formattedPromotion); // Cập nhật khuyến mãi
      } else {
        await createPromotion(formattedPromotion); // Tạo mới khuyến mãi
      }

      setSelectedPromotion(null);
      setOpenModal(false);
      fetchPromotions(); // Refresh danh sách
    } catch (error) {
      console.error("Error saving promotion:", error);
    }
  };

  // Tìm kiếm khuyến mãi
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  // Logic phân trang
  const indexOfLastPromotion = currentPage * promotionsPerPage;
  const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
  const currentPromotions = promotions
    .filter((promotion) =>
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstPromotion, indexOfLastPromotion);

  const totalPages = Math.ceil(promotions.length / promotionsPerPage);

  return (
    <div>
      <h5 className="card-title mb-4">Quản lý khuyến mãi</h5>
      <div className="mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center mt-3">
          <div style={{ width: "350px" }} className="col-3 input-group admin-input-group">
            <input
              type="text"
              className="col-3 form-control admin-input"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleSearch} // Tìm kiếm khi thay đổi
            />
          </div>
          <button className="btn btn-success admin-btn" onClick={handleCreate}>
            {/* Thêm */}<i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <table className="table table-bordered center-text">
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Tên khuyến mãi
              {sortOrder === "asc" ? (
                <i className="fas fa-sort-alpha-down ml-2"></i> // Icon sắp xếp tăng dần
              ) : (
                <i className="fas fa-sort-alpha-up ml-2"></i> // Icon sắp xếp giảm dần
              )}
            </th>
            <th>Mô tả</th>
            <th>Giảm giá</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            {/* <th className="col-2">Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {currentPromotions.map((promotion) => (
            <tr key={promotion.id}>
              <td>{promotion.id}</td>
              <td>{promotion.name}</td>
              <td>{promotion.description}</td>
              <td>{promotion.discount}%</td>
              <td>{new Date(promotion.startDate).toLocaleDateString()}</td>
              <td>{new Date(promotion.endDate).toLocaleDateString()}</td>
              <td>
                <div className="d-flex">
                  <button className="btn btn-primary admin-btn" onClick={() => handleEdit(promotion)}>
                    <i class="fa-solid fa-wrench"></i>{/* Sửa */}
                  </button>
                  <button className="btn btn-danger admin-btn" onClick={() => handleDelete(promotion.id)}>
                    <i class="fa-solid fa-trash-can"></i>{/* Xóa */}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end admin-pagination">
          <li
            className="page-item"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <a
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
                href="#"
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li
            className="page-item"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>

      {/* Modal component */}
      <PromotionModal
        promotion={selectedPromotion}
        open={openModal}
        onSave={handleSave}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Promotions;
