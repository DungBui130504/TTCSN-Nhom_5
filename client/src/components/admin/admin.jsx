import React, { useState } from 'react';
import style from './admin.module.css';
import { IoIosArrowBack } from "react-icons/io";
import TeacherManagement from './ManageTeacher/TeacherManagement';
import { useNavigate, Outlet } from 'react-router-dom';

const Admin = () => {
    let option = ['Quản lí giảng viên', 'Quản lí sinh viên', 'Quản lí môn học', 'Quản lí lớp học', 'Thoát']
    let option2 = ['them', 'sua', 'xoa', 'xem']
    const [choosed, setChoosed] = useState(option[0])
    const [choosed2, setChoosed2] = useState(option2[0])
    const [choosed3, setChoosed3] = useState(option2[0])
    const [choosed4, setChoosed4] = useState(option2[0])
    const [choosed5, setChoosed5] = useState(option2[0])
    const [choosed6, setChoosed6] = useState(option2[0])
    let navigate = useNavigate()

    return (
        <div className={style["admin-dashboard"]}>
            <div className={style["nav"]}>
                <div className={style["nav-header"]}></div>
                <ul>
                    {/* Giang vien */}
                    <li
                        style={choosed == option[0] ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: '' }}
                        onClick={e => { setChoosed(option[0]); navigate('/admin/manage_teacher') }}
                    >
                        <p>Quản lí giảng viên <IoIosArrowBack className={style['icon']} style={choosed == option[0] ? { transform: 'rotate(-90deg)' } : {}} /></p>
                    </li>
                    <ul className={style['teacher-nav']}
                        style={choosed == option[0] ? { height: '130px' } : { height: '0px' }}
                    >
                        <li
                            style={choosed2 == option2[0] ? { backgroundColor: '' } : { backgroundColor: '' }}
                            onClick={e => { setChoosed2(option2[0]) }}
                        >
                            <a href='#here'>Thêm giảng viên</a>
                        </li>
                        <li
                            style={choosed2 == option2[1] ? { backgroundColor: '' } : { backgroundColor: '' }}
                            onClick={e => { setChoosed2(option2[1]) }}
                        >
                            <a href='#here2'>Xem danh sách giảng viên</a>
                        </li>
                    </ul>
                    {/* Sinh vien */}
                    <li
                        style={choosed == option[1] ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: '' }}
                        onClick={e => { setChoosed(option[1]); navigate('/admin/manage_student') }}
                    >
                        <p>Quản lí sinh viên <IoIosArrowBack className={style['icon']} style={choosed == option[1] ? { transform: 'rotate(-90deg)' } : {}} /></p>
                    </li>
                    <ul className={style['teacher-nav']}
                        style={choosed == option[1] ? { height: '130px' } : { height: '0px' }}
                    >
                        <li
                            style={choosed3 == option2[0] ? { backgroundColor: '' } : { backgroundColor: '' }}
                            onClick={e => { setChoosed3(option2[0]) }}
                        >
                            <a href='#here3'>Thêm sinh viên</a>
                        </li>
                        <li
                            style={choosed3 == option2[1] ? { backgroundColor: '' } : { backgroundColor: '' }}
                            onClick={e => { setChoosed3(option2[1]) }}
                        >
                            <a href='#here4'>Xem danh sách sinh viên</a>
                        </li>
                    </ul>
                    {/* Mon hoc */}
                    <li
                        style={choosed == option[2] ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: '' }}
                        onClick={e => { setChoosed(option[2]); navigate('/admin/manage_subject') }}
                    >
                        <p>Quản lí môn học <IoIosArrowBack className={style['icon']} style={choosed == option[2] ? { transform: 'rotate(-90deg)' } : {}} /></p>
                    </li>
                    <ul className={style['teacher-nav']}
                        style={choosed == option[2] ? { height: '130px' } : { height: '0px' }}
                    >
                        <li
                            style={choosed4 == option2[0] ? { backgroundColor: '' } : { backgroundColor: '' }}
                            onClick={e => { setChoosed4(option2[0]) }}
                        >
                            <a href='#here5'>Thêm môn học</a>
                        </li>
                        <li
                            style={choosed4 == option2[1] ? { backgroundColor: '' } : { backgroundColor: '' }}
                            onClick={e => { setChoosed4(option2[1]) }}
                        >
                            <a href='#here6'>Xem danh sách môn</a>
                        </li>
                    </ul>
                    {/* Lop hoc */}
                    <li
                        style={choosed == option[3] ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: '' }}
                        onClick={e => { setChoosed(option[3]); navigate('/admin/manage_class') }}
                    >
                        <p>Quản lí lớp học <IoIosArrowBack className={style['icon']} style={choosed == option[3] ? { transform: 'rotate(-90deg)' } : {}} /></p>
                    </li>
                    <ul className={style['teacher-nav']}
                        style={choosed == option[3] ? { height: '130px' } : { height: '0px' }}
                    >
                        <li
                            style={choosed5 == option2[0] ? { backgroundColor: '' } : { backgroundColor: '' }}
                            onClick={e => { setChoosed5(option2[0]) }}
                        >
                            <a href='#here7'>Thêm lớp</a>
                        </li>
                        <li
                            style={choosed5 == option2[1] ? { backgroundColor: '' } : { backgroundColor: '' }}
                            onClick={e => { setChoosed5(option2[1]) }}
                        >
                            <a href='#here8'>Xem danh sách lớp</a>
                        </li>
                    </ul>
                    <li
                        style={choosed == option[4] ? { backgroundColor: '' } : { backgroundColor: '' }}
                        onClick={e => { setChoosed(option[4]) }}
                    >
                        <p onClick={() => { navigate('/') }}>Thoát</p>
                    </li>
                </ul>
            </div>
            <div className={style["workplace"]}>
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;