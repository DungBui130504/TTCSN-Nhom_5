import axios from 'axios';
import '../css/student_status.css';
import React, { useState, useEffect } from 'react';

function StudentStatus() {
    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [check, setCheck] = useState(false)
    let tk = localStorage.getItem('taikhoanSV')
    let mk = localStorage.getItem('matkhausv')
    const [taikhoan, setTaikhoan] = useState(tk)
    const [matkhau, setMatkhau] = useState(mk)

    const handleSubmit = async (event) => {
        event.preventDefault()

        let Name = event.target.elements.name.value;
        let Phone = event.target.elements.phone.value;
        let Email = event.target.elements.email.value;

        if (Name === '') {
            Name = name
        }

        if (Phone === '') {
            Phone = phone
        }

        if (Email === '') {
            Email = email
        }

        const response = await axios.post('http://localhost:8000/updateStudent', { id, Name, Phone, Email, tk, mk });

        setCheck(!check)

    }

    useEffect(() => {
        const getStudentStatus = async () => {
            const response = await axios.post('http://localhost:8000/studentStatus');
            // console.log(`tai khoan duoc lay: ${localStorage.getItem('taikhoanSV')}`);

            for (let i = 0; i < response.data.studentStatus.length; i++) {
                if (response.data.studentStatus[i].TaiKhoan === taikhoan && response.data.studentStatus[i].MatKhau === matkhau) {

                    setID(response.data.studentStatus[i].MaSV)
                    setName(response.data.studentStatus[i].TenSV)
                    setPhone(response.data.studentStatus[i].SoDienThoai)
                    setEmail(response.data.studentStatus[i].Email)
                    setTaikhoan(response.data.studentStatus[i].TaiKhoan)
                    setMatkhau(response.data.studentStatus[i].MatKhau)
                }
            }
        }

        getStudentStatus()

    }, [check])

    const handleUpdateAccount = async () => {
        let response = await axios.post('http://localhost:8000/updateStudentAccount', { id, taikhoan, matkhau });
        let response2 = await axios.post('http://localhost:8000/studentStatus2', { id });
        // console.log(response2.data.studentStatus[0]);
        localStorage.setItem('taikhoanSV', taikhoan)
        localStorage.setItem('matkhausv', matkhau)
        // console.log(tk);
        // console.log(mk);
        window.location.reload()
    }

    return (
        <div id='main-workplace'>
            <form id='input' onSubmit={handleSubmit}>
                <div className='input-form'>
                    <p className='label'>Mã sinh viên:</p>
                    <p className='id-data'>{id}</p>
                </div>
                <div className='input-form'>
                    <p className='label'>Tên sinh viên:</p>
                    <p className='name-data'>{name}</p>
                    {/* <div id='arrow'></div> */}
                    <input placeholder='Nhập tên mới' className='name-input input-box' name='name' autoComplete='off'></input>
                </div>
                <div className='input-form'>
                    <p className='label'>Số điện thoại:</p>
                    <p className='phone-data'>{phone}</p>
                    {/* <div id='arrow'></div> */}
                    <input placeholder='Nhập số điện thoại mới' className='phone-input input-box' name='phone' autoComplete='off'></input>
                </div>
                <div className='input-form'>
                    <p className='label email'>Email:</p>
                    <p className='email-data'>{email}</p>
                    {/* <div id='arrow' className='email'></div> */}
                    <input placeholder='Nhập email mới' className='email-input input-box' name='email' autoComplete='off'></input>
                </div>
                <div id='btn-box'>
                    <div className='side'></div>
                    <button id='student-submit' >Sửa/Cập nhật thông tin</button>
                    <div className='side'></div>
                </div>
            </form>
            <form id='input2'>
                <p>Thông tin tài khoản</p>  
                <label for="newAccount" id='label1'><i>Tài khoản hiện tại:</i> {tk}</label>
                <input autoComplete='off' onChange={(e) => setTaikhoan(e.target.value)} placeholder='nhập tài khoản mới' name='newAccount'></input>
                <label for="newPassword" id='label2'><i>Mật khẩu hiện tại:</i> {mk}</label>
                <input autoComplete='off' onChange={(e) => setMatkhau(e.target.value)} placeholder='nhập mật khẩu mới' name='newPassword'></input>
                <button type='button' id='account-submit' onClick={handleUpdateAccount}>Cập nhật thông tin tài khoản</button>
            </form>
        </div>
    )
}

export default StudentStatus;