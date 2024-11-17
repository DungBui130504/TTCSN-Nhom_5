import React, { useState, useEffect } from "react";
import style from './ManageStudent.module.css'
import axios from "axios";

function ManageStudent() {
    const [ma, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [tk, setTk] = useState('');
    const [mk, setMk] = useState('');
    const [xa, setXa] = useState('');
    const [huyen, setHuyen] = useState('');
    const [tinh, setTinh] = useState('');
    const [sdt, setSdt] = useState('');
    const [email, setEmail] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [data, setData] = useState([]);
    const [check, setCheck] = useState(false);


    const handleAdding = async () => {
        try {
            if (sdt == '') {
                setSdt('-')
            }
            if (email == '') {
                setEmail('-')
            }
            if (xa == '') {
                setXa('-')
            }
            if (huyen == '') {
                setHuyen('-')
            }
            if (tinh == '') {
                setTinh('-')
            }
            if (ngaySinh == '') {
                setNgaySinh('-')
            }
            if (ma == '' || ten == '' || tk == '' || mk == '') {
                window.alert('Không để trống mã, tên, tài khoản và mật khẩu')
                return;
            }
            let response = await axios.post('http://localhost:8000/add_student', { ma, ten, tk, mk, xa, huyen, tinh, sdt, email, ngaySinh });
            console.log(response.data);
            setCheck(!check);
            window.alert('Thêm thành công!')
        }
        catch (err) {
            console.log(err);
            window.alert('Thêm không thành công');
        }
    };

    const handleDel = async (maSV) => {
        try {
            let response = await axios.post('http://localhost:8000/del_student', { id: maSV });
            console.log(response.data);
            setCheck(!check); // Cập nhật lại danh sách sau khi xóa
            window.alert('Xóa thành công!')
        }
        catch (err) {
            console.log(err);
            window.alert('Xóa không thành công');
        }
    };

    useEffect(() => {
        const list = async () => {
            try {
                let response = await axios.post('http://localhost:8000/list_student');
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
        <div className={style["student-container"]}>
            <div className={style["add-container"]} id='here3'>
                <div className={style["input"]}>
                    <p
                        style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '20px' }}
                    >Nhập thông tin sinh viên mới</p>
                    <div className={style["box1"]}>
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập mã sinh viên mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập mã sinh viên"
                            value={ma}
                            onChange={(e) => setMa(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập tên sinh viên mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập tên sinh viên"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập tài khoản mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập tài khoản sinh viên"
                            value={tk}
                            onChange={(e) => setTk(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập mật khẩu mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập mật khẩu sinh viên"
                            value={mk}
                            onChange={(e) => setMk(e.target.value)}
                        />
                    </div>
                    <div className={style["box2"]}>
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập số điện thoại mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            value={sdt}
                            onChange={(e) => setSdt(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập email mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập ngày sinh mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập ngày sinh"
                            value={ngaySinh}
                            onChange={(e) => setNgaySinh(e.target.value)}
                        />
                    </div>
                    <div className={style["box3"]}>
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập xã mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập xã"
                            value={xa}
                            onChange={(e) => setXa(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập huyện mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập huyện"
                            value={huyen}
                            onChange={(e) => setHuyen(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập tỉnh mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập tỉnh"
                            value={tinh}
                            onChange={(e) => setTinh(e.target.value)}
                        />
                    </div>
                    <button className={style['add']} onClick={handleAdding}>Thêm sinh viên</button>
                </div>
            </div>
            <div className={style["list-container"]} id='here4'>
                <table
                    style={{
                        borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px', backgroundColor: 'white', borderLeft: '1px solid black'
                    }}
                >

                    <thead>
                        <tr>
                            <th>Mã sinh viên</th>
                            <th>Tên giảng viên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((student, i) => (
                            <tr key={i}>
                                <td>{student.MaSV}</td>
                                <td>{student.TenSV}</td>
                                <td>{student.SoDienThoai}</td>
                                <td>{student.Email}</td>
                                <td><button onClick={() => handleDel(student.MaSV)} className={style["del-btn"]}>Xóa sinh viên</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageStudent;