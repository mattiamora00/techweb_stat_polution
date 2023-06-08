import React, { useEffect } from "react";
import { AppBar,Toolbar,Typography} from '@mui/material';
import { Box,Text } from "grommet";
import { useLocation } from "react-router-dom";
import LineChartComp from "./LineChar";
import TabellaMalattie from "./TabellaMalattie";
import TabellaPiani from "./TabellaPiani";
import {Card } from '@mui/material';
import { useLazyQuery } from "@apollo/client";
import { POLLUTANT_OF_CITY ,ILLNESS_OF_CITY, PLANS_OF_CITY} from "./StatPageGQL";
import LoadingLayer from "./LoadingLayer";
import Avatar from '@mui/material/Avatar';
import {SESSION} from "./LoginGQL";
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";


function StatPageComp(props) {

  const location = useLocation();
  const history=useHistory();
  const [elencoAgentiInq,setElencoAgentiInq]=React.useState([]);
  const [mapRil,setMapRil]=React.useState(new Map());
  const [elencoMalattie,setElencoMalattia]=React.useState([]);
  const [elencoPiani,setElencoPiani]=React.useState([]);
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  const [ querySession,
  ] = useLazyQuery(SESSION, { //
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      console.log(data);
      const userId=data.sessionUserId
      if(userId>0){
        sessionStorage.setItem("ps_session_user_id", userId)
      }else{
        window.location.href = window.location.origin + "/";
      }
    },
    notifyOnNetworkStatusChange: true, // did the work
  });

  React.useEffect(()=>{
      const sessionToken=sessionStorage.getItem("ps_sessiontoken");
      if(sessionToken===undefined || sessionToken===null){
        window.location.href = window.location.origin + "/";
      }else{
        console.log("ELSE");
        querySession({variables:{token:sessionToken}})
      }
  },[])

  const [ queryGetPollutantCity,{loading}
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

  const [ queryIllnessCity
  ] = useLazyQuery(ILLNESS_OF_CITY, { 
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      if(data.ilnessCity){ 
        setElencoMalattia(data.ilnessCity)
      }
    },
    notifyOnNetworkStatusChange: true, // did the work
  });

  const [ queryPlansCity
  ] = useLazyQuery(PLANS_OF_CITY, { 
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      const planList=data.city.planSet.edges.map((el)=>el.node);
      if(planList){
        setElencoPiani(planList);
      }
    },
    notifyOnNetworkStatusChange: true, // did the work
  });


  useEffect(()=>{
    if(location.city){
      const argument={variables:{city:location.city}}
      queryGetPollutantCity(argument);
      queryIllnessCity(argument);
      queryPlansCity(argument);
    }
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  return (
      <Box>
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" color="inherit" component="div">
              Statistiche {location.city}
            </Typography>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </Toolbar>
        </AppBar>
        <Box  direction={windowDimensions.width<=1200?"column":"row"} overflow="auto" pad="small">
          <Box height="100%" width="100%"  gap="small" direction="column" overflow="auto" pad="small">
            <Box margin="7px">
              {
              elencoAgentiInq.length>0?
                <Text weight="bold">ANDAMENTO AGENTI INQUINANTI</Text>
                :
                <Text weight={"bold"} color="red">NESSUN DATO TROVATO</Text>
              }
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
              <Text weight="bold" color="red">LA CITTÀ NON HA ANCORA SEGNALATO DEI MALATI</Text>
            </Box>
            }
            {elencoPiani.length>0?
            <Box gap="small">
              <Text weight="bold">PIANI ADOTTATI</Text>
              <Card elevation="5" height="50%" overflow="auto">
                <Box height="50%" overflow="auto" gap="small">
                  <TabellaPiani elencoPiani={elencoPiani}/>
                </Box>
              </Card>
            </Box>
              :
              <Box margin="2%">
                <Text weight="bold" color="red">LA CITTÀ NON HA ANCORA ADOTTATO DEI PIANI</Text>
              </Box>
              }
          </Box>  
        </Box>
        {
          loading && <LoadingLayer/>
        }
    </Box>
  );
}

export default StatPageComp;
