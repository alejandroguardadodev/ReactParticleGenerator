import { useState } from 'react';

import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField'

import IconButton from "@mui/material/IconButton";
import ButtonGroup from '@mui/material/ButtonGroup';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { isNumeric } from '../tools/mathTools';

const CostumInputStyle = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "borderColor" && prop !== "fontColor" && prop !== 'transparentBackground',
  overridesResolver: (props, styles) => [
    styles.root,
  ]
})(({ theme, borderColor, fontColor, transparentBackground }) => ({
  '& .MuiOutlinedInput-root': {
    '& input': {
      color: `${(fontColor && fontColor !== '')? fontColor : 'white'} !important`,
    },
    '& fieldset': {
      border: `1px solid ${(borderColor && borderColor !== '')? borderColor : theme.palette.primary.light} !important`,
      color: `${(fontColor && fontColor !== '')? fontColor : 'white'} !important`,
    },
    '&.Mui-focused legend': {
      paddingRight: '.7rem',
    },
    "&.Mui-error fieldset": {
      borderColor: `${theme.palette.error.main} !important`,
    },
    ...(transparentBackground && {
      background: 'transparent !important'
    })
  },
  "& .MuiFormLabel-root": {
    fontFamily: `"Lekton", sans-serif !important`,
    fontWeight: 400,
    color: `${(fontColor && fontColor !== '')? fontColor : 'white'} !important`,
    textTransform: 'capitalize',
    '&.Mui-focused': {
      color: `${(borderColor && borderColor !== '')? borderColor : theme.palette.primary.light}`,
    },
    "&.Mui-error": {
      color: `${theme.palette.error.main} !important`,
    },
    '&.MuiFormLabel-filled + .MuiOutlinedInput-root legend': {
      paddingRight: '.7rem',
    },
    '&.Mui-disabled': {
      color: `${(fontColor && fontColor !== '')? fontColor : 'white'} !important`,
    }
  },
  '& input.Mui-disabled': {
    '-webkit-text-fill-color': 'white !important'
  },
  borderRadius: '3px',
}));

const CostumIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "itemColor",
})(({ theme, itemColor }) => ({
  padding: '1px',
  color: `${(itemColor && itemColor !== '')? itemColor : theme.palette.primary.light}`,
  '& svg': {
    fontSize: '1rem'
  }
}))

const InputBase = ({id, label, placeholder, type, formPackage: {register, errors, setValue, getValues}, min = 0, borderColor, onChange, disabled=false, fontColor, transparentBackground}) => {

  const updateNumberByArrow = (sign) => {
    let value = `${getValues(id)}`;
    
    if (isNumeric(value)) { 
      let numValue = parseInt(value);
      
      if ((numValue + sign) < min)  value = `${min}`
      else value = `${numValue + sign}`

    } else value = `${min}`

    setValue(id, value)
    onChange(id, value);
  }

  const handleUpNumber = () => updateNumberByArrow(+1)

  const handleDownNumber = () => updateNumberByArrow(-1)

  const onChangeHandler = e => {
    const value = e.target.value;

    setValue(id, `${value}`)
    onChange(id, value);
  }

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
          endAdornment: type === "number" && !disabled? (
            <ButtonGroup
              orientation="vertical"
              aria-label="Vertical button group"
              variant="text"
            >
              <CostumIconButton itemColor={borderColor} onClick={handleUpNumber}><ArrowDropUpIcon /></CostumIconButton>
              <CostumIconButton itemColor={borderColor} onClick={handleDownNumber}><ArrowDropDownIcon /></CostumIconButton>
            </ButtonGroup>
          ) : null
        }}
        borderColor={borderColor}
        onChange={onChangeHandler}
        disabled={disabled}
        fontColor={fontColor}
        transparentBackground={transparentBackground}
      />
    </>
  )
}

InputBase.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  transparentBackground: PropTypes.bool
}; 

InputBase.defaultProps = {
  placeholder: '',
  label: '',
  min: 0,
  transparentBackground: false
};

export default InputBase
