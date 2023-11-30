import PropTypes from 'prop-types'
import Button from './Button'
import {useLocation} from 'react-router-dom'
// we can pass a function as a prop onClick={function name} and write above the return const function name = ()=>{function body}
const Header = ({ title ,toggle,showAddTask}) => {
  const loaction= useLocation()
  return (
  <header className='header'>
    <h1 >{title}</h1>
    {loaction.pathname === '/' &&(<Button 
    color={showAddTask ?'red':'green'} 
    text={showAddTask?'Close': 'Add'} 
    toggleAddtask={toggle}/>)}
    
  </header>
  )
}
// Header.defaultProps={
//     title:'Task Tracker'
// }
Header.propTypes = {
title: PropTypes.string,
}
//<h1 style={headingStyle}>{title}</h1>
// const headingStyle={
//     color:'red',
//     backgroundColor:'black',
// }

export default Header