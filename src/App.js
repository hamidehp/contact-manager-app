import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Teachers from './components/teacher/Teachers'
import AddTeacher from './components/teacher/AddTeacher'
import EditTeacher from './components/teacher/EditTeacher'
import ViewTeacher from './components/teacher/ViewTeacher'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'

import {
  CURRENTLINE,
  PURPLE,
  YELLOW,
  FORGROUND,
  COMMENT
} from './helpers/color'

import {
  getAllTeachers,
  getAllGroups,
  createTeacher,
  deleteTeacher
} from './services/TeacherService'
import { confirmAlert } from 'react-confirm-alert'
//import {AddTeacher,Teachers,Teacher,EditTeacher,ViewTeacher} from './components/teacher/index';
const App = () => {
  const [Loading, setLoading] = useState(false)
  const [getTeachers, setTeachers] = useState([])
  const [getFilteredTeachers,setFilteredTeachers]=useState([]);
  const [forceRender, setforceRender] = useState(false)
  const [getGroups, setGroups] = useState([])
  const [getTeacher, setTeacher] = useState({
    fullname: '',
    photo: '',
    mobile: '',
    email: '',
    job: '',
    group: ''
  })
  const [query, setQuery] = useState({ text: "" })
  const Navigat = useNavigate()
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const { data: teachersData } = await getAllTeachers()

        const { data: groupsData } = await getAllGroups()

        setTeachers(teachersData)
        setFilteredTeachers(teachersData)
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
        setTeacher({})
        setforceRender(!forceRender)
        Navigat('/teachers')
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const setTeacherInfo = event => {
    setTeacher({ ...getTeacher, [event.target.name]: event.target.value })
  }
  const confirm = (teacherId, teacherFullName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir='rtl'
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid${PURPLE}`,
              borderRadius: '1em'
            }}
            className='p-4'
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مدرس</h1>
            <p style={{ color: FORGROUND }}>
              آیا از حذف مدرس {teacherFullName} مطمئن هستید؟
            </p>
            <button
              onClick={() => {
                removeTeacher(teacherId)
                onClose()
              }}
              className='btn mx-2'
              style={{ backgroundColor: PURPLE }}
            >
              تایید{' '}
            </button>
            <button
              onClick={onClose}
              className='btn'
              style={{ backgroundColor: COMMENT }}
            >
              انصراف{' '}
            </button>
          </div>
        )
      }
    })
  }
  const removeTeacher = async teacherId => {
    try {
      setLoading(true)
      const response = await deleteTeacher(teacherId)
      if (response) {
        const { data: teachersData } = await getAllTeachers()
        setTeachers(teachersData)
        setLoading(false)
      }
    } catch (err) {
      console.log(err.message)
      setLoading(false)
    }
  }
  const teacherSearch = (event) => {
    setQuery({ ...query, text:event.target.value })
    const allTeachers = getTeachers.filter((teacher) => {
      return teacher.fullname
      // .toLowerCase()
        
        .includes(event.target.value
          // .toLowerCase()
          );

    })
    setFilteredTeachers(allTeachers);
  }
  return (
    <div className='App'>
      <Navbar query={query} search={teacherSearch} />

      <Routes>
        <Route path='/' element={<Navigate to='/teachers' />} />
        <Route
          path='/teachers'
          element={
            <Teachers
              Teachers={getFilteredTeachers}
              Loading={Loading}
              confirmDelete={confirm}
            />
          }
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
        <Route
          path='/teachers/edit/:teacherId'
          element={
            <EditTeacher
              forceRender={forceRender}
              setforceRender={setforceRender}
            />
          }
        />
        <Route path='/teachers/view/:teacherId' element={<ViewTeacher />} />
      </Routes>
    </div>
  )
}

export default App
