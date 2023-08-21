import {useState} from 'react';
//import { Visibility, VisibilityOff } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//import { InputAdornment } from '@mui/material';
import React from 'react';
import { IconButton, TextField ,InputAdornment} from '@mui/material';


const PasswordField = ({passwordRef,id='password',label='Password'}) => {


      const [showPassword,setShowPassword]=useState(false);

      const handleClick=()=>{
        setShowPassword(!showPassword)
      };
      
      const handleMouseDown = (e) =>{
        e.preventDefault()
      };

  return (
    <TextField 
   
    margin='normal'
    variant='standard'
    id={id}
    label={label}
    type={showPassword?'text':'password'}
    fullWidth
    inputRef={passwordRef}
    inputProps={{minLength:6}}
    required
    InputProps={{
       endAdornment:(
          <InputAdornment position='end'>
             <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>

              {showPassword ? <VisibilityOffIcon />:<VisibilityIcon/>}
             </IconButton>
          </InputAdornment>

       )

    }}
    
    />
  )
}

export default PasswordField