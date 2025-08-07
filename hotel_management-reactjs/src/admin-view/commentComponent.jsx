import React, { useState, useEffect } from "react";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../service/commentService"; // Import comment service functions
import CommentModal from "../modal-view/comment-modal"; // Import the modal for comments

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingSearchTerm, setRatingSearchTerm] = useState(""); // New state for rating search
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const commentsPerPage = 5; // Number of comments per page

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await getComments();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCreate = () => {
    setSelectedComment(null);
    setOpenModal(true);
  };

  const handleEdit = (comment) => {
    console.log("Edit comment", comment);
    setSelectedComment(comment);
    setOpenModal(true);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedComments = [...comments].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.comment.localeCompare(b.comment);
      } else {
        return b.comment.localeCompare(a.comment);
      }
    });
    setComments(sortedComments);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bình luận này?")) {
      try {
        await deleteComment(id);
        console.log("Comment deleted:", id); // Log deletion success
        setSelectedComment(null);
        fetchComments(); // Refresh the list
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleSave = async (comment) => {
    try {
      console.log("Saving comment:", comment); // Log comment being saved
      if (selectedComment) {
        await updateComment(selectedComment.comment_id, comment);
        console.log("Comment updated:", selectedComment.comment_id); // Log update success
      } else {
        await createComment(comment);
        console.log("Comment created"); // Log creation success
      }

      setSelectedComment(null);
      setOpenModal(false);
      fetchComments(); // Refresh the list
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  const handleRatingSearch = (e) => {
    setRatingSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  // Pagination logic
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;

  const filteredComments = comments
    .filter((comment) =>
      comment.comment_text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((comment) =>
      comment.comment_rating
        .toString()
        .includes(ratingSearchTerm.toLowerCase())
    );

  const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  console.log(currentComments);

  return (
    <div>
      <h5 className="card-title mb-4">Quản lý bình luận</h5>
      <div className="mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex" style={{ gap: "10px" }}>
            <input
              type="text"
              className="form-control admin-input"
              placeholder="Tìm kiếm theo nội dung..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: "350px" }}
            />
            <input
              type="text"
              className="form-control admin-input"
              placeholder="Tìm kiếm theo xếp hạng..."
              value={ratingSearchTerm}
              onChange={handleRatingSearch}
              style={{ width: "200px" }}
            />
          </div>
          <button
            className="btn btn-success admin-btn"
            onClick={handleCreate}
            style={{ height: "fit-content" }}
          >
            {/* Thêm */}<i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <table className="table table-bordered center-text">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Room ID</th>
            <th>HotelName</th>
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Nội dung bình luận
              {sortOrder === "asc" ? (
                <i className="fas fa-sort-alpha-down ml-2"></i>
              ) : (
                <i className="fas fa-sort-alpha-up ml-2"></i>
              )}
            </th>
            <th>Xếp hạng</th>
            {/* <th className="col-2">Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {currentComments.map((comment) => (
            <tr key={comment.comment_id}>
              <td>{comment.comment_id}</td>
              <td>{comment.account_userName}</td>
              <td>{comment.room_id}</td>
              <td>{comment.hotel_name}</td>
              <td>{comment.comment_text}</td>
              <td>{comment.comment_rating}</td>
              <td className="text-center align-middle">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-primary admin-btn"
                    onClick={() => handleEdit(comment)}
                  >
                    <i class="fa-solid fa-wrench"></i>{/* Sửa */}
                  </button>
                  <button
                    className="btn btn-danger admin-btn"
                    onClick={() => handleDelete(comment.comment_id)}
                  >
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
      <CommentModal
        comment={selectedComment}
        open={openModal}
        onSave={handleSave}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Comment;