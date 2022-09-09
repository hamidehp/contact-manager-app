import { useEffect } from 'react'
import { useState } from 'react'
import { teacherContext } from '../../context/teacherContext';
import { useContext } from 'react';
import { useNavigate, useParams ,Link} from 'react-router-dom'
import {
  getTeacher,
  updateTeacher
} from '../../services/TeacherService'
import Spinner from '../Spinner'
import { COMMENT,  PURPLE, ORANGE } from '../../helpers/color'

const EditTeacher = () => {
  const { teacherId } = useParams();
 
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({});
  const {Loading,groups,setLoading,teachers,setTeachers,setFilteredTeachers}=useContext(teacherContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: teacherData } = await getTeacher(teacherId)
        setLoading(false)
        setTeacher( teacherData)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchData();
  }, []);
  const onTeacherChange = event => {
    setTeacher({
      ...teacher,
       [event.target.name]: event.target.value
    })
  }
  const submitForm = async event => {
    event.preventDefault()
    try {
      setLoading(true)
      const { data,status } = await updateTeacher(teacher, teacherId)
      
      if (status ===200) {
        setLoading(false)
        const allTeachers=[...teachers];
        const teacherIndex=allTeachers.findIndex(c =>c.id ===parseInt(teacherId));
       // console.log(allTeachers[teacherIndex]);
        allTeachers[teacherIndex]={...data};
        //ضconsole.log(allTeachers[teacherIndex]);
        setTeachers(allTeachers);
        setFilteredTeachers(allTeachers);
        navigate('/teachers')
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
 
  return (
    <>
      {Loading ? (
        <Spinner />
      ) : (
        <>
          <section className='p-3'>
            <div className='container'>
              <div className='row my-2'>
                <div className='col text-center'>
                  <p className='h4 fw-bold' style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{backgroundColor:ORANGE}} />
              <div className='row p-2 w-75 mx-outo align-items-center' 
              style={{backgroundColor:"#44475a" , borderRadius:'1em'}}>
              <div className='col-md-8'>
                <form onSubmit ={submitForm}>
                <div className='mb-2'>
                      <input
                        name='fullname'
                        value={teacher.fullname}
                        onChange={onTeacherChange}
                        type='text'
                        className='form-control'
                        placeholder='نام و نام خانوادگی'
                        required={true}
                      />
                    </div>
                    <div className='mb-2'>
                      <input
                        name='photo'
                        value={teacher.photo}
                        onChange={onTeacherChange}
                        type='text'
                        className='form-control'
                        placeholder='آدرس تصویر'
                      />
                    </div>
                    <div className='mb-2'>
                      <input
                        name='mobile'
                        value={teacher.mobile}
                        onChange={onTeacherChange}
                        type='text'
                        className='form-control'
                        placeholder='شماره موبایل'
                        required={true}
                      />
                    </div>
                    <div className='mb-2'>
                      <input
                        name='email'
                        value={teacher.email}
                        onChange={onTeacherChange}
                        type='text'
                        className='form-control'
                        placeholder='آدرس ایمیل'
                      />
                    </div>
                    <div className='mb-2'>
                      <input
                        name='job'
                        value={teacher.job}
                        onChange={onTeacherChange}
                        type='text'
                        className='form-control'
                        placeholder='شغل'
                      />
                    </div>
                    <div className='mb-2'>
                      <select
                        name='group'
                        value={teacher.group}
                        onChange={onTeacherChange}
                        className='form-control'
                      >
                        <option value=''>انتخاب گروه</option>

                        {groups.length > 0 &&
                          groups.map(group => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className='mx-2'>
                      <input
                        type='submit'
                        className='btn'
                        style={{ backgroundColor: PURPLE }}
                        value='ویرایش مدرس'
                      />
                      <Link
                        to={'/teachers'}
                        className='btn mx-2'
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                </form>
              </div>
              <div className='col-md-4'>
              <img
                
                 src={(teacher.photo) ? teacher.photo : require("../../assets/placeholder_avatar.jpg")}
                alt={teacher.photo}
                style={{ border: `1px solid ${PURPLE}` }}
                className='img-fluid rounded'
              />
            </div>
              </div>
            </div>
            {/* <div className='text-center mt-1'>
            <img
                
                src={ require("../../assets/man-taking-note-png")}
               height ="300px"
               style={{opacity:"60%"}}
             />
            </div> */}
          </section>
        </>
      )}
    </>
  )
}
export default EditTeacher
