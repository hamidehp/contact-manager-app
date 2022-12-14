import { toBeRequired } from '@testing-library/jest-dom/dist/matchers'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner'
import { COMMENT, GREEN, PURPLE } from '../../helpers/color'
import { createTeacher, getTeacher } from '../../services/TeacherService'
import { useContext } from 'react'
import { teacherContext } from '../../context/teacherContext'
import { Formik, FormikConsumer, useFormik } from 'formik';
import { teacherSchema } from '../../validations/TeacherValidations'
import { values } from 'lodash'


const AddTeacher = () => {
  const {
    Loading,
    onTeacherChange,
    groups,
    createTeacher,
    teacher,
    //errors
  } = useContext(teacherContext);
  const formik=useFormik({
    initialValues:{
      fullname:'',
      photo :'',
      mobile:'',
      email:'',
      job:'',
      group:''  },
      validationSchema:teacherSchema,
      onSubmit:values =>{
        console.log(values);
        createTeacher(values);
      }
      
  
  
  
  })
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
                   {/* {errors?.map ((error,index)=>(
                    <p key={index} className="text-danger">{error.message}</p>
                  ))}  */}
                  <form onSubmit={formik.handleSubmit}>
                    <div className='mb-2'>
                      <input
                      id='fullname'
                        name='fullname'
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type='text'
                        className='form-control'
                        placeholder='نام و نام خانوادگی'
                       // required={true}
                      />
                      {formik.touched.fullname && formik.errors.fullname?(<div className='text-danger'>{formik.errors.fullname}</div>):null}
                    </div>
                    <div className='mb-2'>
                      <input
                        id='photo'
                        name='photo'
                        value={formik.values.photo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type='text'
                        className='form-control'
                        placeholder='آدرس تصویر'
                      />
                       {formik.touched.photo && formik.errors.photo?(<div className='text-danger'>{formik.errors.photo}</div>):null}
                    </div>
                    <div className='mb-2'>
                      <input
                        id='mobile'
                        name='mobile'
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type='text'
                        className='form-control'
                        placeholder='شماره موبایل'
                     //   required={true}
                      />
                       {formik.touched.mobile && formik.errors.mobile?(<div className='text-danger'>{formik.errors.mobile}</div>):null}
                    </div>
                    <div className='mb-2'>
                      <input
                        id='email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type='text'
                        className='form-control'
                        placeholder='آدرس ایمیل'
                      />
                        {formik.touched.email && formik.errors.email?(<div className='text-danger'>{formik.errors.email}</div>):null}
                    </div>
                    <div className='mb-2'>
                      <input
                        id='job'
                        name='job'
                        value={formik.values.job}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type='text'
                        className='form-control'
                        placeholder='شغل'
                      />
                         {formik.touched.job && formik.errors.job?(<div className='text-danger'>{formik.errors.job}</div>):null}
                    </div>
                    <div className='mb-2'>
                      <select
                        id='group'
                        name='group'
                        value={formik.values.group}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                      {formik.touched.group && formik.errors.group?(<div className='text-danger'>{formik.errors.group}</div>):null}
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
