import { React, useEffect, useState } from "react";
import '../css/homePage.css'
import Button from "./button";
import use from '../../../images/use.gif'
import use2 from '../../../images/use2.gif'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

let check = false

function go1() {
    const label = document.getElementById('tk-label')
    label.style.marginLeft = '260px'

    setTimeout(() => {
        label.style.marginLeft = '0px'
    }, 2000)
}

function go2() {
    const label = document.getElementById('mk-label')
    label.style.marginLeft = '260px'

    setTimeout(() => {
        label.style.marginLeft = '0px'
    }, 2000)
}

function go3() {
    const a = document.getElementById('myA')
    const p = document.getElementById('myP')
    const wrapper = document.getElementById('wrapper')
    const left = document.getElementById('left')
    const pic = document.getElementById('pic')
    const login_wrapper = document.getElementById('login-wrapper')
    a.style.marginRight = '245px'
    // a.style.opacity = '0'

    setTimeout(() => {
        a.style.marginRight = '0px'
    }, 2000)

    if (check == true) {
        p.textContent = 'Light Mode'
        p.style.color = 'black'

        wrapper.style.backgroundImage = 'linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99)'
        left.style.backgroundColor = '#CE0D62'
        login_wrapper.style.opacity = '70%'
        pic.style.backgroundImage = `url(${use})`
        pic.style.borderRight = '5px solid #25210a'

        check = false
    }
    else {
        p.textContent = 'Dark Mode'
        p.style.color = 'white'

        wrapper.style.backgroundImage = 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'
        left.style.backgroundColor = 'white'
        login_wrapper.style.opacity = '1'
        pic.style.backgroundImage = `url(${use2})`
        pic.style.borderRight = '5px solid #efd124'

        check = true
    }
}

function HomePage({ sendData }) {
    const navigate = useNavigate();
    const [taikhoan, setTaiKhoan] = useState('no')
    const [matkhau, setMatKhau] = useState('no')
    const [user, setUser] = useState(null)
    const [id, setID] = useState('')

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setUser(selectedValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(taikhoan, matkhau);

        sendData(taikhoan, matkhau);

        try {
            // console.log(user);

            switch (parseInt(user)) {
                case 0:
                    {
                        const response1 = await axios.post('http://localhost:8000/student', { taikhoan, matkhau });
                        // console.log(`Du lieu tu bang SinhVien: ${response1.data.student}`);
                        localStorage.setItem('id', response1.data.student[0].MaSV)
                        // console.log(response1.data.student[0].MaSV);


                        if (response1.data.check == 1) {
                            console.log('Dang nhap tai khoan sinh vien thanh cong!');

                            navigate('/student')
                        }
                        else {
                            console.log('Khong tim thay tai khoan sinh vien');
                        }

                        break;
                    }
                case 1:
                    {
                        const response2 = await axios.post('http://localhost:8000/teacher', { taikhoan, matkhau });
                        // console.log(response2.data.teacher[0].MaGV);
                        localStorage.setItem('id', response2.data.teacher[0].MaGV)

                        if (response2.data.check == 1) {
                            console.log('Dang nhap tai khoan giang vien thanh cong!');
                            navigate('/teacher')
                        }
                        else {
                            console.log('Khong tim thay tai khoan giang vien');
                        }

                        break;
                    }
                case 2:
                    {
                        const response3 = await axios.post('http://localhost:8000/admin', { taikhoan, matkhau });
                        // console.log(`Du lieu tu bang Adminn: ${response3.data.check}`);
                        localStorage.setItem('id', response3.data.admin[0].MaAdmin)

                        if (response3.data.check == 1) {
                            console.log('Dang nhap tai khoan admin thanh cong!');
                            navigate('/admin')
                        }
                        else {
                            console.log('Khong tim thay tai khoan admin');
                        }

                        break;
                    }
            }

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }

        // const getStudentStatus = async () => {
        //     const myResponse = await axios.post('http://localhost:8000/studentID', { taikhoan, matkhau });
        //     console.log(myResponse.data);
        //     setID('')
        // }

        // getStudentStatus();
    };

    return (
        <div id="wrapper">
            <p className="extra">Sinh viên: tk: 'sinhvien8' ; mk: 'sv123@'</p>
            <p className="extra x">Giảng viên: tk: 'gv06' ; mk: 'gvpassword6'</p>
            <p className="extra y">Admin: tk: 'nhom8' ; mk: '123'</p>
            <div id="login-wrapper">
                <div className="left-side" id="left">
                    <div className="img" id="pic"></div>
                </div>
                <div className="right-side" id="right">
                    <h2>Đăng nhập</h2>
                    <form id="form" onSubmit={handleSubmit}>
                        <label htmlFor="tk" id="tk-label">Tài khoản</label>
                        <input type="text" name="tk" className="tk" onClick={go1} onChange={(e) => { setTaiKhoan(e.target.value) }} autoComplete="off" />
                        <label htmlFor="mk" id="mk-label">Mật khẩu</label>
                        <input type="password" name="mk" className="mk" onClick={go2} onChange={(e) => { setMatKhau(e.target.value) }} autoComplete="off" />
                        <label htmlFor="slct" className="select">
                            <select id="slct" required className="mySelect" onChange={handleSelectChange} defaultValue={user}>
                                <option value="-1" disabled selected>
                                    Chọn loại tài khoản
                                </option>
                                <option value="0">Sinh Viên</option>
                                <option value="1">Giảng Viên</option>
                                <option value="2">Admin</option>
                            </select>
                            <svg className="select-arrow">
                                <use xlinkHref="#select-arrow-down" />
                            </svg>
                            <svg className="sprites" style={{ display: 'none' }}>
                                <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                    <polyline points="1 1 5 5 9 1" />
                                </symbol>
                            </svg>
                        </label>
                        <a href="#" id="myA" onClick={go3}>
                            <p id="myP">Light Mode</p>
                        </a>
                        <Button />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HomePage;