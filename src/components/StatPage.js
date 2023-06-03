import React, { useEffect } from "react";
import { AppBar,Toolbar,Typography} from '@mui/material';
import {Box,Text} from "grommet";
import { useLocation } from "react-router-dom";
import LineChartComp from "./LineChar";
import TabellaMalattie from "./TabellaMalattie";
import TabellaPiani from "./TabellaPiani";
import {Card } from '@mui/material';

function StatPageComp(props) {

  const location = useLocation();
  const [elencoAgentiInq,setElencoAgentiInq]=React.useState([]);
  const [mapRil,setMapRil]=React.useState(new Map());
  const [elencoMalattie,setElencoMalattia]=React.useState([]);
  const [elencoPiani,setElencoPiani]=React.useState([]);

  useEffect(()=>{
    getAgentiInq();
    getMalattieCitta();
    getPiani();
  },[])

  function getAgentiInq() {
    let id = location.city;
    fetch(`https://pollutionstat.com/server/getAgenteFromCity/`+id)
      .then(response => {
        return response.text();
      })
      .then(data => {
        var dataParse=JSON.parse(data);
        const map=new Map(dataParse.mappa);
        setElencoAgentiInq(dataParse.agenti);
        setMapRil(map);
      });
  }

  
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
      <Box  direction="row" overflow="auto" pad="small">
        <Box height="100%"  gap="small" direction="column" overflow="auto" pad="small">
        <Box margin="0.7%">
          <Text weight="bold">ANDAMENTO AGENTI INQUINANTI</Text>
        </Box>
        {
          elencoAgentiInq.map((agente)=>{
            if(mapRil.get(agente)!==undefined){
              return(
                <Box width="800px">
                  <LineChartComp agente={agente} data={mapRil.get(agente)}/>
                </Box>
              )
            }else{
              return null;
            }
          })
        }
        </Box>
        <Box height="100%" width="50%" pad="small" gap="small">
        {
          elencoMalattie.length>0?
          <>
         <Text weight="bold">ELENCO MALATTIE</Text>
          <Card elevation="5">
            <Box height="50%" overflow="auto" gap="small">
              <TabellaMalattie elencoMalattie={elencoMalattie}/>
            </Box>
          </Card>
          </>
          :
          <Box margin="2%">
          <Text weight="bold">LA CITTÀ NON HA ANCORA SEGNALATO DEI MALATI</Text>
        </Box>
          }
          {elencoPiani.length>0?
          <>
          <Text weight="bold">PIANI ADOTTATI</Text>
          <Card elevation="5" height="50%" overflow="auto">
            <Box height="5" overflow="auto">
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
