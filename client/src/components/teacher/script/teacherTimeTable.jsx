import React, { useEffect, useState } from 'react'
import axios from 'axios'
import style from "../css/teacherTimeTable.module.css"

function TeacherTimeTable() {
    const [thu2, setThu2] = useState([]);
    const [thu3, setThu3] = useState([]);
    const [thu4, setThu4] = useState([]);
    const [thu5, setThu5] = useState([]);
    const [thu6, setThu6] = useState([]);
    const [thu7, setThu7] = useState([]);
    const [chunhat, setChunhat] = useState([]);
    const id = localStorage.getItem('id')

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.post('http://localhost:8000/teacher_timetable', { id });
            // console.log(response.data.resData);
            const newThu2Data = [];
            const newThu3Data = [];
            const newThu4Data = [];
            const newThu5Data = [];
            const newThu6Data = [];
            const newThu7Data = [];
            const newChuNhatData = [];
            for (let i = 0; i < response.data.resData.length; i++) {
                if (response.data.resData[i].Thu1 == 'Thứ 2' || response.data.resData[i].Thu2 == 'Thứ 2') {
                    const data = {
                        TenLop: response.data.resData[i].TenLop,
                        ThoiGianHoc: response.data.resData[i].ThoiGianHoc
                    };
                    newThu2Data.push(data);
                }
                if (response.data.resData[i].Thu1 == 'Thứ 3' || response.data.resData[i].Thu2 == 'Thứ 3') {
                    const data = {
                        TenLop: response.data.resData[i].TenLop,
                        ThoiGianHoc: response.data.resData[i].ThoiGianHoc
                    };
                    newThu3Data.push(data);
                }
                if (response.data.resData[i].Thu1 == 'Thứ 4' || response.data.resData[i].Thu2 == 'Thứ 4') {
                    const data = {
                        TenLop: response.data.resData[i].TenLop,
                        ThoiGianHoc: response.data.resData[i].ThoiGianHoc
                    };
                    newThu4Data.push(data);
                }
                if (response.data.resData[i].Thu1 == 'Thứ 5' || response.data.resData[i].Thu2 == 'Thứ 5') {
                    const data = {
                        TenLop: response.data.resData[i].TenLop,
                        ThoiGianHoc: response.data.resData[i].ThoiGianHoc
                    };
                    newThu5Data.push(data);
                }
                if (response.data.resData[i].Thu1 == 'Thứ 6' || response.data.resData[i].Thu2 == 'Thứ 6') {
                    const data = {
                        TenLop: response.data.resData[i].TenLop,
                        ThoiGianHoc: response.data.resData[i].ThoiGianHoc
                    };
                    newThu6Data.push(data);
                }
                if (response.data.resData[i].Thu1 == 'Thứ 7' || response.data.resData[i].Thu2 == 'Thứ 7') {
                    const data = {
                        TenLop: response.data.resData[i].TenLop,
                        ThoiGianHoc: response.data.resData[i].ThoiGianHoc
                    };
                    newThu7Data.push(data);
                }
                if (response.data.resData[i].Thu1 == 'Chủ Nhật' || response.data.resData[i].Thu2 == 'Chủ Nhật') {
                    const data = {
                        TenLop: response.data.resData[i].TenLop,
                        ThoiGianHoc: response.data.resData[i].ThoiGianHoc
                    };
                    newChuNhatData.push(data);
                }
            }
            setThu2(newThu2Data);
            setThu3(newThu3Data);
            setThu4(newThu4Data);
            setThu5(newThu5Data);
            setThu6(newThu6Data);
            setThu7(newThu7Data);
            setChunhat(newChuNhatData);
        }
        fetchData()
    }, [])

    useEffect(() => {
        const myTable = document.getElementById('teacherTable');

        const updateTable = (dayData, columnIndex) => {
            for (let i = 0; i < dayData.length; i++) {
                if (dayData[i].ThoiGianHoc === 1) {
                    myTable.rows[1].cells[columnIndex].innerHTML += `${dayData[i].TenLop} <br/>`;
                }
                if (dayData[i].ThoiGianHoc === 2) {
                    myTable.rows[2].cells[columnIndex].innerHTML += `${dayData[i].TenLop} <br/>`;
                }
                if (dayData[i].ThoiGianHoc === 3) {
                    myTable.rows[3].cells[columnIndex].innerHTML += `${dayData[i].TenLop} <br/>`;
                }
            }
        };

        if (thu2.length > 0) updateTable(thu2, 1);
        if (thu3.length > 0) updateTable(thu3, 2);
        if (thu4.length > 0) updateTable(thu4, 3);
        if (thu5.length > 0) updateTable(thu5, 4);
        if (thu6.length > 0) updateTable(thu6, 5);
        if (thu7.length > 0) updateTable(thu7, 6);
        if (chunhat.length > 0) updateTable(chunhat, 7);

    }, [thu2, thu3, thu4, thu5, thu6, thu7, chunhat]);

    return (
        <div id={style['time-table-container']}>
            <p id={style["time-title"]}>Thời khóa biểu</p>
            <table id='teacherTable' className={style['teacherTable']} border={1} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Thời Gian</th>
                        <th>T2</th>
                        <th>T3</th>
                        <th>T4</th>
                        <th>T5</th>
                        <th>T6</th>
                        <th>T7</th>
                        <th>CN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sáng</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Chiều</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Tối</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TeacherTimeTable;