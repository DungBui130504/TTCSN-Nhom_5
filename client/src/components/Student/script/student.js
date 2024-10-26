import axios from 'axios';
import '../css/student.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

function Student() {
    let tk = localStorage.getItem('taikhoanSV')
    let mk = localStorage.getItem('matkhausv')
    const navigate = useNavigate();

    const [displayText, setDisplayText] = useState(''); // Chuỗi hiện tại trong h1
    const [isDeleting, setIsDeleting] = useState(false); // Trạng thái xóa
    const [index, setIndex] = useState(0); // Vị trí hiện tại trong chuỗi
    const [speed, setSpeed] = useState(200); // Tốc độ hiển thị
    const text = 'Welcome to student workplace      '; // Nội dung cần hiện lên từng chữ một

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isDeleting) {
                // Thêm từng chữ
                setDisplayText(text.substring(0, index + 1));
                setIndex(index + 1);

                // Nếu đã hiện hết chữ, chuyển sang xóa
                if (index + 1 === text.length) {
                    setIsDeleting(true);
                    setSpeed(50); // Chuyển tốc độ chậm lại khi bắt đầu xóa
                }
            } else {
                // Xóa từng chữ
                setDisplayText(text.substring(0, index - 1));
                setIndex(index - 1);

                // Nếu xóa hết chữ, lặp lại việc hiển thị
                if (index === 0) {
                    setIsDeleting(false);
                    setSpeed(200); // Khôi phục tốc độ ban đầu
                }
            }
        }, speed);

        return () => clearTimeout(timer); // Dọn dẹp timeout khi component unmount
    }, [index, isDeleting, speed, text]);

    useEffect(() => {
        const getStudentStatus = async () => {
            const myResponse = await axios.post('http://localhost:8000/studentID', { tk, mk });
            // console.log(myResponse.data.resData[0].MaSV);
            localStorage.setItem('id', myResponse.data.resData[0].MaSV)
        }

        getStudentStatus()
    }, [])

    const handleSignOut = () => {
        setTimeout(() => {
            navigate('/')
        }, 500)
    }

    const update = () => {
        navigate('/student/student_status')
    }

    const mark = () => {
        navigate('/student/mark')
    }

    const subject = () => {
        navigate('/student/subject')
    }

    const timetable = () => {
        navigate('/student/timetable')
    }

    return (
        <div id="main-background">
            <div id='student-dashboard'>
                <div id='nav'>
                    <div id='head'>
                        <div id='logo'></div>
                    </div>
                    <div id='status' onClick={update}>
                        <a id='tag'>Cập nhật thông tin</a>
                    </div>
                    <div id='status' onClick={mark}>
                        <a id='tag'>Xem điểm</a>
                    </div>
                    <div id='status' onClick={subject}>
                        <a id='tag'>Xem môn học</a>
                    </div>
                    <div id='status' onClick={timetable}>
                        <a id='tag'>Xem thời khóa biểu</a>
                    </div>
                    <div id='status' className='signOut' onClick={handleSignOut}>
                        <a id='tag'>Đăng xuất</a>
                    </div>
                </div>
                <div id='workplace'>
                    <div id='content'>
                        <h1 className='content'>{displayText}</h1>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Student;