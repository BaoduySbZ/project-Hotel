import React, { useState, useEffect } from 'react';
import { getAccounts, createAccount, updateAccount, deleteAccount } from '../service/accountService';
import AccountModal from '../modal-view/account-modal';
import ViewAccountModal from '../modal-view/account-detail-modal';

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const accountsPerPage = 5; // Số lượng tài khoản trên mỗi trang
  const [viewAccount, setViewAccount] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);


  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleViewDetails = (account) => {
    setViewAccount(account);
    setOpenViewModal(true);
  };

  const handleCreate = () => {
    setSelectedAccount(null);
    setOpenModal(true);
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setOpenModal(true);
  };

  // Hàm sắp xếp tên tài khoản
  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Đảo ngược thứ tự sắp xếp
    setSortOrder(newSortOrder);

    const sortedAccounts = [...accounts].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.userName.localeCompare(b.userName);
      } else {
        return b.userName.localeCompare(a.userName);
      }
    });
    setAccounts(sortedAccounts);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa tài khoản này?')) {
      try {
        await deleteAccount(id);
        setSelectedAccount(null);
        fetchAccounts();
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  const handleSave = async (account) => {
    try {
      if (selectedAccount) {
        await updateAccount(selectedAccount.id, account);
      } else {
        await createAccount(account);
      }
      setSelectedAccount(null);
      setOpenModal(false);

      fetchAccounts();
    } catch (error) {
      console.error('Error saving account:', error);
    }
  };

  // Hàm bỏ dấu
  const removeVietnameseTones = (str) => {
    const accentMap = {
      a: 'áàảãạâấầẩẫậăắằẳẵặ',
      e: 'éèẻẽẹêếềểễệ',
      i: 'íìỉĩị',
      o: 'óòỏõọôốồổỗộơớờởỡợ',
      u: 'úùủũụưứừửữự',
      y: 'ýỳỷỹỵ',
      d: 'đ',
    };
    let result = str;
    for (const [nonAccent, accent] of Object.entries(accentMap)) {
      const regex = new RegExp(`[${accent}]`, 'g');
      result = result.replace(regex, nonAccent);
    }
    return result;
  };

  // Hàm tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };


  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = accounts
    .filter(account =>
      removeVietnameseTones(account.userName.toLowerCase()).includes(removeVietnameseTones(searchTerm.toLowerCase()))
    )
    .slice(indexOfFirstAccount, indexOfLastAccount);

  const totalPages = Math.ceil(accounts.length / accountsPerPage);

  return (
    <div>
      <h5 className="card-title mb-4">Quản lý tài khoản</h5>
      <div className="mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center mt-3">
          <div style={{ width: '350px' }} className="col-3 input-group admin-input-group">
            <input
              type="text"
              className="col-3 form-control admin-input"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleSearch} // Gọi hàm tìm kiếm khi nhập
            />
          </div>
          <button className="btn btn-success admin-btn" onClick={handleCreate}>
            <i class="fa-solid fa-plus"></i>{/* Thêm */}
          </button>
        </div>
      </div>

      <table className="table table-bordered center-text">
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={handleSort} style={{ cursor: 'pointer' }}>
              Tên tài khoản
              {sortOrder === 'asc' ? (
                <i className="fas fa-sort-alpha-down ml-2"></i> // Icon sắp xếp tăng dần
              ) : (
                <i className="fas fa-sort-alpha-up ml-2"></i> // Icon sắp xếp giảm dần
              )}
            </th>
            {/* <th>Email</th> */}
            {/* <th>Số điện thoại</th> */}
            {/* <th>Điểm số</th> */}
            {/* <th>Vai trò</th> */}
            {/* <th className="col-2">Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {currentAccounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.userName}</td>
              {/* <td>{account.email}</td> */}
              {/* <td>{account.phoneNumber}</td> */}
              {/* <td>{account.score}</td> */}
              {/* <td>
                {account.role === 0 ? 'Admin' : account.role === 1 ? 'Staff' : 'User'}
              </td> */}
              <td className="text-center align-middle">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-info admin-btn"
                    onClick={() => handleViewDetails(account)}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button className="btn btn-primary admin-btn" onClick={() => handleEdit(account)}><i class="fa-solid fa-wrench"></i></button>
                  <button className="btn btn-danger admin-btn" onClick={() => handleDelete(account.id)}><i class="fa-solid fa-trash-can"></i></button>
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
            <a className="page-link" href="#">Previous</a>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <a className="page-link" onClick={() => setCurrentPage(index + 1)} href="#">{index + 1}</a>
            </li>
          ))}
          <li className="page-item" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>

      {/* Modal component */}
      <AccountModal
        account={selectedAccount}
        open={openModal}
        onSave={handleSave}
        onClose={() => setOpenModal(false)}
      />
      <ViewAccountModal
        account={viewAccount}
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
      />

    </div>
  );
};

export default Account;
