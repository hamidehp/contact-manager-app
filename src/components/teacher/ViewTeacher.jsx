import { CURRENTLINE, CYAN, PURPLE } from '../../helpers/color';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../Spinner';
import { useState, useEffect } from 'react';
import { getGroup, getTeacher } from '../../services/TeacherService';

const ViewTeacher = () => {
  const { teacherId } = useParams();

  const [ state, setState ] = useState({
    Loading: false,
    teacher: {},
    group: {}
  });
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, Loading: true })
        const { data: teacherData } = await getTeacher(teacherId);
        const { data: groupData } = await getGroup(teacherData.group);
        setState({
          ...state,
          Loading: false,
          teacher: teacherData,
          group: groupData
        })
      } catch (err) {
        console.log(err.message)
        setState({ ...state, Loading: false })
      }
    }
    fetchData();
  }, []);
  
  const { Loading, teacher, group } =state;
  return (
    <>
      <section className='view-contact-intro p3'>
        <div className='container'>
          <div className='row my-2 text-center'>
            <p className='h3 fw-bold' style={{ color: CYAN }}>
              اطلاعات مدرس
            </p>
          </div>
        </div>
      </section>
      <hr style={{ backgroundColor: CYAN }} />
      {Loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(teacher).length > 0 && (
            <section className='view-contact mt-e'>
              <div
                className='container p-2'
                style={{ borderRadius: '1em', backgroundColor: CURRENTLINE }}
              >
                <div className='row align-items-center'>
                  <div className='col-md-3'>
                    <img
                      src={
                        teacher.photo
                          ? teacher.photo
                          : require('../../assets/placeholder_avatar.jpg')
                      }
                      alt=''
                      className='img-fluid rounded'
                      style={{ border: `1 px solid${PURPLE}` }}
                    />
                  </div>
                  <div className='col-md-9'>
                    <ul className='list-group'>
                      <li className='list-group-item list-group-item-dark'>
                        نام و نام خانوادگی :{' '}
                        <span className='fw-bold'> {teacher.fullname}</span>
                      </li>
                      <li className='list-group-item list-group-item-dark'>
                        شماره موبایل :{' '}
                        <span className='fw-bold'> {teacher.mobile}</span>
                      </li>
                      <li className='list-group-item list-group-item-dark'>
                        ایمیل :<span className='fw-bold'> {teacher.email}</span>
                      </li>
                      <li className='list-group-item list-group-item-dark'>
                        شغل :<span className='fw-bold'> {teacher.job}</span>
                      </li>
                      <li className='list-group-item list-group-item-dark'>
                        گروه :<span className='fw-bold'> {group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='row my-2'>
                  <div className='d-grid gap-2 col-6 mx-auto'>
                    <Link
                      to={'/teachers'}
                      className='btn'
                      style={{ backgroundColor: PURPLE }}
                    >
                      بازگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}
export default ViewTeacher
