import { useState } from 'react';

import { styled } from '@mui/material/styles';

import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField'

import IconButton from "@mui/material/IconButton";
import ButtonGroup from '@mui/material/ButtonGroup';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { isNumeric } from '../tools/mathTools';

const CostumInputStyle = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& input': {
      
    },
    '& fieldset': {
      border: `1px solid ${theme.palette.primary.light} !important`,
    },
    '&.Mui-focused legend': {
        paddingRight: '.7rem',
    },
    "&.Mui-error fieldset": {
      borderColor: `${theme.palette.error.main} !important`,
    }
  },
  "& .MuiFormLabel-root": {
    fontFamily: `"Lekton", sans-serif !important`,
    fontWeight: 400,
    color: "white",
    textTransform: 'capitalize',
    '&.Mui-focused': {
      color: `${theme.palette.primary.light}`,
    },
    "&.Mui-error": {
      color: `${theme.palette.error.main} !important`,
    },
    '&.MuiFormLabel-filled + .MuiOutlinedInput-root legend': {
      paddingRight: '.7rem',
    }
  },
  borderRadius: '3px',
}));

const CostumIconButton = styled(IconButton)(({ theme }) => ({
  padding: '1px',
  color: `${theme.palette.primary.light}`,
  '& svg': {
    fontSize: '1rem'
  }
}))

const InputBase = ({id, label, placeholder, type, formPackage: {register, errors, setValue, getValues}, min = 0}) => {

  const updateNumberByArrow = (sign) => {
    let value = getValues(id);
    
    if (isNumeric(value)) {
      let numValue = parseInt(value);

      if ((numValue + sign) < min) setValue(id, `${min}`)
      else setValue(id, `${numValue + sign}`)
    } else setValue(id, `${min}`)
  }

  const handleUpNumber = () => updateNumberByArrow(+1)

  const handleDownNumber = () => updateNumberByArrow(-1)

  return (
    <>
      <CostumInputStyle 
        fullWidth
        id={id}
        label={label}
        placeholder={placeholder}
        type={type}
        error={!!errors[id]} 
        helperText={errors[id] ? errors[id].message : null}
        {...register(id)}
        InputProps={{
          endAdornment: type === "number"? (
            <ButtonGroup
              orientation="vertical"
              aria-label="Vertical button group"
              variant="text"
            >
              <CostumIconButton onClick={handleUpNumber}><ArrowDropUpIcon /></CostumIconButton>
              <CostumIconButton onClick={handleDownNumber}><ArrowDropDownIcon /></CostumIconButton>
            </ButtonGroup>
          ) : null
        }}
      />
    </>
  )
}

InputBase.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  min: PropTypes.number
}; 

InputBase.defaultProps = {
  placeholder: '',
  label: '',
  min: 0
};

export default InputBase
