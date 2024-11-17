import React, { useEffect, useState } from "react";
import style from './TeacherManagement.module.css';
import axios from "axios";

function TeacherManagement() {
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
        if (ma == '' || ten == '' || tk == '' || mk == '') {
            window.alert('Không để trống mã, tên, tài khoản và mật khẩu')
            return;
        }
        if (sdt == '' || email == '') {
            window.alert('Cần ít nhất 1 phương thức liên lạc')
            return;
        }

        try {
            let response = await axios.post('http://localhost:8000/add_teacher', { ma, ten, tk, mk, xa, huyen, tinh, sdt, email, ngaySinh });
            console.log(response.data);
            setCheck(!check); // Cập nhật lại danh sách sau khi Nhập
        }
        catch (err) {
            console.log(err);
            window.alert('Nhập không thành công');
        }
    };

    const handleDel = async (maGV) => {
        try {
            let response = await axios.post('http://localhost:8000/del_teacher', { id: maGV });
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
                let response = await axios.post('http://localhost:8000/list_teacher');
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
            <div className={style["add-container"]} id='here'>
                <div className={style["input"]}>
                    <p
                        style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '20px' }}
                    >Nhập thông tin giảng viên mới</p>
                    <div className={style["box1"]}>
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập mã mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập mã giảng viên"
                            value={ma}
                            onChange={(e) => setMa(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập tên mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập tên giảng viên"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập tài khoản mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập tài khoản giảng viên"
                            value={tk}
                            onChange={(e) => setTk(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập mật khẩu mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập mật khẩu giảng viên"
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
                    <button className={style['add']} onClick={handleAdding}>Thêm giảng viên mới</button>
                </div>
            </div>
            <div className={style["list-container"]} id='here2'>
                <table
                    style={{
                        borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px', backgroundColor: 'white', borderLeft: '1px solid black'
                    }}
                >

                    <thead>
                        <tr>
                            <th>Mã giảng viên</th>
                            <th>Tên giảng viên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((teacher, i) => (
                            <tr key={i}>
                                <td>{teacher.MaGV}</td>
                                <td>{teacher.TenGV}</td>
                                <td>{teacher.SoDienThoai}</td>
                                <td>{teacher.Email}</td>
                                <td><button onClick={() => handleDel(teacher.MaGV)} className={style["del-btn"]}>Xóa giảng viên</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TeacherManagement;
