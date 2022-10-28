import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Teachers from './components/teacher/Teachers'
import AddTeacher from './components/teacher/AddTeacher'
import EditTeacher from './components/teacher/EditTeacher'
import ViewTeacher from './components/teacher/ViewTeacher'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { teacherContext } from './context/teacherContext'

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
import { confirmAlert } from 'react-confirm-alert';
import _ from 'lodash';
//import { teacherSchema } from './validations/TeacherValidations' ;
//import {AddTeacher,Teachers,Teacher,EditTeacher,ViewTeacher} from './components/teacher/index';
const App = () => {
  const [Loading, setLoading] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [filteredTeachers, setFilteredTeachers] = useState([])
  //const [errors,setErrors]=useState([])
  const [groups, setGroups] = useState([])
  const [teacher, setTeacher] = useState({})
  //const [teacherQuery, setTeacherQuery] = useState({ text: '' })
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

  const createTeacherForm = async (values) => {
    //event.preventDefault()
    try {
    setLoading((prevLoading)=>!prevLoading);
    //await teacherSchema.validate(teacher,{abortEarly:false});
      const { status,data } = await createTeacher(values)
      if (status === 201) {
        const allTeachers=[...teachers,data];
        setTeachers(allTeachers);
        setFilteredTeachers(allTeachers);
       // setTeacher({});
       // setErrors([]);
        setLoading((prevLoading)=>!prevLoading);
        
        Navigat('/teachers')
      }
    } catch (err) {
      console.log(err.inner);
     // setErrors(err.inner)
      setLoading((prevLoading)=>!prevLoading)
       
    }
  }

  const onTeacherChange = event => {
    setTeacher({ ...teacher, [event.target.name]: event.target.value })
  }
  const confirmDelete = (teacherId, teacherFullName) => {
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
    const allTeachers=[...teachers];
    try {
     // setLoading(true)
      
      const updateTeachers=teachers.filter(c=>c.id !== teacherId);
      setTeachers(updateTeachers);
      setFilteredTeachers(updateTeachers);
      const {status}=await deleteTeacher(teacherId);
      if (status !== 200) {
       setTeachers(allTeachers);
      setFilteredTeachers(allTeachers);
       // setLoading(false)
      }
    } catch (err) {
      console.log(err.message);
      setTeachers(allTeachers);
      setFilteredTeachers(allTeachers);
     // setLoading(false)
    }
  }
  let filterTimeout;
  const teacherSearch =_.debounce( (query) => {
 //   setTeacherQuery({ ...teacherQuery, text: event.target.value });
    console.log(query);
    if (!query) return setFilteredTeachers( [...teachers]);
   // clearTimeout(filterTimeout);
   // filterTimeout=setTimeout(()=>{
    setFilteredTeachers( teachers.filter(teacher => {
      return (
        teacher.fullname.toLowerCase()

          .includes(
            query.toLowerCase()
          )
      )
    })
   )
  //},1000)
  },1000)
  
  return (
    <teacherContext.Provider
      value={{
        Loading,
        setLoading,
        teacher,
        setTeacher,
        teachers,
        setTeachers,
        filteredTeachers,
        setFilteredTeachers,
       // errors,
       // teacherQuery,
        groups,
        onTeacherChange,
        deleteTeacher: confirmDelete,
      //  updateTeacher,
      createTeacher:createTeacherForm,
        teacherSearch
      }}
    >
      <div className='App'>
        <Navbar />

        <Routes>
          <Route path='/' element={<Navigate to='/teachers' />} />
          <Route
            path='/teachers'
            element={
              <Teachers
               // Teachers={filteredTeachers}
                //Loading={Loading}
                //confirmDelete={confirmDelete}
              />
            }
          />

          <Route
            path='/teachers/add'
            element={
              <AddTeacher
               
              />
            }
          />
          <Route path='/teachers/edit/:teacherId' element={<EditTeacher />} />
          <Route path='/teachers/view/:teacherId' element={<ViewTeacher />} />
        </Routes>
      </div>
    </teacherContext.Provider>
  )
}

export default App
