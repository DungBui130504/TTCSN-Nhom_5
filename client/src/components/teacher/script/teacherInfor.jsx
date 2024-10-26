import React, { useEffect, useState } from 'react';
import style from '../css/teacherInfor.module.css';
import axios from 'axios'

function TeacherInfor() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [id, setID] = useState('')
    const [check, setCheck] = useState(false)
    let taikhoan = localStorage.getItem('taikhoanSV')
    let matkhau = localStorage.getItem('matkhausv')

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.post('http://localhost:8000/teacher', { taikhoan, matkhau });
            // console.log(response.data.teacher[0]);
            setName(response.data.teacher[0].TenGV)
            setPhone(response.data.teacher[0].SoDienThoai)
            setEmail(response.data.teacher[0].Email)
            setID(response.data.teacher[0].MaGV)
        }

        fetchData();
    }, [check])

    const handleUpdate = async () => {
        let response = await axios.post('http://localhost:8000/update_teacher', { id, name, phone, email });
        // console.log(response.data.resData);
        setCheck(!check)
        window.location.reload()
    }

    return (
        <>
            <div id={style["infor-container"]}>
                <div id={style["sub-container"]}>
                    <p>Họ và tên <a>*</a> </p>
                    <input type="text" placeholder='Nhập tên mới' value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div id={style["sub-container"]}>
                    <p>Số điện thoại <a>*</a> </p>
                    <input type="text" placeholder='Nhập số điện thoại mới' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div id={style["sub-container"]}>
                    <p>Email <a>*</a> </p>
                    <input type="text" placeholder='Nhập email mới' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <button id={style["update-btn"]} onClick={handleUpdate}>Cập nhật thông tin</button>
        </>
    )
}

export default TeacherInfor;