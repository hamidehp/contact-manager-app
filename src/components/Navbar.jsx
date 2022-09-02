
import { PURPLE, COMMENT, BACKGROUND } from '../helpers/color.js'
import SearchTeacher from './teacher/SearchTeacher';
import { useLocation } from 'react-router-dom';
const Navbar = ({query,search}) => {
  const Location=useLocation();
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
          {Location.pathname==="/teachers" ?
         ( <div className='col'>
            <SearchTeacher query={query} search={search} />
          </div>):null}
        </div>
      </div>
    </nav>
  )
}
export default Navbar
