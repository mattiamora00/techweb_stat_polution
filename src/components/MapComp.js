import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker } from "pigeon-maps"
import LayerSensoreComp from "./LayerSensore";
import {Box} from "grommet";
import Fab from '@mui/material/Fab';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLazyQuery,useQuery } from "@apollo/client";
import { QUERY_GET_SENSORS } from "./MapCompGQL";

const MapComponent= () => {

    const [showLayer,setShowLayer]=React.useState(false);
    const [elencoSensori,setElencoSensori]=React.useState([]);
    const [position,setPosition]=React.useState([45.6008,10.3701]);
    const [sensore,setSensore]=React.useState();
    const [elencoCitta,setElencoCitta]=React.useState([]);
    let history = useHistory();
    const [ queryGetSensors,{error}
    ] = useLazyQuery(QUERY_GET_SENSORS, { //{variables:{JSON}}
      fetchPolicy: "no-cache",
      onCompleted: (data) => { 
        console.log(data);
      },
      notifyOnNetworkStatusChange: true, // did the work
    });
  

    function onEscLayer(){
      setShowLayer(false);
    }

    useEffect(()=>{
      queryGetSensors();
      //getCity();
    },[])
    
    function getCity() {
      fetch('https://pollutionstat.com/server/getCity')
        .then(response => {
          return response.text();
        })
        .then(data => {
         setElencoCitta(JSON.parse(data));
        });
    }
 
    function openLayer(sensore){
      setSensore(sensore);
      setShowLayer(true);
    }

    function currentPosition(){
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        const currentPosition=[];
        currentPosition.push(lat);
        currentPosition.push(long);
        setPosition(currentPosition);
      });
    }

  return (
    <Box width="100vw" height="100vh">
      <Map height="100%" onBoundsChanged={()=>{setPosition([])}} defaultCenter={position} center={position} defaultZoom={3}>   
          {
            elencoSensori.map((sensore)=>
              <Marker 
              width={50}
              anchor={[sensore.latitudine,sensore.longitudine]} 
              color="#c62828"
              onClick={()=>{openLayer(sensore)}} 
            />
            )}      
             {
            elencoCitta.map((citta)=>
              <Marker 
              width={50}
              anchor={[citta.latitudine,citta.longitudine]} 
              color="#0000ff "
              onClick={()=>{history.push({
                pathname: '/statPage',
                city: citta.nome,
            })}} 
            />
            )}         
          {showLayer?<LayerSensoreComp sensore={sensore} onEscLayer={onEscLayer}/>:null}
      </Map>
            <Fab 
              onClick={currentPosition}
            style={{  margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',}} color="primary" aria-label="add">
        <LocationOnIcon />
      </Fab>
    </Box>
  );
};

export default MapComponent;
