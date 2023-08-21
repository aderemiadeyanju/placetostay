import {Box} from '@mui/material'
import ReactMapGL, { GeolocateControl, NavigationControl } from 'react-map-gl'
import { useValue } from '../../../context/ContextProvider'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Marker } from 'react-map-gl'
import { useEffect, useRef } from 'react'
import Geocoder from './Geocoder'






const AddTest = () => {
   

  const mapRef=useRef()
 
  return (
    <Box
    sx={{
      height:400,
      position:'relative'


    }}

    
    >
     <ReactMapGL
      ref={mapRef}
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
      initialViewState={{
         longitude:0.1276,
         latitude:51.5072,
         zoom:8
      }}
      mapStyle='mapbox://styles/mapbox/streets-v11'
     >
     
     {/* <Marker
       latitude={lat}
       longitude={lng}
       draggable
       onDragEnd={(e)=>dispatch({type:'UPDATE_LOCATION',payload:{lng:e.lngLat.lng,lat:e.lngLat.lat}})}
     
     
     /> */}
     {/* <NavigationControl position='bottom-right'/>
     <GeolocateControl
       position='top-left'
       trackUserLocation
       onGeolocate={(e)=> dispatch({type:'UPDATE_LOCATION',payload:{lng:e.coords.longitude,lat:e.coords.latitude},
      })
    }
     />
     <Geocoder/> */}
     </ReactMapGL>

    </Box>
  )
}

export default AddTest