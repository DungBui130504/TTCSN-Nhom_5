import axios from 'axios';
import '../css/student_status.css';
import React, { useState, useEffect } from 'react';

function StudentStatus() {
    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [birth, setBirth] = useState('')
    const [tinh, setTinh] = useState('')
    const [xa, setXa] = useState('')
    const [huyen, setHuyen] = useState('')
    const [check, setCheck] = useState(false)
    let tk = localStorage.getItem('taikhoanSV')
    let mk = localStorage.getItem('matkhausv')
    const [taikhoan, setTaikhoan] = useState(tk)
    const [matkhau, setMatkhau] = useState(mk)

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()

            let Name = event.target.elements.name.value;
            let Phone = event.target.elements.phone.value;
            let Email = event.target.elements.email.value;
            let Birth = event.target.elements.birth.value;
            let Xa = event.target.elements.xa.value;
            let Huyen = event.target.elements.huyen.value;
            let Tinh = event.target.elements.tinh.value;

            if (Name === '') {
                Name = name
            }

            if (Phone === '') {
                Phone = phone
            }

            if (Email === '') {
                Email = email
            }
            if (Birth === '') {
                Birth = birth
            }
            if (Xa === '') {
                Xa = xa
            }
            if (Huyen === '') {
                Huyen = huyen
            }
            if (Tinh === '') {
                Tinh = tinh
            }

            const response = await axios.post('http://localhost:8000/updateStudent', { id, Name, Phone, Email, tk, mk, Birth, Xa, Huyen, Tinh });

            setCheck(!check)

            window.alert('Thành công!')
        }
        catch (err) {
            console.log(err);
            window.alert('Khong the chinh sua!')
        }

    }

    useEffect(() => {
        const getStudentStatus = async () => {
            const response = await axios.post('http://localhost:8000/studentStatus');
            console.log(response.data);


            for (let i = 0; i < response.data.studentStatus.length; i++) {
                if (response.data.studentStatus[i].TaiKhoan === taikhoan && response.data.studentStatus[i].MatKhau === matkhau) {

                    setID(response.data.studentStatus[i].MaSV)
                    setName(response.data.studentStatus[i].TenSV)
                    setPhone(response.data.studentStatus[i].SoDienThoai)
                    setEmail(response.data.studentStatus[i].Email)
                    setTaikhoan(response.data.studentStatus[i].TaiKhoan)
                    setMatkhau(response.data.studentStatus[i].MatKhau)
                    setBirth(response.data.studentStatus[i].NgaySinh)
                    setXa(response.data.studentStatus[i].Xa)
                    setHuyen(response.data.studentStatus[i].Huyen)
                    setTinh(response.data.studentStatus[i].Tinh)
                }
            }
        }

        getStudentStatus()

    }, [check])

    const handleUpdateAccount = async () => {
        try {
            let response = await axios.post('http://localhost:8000/updateStudentAccount', { id, taikhoan, matkhau });
            let response2 = await axios.post('http://localhost:8000/studentStatus2', { id });
            // console.log(response2.data.studentStatus[0]);
            localStorage.setItem('taikhoanSV', taikhoan)
            localStorage.setItem('matkhausv', matkhau)
            window.alert('Thành công!')
            window.location.reload()
        } catch (error) {
            console.log(error);
            window.alert('Khong the sua!')
        }
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
                <div className='input-form email'>
                    <p className='label email'>Email:</p>
                    <p className='email-data'>{email}</p>
                    {/* <div id='arrow' className='email'></div> */}
                    <input placeholder='Nhập email mới' className='email-input input-box' name='email' autoComplete='off'></input>
                </div>
                <div className='input-form'>
                    <p className='label birth'>Ngày sinh:</p>
                    <p className='birth-data'>{birth}</p>
                    {/* <div id='arrow' className='email'></div> */}
                    <input placeholder='Nhập ngày sinh mới' className='birth-input input-box' name='birth' autoComplete='off'></input>
                </div>
                <div className='address'>
                    <div className='input-form'>
                        <p className='xa'>Xã:</p>
                        <input placeholder={xa} className='input-xa' name='xa' autoComplete='off'></input>
                    </div>
                    <div className='input-form'>
                        <p className='huyen'>Huyện:</p>
                        <input placeholder={huyen} className='input-huyen' name='huyen' autoComplete='off'></input>
                    </div>
                    <div className='input-form'>
                        <p className='tinh'>Tỉnh:</p>
                        <input placeholder={tinh} className='input-tinh' name='tinh' autoComplete='off'></input>
                    </div>
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