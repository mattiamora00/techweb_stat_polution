import React from "react";
import { Layer,Box,Table,TableHeader,TableRow,TableCell,TableBody ,Text} from "grommet";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { SENSOR_RILEVATIONS } from "../sensor/LayerSensorGQL";
import LoadingLayer from "../LoadingLayer";
import moment from "moment";
import { LAST_GOAL_POLLUTANT_CITY } from "./LayerSensorGQL";

const LayerSensoreComp=(props)=>{

    let history = useHistory();
    const [elencoRilevazioni,setElencoRilevazioni]=React.useState([]);
    const [sogliaObiettivo,setSogliaObiettivo]=React.useState(null);

    const [ queryGetSensorRilevation,{loading}
    ] = useLazyQuery(SENSOR_RILEVATIONS, { //
      fetchPolicy: "no-cache",
      onCompleted: (data) => { 
        setElencoRilevazioni(data.sensor.rilevationSet.edges.map((el)=>el.node))
      },
      notifyOnNetworkStatusChange: true, // did the work
    });

    const [ queryGetLastCityGoal
    ] = useLazyQuery(LAST_GOAL_POLLUTANT_CITY, { //
      fetchPolicy: "no-cache",
      onCompleted: (data) => { 
        const lastCityGoal=data.lastCityGoal;
        if(lastCityGoal){
            setSogliaObiettivo(lastCityGoal.goalThreshold)
            console.log(lastCityGoal.goalThreshold);
        }else{
            setSogliaObiettivo(null)
        }
      },
      notifyOnNetworkStatusChange: true, // did the work
    });


    useEffect(()=>{
        if(props.sensore.id){
            queryGetSensorRilevation({variables:{sensorCode:props.sensore.sensorCode}})
            queryGetLastCityGoal({variables:{city:props.sensore.city.name,pollutant:props.sensore.pollutant.name}})
        }
    },[])

    return(
        <Layer onEsc={props.onEscLayer} onClickOutside={props.onEscLayer}>
            <Box width="70vw" pad="medium" gap="medium" overflow="auto"> 
                <Text>Sensore n. {props.sensore.sensorCode}, Località {props.sensore.city.name}</Text>
                {
                    elencoRilevazioni.length>0?
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
                                    console.log(rilevazione);
                                return(
                                    <TableRow>
                                    <TableCell scope="row">
                                        <strong><Text color={sogliaObiettivo?(rilevazione.quantity>sogliaObiettivo?"red":"green"):"black"}>{moment(rilevazione.timestamp).format("DD-MM-YYYY")}</Text></strong>
                                    </TableCell>
                                    <TableCell scope="row">
                                        <strong><Text color={sogliaObiettivo?rilevazione.quantity>sogliaObiettivo?"red":"green":"black"}>{moment(rilevazione.timestamp).format("hh:mm")}</Text></strong>
                                    </TableCell>
                                    <TableCell>
                                        <Text color={sogliaObiettivo?rilevazione.quantity>sogliaObiettivo?"red":"green":"black"}>{props.sensore.pollutant.name}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text color={sogliaObiettivo?rilevazione.quantity>sogliaObiettivo?"red":"green":"black"}>{rilevazione.quantity}</Text>
                                    </TableCell>
                                    </TableRow> 
                                )
                                })
                            }
                        </TableBody>
                    </Table>
                    :
                    <Box width="100%" align="center">
                        <Text weight="bold">NON SONO PRESENTI RILEVAZIONI PER QUESTO SENSORE</Text>
                    </Box>
                }
                
                <Box alignSelf="center" width="30%">
                    <Button onClick={()=>history.push({
                        pathname: '/statPage',
                        city: props.sensore.city.name,
                    })} variant="contained">Vai alle statistiche di {props.sensore.city.name}</Button>
                </Box>
            </Box>
            {
                loading && <LoadingLayer/>
            }
        </Layer>
    )
}

export default LayerSensoreComp;