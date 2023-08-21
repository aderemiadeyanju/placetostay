import React from 'react'
import NavBar from './components/NavBar'
import Login from './components/user/Login'
import Notification from './components/Notification'
import Loading from './components/Loading'
import BottomNav from './components/BottomNav'
import Room from './components/rooms/Room'
import PopupRoom from './components/map/PopupRoom'
const App = () => {
  return (

    <>
    <Loading/>
    <Notification />
    <NavBar/>
    <Login/>
    <BottomNav/>
    <Room />
   
    </>
  )
  }
   
  export default App