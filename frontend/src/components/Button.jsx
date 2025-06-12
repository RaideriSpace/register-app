import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, type='button', onClick, disabled, style }) => {
  return (
    <button
      type={type}
      className='auth-button'
      onClick={onClick}
      disabled={disabled}
      style = {style}
    >
      {children} {/* Para passar texto ou ícones como filhos */}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  disabled: false,
  style: {},
};

export default Button