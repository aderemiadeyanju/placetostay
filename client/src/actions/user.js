import fetchData from "./utils/fetchData"
import {v4 as uuidv4} from  'uuid'
import uploadFile from "../firebase/uploadFile.js"

const url= process.env.REACT_APP_SERVER_URL + '/user';


export const register=async(user,dispatch)=>{
  
  dispatch({type:'START_LOADING'})

  //send request with fetch

  const result= await fetchData({url:url+'/register',body:user},dispatch)
  if(result){
    dispatch({type:'UPDATE_USER',payload:result})
    dispatch({type:'CLOSE_LOGIN'})
    dispatch({type:'UPDATE_ALERT',
    payload:{open:true,
      severity:'success',
      message:'Your account has been created successfully'},})
  }
  dispatch({type:'END_LOADING'})


}

///////////////////////////////////////////////////////////

export const login=async(user,dispatch)=>{
  
  dispatch({type:'START_LOADING'})

  //send request with fetch

  const result= await fetchData({url:url+'/login',body:user},dispatch)
  if(result){
    dispatch({type:'UPDATE_USER',payload:result})
    dispatch({type:'CLOSE_LOGIN'})
    
  }
  dispatch({type:'END_LOADING'})


};

export const updateProfile=async(currentUser,updatedFields,dispatch)=>{

  dispatch({type:'START_LOADING'})
  

  const{name,file}=updatedFields

  if(!file){
    console.log('File not loaded')
  }
  let body={name}
  try {
    if(file){
       const imageName=uuidv4() + '.' + file?.name?.split('.')?.pop()
       console.log('imageName:'+ imageName)
       ///upload to firebase/$
       console.log(`profile/${currentUser?.id}/${imageName}`)
       const photoURL=await uploadFile(file,`profile/${currentUser?.id}/${imageName}`)
       body={...body,photoURL}
       console.log(photoURL)
       
    }
   // console.log(url)
    const result=await fetchData({url:url+'/updateProfile',method:'PATCH',body,token:currentUser.token},dispatch)
    console.log('url '+url)
    if(result){
      console.log('result seen')
      console.log(result)
      console.log(result.name)
      console.log(result.photoURL)
      dispatch({type:'UPDATE_USER',payload:{...currentUser,  ...result}})
      dispatch({type:'UPDATE_ALERT',
      payload:{open:true,
      severity:'success',
      message:'Your profile has been uppdated successfully'},});
      dispatch({type:'UPDATE_PROFILE',payload:{open:false,file:null,photoURL:result.photoURL}})
     
    }
  } catch (error) {

    dispatch({type:'UPDATE_ALERT',
    payload:{open:true,
      severity:'error',
      message:error.message},})
    console.log(error)
  }

  dispatch({type:'END_LOADING'})


}



