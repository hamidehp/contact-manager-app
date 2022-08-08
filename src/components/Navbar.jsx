import SearchContact from './teacher/SearchTeacher'
import { PURPLE, COMMENT, BACKGROUND } from '../helpers/color.js'
const Navbar = () => {
  return (
    <nav className='navbar navbar-dark 
    navbar-expand-sm shadow-lg' style={{backgroundColor:BACKGROUND}}>
      <div className='container'>
        <div className='row w-100'>
          <div className='col'>
            <div className='navbar-brand'>
            <i className='fa fa-id-badge' style={{color:PURPLE}}/> {'  '}اپلیکیشن{'  '}
            <span style={{ color: PURPLE }}>مدرسان آموزش</span>
            </div>
          </div>
          <div className='col'>
            <SearchContact />
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
