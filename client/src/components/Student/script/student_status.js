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

    const handleSubmit = async (event) => {
        event.preventDefault()

        // Sử dụng elements để lấy giá trị
        // let ID = event.target.elements.id.value;
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

        // console.log(id);


        const response = await axios.post('http://localhost:8000/updateStudent', { id, Name, Phone, Email, tk, mk });

        console.log(response);

        setCheck(!check)

    }

    useEffect(() => {
        const getStudentStatus = async () => {
            const response = await axios.post('http://localhost:8000/studentStatus');
            // console.log(`tai khoan duoc lay: ${localStorage.getItem('taikhoanSV')}`);

            for (let i = 0; i < response.data.studentStatus.length; i++) {
                if (response.data.studentStatus[i].TaiKhoan === localStorage.getItem('taikhoanSV') && response.data.studentStatus[i].MatKhau === localStorage.getItem('matkhausv')) {

                    setID(response.data.studentStatus[i].MaSV)
                    setName(response.data.studentStatus[i].TenSV)
                    setPhone(response.data.studentStatus[i].SoDienThoai)
                    setEmail(response.data.studentStatus[i].Email)
                }
            }
        }

        getStudentStatus()
    }, [check])

    return (
        <div id='main-workplace'>
            <form id='input' onSubmit={handleSubmit}>
                <div className='input-form'>
                    <p className='label'>Mã sinh viên:</p>
                    <p className='id-data'>{id}</p>
                    {/* <div id='arrow'></div> */}
                    {/* <input placeholder='Nhập mã mới' className='ID-input input-box' name='id'></input> */}
                </div>
                <div className='input-form'>
                    <p className='label'>Tên sinh viên:</p>
                    <p className='name-data'>{name}</p>
                    <div id='arrow'></div>
                    <input placeholder='Nhập tên mới' className='name-input input-box' name='name'></input>
                </div>
                <div className='input-form'>
                    <p className='label'>Số điện thoại:</p>
                    <p className='phone-data'>{phone}</p>
                    <div id='arrow'></div>
                    <input placeholder='Nhập số điện thoại mới' className='phone-input input-box' name='phone'></input>
                </div>
                <div className='input-form'>
                    <p className='label email'>Email:</p>
                    <p className='email-data'>{email}</p>
                    <div id='arrow' className='email'></div>
                    <input placeholder='Nhập email mới' className='email-input input-box' name='email'></input>
                </div>
                <div id='btn-box'>
                    <div className='side'></div>
                    <button id='student-submit' >Sửa/Cập nhật thông tin</button>
                    <div className='side'></div>
                </div>
            </form>
            <div id='lamp'></div>
        </div>
    )
}

export default StudentStatus;