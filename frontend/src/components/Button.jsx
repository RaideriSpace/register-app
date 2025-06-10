import React from 'react'

const Button = ({ children, type='button', onClick, disabled }) => {
  return (
    <button
        type={type}
        className='auth-button'
        onClick={onClick}
        disabled={disabled}
    >
        {children} {/* Para passar texto ou ícones como filhos */}
    </button>
  );
};

export default Button