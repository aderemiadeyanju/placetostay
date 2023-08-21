




import { Button } from '@mui/base'
import { Google } from '@mui/icons-material'
import React ,{useState} from 'react'
import { useValue } from '../../context/ContextProvider'
//import GoogleLogin from './GoogleLogin'
//import Google from './Google'
import jwtDecode from 'jwt-decode'
//import {useGoogleOneTapLogin} from 'react-google-one-tap-login'

const GoogleOneTapLogin = () => {
  const {dispatch}=useValue()
  const [disabled,setDisabled]=useState(false)
  const handleResponse=(response)=>{
    const token= response.credential
    const decodedToken=jwtDecode(token)
    const{sub:id,email,name,picture:photoURL}=decodedToken
    dispatch({type:'UPDATE_USER',payload:{id,email,name,photoURL,token,google:true}})

    dispatch({type:'CLOSE_LOGIN'})
  };
   
  
   const handleGoogleLogin=()=>{
    setDisabled(true);

    // return(
    //   <GoogleLogin/>
    // )
    
    try {
      window.google.accounts.id.initialize({
       client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
       callback:handleResponse
   

      })

      // useGoogleOneTapLogin({

      //   onSuccess:(response)=>console.log(response),
      //   onError:(error)=>console.log(error),
    
      //   googleAccountConfigs :{
      //     client_id:"894165759415-9mtdpg9b728fvretanktdqdcat9jb0ka.apps.googleusercontent.com"
      //   }
    
      // })
      
      window.google.accounts.id.prompt((notification)=>{

      //   setTimeout(function() {
      //       if (notification.isNotDisplayed){
      //      throw new Error('Try to clear the cookies or try again later!')
      //   }
      // }, 5000);
        //  if (notification.isNotDisplayed){
        //    throw new Error('Try to clear the cookies or try again later!')
        //  }

        if (notification.isSkippedMoment() || notification.isDismissedMoment()){
          setDisabled(false)
        }
      })
      
    } catch (error) {
       dispatch({
        type:'UPDATE_ALERT',payload:{open:true,severity:'error',message:error.message}})
      

         console.log(error)
    }

  }
  return (
    <Button
    variant='outlined' startIcon={<Google/>} disabled={disabled} onClick={handleGoogleLogin}
     >
      Login with Google
    </Button>
  )
}

export default GoogleOneTapLogin
