import {  Mail,  Notifications } from '@mui/icons-material';
import { Avatar, IconButton, Tooltip,Box } from '@mui/material';
// 
import React, { useState } from 'react';


import {useValue} from '../../context/ContextProvider';
import useCheckToken from '../../hooks/useCheckToken';
import UserMenu from './UserMenu';


const Usericons = () => {

  useCheckToken()
  
  
  
  const {state:{currentUser}}= useValue()
  
  const [anchorUserMenu,setAnchorUserMenu]=useState(null)

  return (
    <Box>

     
        
      <IconButton  size='large' color='inherit'>
        {/* <Badge color='primary' badgeContent = {5}>
          <Mail/>
        </Badge> */}

        <Mail/>
      </IconButton>
      
      <IconButton  size='large' color='inherit'>
        {/* <Badge color='error' badgeContent = {20}>
          <Notifications/>
        </Badge> */}

        <Notifications/>
      </IconButton>

      <Tooltip title='Open User Settings'>
         <IconButton 
         onClick={(e)=>setAnchorUserMenu(e.currentTarget)}
         
         >
          <Avatar src={currentUser?.photoURL} >
          
          
          
          alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}


            
          </Avatar>
         </IconButton>
      </Tooltip>
      <UserMenu {...{anchorUserMenu,setAnchorUserMenu}}/>

     
    </Box>
  )
};

export default Usericons;
