import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ label, id, type, placeholder, ...props }) => {
  return (
    <div className='input-group'>
      <label htmlFor={id} className='input-label'> 
        {label} 
      </label>
      <input
        type={type}
        id={id}
        className='input-field'
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default InputField