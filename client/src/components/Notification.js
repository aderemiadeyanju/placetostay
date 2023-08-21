


import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useValue } from '../context/ContextProvider'

const Notification = () => {

  const {state:{alert},dispatch}=useValue()

  const handClose=(event,reason)=>{
    if(reason ==='click away') return
    dispatch({type:'UPDATE_ALERT',payload:{...alert,open:false}})
  }
  return (
    
    <Snackbar
    open={alert.open}
    autoHideDuration={6000}
    onClose={handClose}
    anchorOrigin={{vertical:'top',horizontal:'center'}}
    
    >
      <Alert
      onClose={handClose}
      severity={alert.severity}
      sx={{width:'100%'}}
      variant='filled'
      elevation={6}
    
      
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification