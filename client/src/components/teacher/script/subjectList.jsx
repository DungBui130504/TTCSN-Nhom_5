import React, { useEffect, useState } from 'react'
import axios from 'axios'
import style from "../css/subjectList.module.css"

function SubjectList() {
    let id = localStorage.getItem('id')
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.post('http://localhost:8000/subject_teacher', { id });
            console.log(response.data.resData);
            setData(response.data.resData);
        }

        fetchData();
    }, [])

    function convertTime(number) {
        if (number === 1) {
            return 'Sáng'
        }
        if (number === 2) {
            return 'Chiều'
        }
        if (number === 3) {
            return 'Tối'
        }
    }

    return (
        <div className={style['list-container']}>
            <p id={style['title']}>Bảng danh sách các môn học và lớp học đang giảng dạy</p>
            <table border={1} style={{
                borderCollapse: 'collapse', width: '98%', textAlign: 'center', marginTop: '20px', backgroundColor: 'white', borderColor: 'black'
            }}>
                <thead
                    style={{ backgroundColor: 'rgb(32, 218, 38)' }}
                >
                    <th>Mã Ngành</th>
                    <th>Mã Môn Học</th>
                    <th>Tên Môn Học</th>
                    <th>Mã Lớp</th>
                    <th>Tên Lớp</th>
                    <th>Ngày Thi</th>
                    <th>Thời Gian Thi</th>
                    <th>Số Lượng Sinh Viên</th>
                </thead>

                <tbody>
                    {data.map((data, index) => (
                        <tr key={index}>
                            <td>{data.MaNganh}</td>
                            <td>{data.MaMonHoc}</td>
                            <td>{data.TenMonHoc}</td>
                            <td>{data.MaLop}</td>
                            <td>{data.TenLop}</td>
                            <td>{data.NgayThi}</td>
                            <td>{convertTime(data.ThoiGianThi)}</td>
                            <td>{data.SoLuong}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SubjectList;