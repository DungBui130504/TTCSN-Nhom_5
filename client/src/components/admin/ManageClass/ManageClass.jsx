import React, { useState, useEffect } from "react";
import style from './ManageClass.module.css'
import axios from "axios";

function ManageClass() {
    const [ma, setMa] = useState('')
    const [ten, setTen] = useState('')
    const [tg, setTg] = useState('')
    const [data, setData] = useState([])
    const [check, setCheck] = useState(false);

    const handleAdding = async () => {
        try {
            let response = await axios.post('http://localhost:8000/add_teacher', { ma, ten, tg });
            console.log(response.data);
            setCheck(!check); // Cập nhật lại danh sách sau khi thêm
        }
        catch (err) {
            console.log(err);
            window.alert('Thêm không thành công');
        }
    };

    const handleDel = async (MaLop) => {
        try {
            let response = await axios.post('http://localhost:8000/del_class', { id: MaLop });
            console.log(response.data);
            setCheck(!check); // Cập nhật lại danh sách sau khi xóa
        }
        catch (err) {
            console.log(err);
            window.alert('Xóa không thành công');
        }
    };

    useEffect(() => {
        const list = async () => {
            try {
                let response = await axios.post('http://localhost:8000/list_class');
                console.log(response.data.resData);
                setData(response.data.resData);
            } catch (err) {
                console.log(err);
                window.alert('Lấy danh sách không thành công');
            }
        };

        list();
    }, [check]);

    return (
        <div className={style["teacher-container"]}>
            <div className={style["add-container"]} id='here7'>
                <div className={style["input"]}>
                    <div className={style["box1"]}>
                        <input
                            type="text"
                            placeholder="Nhập mã giảng viên"
                            value={ma}
                            onChange={(e) => setMa(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập tên giảng viên"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập tài khoản giảng viên"
                            value={tg}
                            onChange={(e) => setTg(e.target.value)}
                        />
                        <button className={style['add']} onClick={handleAdding}>Thêm môn học</button>
                    </div>
                </div>
            </div>
            <div className={style["list-container"]} id='here8'>
                <table
                    style={{
                        borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px', backgroundColor: 'white', borderLeft: '1px solid black'
                    }}
                >
                    <thead>
                        <tr>
                            <th>Mã Lớp</th>
                            <th>Tên Lớp</th>
                            <th>Thời Gian Bắt Đầu</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((Class, i) => (
                            <tr key={i}>
                                <td>{Class.MaLop}</td>
                                <td>{Class.TenLop}</td>
                                <td>{Class.ThoiGianBatDau}</td>
                                <td><button onClick={() => handleDel(Class.MaLop)}>Xóa lớp học</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageClass;