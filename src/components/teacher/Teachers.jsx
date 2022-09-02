import { CURRENTLINE, PINK, ORANGE } from '../../helpers/color'
import Teacher from './Teacher'
import Spinner from '../Spinner'
import { Link } from 'react-router-dom'

const Teachers = ({ Teachers, Loading, confirmDelete }) => {
  return (
    <>
      <section className='container'>
        <div className='grid'>
          <div className='row'>
            <div className='col'>
              <p className='h3'>
                <Link
                  to={'/teachers/add'}
                  className='btn mx-2'
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
            <div className='col-md-6'>
              {/* <Teacher /> */}

              {Teachers.length > 0 ? (
                Teachers.map(c => <Teacher key={c.id} 
                  confirmDelete={()=> confirmDelete(c.id, c.fullname)}
                  Teacher={c} />)
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
          </div>
        </section>
      )}
    </>
  )
}

export default Teachers
