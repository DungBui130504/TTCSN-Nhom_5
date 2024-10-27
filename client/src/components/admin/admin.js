import React from 'react';
import './admin.css'; // Đảm bảo bạn có file CSS để thêm kiểu dáng

const Admin = () => {
    return (
        <div className="admin-dashboard">
            <h1>Chào mừng đến với Trang Quản Lý Admin</h1>
            <div className="dashboard-options">
                <button className="dashboard-button">Thêm Môn Học</button>
                <button className="dashboard-button">Sửa Môn Học</button>
                <button className="dashboard-button">Xóa Môn Học</button>
                <button className="dashboard-button">Thêm Sinh Viên</button>
                <button className="dashboard-button">Sửa Sinh Viên</button>
                <button className="dashboard-button">Xóa Sinh Viên</button>
                <button className="dashboard-button">Thêm Giảng Viên</button>
                <button className="dashboard-button">Sửa Giảng Viên</button>
                <button className="dashboard-button">Xóa Giảng Viên</button>
                <button className="dashboard-button">Xem Điểm</button>
                <button className="dashboard-button">Đăng Xuất</button>
            </div>
        </div>
    );
};

export default Admin;