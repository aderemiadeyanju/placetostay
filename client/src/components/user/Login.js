import {useEffect, useRef,useState} from 'react';
// import { DialogContentText } from '@material-ui/core'
//import { Close,Send } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle,DialogContentText, IconButton, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useValue } from '../../context/ContextProvider';
import PasswordField from './PasswordField';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import { login, register } from '../../actions/user';

const Login = () => {

  //const {state:{openLogin},dispatch }=useValue()

  const {state:{openLogin},dispatch }=useValue()
  const [title,setTitle]=useState('Login')
  const [isRegister,setIsRegister]=useState(false)
  const nameRef=useRef()
  const emailRef=useRef()
  const passwordRef=useRef()
  const confirmpasswordRef=useRef()

  const handleClose =()=>{

    dispatch({type:'CLOSE_LOGIN'})
  }

 
  const handleSubmit=(e)=>{

    e.preventDefault();
    const email=emailRef.current.value;
    const password=passwordRef.current.value;
    // send login requset if not registerd and return
    if(!isRegister) return login({email,password},dispatch)
    
    const name= nameRef.current.value;
    const confirmPassword=confirmpasswordRef.current.value
    if(password !== confirmPassword) return dispatch({type:'UPDATE_ALERT',payload:{open:true,severity:'error',message:'passwords do not match'}})
    // send register request

    register({name,email,password},dispatch);
  };

  useEffect(()=>{
   isRegister ? setTitle('Register') : setTitle('Login')

  },[isRegister])
  return (

 
    <Dialog
    open={openLogin}
    onClose={handleClose}
    
    
    >
         
         <DialogTitle>
            {title}
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
                  Please fill your information in the fields below:
                </DialogContentText>
                {isRegister && 
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
                  
                  />
                }
                  <TextField 
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
                  }

                  
            </DialogContent>
            <DialogActions sx={{px:'19px'}}>
                <Button type='submit' variant='contained'  >
                           Submit
                </Button>

            </DialogActions>

         </form>
         <DialogActions sx={{justifyContent:'left', p:'5px 24px '}}>
              {isRegister?'Do you have an account? Sign in now':"Don't have an account ? Create one now"} 
              <Button onClick={()=>setIsRegister(!isRegister)}>
                {isRegister ? 'Login':'Register'}
              </Button>
         </DialogActions>
         <DialogActions sx={{justifyContent:'center', py:'24px'}}>
            <GoogleOneTapLogin/>
         </DialogActions>

    </Dialog>

  
  )
}

export default Login;