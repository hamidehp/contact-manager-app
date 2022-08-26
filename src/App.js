import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Teachers from './components/teacher/Teachers'
import Teacher from './components/teacher/Teacher'
import AddTeacher from './components/teacher/AddTeacher'
import EditTeacher from './components/teacher/EditTeacher'
import ViewTeacher from './components/teacher/ViewTeacher'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'

import {
  getAllTeachers,
  getAllGroups,
  createTeacher
} from './services/TeacherService'
//import {AddTeacher,Teachers,Teacher,EditTeacher,ViewTeacher} from './components/teacher/index';
const App = () => {
  const [Loading, setLoading] = useState(false)
  const [getTeachers, setTeachers] = useState([])
  const [forceRender, setforceRender] = useState(false)
  // const [getTeacher, setTeacher] = useState([]);
  const [getGroups, setGroups] = useState([])
  const [getTeacher, setTeacher] = useState({
    fullname: '',
    photo: '',
    mobile: '',
    email: '',
    job: '',
    group: ''
  })

  const Navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const { data: teachersData } = await getAllTeachers()

        const { data: groupsData } = await getAllGroups()

        setTeachers(teachersData)

        setGroups(groupsData)

        setLoading(false)
      } catch (err) {
        console.log(err.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const { data: teachersData } = await getAllTeachers()

        setTeachers(teachersData)

        setLoading(false)
      } catch (err) {
        console.log(err.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [forceRender])
  const createTeacherForm = async event => {
    event.preventDefault()
    try {
      const { status } = await createTeacher(getTeacher)
      if (status === 201) {
        setTeacher({});
        setforceRender(!forceRender);
        Navigate('/teachers');
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const setTeacherInfo = event => {
    setTeacher({ ...getTeacher, [event.target.name]: event.target.value })
  }

  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Navigate to='/teachers' />} />
        <Route
          path='/teachers'
          element={<Teachers Teachers={getTeachers} Loading={Loading} />}
        />

        <Route
          path='/teachers/add'
          element={
            <AddTeacher
              Loading={Loading}
              setTeacherInfo={setTeacherInfo}
              teacher={getTeacher}
              groups={getGroups}
              createTeacherForm={createTeacherForm}
            />
          }
        />
        <Route path='/teachers/:teacherId' element={<Teacher />} />
        <Route path='/teachers/edit/:teacherId' element={<EditTeacher />} />
        <Route path='/teachers/view/:teacherId' element={<ViewTeacher Loading={Loading} teacher={getTeacher} group={getGroups}/>} />
      </Routes>
    </div>
  )
}

export default App
