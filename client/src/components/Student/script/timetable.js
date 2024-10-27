import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "../css/timetable.css"

function setuptable() {
    const myTable = document.getElementById('myTable');
    myTable.rows[0].cells[1].textContent = "black"
}

function Timetable() {
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
            let response = await axios.post('http://localhost:8000/getTimeTable', { id })
            console.log(response.data.resData);
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
        if (thu2.length == 0) {
            return;
        }
        else {
            // console.log(thu2);
            const myTable = document.getElementById('myTable');

            for (let i = 0; i < thu2.length; i++) {
                if (thu2[i].ThoiGianHoc == 1) {
                    myTable.rows[0].cells[1].textContent += thu2[i].TenLop + '\n';
                }
                if (thu2[i].ThoiGianHoc == 2) {
                    myTable.rows[1].cells[1].textContent += thu2[i].TenLop + '\n';
                }
                if (thu2[i].ThoiGianHoc == 3) {
                    myTable.rows[2].cells[1].textContent += thu2[i].TenLop + '\n';
                }
            }
        }

        if (thu3.length == 0) {
            return;
        }
        else {
            // console.log(thu3);
            const myTable = document.getElementById('myTable');

            for (let i = 0; i < thu3.length; i++) {
                if (thu3[i].ThoiGianHoc == 1) {
                    myTable.rows[0].cells[2].textContent += thu3[i].TenLop + '\n';
                }
                if (thu3[i].ThoiGianHoc == 2) {
                    myTable.rows[1].cells[2].textContent += thu3[i].TenLop + '\n';
                }
                if (thu3[i].ThoiGianHoc == 3) {
                    myTable.rows[2].cells[2].textContent += thu3[i].TenLop + '\n';
                }
            }
        }

        if (thu4.length == 0) {
            return;
        }
        else {
            // console.log(thu4);
            const myTable = document.getElementById('myTable');

            for (let i = 0; i < thu4.length; i++) {
                if (thu4[i].ThoiGianHoc == 1) {
                    myTable.rows[0].cells[3].textContent += thu4[i].TenLop + '\n';
                }
                if (thu4[i].ThoiGianHoc == 2) {
                    myTable.rows[1].cells[3].textContent += thu4[i].TenLop + '\n';
                }
                if (thu4[i].ThoiGianHoc == 3) {
                    myTable.rows[2].cells[3].textContent += thu4[i].TenLop + '\n';
                }
            }
        }

        if (thu5.length == 0) {
            return;
        }
        else {
            // console.log(thu5);
            const myTable = document.getElementById('myTable');

            for (let i = 0; i < thu5.length; i++) {
                if (thu5[i].ThoiGianHoc == 1) {
                    myTable.rows[0].cells[4].textContent += thu5[i].TenLop + '\n';
                }
                if (thu5[i].ThoiGianHoc == 2) {
                    myTable.rows[1].cells[4].textContent += thu5[i].TenLop + '\n';
                }
                if (thu5[i].ThoiGianHoc == 3) {
                    myTable.rows[2].cells[4].textContent += thu5[i].TenLop + '\n';
                }
            }
        }

        if (thu6.length == 0) {
            return;
        }
        else {
            // console.log(thu6);
            const myTable = document.getElementById('myTable');

            for (let i = 0; i < thu6.length; i++) {
                if (thu6[i].ThoiGianHoc == 1) {
                    myTable.rows[0].cells[5].textContent += thu6[i].TenLop + '\n';
                }
                if (thu6[i].ThoiGianHoc == 2) {
                    myTable.rows[1].cells[5].textContent += thu6[i].TenLop + '\n';
                }
                if (thu6[i].ThoiGianHoc == 3) {
                    myTable.rows[2].cells[5].textContent += thu6[i].TenLop + '\n';
                }
            }
        }

        if (thu7.length == 0) {
            return;
        }
        else {
            // console.log(thu7);
            const myTable = document.getElementById('myTable');

            for (let i = 0; i < thu7.length; i++) {
                if (thu7[i].ThoiGianHoc == 1) {
                    myTable.rows[0].cells[6].textContent += thu7[i].TenLop + '\n';
                }
                if (thu7[i].ThoiGianHoc == 2) {
                    myTable.rows[1].cells[6].textContent += thu7[i].TenLop + '\n';
                }
                if (thu7[i].ThoiGianHoc == 3) {
                    myTable.rows[2].cells[6].textContent += thu7[i].TenLop + '\n';
                }
            }
        }

        if (chunhat.length == 0) {
            return;
        }
        else {
            // console.log(chunhat);
            const myTable = document.getElementById('myTable');

            for (let i = 0; i < chunhat.length; i++) {
                if (chunhat[i].ThoiGianHoc == 1) {
                    myTable.rows[0].cells[7].textContent += chunhat[i].TenLop + '\n';
                }
                if (chunhat[i].ThoiGianHoc == 2) {
                    myTable.rows[1].cells[7].textContent += chunhat[i].TenLop + '\n';
                }
                if (chunhat[i].ThoiGianHoc == 3) {
                    myTable.rows[2].cells[7].textContent += chunhat[i].TenLop + '\n';
                }
            }
        }
    }, [thu2, thu3, thu4, thu5, thu6, thu7, chunhat]);


    return (
        <>
            <div id='time-table-container'>
                <table border={1} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px' }} id='myTable'>
                    <thead>
                        <td>Thời Gian</td>
                        <td>Thứ 2</td>
                        <td>Thứ 3</td>
                        <td>Thứ 4</td>
                        <td>Thứ 5</td>
                        <td>Thứ 6</td>
                        <td>Thứ 7</td>
                        <td>Chủ nhật</td>
                    </thead>

                    <tr id='subject-list'>
                        <td id='time'>Sáng</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr id='subject-list'>
                        <td id='time'>Chiều</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr id='subject-list'>
                        <td id='time'>Tối</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                </table>
            </div>
        </>
    )
}

export default Timetable;