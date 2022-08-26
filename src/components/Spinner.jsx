import { BACKGROUND } from '../helpers/color.js'
const Spinner = () => {
  return (
    <>
      <img
        src={require('../assets/spinner-2.gif')}
        className='d-block m-auto'
        style={{ width: '400px', position: 'relative',
        
        top: '130px' }}
      />
    </>
  )
}
export default Spinner
