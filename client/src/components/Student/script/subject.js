import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Subject() {
    return (
        <div className='subject-container'>
            <p>Bảng môn học</p>
            <table border={1} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px' }}>
                <thead>
                    <th>Tên Môn Học</th>
                    <th>Mã Lớp</th>
                    <th>Tên Lớp</th>
                    <th>Số Tín Chỉ</th>
                    <th>TX1</th>
                    <th>TX2</th>
                    <th>Giữa Kỳ</th>
                    <th>Cuối Kỳ</th>
                    <th>Tổng Kết</th>
                    <th>Điểm chữ</th>
                </thead>
            </table>
        </div>
    )
}

export default Subject;