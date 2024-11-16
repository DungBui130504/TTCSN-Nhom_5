import React, { useEffect, useState } from 'react';
import style from '../css/teacherInfor.module.css';
import axios from 'axios';

function TeacherInfor() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [id, setID] = useState('')
    const [check, setCheck] = useState(false)
    let taikhoan = localStorage.getItem('taikhoanSV')
    let matkhau = localStorage.getItem('matkhausv')
    const ID = localStorage.getItem('id')
    const [sum, setSum] = useState(0)
    const [sum2, setSum2] = useState(0)
    let count = 0;

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

    useEffect(() => {
        const fetchData2 = async () => {
            // console.log('ID:', ID); 
            if (ID) {
                let response1 = await axios.post('http://localhost:8000/getSumStudent', { ID });
                // console.log(response1.data.resData);
                setSum2(response1.data.resData.length);
                for (let i = 0; i < response1.data.resData.length; i++) {
                    count += response1.data.resData[i].SoLuongSinhVienMoiLop;
                    // console.log(count);
                }
                setSum(count);
                count = 0;
            } else {
                console.error('ID không hợp lệ');
            }
        }

        fetchData2()
    }, [])

    useEffect(() => {
        // console.log("Giá trị sum đã cập nhật:", sum);
        // console.log(sum2);
    }, [count]);

    const handleUpdate = async () => {
        try {
            let response = await axios.post('http://localhost:8000/update_teacher', { id, name, phone, email });
            // console.log(response.data.resData);
            setCheck(!check)
            window.alert('Thành công!')
            window.location.reload()
        } catch (error) {
            console.log(error);
            window.alert('Không thể sửa!')
        }
    }

    return (
        <div className={style['main-container']}>
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
                <button id={style["update-btn"]} onClick={handleUpdate}>Cập nhật thông tin</button>
            </div>
            <div className={style["box1"]}><div></div><p>Số lượng sinh viên đang giảng dạy: {sum}</p></div>
            <div className={style["box2"]}><div></div>Số lượng lớp học hiện có: {sum2}</div>
        </div>
    )
}

export default TeacherInfor;