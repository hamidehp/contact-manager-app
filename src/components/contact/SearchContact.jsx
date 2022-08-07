import {PURPLE,COMMENT} from '../../helpers/color';
const SearchContact = () => {
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
        placeholder='جستجوی مخاطب'
        aria-label='search'
        aria-describedby='basic-addon1'
      />
    </div>
  )
}
export default SearchContact
