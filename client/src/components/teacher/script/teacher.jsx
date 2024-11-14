import React, { useEffect, useState } from 'react';
import style from '../css/teacher.module.css';
import { useNavigate, Outlet } from 'react-router-dom';
import TeacherInfor from './teacherInfor';
import axios from 'axios';
import { FaUserEdit } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { FaBusinessTime } from "react-icons/fa";
import { FaMarker } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const Teacher = () => {
    const [teachername, setTeacherName] = useState('Lỗi khi tải tên')
    const navigate = useNavigate()
    let taikhoan = localStorage.getItem('taikhoanSV')
    let matkhau = localStorage.getItem('matkhausv')
    const option = [0, 1, 2, 3]
    const [choose, setChoose] = useState(option[0])

    useEffect(() => {
        const fetchTeacherData = async () => {
            let response = await axios.post('http://localhost:8000/teacher', { taikhoan, matkhau });
            // console.log(response.data);
            setTeacherName(response.data.teacher[0].TenGV)
        }

        fetchTeacherData();
    }, [])

    const handleUpdateStatus = () => {
        setChoose(option[0])
        navigate('/teacher/teacher_infor')
    }

    const handleGetSubject = () => {
        setChoose(option[1])
        navigate('/teacher/teacher_subject')
    }

    const handleGetTimeTable = () => {
        setChoose(option[2])
        navigate('/teacher/teacher_timetable')
    }

    const handleUpdateMark = () => {
        setChoose(option[3])
        navigate('/teacher/teacher_update_mark')
    }

    const handleSignOut = () => {
        navigate("/")
    }

    return (
        <div className={style["teacher-dashboard"]}>
            <div id={style['nav-container']}>
                <div id={style['nav']}>
                    <div className={style["logo"]}></div>
                    <ul id={style['nav-menu']}>
                        <li onClick={handleUpdateStatus} style={choose == option[0] ? { backgroundColor: '#E3DFEE' } : {}}>
                            <a id={style['link']} ><FaUserEdit style={{ color: '#322B56', marginBottom: '5px' }} /></a>
                            <p className={style["nav-title"]}>Thông tin tài khoản</p>
                        </li>
                        <li onClick={handleGetSubject} style={choose == option[1] ? { backgroundColor: '#E3DFEE' } : {}}>
                            <a id={style['link']} ><IoBookSharp style={{ color: '#322B56', marginBottom: '5px' }} /></a>
                            <p className={style["nav-title"]}>Môn học và lớp học</p>
                        </li>
                        <li onClick={handleGetTimeTable} style={choose == option[2] ? { backgroundColor: '#E3DFEE' } : {}}>
                            <a id={style['link']} ><FaBusinessTime style={{ color: '#322B56', marginBottom: '5px' }} /></a>
                            <p className={style["nav-title"]}>Lịch giảng dạy</p>
                        </li>
                        <li onClick={handleUpdateMark} style={choose == option[3] ? { backgroundColor: '#E3DFEE' } : {}}>
                            <a id={style['link']} >< FaMarker style={{ color: '#322B56', marginBottom: '5px' }} /></a>
                            <p className={style["nav-title"]}>Sửa điểm</p>
                        </li>
                        <li onClick={handleSignOut}>
                            <a id={style['link']} >< IoLogOut style={{ color: '#322B56', marginBottom: '5px' }} /></a>
                            <p className={style["nav-title"]}>Đăng xuất</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div id={style['teacher-workplace']}>
                <div className={style["main-workplace"]}>
                    <div className={style["workplace-header"]}>
                        <p>Trang hoạt động của giảng viên</p>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Teacher;
