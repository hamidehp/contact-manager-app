import {PURPLE,COMMENT} from '../../helpers/color';
import { useContext } from 'react';
import { teacherContext } from '../../context/teacherContext';
const SearchTeacher = () => {
  const {teacherQuery,teacherSearch}=useContext(teacherContext);
  return (
    <div className='input-group mx-2 w=75 ' dir='rtl'>
      <span
        className='input-group-text'
        id='basic-addon1'
        style={{ color: PURPLE }}
      >
        <i className='fa fa-search ' aria-hidden='true' />
      </span>
      <input
        dir='rtl'
        type='text'
        className='form-control'
        placeholder='جستجوی مدرس'
        aria-label='search'
        aria-describedby='basic-addon1'
        value={teacherQuery.text}
        onChange={teacherSearch}
      />
    </div>
  )
}
export default SearchTeacher
