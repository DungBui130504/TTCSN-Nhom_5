import React from 'react';
import './teacher.css';

const Teacher = () => {
    return (
        <div className="teacher-dashboard">
            <h1>Chào mừng đến với Trang Quản Lý Giảng Viên</h1>
            <div className="dashboard-options">
                <button className="dashboard-button">Sửa Thông Tin</button>
                <button className="dashboard-button">Sửa Điểm</button>
                <button className="dashboard-button">Xem Sinh Viên</button>
                <button className="dashboard-button">Đăng Xuất</button>
            </div>
        </div>
    );
};

export default Teacher;
