import { ChevronLeft } from '@mui/icons-material'
import { Drawer ,IconButton,styled, Typography} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useValue } from '../../context/ContextProvider'
import PriceSlider from './PriceSlider'

const DrawerHeader=styled('div')(({theme})=>({
    display:'flex',
    alignitems:'center',
    justifyContent:'space-between',
    padding:theme.spacing(0,1),
    ...theme.mixins.toolbar,


}))


const Sidebar = ({isOpen,setIsOpen}) => {
  const {containerRef}=useValue()
  return (
    <Drawer
    variant='persistent'
    hideBackdrop={true}
    open={isOpen}
    
    >
       <DrawerHeader>
            <Typography>
              Apply Search Houses or Filter
            </Typography>
            <IconButton onClick={()=>setIsOpen(false)}>
              <ChevronLeft fontSize='large'/>
            </IconButton>
       </DrawerHeader>
       <Box sx={{width:240,p:3}}>
          <Box ref={containerRef}></Box>
        <PriceSlider/>
       </Box>

    </Drawer>
  )
}

export default Sidebar