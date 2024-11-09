import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "../css/subject.css"

function Subject() {
    const [subject, setSubject] = useState([])

    const [id, setID] = useState(localStorage.getItem('id'))

    console.log(id);


    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.post('http://localhost:8000/getSubject', { id });
            console.log(response.data.resData);
            setSubject(response.data.resData)
        }

        fetchData();
    }, [])

    return (
        <div className='subject-container'>
            <p id='sub-title'>BẢNG MÔN HỌC</p>
            <table border={0} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px' }}>
                <thead>
                    <th>Mã Ngành</th>
                    <th>Mã môn</th>
                    <th>Tên môn</th>
                    <th>Mã lớp</th>
                    <th>Tên lớp</th>
                </thead>

                <tbody>
                    {subject.map((sub, index) => (
                        <tr key={index}
                            style={{
                                backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2'
                            }}
                        >
                            <td>{sub.MaNganh}</td>
                            <td>{sub.MaMonHoc}</td>
                            <td>{sub.TenMonHoc}</td>
                            <td>{sub.MaLop}</td>
                            <td>{sub.TenLop}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Subject;