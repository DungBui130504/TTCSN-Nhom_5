import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Student from './components/Student/script/student'
import HomePage from './components/Home/script/homePage';
import Teacher from './components/teacher/script/teacher';
import Admin from './components/admin/admin';
import StudentStatus from './components/Student/script/student_status';
import Mark from './components/Student/script/mark';
import Subject from './components/Student/script/subject';
import Timetable from './components/Student/script/timetable';
import TeacherInfor from './components/teacher/script/teacherInfor';
import SubjectList from './components/teacher/script/subjectList';
import TeacherTimeTable from './components/teacher/script/teacherTimeTable';
import UpdateMark from './components/teacher/script/updateMark';
import TeacherManagement from './components/admin/ManageTeacher/TeacherManagement';
import ManageStudent from './components/admin/ManageStudent/ManageStudent';
import ManageSubject from './components/admin/ManageSubject/ManageSubject';
import ManageClass from './components/admin/ManageClass/ManageClass';

function App() {
  const [taikhoanSV, setTaikhoansv] = useState('')
  const [matkhausv, setMatkhausv] = useState('')

  const getStudentID = (data1, data2) => {
    setTaikhoansv(data1)
    setMatkhausv(data2)

    localStorage.setItem('taikhoanSV', data1)
    localStorage.setItem('matkhausv', data2)
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

        <Route path='/teacher' element={<Teacher />} >
          <Route path='' element={<TeacherInfor />} />

          <Route path='teacher_infor' element={<TeacherInfor />} />

          <Route path='teacher_subject' element={<SubjectList />} />

          <Route path='teacher_timetable' element={<TeacherTimeTable />} />

          <Route path='teacher_update_mark' element={<UpdateMark />} />

        </Route>

        <Route path='/admin' element={<Admin />} >
          <Route path='' element={<TeacherManagement />} />
          <Route path='manage_teacher' element={<TeacherManagement />} />
          <Route path='manage_student' element={<ManageStudent />} />
          <Route path='manage_subject' element={<ManageSubject />} />
          <Route path='manage_class' element={<ManageClass />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App;
