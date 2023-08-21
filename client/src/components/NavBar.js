import React ,{useState}from 'react';
import { Box,Container,AppBar, IconButton, Toolbar, Typography, Button } from '@mui/material';
import {Lock, Menu} from '@mui/icons-material';
 //import photoURL from '../profile.jpg';
import { useValue } from '../context/ContextProvider';
import Usericons from './user/Usericons';
import Sidebar from './sidebar/Sidebar';



const NavBar = () => {


  const {state:{currentUser},dispatch}= useValue();
  const [isOpen,setIsOpen]=useState(false)
  return (

    <>
    <AppBar>
     <Container maxWidth='lg'>
      <Toolbar disableGutters>
        <Box sx={{mr:1}}>
           <IconButton size='large' color='inherit' onClick={()=>setIsOpen(true)}>
            <Menu/>
           </IconButton>
        </Box>
        <Typography
         variant='h6'
         component='h1'
         noWrap
         sx={{ flexGrow :1,display:{md:'flex',xs: 'none'}}}

        
        >
              You are Welcome
        </Typography>


        <Typography
         variant='h6'
         component='h1'
         noWrap
         sx={{ flexGrow :1,display:{md:'none',xs: 'flex'}}}

        
        >
              YAW
        </Typography>

        <Box>
           {(Usericons)}

        </Box>

            {!currentUser ? ( <Button color='inherit'startIcon={<Lock/>} onClick={()=>dispatch({type:'OPEN_LOGIN'})}>
            Login
          </Button>) : (<Usericons/>)} 
       
      </Toolbar>

     </Container>
    </AppBar>
    <Toolbar/>
    <Sidebar {...{isOpen,setIsOpen}}/>
    </>
    
  )
}

export default NavBar