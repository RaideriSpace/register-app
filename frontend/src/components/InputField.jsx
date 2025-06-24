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
        // Estiliza o texto de ajuda (helperText), se houver
        '& .MuiFormHelperText-root': {
            color: 'white',
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