import React from "react";
import { Layer,Box,Table,TableHeader,TableRow,TableCell,TableBody ,Text} from "grommet";
import { useLazyQuery } from "@apollo/client";
import { CAUSE_OF_ILLNESS } from "./StatPageGQL";
import LoadingLayer from "../LoadingLayer";

const LayerCause=(props)=>{

    const [elencoCause,setElencoCause]=React.useState([]);
    const [nomeMalattia,setNomeMalattia]=React.useState();
    const [ queryGetCauseIllness,{loading}
    ] = useLazyQuery(CAUSE_OF_ILLNESS, { //{variables:{JSON}}
      fetchPolicy: "no-cache",
      onCompleted: (data) => { 
        const causeList=data.ilnes.causeSet.edges.map((el)=>el.node.pollutionType.pollutantSet.edges)[0]
      
        if(data.ilnes.nome){
            setNomeMalattia(data.ilnes.nome);
        }
        if(causeList){
            setElencoCause(causeList);
        }
      },
      notifyOnNetworkStatusChange: true, // did the work
    });

    React.useEffect(()=>{
        if(props.malattia){
            queryGetCauseIllness({variables:{id:props.malattia}})
        }
    },[])

    return(
        <Layer onEsc={props.onEscLayer} onClickOutside={props.onEscLayer}>
            <Box width="80vw" pad="medium" gap="medium" overflow="auto"> 
                <Text weight="bold">Cause {nomeMalattia}</Text>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableCell>
                            Tipologia inquinamento
                        </TableCell>
                        <TableCell>
                            Agente inquinante
                        </TableCell>
                        <TableCell>
                            Descrizione agente inquinante
                        </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {
                           elencoCause.map((causa)=>{
                            return(
                                <TableRow>
                                    <TableCell scope="row">
                                        {""}
                                    </TableCell>
                                    <TableCell scope="row">
                                        {causa.node.name}
                                    </TableCell>
                                    <TableCell scope="row">
                                        {causa.node.description}
                                    </TableCell>
                                </TableRow> 
                            )
                           })
                        }
                    </TableBody>
                </Table>
            </Box>
            {
                loading && <LoadingLayer/>
            }
        </Layer>
    )
}

export default LayerCause;