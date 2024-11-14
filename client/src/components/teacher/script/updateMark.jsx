import React, { useState } from 'react';
import axios from 'axios';
import style from "../css/updateMark.module.css";

function UpdateMark() {
    const [classId, setClassId] = useState('');
    const [hadGetStudent, setHadGetStudent] = useState(false);
    const [data, setData] = useState([]);
    const [ma, setMa] = useState(0)
    const id = localStorage.getItem('id');

    const handleOnclick = async () => {
        try {
            let response = await axios.post('http://localhost:8000/search_class', { classId, id });
            setData(response.data.resData);
            setHadGetStudent(response.data.resData.length > 0);
        } catch (error) {
            console.error("Error fetching data:", error);
            setHadGetStudent(false);
        }
    };

    const handleUpdateMark = async (index, tx1, tx2, giuaKy) => {
        setMa(data[index].MaSV)
        if (tx1 > 10 || tx2 > 10 || giuaKy > 10) {
            window.alert('Điểm không được lớn hơn 10')
            return -1;
        }
        if (tx1 < 0 || tx2 < 0 || giuaKy < 0) {
            window.alert('Điểm không được nhỏ hơn 0')
            return -1;
        }

        try {
            let response = await axios.post('http://localhost:8000/update_mark', { ma, classId, id, tx1, tx2, giuaKy });
            console.log(response);
            alert('Cập nhật thành công');
        } catch (error) {
            console.error(error);
            alert('Không thể sửa điểm');
        }
    };

    const handleChange = (index, field, value) => {
        const updatedData = [...data];
        updatedData[index] = { ...updatedData[index], [field]: value };
        setData(updatedData);
    };

    return (
        <div className={style['main-container']}>
            <div className={style["search-container"]}>
                <input
                    type="text"
                    className={style["name-search"]}
                    placeholder='Nhập mã lớp'
                    onChange={(e) => setClassId(e.target.value)}
                />
                <button className={style["button-19"]} role="button" onClick={handleOnclick}>
                    Tìm lớp học
                </button>
            </div>

            <div className={style["update-container"]}>
                {hadGetStudent ? (
                    <table className={style["myTable"]} border={1} style={{ borderCollapse: 'collapse', width: '98%', textAlign: 'center', marginTop: '0px', backgroundColor: 'white' }}>
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.MaLop}</td>
                                    <td>{item.TenLop}</td>
                                    <td>{item.MaSV}</td>
                                    <td>{item.TenSV}</td>
                                    <td>
                                        <input
                                            type="number"
                                            className={style["tx1"]}
                                            value={item.DiemTx1}
                                            onChange={e => handleChange(index, 'DiemTx1', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className={style["tx2"]}
                                            value={item.DiemTx2}
                                            onChange={e => handleChange(index, 'DiemTx2', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            id={style["tx3"]}
                                            value={item.DiemGiuaKy}
                                            onChange={e => handleChange(index, 'DiemGiuaKy', e.target.value)}
                                        />
                                    </td>
                                    <td>{item.DiemCuoiKy || 0}</td>
                                    <td className={style["update-input"]}>
                                        <button
                                            className={style["button-3"]}
                                            role="button"
                                            onClick={() => handleUpdateMark(index, item.DiemTx1, item.DiemTx2, item.DiemGiuaKy)}
                                        >
                                            Cập nhật
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ marginLeft: '20px' }}>Không tìm thấy lớp học hoặc lớp học không có sinh viên nào</p>
                )}
            </div>
        </div>
    );
}

export default UpdateMark;
