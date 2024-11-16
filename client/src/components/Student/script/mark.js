import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../css/mark.css'

function Mark() {
    let id = localStorage.getItem('id')
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const getMark = async () => {
            const response = await axios.post('http://localhost:8000/studentMark', { id });
            console.log(response.data.resData);
            setDatas(response.data.resData);
        }

        getMark()
    }, [])

    function convertScoreToGrade(score) {
        if (score >= 8.6 && score <= 10) {
            return 'A'; // Xuất sắc
        } else if (score >= 8.0 && score < 8.6) {
            return 'B+'; // Khá tốt
        } else if (score >= 7.0 && score < 8.0) {
            return 'B'; // Khá
        } else if (score >= 6.5 && score < 7.0) {
            return 'C+'; // Trung bình tốt
        } else if (score >= 5.5 && score < 6.5) {
            return 'C'; // Trung bình
        } else if (score >= 4.0 && score < 5.5) {
            return 'D+'; // Yếu tốt
        } else if (score >= 3.0 && score < 4.0) {
            return 'D'; // Yếu
        } else if (score >= 0 && score < 3.0) {
            return 'F'; // Kém
        } else {
            return 'Invalid score'; // Điểm không hợp lệ
        }
    }

    return (

        <div id='table-container'>
            <p id='title'>BẢNG ĐIỂM CHI TIẾT</p>
            <table border={0} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px' }}>

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

                <tbody>
                    {datas.map((data, index) => (
                        <tr key={data.MaSV}
                            style={{
                                backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2'
                            }}
                        >
                            <td>{data.TenMonHoc}</td>
                            <td>{data.MaLop}</td>
                            <td>{data.TenLop}</td>
                            <td>{data.TinChi}</td>
                            <td>{data.DiemTx1}</td>
                            <td>{data.DiemTx2}</td>
                            <td>{data.DiemGiuaKy}</td>
                            <td>{data.DiemCuoiKy}</td>
                            <td>{Math.round((data.DiemTichLuyMon) * 10) / 10}</td>
                            <td>{convertScoreToGrade(Math.round((data.DiemTichLuyMon) * 10) / 10)}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default Mark;