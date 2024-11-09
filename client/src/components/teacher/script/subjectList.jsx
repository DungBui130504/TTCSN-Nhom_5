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

    function convertTime(time) {
        if (time == 1) {
            return <p>Sáng</p>
        }
        if (time == 2) {
            return <p>Chiều</p>
        }
        if (time == 3) {
            return <p>Tối</p>
        }
        return <p>Lỗi</p>
    }

    return (
        <div className={style['list-container']}>
            <p id={style['title']}>Bảng danh sách các môn đang giảng dạy</p>
            <table style={{
                borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px', backgroundColor: 'white', borderLeft: '1px solid black'
            }}>
                <thead
                    style={{ border: '1px solid black' }}
                >
                    <th>Mã Ngành</th>
                    <th>Mã Môn Học</th>
                    <th>Tên Môn Học</th>
                    <th>Mã Lớp</th>
                    <th>Tên Lớp</th>
                    <th>Số Lượng Sinh Viên</th>
                </thead>

                <tbody>
                    {data.map((data, index) => (
                        <tr key={index}
                            style={{
                                backgroundColor: index % 2 == 0 ? 'white' : '#f2f2f2'
                            }}
                        >
                            <td>{data.MaNganh}</td>
                            <td>{data.MaMonHoc}</td>
                            <td>{data.TenMonHoc}</td>
                            <td>{data.MaLop}</td>
                            <td>{data.TenLop}</td>
                            <td>{data.SoLuong}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SubjectList;