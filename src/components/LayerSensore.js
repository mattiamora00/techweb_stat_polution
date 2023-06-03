import React from "react";
import { Layer,Box,Table,TableHeader,TableRow,TableCell,TableBody ,Text} from "grommet";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const LayerSensoreComp=(props)=>{

    let history = useHistory();
    const [elencoRilevazioni,setElencoRilevazioni]=React.useState([]);
    const [sogliaObiettivo,setSogliaObiettivo]=React.useState("");

    useEffect(()=>{
        getRilevazione();
        getPianoCitta();
    },[])

    
    function getRilevazione() {
        let id = props.sensore.codice_sensore;
        fetch(`https://pollutionstat.com/server/getRilevazione/`+id)
          .then(response => {
            return response.text();
          })
          .then(data => {
            setElencoRilevazioni(JSON.parse(data));
          });
      }

      function getPianoCitta() {
        let citta = props.sensore.citta;
        fetch(`https://pollutionstat.com/server/getSogliaCitta/`+citta+"/"+props.sensore.agente_inquinante)
          .then(response => {
            return response.text();
          })
          .then(data => {
            var dataParse=JSON.parse(data);
            if(dataParse.length!==0){
                setSogliaObiettivo(JSON.parse(data).sogliaObiettivo)
            }
          });
      }


    return(
        <Layer onEsc={props.onEscLayer} onClickOutside={props.onEscLayer}>
            <Box width="70vw" pad="medium" gap="medium" overflow="auto"> 
                <Text>Sensore n. {props.sensore.codice_sensore}, Località {props.sensore.citta}</Text>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableCell scope="col" border="bottom">
                            Data Ril.
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Ora
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Codice sensore
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Latitudine
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Longitudine
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Città
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Agente inquinante
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Quantità rilevata
                        </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {
                           elencoRilevazioni.map((rilevazione)=>{
                            return(
                                <TableRow>
                                <TableCell scope="row">
                                    <strong><Text color={sogliaObiettivo!==""?(rilevazione.quantita_rilevata>sogliaObiettivo?"red":"green"):"black"}>{rilevazione.timestamp.split('T')[0]}</Text></strong>
                                </TableCell>
                                <TableCell scope="row">
                                    <strong><Text color={sogliaObiettivo!==""?rilevazione.quantita_rilevata>sogliaObiettivo?"red":"green":"black"}>{rilevazione.timestamp.split('T')[1].split('.')[0]}</Text></strong>
                                </TableCell>
                                <TableCell scope="row">
                                    <Text color={sogliaObiettivo!==""?rilevazione.quantita_rilevata>sogliaObiettivo?"red":"green":"black"}>{rilevazione.codice_sensore}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text color={sogliaObiettivo!==""?rilevazione.quantita_rilevata>sogliaObiettivo?"red":"green":"black"}>{props.sensore.latitudine}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text color={sogliaObiettivo!==""?rilevazione.quantita_rilevata>sogliaObiettivo?"red":"green":"black"}>{props.sensore.latitudine}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text color={sogliaObiettivo!==""?rilevazione.quantita_rilevata>sogliaObiettivo?"red":"green":"black"}>{props.sensore.citta}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text color={sogliaObiettivo!==""?rilevazione.quantita_rilevata>sogliaObiettivo?"red":"green":"black"}>{props.sensore.agente_inquinante}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text color={sogliaObiettivo!==""?rilevazione.quantita_rilevata>sogliaObiettivo?"red":"green":"black"}>{rilevazione.quantita_rilevata}</Text>
                                </TableCell>
                                </TableRow> 
                            )
                           })
                        }
                    </TableBody>
                </Table>
                <Box alignSelf="center" width="30%">
                    <Button onClick={()=>history.push({
                        pathname: '/statPage',
                        city: props.sensore.citta,
                    })} variant="contained">Vai alle statistiche di {props.sensore.citta}</Button>
                </Box>
            </Box>
        </Layer>
    )
}

export default LayerSensoreComp;