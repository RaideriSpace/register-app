import React from 'react'

const InputField = ({ label, id, type, value, onChange, placeholder, required}) => {
  return (
    <div className='input-group'>
      <label htmlFor={id} className='input-label'> {label} </label>

      <input
        type={type}
        id={id}
        className='input-field'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required} 
      />
    </div>
  )
}

export default InputField