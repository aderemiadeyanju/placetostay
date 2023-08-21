import React from 'react'
import {useRef} from 'react';
import {Button,Dialog,DialogTitle, DialogActions, DialogContent,DialogContentText, IconButton, TextField, Avatar} from '@mui/material'

import { useValue } from '../../context/ContextProvider'
import CloseIcon from '@mui/icons-material/Close';
//import { Label } from '@mui/icons-material';
import { updateProfile } from '../../actions/user';



const Profile = () => {
  const{state:{profile,currentUser},dispatch}=useValue()
  
  const handleClose=()=>{
    dispatch({type:'UPDATE_PROFILE',payload:{...profile,open:false}})
  }
  const handleSubmit=(e)=>{
     e.preventDefault()
     const name=nameRef.current.value
     //pass user name and photofile to new function in user action
     updateProfile(currentUser,{name,file:profile.file},dispatch);
  }

  const handleChange=(e)=>{
     const file=e.target.files[0]
     if(file){
      const photoURL=URL.createObjectURL(file)
      dispatch({type:'UPDATE_PROFILE',payload:{...profile,file,photoURL}})
      console.log('photourl  '+photoURL)
     
     }
  }
  const nameRef=useRef()
  return (
    <Dialog
    open={profile.open}
    onClose={handleClose}
    
    
    >
         
         <DialogTitle>
            Profile
             <IconButton
             sx={{
                 position:'absolute',
                 top:8,
                 right:8,
                 color:(theme)=>theme.palette.grey[500]
             }}
             onClick={handleClose}
             >
              <CloseIcon/> 
             </IconButton>

         </DialogTitle>
         <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>
                  You can update your profile by updating these fields below:
                </DialogContentText>
                
                  <TextField 
                  autoFocus
                  margin='normal'
                  variant='standard'
                  id='name'
                  label='Name'
                  type='text'
                  fullWidth
                  inputRef={nameRef}
                  inputProps={{minLength:2}}
                  required
                  defaultValue={currentUser?.name}
                  
                  />
                
                  {/* <TextField 
                  autoFocus={!isRegister}
                  margin='normal'
                  variant='standard'
                  id='email'
                  label='Email'
                  type='email'
                  fullWidth
                  inputRef={emailRef}
                  
                  required
                  
                  />
                  < PasswordField  {...{passwordRef}} />
                  {isRegister &&
                   <PasswordField  passwordRef={confirmpasswordRef} id='confirmPassword ' label= 'Confirm Password'/> 
                  } */}
            <label htmlFor='profilePhoto'>
            <input
            accept='image/*'
            id='profilePhoto'
            type='file'
            style={{display:'none'}}
            onChange={handleChange}

            
            />
            <Avatar
            src={profile.photoURL}
            sx={{width:75,height:75,cursor:'pointer'}}
            
            />
             
            </label>
                  
            </DialogContent>
            <DialogActions sx={{px:'19px'}}>
                <Button type='submit' variant='contained' >
                           Update
                </Button>

            </DialogActions>

         </form>
         

    </Dialog>
  )
};

export default Profile
