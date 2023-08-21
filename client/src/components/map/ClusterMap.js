import React, { useEffect, useState,useRef } from 'react'
import { getRooms } from '../../actions/room'
import { useValue } from '../../context/ContextProvider'
//import ReactMapGL, { Marker } from 'react-map-gl'
import Geocoder from '../addRoom/addLocation/Geocoder'

import 'mapbox-gl/dist/mapbox-gl.css'

import {Box} from '@mui/material'
import { Marker ,Popup} from 'react-map-gl'
import Supercluster from 'supercluster'
import './cluster.css'
import { Avatar, Tooltip } from '@mui/material'
import Paper from '@mui/material/Paper';
import ReactMapGL from 'react-map-gl'
import GeocoderInput from '../sidebar/GeocoderInput'
import PopupRoom from './PopupRoom'


const supercluster= new Supercluster({
   radius:75,
   maxZoom:20
 })

const ClusterMap = () => {
  const {
    state:{filteredRooms},
    dispatch,
    mapRef
  }=useValue();

   const[points,setPoints]=useState([]);
   const[clusters,setClusters]=useState([]);
   const[bounds,setBounds]=useState([-180, -85, 180, 85]);
   const[zoom,setZoom]=useState(0);
   const[popupInfo,setPopupInfo]=useState(null)
  
   useEffect(()=>{
     getRooms(dispatch);
   },[]);

  useEffect(() =>{
    console.log('room details')
   //console.log(rooms)
    const points = filteredRooms.map(room=>({
      type:'Feature',
      properties:{
        cluster:false,
        roomId:room._id,
        price:room.price,
        title:room.title,
        description:room.description,
        lng:room.lng,
        lat:room.lat,
        images:room.images,
        uPhoto:room.uPhoto,
        uName:room.uName



      },
      geometry:{
        type:'Point',
        coordinates:[parseFloat(room.lng),parseFloat(room.lat)]
      }
    }))
    setPoints(points)
  },[filteredRooms]);
  useEffect(()=>{
    supercluster.load(points)
    setClusters(supercluster.getClusters(bounds,zoom))
  },[points,zoom,bounds])

  useEffect(()=>{
    if(mapRef.current){
      setBounds(mapRef.current.getMap().getBounds().toArray().flat())
    }
  },[mapRef?.current])
  useEffect(()=>{},[filteredRooms]);
  return (

 
 
    //return (
      <Box
    sx={{
      height:900,
      position:'relative'


    }}

    
    >
     <ReactMapGL
      ref={mapRef}
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
      initialViewState={{
         longitude:0.1276,
         latitude:51.5072,
        
      }}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      onZoomEnd={(e)=>setZoom(Math.round(e.viewState.zoom))}
     >
       

     
    
    
  

         {clusters.map(cluster=>{
      const{cluster:isCluster,point_count}=cluster.properties
      const [longitude,latitude]=cluster.geometry.coordinates
        if(isCluster){
          return(
            <Marker
            key={`cluster-${cluster.id}`}
            longitude={longitude}
            latitude={latitude}
            
            >
            <div
            className='cluster-marker'
            style={{
              width:`${10+(point_count/point_count.length)*20}px`,
              height:`${10+(point_count/point_count.length)*20}px`,
            }}
            onClick={()=>{
              const zoom =Math.min(supercluster.getClusterExpansionZoom(cluster.id),20)
              mapRef.current.flyTo({
                center:[longitude,latitude],
                zoom,
                speed:1
              })
            }}
            >
             
             {point_count}
            </div>
            </Marker>
          )
        }

        return(
          <Marker
          key={`room-${cluster.properties.roomId}`}
          longitude={longitude}
          latitude={latitude}
          
          >
          <Tooltip
          title={cluster.properties.uName}
          >
          <Avatar
          src={cluster.properties.uPhoto}
          component={Paper}
          elevation={2}
          style={{cursor:'pointer'}}
          onClick={()=>setPopupInfo(cluster.properties)}
          />

          

          </Tooltip>

           </Marker>
        )
     })} 
   <GeocoderInput/>
   {popupInfo && (
    <Popup
    longitude={popupInfo.lng}
    latitude={popupInfo.lat}
    maxWidth='auto'
    closeOnClick={false}
    focusAfterOpen={false}
    onClose={()=>setPopupInfo(null)}
    >
   <PopupRoom {...{popupInfo}}/>
    </Popup>
   )}
   </ReactMapGL>

  </Box> 
  )
}

export default ClusterMap
