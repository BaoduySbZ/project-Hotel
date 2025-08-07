//newsComponent.jsx
import React, { useState, useEffect } from "react";
import {
    getNews,
    createNews,
    updateNews,
    deleteNews,
} from "../service/serviceNews"; // Import các hàm dịch vụ cho news
import NewsModal from "../modal-view/news-modal"; // Import modal cho news

const NewsComponent = () => {
    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("asc");
    const newsPerPage = 5; // Số bản tin trên mỗi trang

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const data = await getNews();
            setNews(data);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    const handleCreate = () => {
        setSelectedNews(null);
        setOpenModal(true);
    };

    const handleEdit = (newsItem) => {
        setSelectedNews(newsItem);
        setOpenModal(true);
    };

    const handleSort = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc"; // Đổi thứ tự sắp xếp
        setSortOrder(newSortOrder);

        const sortedNews = [...news].sort((a, b) => {
            return newSortOrder === "asc"
                ? a.title.localeCompare(b.title) // Sắp xếp theo tiêu đề
                : b.title.localeCompare(a.title);
        });
        setNews(sortedNews);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa bản tin này?")) {
            try {
                await deleteNews(id);
                fetchNews(); // Làm mới danh sách
            } catch (error) {
                console.error("Error deleting news:", error);
            }
        }
    };

    const handleSave = async (newsItem) => {
        try {
            if (selectedNews) {
                await updateNews(selectedNews.id, newsItem); // Cập nhật bản tin hiện có
            } else {
                await createNews(newsItem); // Tạo bản tin mới
            }
            setOpenModal(false);
            fetchNews(); // Làm mới danh sách
        } catch (error) {
            console.error("Error saving news:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Đặt lại về trang 1 khi tìm kiếm
    };

    // Logic phân trang
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news
        .filter((newsItem) =>
            newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm theo tiêu đề
        )
        .slice(indexOfFirstNews, indexOfLastNews);

    const totalPages = Math.ceil(news.length / newsPerPage);

    return (
        <div>
            <h5 className="card-title mb-4">Quản lý bản tin</h5>
            <div className="mb-3">
                <div className="col-12 d-flex justify-content-between align-items-center mt-3">
                    <input
                        type="text"
                        className="col-3 form-control admin-input"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={handleSearch} // Tìm kiếm theo sự thay đổi trong input
                    />
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
                            Tiêu đề
                            {sortOrder === "asc" ? (
                                <i className="fas fa-sort-alpha-down ml-2"></i> // Biểu tượng sắp xếp tăng
                            ) : (
                                <i className="fas fa-sort-alpha-up ml-2"></i> // Biểu tượng sắp xếp giảm
                            )}
                        </th>
                        <th>Chủ đề</th>
                        <th>Nội dung</th>
                        <th>Hình ảnh</th> {/* Thêm cột cho hình ảnh */}
                        {/* <th className="col-2">Hành động</th> */}
                    </tr>
                </thead>
                <tbody>
                    {currentNews.map((newsItem) => (
                        <tr key={newsItem.id}>
                            <td>{newsItem.id}</td>
                            <td>{newsItem.title}</td>
                            <td>{newsItem.topic}</td>
                            <td>{newsItem.description}</td>
                            <td>
                                <img
                                    src={newsItem.newsImage}
                                    alt={newsItem.title}
                                    style={{ width: '100px', height: 'auto' }} // Thay đổi kích thước ảnh
                                />
                            </td>
                            <td>
                                <div className="d-flex">
                                    <button className="btn btn-primary admin-btn" onClick={() => handleEdit(newsItem)}>
                                        <i class="fa-solid fa-wrench"></i>{/* Sửa */}
                                    </button>
                                    <button className="btn btn-danger admin-btn" onClick={() => handleDelete(newsItem.id)}>
                                        <i class="fa-solid fa-trash-can"></i>{/* Xóa */}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Phân trang */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end admin-pagination">
                    <li className="page-item" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        <a className="page-link" href="#">
                            Previous
                        </a>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                            <a className="page-link" onClick={() => setCurrentPage(index + 1)} href="#">
                                {index + 1}
                            </a>
                        </li>
                    ))}
                    <li className="page-item" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        <a className="page-link" href="#">
                            Next
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Modal component */}
            <NewsModal
                news={selectedNews}
                open={openModal}
                onSave={handleSave}
                onClose={() => setOpenModal(false)}
            />
        </div>
    );
};

export default NewsComponent;