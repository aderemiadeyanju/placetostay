


import { Avatar, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';


import { useValue } from '../../../context/ContextProvider';
import icon from './icons/icon.svg'
import {Check} from '@mui/icons-material'

let timer
const InfoField = ({mainProps,optionalProps={},minLength}) => {
  
  const {dispatch} = useValue()
  const [editing,setEditing]=useState(false)
  const [error,setError]=useState(false)
  const [success,setSuccess]=useState(false)

  const handleChange=(e)=>{
    console.log('hello')
    dispatch({
      type:'UPDATE_DETAILS',
      payload:{[e.target.name]:e.target.value}
    });
    console.log('hello1')
    if(!editing) setEditing(true);
    clearTimeout(timer);
    timer=setTimeout(()=>{
      console.log('hello2')
        setEditing(false)
        if(e.target.value.length < 5){
          console.log('hello3')
          if(!error) setError(true);
          if(success) setSuccess(false);
        }else{
          if(error) setError(false);
          if(!success) setSuccess(true);
        }
    }, 1000);
  }
  return (
    <TextField
    {...mainProps}
    {...optionalProps}
    error={error}
    helperText={error && `This field must be 5 characters or more`}
    color={success ? 'success':'primary'}
    variant='outlined'
    onChange={handleChange}
    required
    InputProps={{

      endAdornment:(
        <InputAdornment position ='end'>
          {editing?(
            <Avatar src={icon} sx={{height:35}} />
          ):(

            success && <Check color='success' />
          )}

        </InputAdornment>
      )
    }}
    
    />

    
  )
}

export default InfoField