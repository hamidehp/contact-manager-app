import { toBeRequired } from '@testing-library/jest-dom/dist/matchers'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner'
import { COMMENT, GREEN, PURPLE } from '../../helpers/color'
import Teacher from './Teacher'

const AddTeacher = (loading, Teacher, setTeacherInfo,groups,createTeacherForm) => {
  return (
    
     <>
       {!loading ? (
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
              <p className='h4 fw-bold text-center' style={{ color: GREEN }}>
                افزودن مدرس جدید
              </p>
            </div>
          </div>
          <hr style={{ backgroundcolor: GREEN }} />
          <div className='row mt-5'>
            <div className='col-md-4'>
              <form onSubmit ={createTeacherForm}>
                <div className='mb-2'>
                  <input
                    name='fullname'
                      value={Teacher.fullname}
                        onChange={setTeacherInfo}
                    type='text'
                    className='form-control'
                    placeholder='نام و نام خانوادگی'
                    required={true}
                  />
                </div>
                <div className='mb-2'>
                  <input
                    name='photo'
                    value={Teacher.photo}
                        onChange={setTeacherInfo}
                    type='text'
                    className='form-control'
                    placeholder='آدرس تصویر'
                  />
                </div>
                <div className='mb-2'>
                  <input
                    name='mobile'
                    value={Teacher.mobile}
                        onChange={setTeacherInfo}
                    type='text'
                    className='form-control'
                    placeholder='شماره موبایل'
                    required={true}
                  />
                </div>
                <div className='mb-2'>
                  <input
                    name='email'
                    value={Teacher.email}
                    onChange={setTeacherInfo}
                    type='text'
                    className='form-control'
                    placeholder='آدرس ایمیل'
                  />
                </div>
                <div className='mb-2'>
                  <input
                    name='job'
                    value={Teacher.job}
                    onChange={setTeacherInfo}
                    type='text'
                    className='form-control'
                    placeholder='شغل'
                  />
                </div>
                <div className='mb-2'>
                  <select name='group'  className='form-control'>
                  <option  value="" ></option>
                 
                    {/* {groups.length >0 && groups.map((group)=>( <option key={group.id} value={group.id} >{group.name}</option>))}   */}
                  </select>
                </div>
                <div className='mx-2'>
                  <input
                    type='submit'
                    className='btn'
                    style={{ backgroundColor: PURPLE }}
                    value='مدرس جدید'
                  />
                   <Link to ={"/teachers"}
                    className='btn mx-2'
                    style={{ backgroundColor: COMMENT }}>انصراف</Link>
                    
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
 </>
)
}
export default AddTeacher
