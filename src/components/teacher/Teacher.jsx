import {
    CURRENTLINE,
    ORANGE,
    PURPLE,
    RED,
    CYAN
  } from '../../helpers/color';
  import { Link } from 'react-router-dom';
const Teacher =({Teacher,deleteTeacher})=>{
    return(
      <div className='col-md-6'>
        <div style={{ backgroundColor: CURRENTLINE }} className='cardmy-2'>
        <div className='card-body'>
          <div className='row align-items-center d-flex justify-content-around'>
            <div className='col-md-2  col-sm-2'>
              <img
                //src={require("../../assets/placeholder_avatar.jpg")}
                 src={(Teacher.photo) ? Teacher.photo : require("../../assets/placeholder_avatar.jpg")}
                 alt={Teacher.fullname}
                style={{ border: `1px solid ${PURPLE}`}}
                className='img-fluid rounded'
              />
            </div>
            <div className='col-md-7 col-sm-7 '>
              <ul className='list-group'>
                <li className='list-group-item list-group-item-dark'>
                  نام و نام خانوادگی :{"  "}
                  <span className='fw-bold'> {Teacher.fullname}</span>
                </li>
                <li className='list-group-item list-group-item-dark'>
                  شماره موبایل :{"  "}
                  <span className='fw-bold'> {Teacher.mobile}</span>
                </li>

                <li className='list-group-item list-group-item-dark'>
                  آدرس ایمیل :{"  "}
                  <span className='fw-bold'> {Teacher.email}</span>
                </li>
              </ul>
            </div>
            <div className='col-md-1 col-sm-1 d-flex-column alidn-items-center' dir="rtl">
              <Link to={`/teachers/view/${Teacher.id}`}
                className='btn my-1'
                style={{ backgroundColor: ORANGE }}
              >
                <i className='fa fa-eye' />
              </Link>
              <Link to={`/teachers/edit/${Teacher.id}`}
                className='btn my-1'
                style={{ backgroundColor: CYAN }}
              >
                <i className='fa fa-pencil' />
              </Link>
              <button onClick={deleteTeacher}
                className='btn my-1'
                style={{ backgroundColor: RED }}
              >
                <i className='fa fa-trash' />
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
}
export default Teacher;