import React from 'react'
import PropTypes from 'prop-types'
const Button = ({text , color,toggleAddtask}) => {
    
  return (
    <button 
    onClick={toggleAddtask}
    style={{backgroundColor:color}} 
    className='btn'
    >
    {text}
    </button>
  )
}
Button.defaultProps = {
    color:'yellow',
    text:'default',
}
Button.propTypes = {
    color : PropTypes.string,
    text :PropTypes.string,
}

export default Button