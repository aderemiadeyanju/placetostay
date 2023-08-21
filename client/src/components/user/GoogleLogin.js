//import React from 'react';
import {useGoogleOneTapLogin} from 'react-google-one-tap-login'
import jwtDecode from 'jwt-decode'


const GoogleLogin =()=>{
  const handleResponse=(response)=>{
    const token= response.credential
    const decodedToken=jwtDecode(token)
    console.log(decodedToken)
  }



  useGoogleOneTapLogin({

    onSuccess:(response)=>handleResponse,
    onError:(error)=>console.log(error),

    googleAccountConfigs :{
      client_id:"894165759415-9mtdpg9b728fvretanktdqdcat9jb0ka.apps.googleusercontent.com"
    }

  })


}
  

export default GoogleLogin
