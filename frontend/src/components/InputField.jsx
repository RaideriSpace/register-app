import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'

const InputField = React.forwardRef(({ label, id, type, placeholder, ...props }, ref) => {
  return (
    <TextField
      label={label}
      type={type}
      placeholder={placeholder}
      variant='outlined'
      fullWidth
      margin='normal'
      inputRef={ref}
      sx={{
        '& .MuiInputLabel-root': {
            color: 'white',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--secondary-dark)',
        },
        '& .MuiInputBase-input': {
            color: 'white',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--secondary)',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--secondary-ex-dark)',
        },
        '& .MuiFormHelperText-root': {
            color: 'white',
        },

        // ESTILOS PARA AUTOFILL DO NAVEGADOR
        '& input:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px var(--auxiliary2-ex-dark) inset',
          '-webkit-text-fill-color': 'white', 
          transition: 'background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s',
        },
        '& input:-webkit-autofill:hover': {
          '-webkit-box-shadow': '0 0 0 100px var(--auxiliary2-ex-dark) inset',
          '-webkit-text-fill-color': 'white',
        },      
      }}
      {...props}
    />
  );
});

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