import React, { useEffect, useState } from 'react';
import style from '../css/teacher.module.css';
import { useNavigate, Outlet } from 'react-router-dom';
import TeacherInfor from './teacherInfor';
import axios from 'axios';

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
                <div id={style['nav-title']}>
                    <p>TEACHER WORKPLACE</p>
                </div>
                <div id={style['nav']}>
                    <ul id={style['nav-menu']}>
                        <li>
                            <a id={style['link']} onClick={handleUpdateStatus}>Sửa thông tin</a>
                        </li>
                        <li>
                            <a id={style['link']} onClick={handleGetSubject}>Xem danh sách môn giảng dạy</a>
                        </li>
                        <li>
                            <a id={style['link']} onClick={handleGetTimeTable}>Xem lịch giảng dạy</a>
                        </li>
                        <li>
                            <a id={style['link']} onClick={handleUpdateMark}>Sửa điểm</a>
                        </li>
                        <li>
                            <a id={style['link']} onClick={handleSignOut}>Đăng xuất</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id={style['teacher-workplace']}>
                <div id={style["workplace-header"]}>
                    <p id={style["teacher-name"]}>Giảng viên: {teachername}</p>
                </div>
                <hr />
                <Outlet />
            </div>
        </div>
    );
};

export default Teacher;
