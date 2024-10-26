import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Student from './components/Student/script/student'
import HomePage from './components/Home/script/homePage';
import Teacher from './components/teacher/teacher';
import Admin from './components/admin/admin';
import StudentStatus from './components/Student/script/student_status';
import Mark from './components/Student/script/mark';
import Subject from './components/Student/script/subject';
import Timetable from './components/Student/script/timetable';

function App() {
  const [taikhoanSV, setTaikhoansv] = useState('')
  const [matkhausv, setMatkhausv] = useState('')

  const getStudentID = (data1, data2) => {
    setTaikhoansv(data1)
    setMatkhausv(data2)

    localStorage.setItem('taikhoanSV', data1)
    localStorage.setItem('matkhausv', data2)

    // console.log(`tai khoan: ${data1}`);

    // console.log(`tai khoan duoc luu: ${localStorage.getItem('taikhoanSV')}`);
  };



  return (
    <Router>
      <Routes>

        <Route path='/' element={<HomePage sendData={getStudentID} />} />

        <Route path='/student' element={<Student />} >
          <Route path='' element={<StudentStatus />} />

          <Route path='student_status' element={<StudentStatus />} />

          <Route path='mark' element={<Mark />} />

          <Route path='subject' element={<Subject />} />

          <Route path='timetable' element={<Timetable />} />

        </Route>

        <Route path='/teacher' element={<Teacher />} />

        <Route path='/admin' element={<Admin />} />

      </Routes>
    </Router>
  )
}

export default App;
