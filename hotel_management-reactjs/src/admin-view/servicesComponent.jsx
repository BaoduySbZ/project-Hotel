import React, { useState, useEffect } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../service/servicesService"; // Import the service functions
import ServiceModal from "../modal-view/service-modal"; // Import the modal for services
import ViewServiceModal from "../modal-view/service-detail-modal"; // Import the modal for viewing services

const Service = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false); // State for View Modal
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const servicesPerPage = 5;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleCreate = () => {
    setSelectedService(null);
    setOpenModal(true);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const handleView = (service) => {
    setSelectedService(service);
    setOpenViewModal(true); // Open View Modal
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedServices = [...services].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setServices(sortedServices);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
      try {
        await deleteService(id);
        setSelectedService(null);
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleSave = async (service) => {
    try {
      if (selectedService) {
        await updateService(selectedService.id, service);
      } else {
        await createService(service);
      }
      setSelectedService(null);
      setOpenModal(false);
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services
    .filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstService, indexOfLastService);

  const totalPages = Math.ceil(services.length / servicesPerPage);

  return (
    <div>
      <h5 className="card-title mb-4">Quản lý dịch vụ</h5>
      <div className="mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center mt-3">
          <div style={{ width: "350px" }} className="col-3 input-group admin-input-group">
            <input
              type="text"
              className="col-3 form-control admin-input"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="btn btn-success admin-btn" onClick={handleCreate}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <table className="table table-bordered center-text">
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Tên dịch vụ
              {sortOrder === "asc" ? (
                <i className="fas fa-sort-alpha-down ml-2"></i>
              ) : (
                <i className="fas fa-sort-alpha-up ml-2"></i>
              )}
            </th>
            <th>Giá dịch vụ</th>
            <th>Mô tả</th>
            {/* <th>Icon</th> */}
            {/* <th>Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {currentServices.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.service_price} đ</td>
              <td>{service.description}</td>
              {/* <td>
                <img src={service.icon} alt={service.name} style={{ width: "50px", height: "50px" }} />
              </td> */}
              <td className="text-center align-middle">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-info admin-btn"
                    onClick={() => handleView(service)}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-primary admin-btn"
                    onClick={() => handleEdit(service)}
                  >
                    <i className="fa-solid fa-wrench"></i>
                  </button>
                  <button
                    className="btn btn-danger admin-btn"
                    onClick={() => handleDelete(service.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      <ServiceModal
        service={selectedService}
        open={openModal}
        onSave={handleSave}
        onClose={() => setOpenModal(false)}
      />

      <ViewServiceModal
        service={selectedService}
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
      />
    </div>
  );
};

export default Service;