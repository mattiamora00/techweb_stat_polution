import React, { useEffect } from "react";
import { AppBar,Toolbar,Typography} from '@mui/material';
import {Box,Text,Grid, ResponsiveContext,} from "grommet";
import { useLocation } from "react-router-dom";
import LineChartComp from "./LineChar";
import TabellaMalattie from "./TabellaMalattie";
import TabellaPiani from "./TabellaPiani";
import {Card } from '@mui/material';
import { useLazyQuery } from "@apollo/client";
import { POLLUTANT_OF_CITY ,ILLNESS_OF_CITY,GET_PLANS_OF_CITY} from "./StatPageGQL";


function StatPageComp(props) {

  const location = useLocation();
  const [elencoAgentiInq,setElencoAgentiInq]=React.useState([]);
  const [mapRil,setMapRil]=React.useState(new Map());
  const [elencoMalattie,setElencoMalattia]=React.useState([]);
  const [elencoPiani,setElencoPiani]=React.useState([]);
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());


  const [ queryGetPollutantCity
  ] = useLazyQuery(POLLUTANT_OF_CITY, { //
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      const map=JSON.parse(data.pollutantsOfCity);
      if(map){ 
        setElencoAgentiInq(Object.keys(map));
        setMapRil(map)
      }
    },
    notifyOnNetworkStatusChange: true, // did the work
  });

  const [ queryIllnessOfCity
  ] = useLazyQuery(ILLNESS_OF_CITY, { 
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      if(data.ilnessCity){ 
        setElencoMalattia(data.ilnessCity)
      }
    },
    notifyOnNetworkStatusChange: true, // did the work
  });

  useEffect(()=>{
    if(location.city){
      queryGetPollutantCity({variables:{city:location.city}});
      queryIllnessOfCity({variables:{city:location.city}})
    }
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

    //getMalattieCitta();
    //getPiani();
  },[])

  
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  React.useEffect(()=>{
    console.log(windowDimensions)
  },[windowDimensions])


  
  function getMalattieCitta() {
    let id = location.city;
    fetch(`https://pollutionstat.com/server/getMalattieCitta/`+id)
      .then(response => {
        return response.text();
      })
      .then(data => {
        setElencoMalattia(JSON.parse(data));
      });
  }

  function getPiani() {
    let citta = location.city;
    fetch(`https://pollutionstat.com/server/getPianoCitta/`+citta)
      .then(response => {
        return response.text();
      })
      .then(data => {
        setElencoPiani(JSON.parse(data));
      });
  }

  

  return (
      <Box>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Statistiche {location.city}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box  direction={windowDimensions.width<=1200?"column":"row"} overflow="auto" pad="small">
          <Box height="100%" width="100%"  gap="small" direction="column" overflow="auto" pad="small">
            <Box margin="7px">
              <Text weight="bold">ANDAMENTO AGENTI INQUINANTI</Text>
            </Box>
          {
            elencoAgentiInq.map((agente)=>{
              if(mapRil[agente]){
                return(
                  <Box width="800px">
                    <LineChartComp agente={agente} data={mapRil[agente]}/>
                  </Box>
                )
              }else{
                return null;
              }
            })
          }
          </Box>
          <Box height="100%" width="100%" pad="small" gap="small">
          {
            elencoMalattie.length>0?
            <Box gap="small" >
              <Text weight="bold">ELENCO MALATTIE</Text>
              <Card  elevation="5">
                <Box height="50%" overflow="auto" gap="small">
                  <TabellaMalattie elencoMalattie={elencoMalattie}/>
                </Box>
              </Card>
            </Box>
            :
            <Box margin="2%">
              <Text weight="bold">LA CITTÀ NON HA ANCORA SEGNALATO DEI MALATI</Text>
            </Box>
            }
            {elencoPiani.length>0?
            <>
            <Text weight="bold">PIANI ADOTTATI</Text>
            <Card elevation="5" height="50%" overflow="auto">
              <Box height="50%" overflow="auto" gap="small">
                <TabellaPiani elencoPiani={elencoPiani}/>
              </Box>
            </Card>
            </>
              :
              <Box margin="2%">
                <Text weight="bold">LA CITTÀ NON HA ANCORA ADOTTATO DEI PIANI</Text>
              </Box>
              }
          </Box>  
        </Box>
    </Box>
  );
}

export default StatPageComp;
