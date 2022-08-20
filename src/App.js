import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Teachers from './components/teacher/Teachers';
import Teacher from './components/teacher/Teacher';
import AddTeacher from './components/teacher/AddTeacher';
import EditTeacher from './components/teacher/EditTeacher';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getAllTeachers,getAllGroups} from './services/TeacherService';
//import {AddTeacher,Teachers,Teacher,EditTeacher,ViewTeacher} from './components/teacher/index';
const App = () => {
  const [Loading, setLoading] = useState(false);
  const [getTeachers, setTeachers] = useState([]);
  const [getGroups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: teachersData } = await getAllTeachers();
        
        const { data: groupsData } = await getAllGroups();
        

        setTeachers (teachersData) ;
       
        setGroups (groupsData) ;
        setLoading(false);
      } catch (err) {
        console.log(err.message)
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Navigate to='/teachers' />} />
        <Route
          path='/teachers'
          element={<Teachers Teachers={getTeachers} Loading={Loading} />}
        />

        <Route path='/teachers/add' element={<AddTeacher />} />
        <Route path='/teachers/:teacherId' element={<Teacher />} />
        <Route path='/teachers/edit/:teacherId' element={<EditTeacher />} />
      </Routes>
    </div>
  )
}

export default App
