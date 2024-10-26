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
    })

    return (
        <>
            <p id={style['title']}>Bảng danh sách các môn đang giảng dạy</p>
            <table border={2} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px' }}>
                <thead>
                    <th>Mã Ngành</th>
                    <th>Mã Môn Học</th>
                    <th>Tên Môn Học</th>
                    <th>Mã Lớp</th>
                    <th>Tên Lớp</th>
                    <th>Thời Gian</th>
                    <th>Số Lượng Sinh Viên</th>
                </thead>

                <tbody>
                    {data.map(data => (
                        <tr key={data.MaMonHoc}>

                            <td>{data.MaNganh}</td>
                            <td>{data.MaMonHoc}</td>
                            <td>{data.TenMonHoc}</td>
                            <td>{data.MaLop}</td>
                            <td>{data.TenLop}</td>
                            <td>{data.ThoiGianHoc}</td>
                            <td>{data.SoLuong}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default SubjectList;