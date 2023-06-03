import React from "react";
import { Layer,Box,Table,TableHeader,TableRow,TableCell,TableBody ,Text} from "grommet";
import { useEffect } from "react";

const LayerCause=(props)=>{

    const [elencoCause,setElencoCause]=React.useState([]);

    useEffect(()=>{
        getCause();
    },[])

    
    function getCause() {
        fetch(`https://pollutionstat.com/server/getCausa/`+props.malattia)
          .then(response => {
            return response.text();
          })
          .then(data => {
            setElencoCause(JSON.parse(data));
          });
      }

    return(
        <Layer onEsc={props.onEscLayer} onClickOutside={props.onEscLayer}>
            <Box width="50vw" pad="medium" gap="medium" overflow="auto"> 
                <Text>Cause {props.malattia}</Text>
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
                                        {causa.nome_tipo}
                                    </TableCell>
                                    <TableCell scope="row">
                                        {causa.nome}
                                    </TableCell>
                                    <TableCell scope="row">
                                        {causa.descrizione}
                                    </TableCell>
                                </TableRow> 
                            )
                           })
                        }
                    </TableBody>
                </Table>
            </Box>
        </Layer>
    )
}

export default LayerCause;