const Invoice = () => {
  return (
    <>
      <h5 className="card-title mb-4">Invoice Management</h5>

      <div className="mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center mt-3">
          <div style={{ width: '350px' }} className="col-3 input-group admin-input-group">
            <input
              style={{ width: '100px' }}
              type="text"
              className="col-3 form-control admin-input"
              placeholder="Tìm kiếm..."
            />
          </div>
          <button className="btn btn-primary admin-btn">
            {/* Thêm */}<i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <table className="table table-bordered center-text">
        <thead>
          <tr>
            <th>#</th>
            <th>Invoice Number</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th className="col-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>INV-1001</td>
            <td>John Doe</td>
            <td>15-10-2024</td>
            <td>$200</td>
            <td>Paid</td>
            <td>
              <div className="d-flex">
                <button className="btn btn-warning admin-btn">Sửa</button>
                <button className="btn btn-danger admin-btn">Xóa</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>INV-1002</td>
            <td>Jane Smith</td>
            <td>16-10-2024</td>
            <td>$350</td>
            <td>Unpaid</td>
            <td>
              <div className="d-flex">
                <button className="btn btn-warning admin-btn">Sửa</button>
                <button className="btn btn-danger admin-btn">Xóa</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end admin-pagination">
          <li className="page-item">
            <a className="page-link" href="#">Previous</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">3</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Invoice;
