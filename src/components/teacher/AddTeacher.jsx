import { toBeRequired } from '@testing-library/jest-dom/dist/matchers'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner'
import { COMMENT, GREEN, PURPLE } from '../../helpers/color'
import { getTeacher } from '../../services/TeacherService'
import { useContext } from 'react'
import { teacherContext } from '../../context/teacherContext'
const AddTeacher = () => {
  const {
    Loading,
    onTeacherChange,
    groups,
    createTeacher,
    teacher,
    errors
  } = useContext(teacherContext)
  return (
    <>
      {Loading ? (
        <Spinner />
      ) : (
        <>
          <section className='p-3'>
            <img
              src={require('../../assets/man-taking-note-png.png')}
              height='400px'
              style={{
                position: 'absolute',
                zindex: '-1',
                top: '130px',
                left: '100px',
                apacity: '50%'
              }}
            />
            <div className='container'>
              <div className='row'>
                <div className='col'>
                  <p
                    className='h4 fw-bold text-center'
                    style={{ color: GREEN }}
                  >
                    افزودن مدرس جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundcolor: GREEN }} />
              <div className='row mt-5'>
                <div className='col-md-4'>
                   {errors?.map ((error,index)=>(
                    <p key={index} className="text-danger">{error.message}</p>
                  ))} 
                  <form onSubmit={createTeacher}>
                    <div className='mb-2'>
                      <input
                        name='fullname'
                        value={teacher.fullname}
                        onChange={onTeacherChange}
                        type='text'
                        className='form-control'
                        placeholder='نام و نام خانوادگی'
                       // required={true}
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
                     //   required={true}
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
                        value='مدرس جدید'
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
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
export default AddTeacher
