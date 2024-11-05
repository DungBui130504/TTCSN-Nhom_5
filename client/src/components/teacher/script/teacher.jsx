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

    useEffect(() => {
        const fetchTeacherData = async () => {
            let response = await axios.post('http://localhost:8000/teacher', { taikhoan, matkhau });
            // console.log(response.data.teacher[0].TenGV);
            setTeacherName(response.data.teacher[0].TenGV)
        }

        fetchTeacherData();
    }, [])

    const handleUpdateStatus = () => {
        navigate('/teacher/teacher_infor')
    }

    const handleGetSubject = () => {
        navigate('/teacher/teacher_subject')
    }

    const handleGetTimeTable = () => {
        navigate('/teacher/teacher_timetable')
        window.location.reload()
    }

    const handleUpdateMark = () => {
        navigate('/teacher/teacher_update_mark')
    }

    const handleSignOut = () => {
        navigate("/")
    }

    return (
        <div className={style["teacher-dashboard"]}>
            <div id={style['nav-container']}>
                <div id={style['nav-title']}></div>
                <div id={style['nav']}>
                    <ul id={style['nav-menu']}>
                        <li onClick={handleUpdateStatus}>
                            <a id={style['link']} ><FaUserEdit id={style['user-icon']} /></a>
                            <p className={style["nav-title"]}>Thông tin tài khoản</p>
                        </li>
                        <li onClick={handleGetSubject}>
                            <a id={style['link']} ><IoBookSharp id={style["teaching-subject"]} /></a>
                            <p className={style["nav-title"]}>Môn học đang giảng dạy</p>
                        </li>
                        <li onClick={handleGetTimeTable}>
                            <a id={style['link']} ><FaBusinessTime id={style["teaching-time"]} /></a>
                            <p className={style["nav-title"]}>Xem lịch giảng dạy</p>
                        </li>
                        <li onClick={handleUpdateMark}>
                            <a id={style['link']} >< FaMarker id={style["update-mark"]} /></a>
                            <p className={style["nav-title"]}>Chỉnh sửa điểm sinh viên</p>
                        </li>
                        <li onClick={handleSignOut}>
                            <a id={style['link']} >< IoLogOut id={style["log-out"]} /></a>
                            <p className={style["nav-title"]}>Đăng xuất</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div id={style['teacher-workplace']}>
                <div className={style["header"]}></div>
                <Outlet />
            </div>
        </div>
    );
};

export default Teacher;
