import React, { useState } from 'react';
import axios from 'axios';
import style from "../css/updateMark.module.css";
import { MdPersonSearch } from "react-icons/md";

function UpdateMark() {
    const [studentId, setStudentId] = useState('');
    const [classId, setClassId] = useState('');
    const [hadGetStudent, setHadGetStudent] = useState(false);
    const [data, setData] = useState([]);
    const id = localStorage.getItem('id')

    const handleOnclick = async () => {
        // console.log(studentId);
        // console.log(classId);

        try {
            let response = await axios.post('http://localhost:8000/search_student', { studentId, classId, id });
            // console.log(response.data.resData);
            setData(response.data.resData);
            setHadGetStudent(response.data.resData.length > 0);
        } catch (error) {
            console.error("Error fetching data:", error);
            setHadGetStudent(false);
        }
    };

    return (
        <>
            <div className={style["search-container"]}>
                <input
                    type="text"
                    className={style["id-search"]}
                    placeholder='Nhập mã sinh viên'
                    onChange={(e) => setStudentId(e.target.value)}
                />
                <input
                    type="text"
                    className={style["name-search"]}
                    placeholder='Nhập mã lớp'
                    onChange={(e) => setClassId(e.target.value)}
                />
                <button className={style["button-19"]} role="button" onClick={handleOnclick}>
                    Tìm sinh viên
                </button>
            </div>

            <div className={style["update-container"]}>
                {hadGetStudent ? (
                    <>
                        <table className={style["myTable"]}
                            border={1}
                            style={{
                                borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px', backgroundColor: 'white'
                            }}
                        >
                            <thead>
                                <tr>
                                    <th>Mã lớp</th>
                                    <th>Tên lớp</th>
                                    <th>Mã sinh viên</th>
                                    <th>Tên sinh viên</th>
                                    <th>Điểm TX1</th>
                                    <th>Điểm TX2</th>
                                    <th>Điểm giữa kỳ</th>
                                    <th>Điểm cuối kỳ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.MaLop}</td>
                                        <td>{item.TenLop}</td>
                                        <td>{item.MaSV}</td>
                                        <td>{item.TenSV}</td>
                                        <td>{item.DiemTx1}</td>
                                        <td>{item.DiemTx2}</td>
                                        <td>{item.DiemGiuaKy}</td>
                                        <td>{item.DiemCuoiKy || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={style["update-input"]}>
                            <input type="text" className={style["tx1"]} placeholder='Nhập TX1' />
                            <input type="text" className={style["tx2"]} placeholder='Nhập TX2' />
                            <input type="text" id={style["tx3"]} placeholder='Nhập điểm giữa kỳ' />
                            <button class={style["button-3"]} role="button">Sửa điểm</button>
                        </div>
                    </>
                ) : (
                    <p
                        style={{ marginLeft: '20px' }}
                    >Không tìm thấy sinh viên</p>
                )}
            </div>
        </>
    );
}

export default UpdateMark;
