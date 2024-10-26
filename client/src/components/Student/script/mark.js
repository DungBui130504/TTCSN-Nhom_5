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

    return (

        <div id='table-container'>
            <p id='title'>Bảng điểm chi tiết</p>
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

                <tbody>
                    {datas.map(data => (
                        <tr key={data.MaSV}>
                            <td>{data.TenMonHoc}</td>
                            <td>{data.MaLop}</td>
                            <td>{data.TenLop}</td>
                            <td>{data.TinChi}</td>
                            <td>{data.DiemTx1}</td>
                            <td>{data.DiemTx2}</td>
                            <td>{data.DiemGiuaKy}</td>
                            <td>{data.DiemCuoiKy}</td>
                            <td>chưa tính</td> 
                            <td>B+</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default Mark;