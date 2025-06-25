import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const MuiButton = ({ children, type='button', onClick, disabled, style }) => {
  return (
    <Button
      type={type}
      variant='contained'
      onClick={onClick}
      disabled={disabled}
      sx = {{
        fontWeight: 'bold',
        ...style,
        '&:hover':{
          backgroundColor: style?.backgroundColor 
            ? `var(${style.backgroundColor.replace('var(', '').replace(')', '')}-dark)`
            : undefined,
          opacity: 0.9,
        },
        '&.Mui-disabled': {
          backgroundColor: 'var(--secondary-ex-dark)',
          color: 'rgba(255, 255, 255, 0.5)',
        }
      }}
      fullWidth
      size='large'
    >
      {children} {/* Para passar texto ou ícones como filhos */}
    </Button>
  );
};

MuiButton.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

MuiButton.defaultProps = {
  type: 'button',
  onClick: () => {},
  disabled: false,
  style: {},
};

export default MuiButton