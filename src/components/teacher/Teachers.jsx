import { CURRENTLINE, PINK, ORANGE } from '../../helpers/color'
import Teacher from './Teacher'
import Spinner from '../Spinner'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { teacherContext } from '../../context/teacherContext'

const Teachers = () => {
  const { filteredTeachers, Loading, deleteTeacher } =useContext(teacherContext);
  return (
    <>
      <section className='container'>
        <div className='grid'>
          <div className='row'>
            <div className='col'>
              <p className='h3 float-end'>
                <Link
                  to={'/teachers/add'}
                  className='btn m-2'
                  style={{ backgroundColor: PINK }}
                >
                  مدرس جدید
                  <i className='fa fa-plus-circle mx-2' />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {Loading ? (
        <Spinner />
      ) : (
        <section className='container'>
          <div className='row'>
          
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map(c => (
                  <Teacher
                    key={c.id}
                    deleteTeacher={() => deleteTeacher(c.id, c.fullname)}
                    Teacher={c}
                  />
                ))
              ) : (
                <div
                  className='text-center py-5'
                  style={{ backgroundColor: CURRENTLINE }}
                >
                  <p className='h3' style={{ color: ORANGE }}>
                    مدرسی پیدا نشد
                  </p>
                  <img
                    src={require('../../assets/not-found.jpg')}
                    alt='پیدا نشد'
                    className='w-50'
                  />
                </div>
              )}
            </div>
        
        </section>
      )}
    </>
  )
}

export default Teachers
