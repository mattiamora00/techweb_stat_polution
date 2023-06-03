import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import React from 'react';
import Paper from '@mui/material/Paper';
import {Card,CardContent,Divider } from '@mui/material';
import LayerCause from './LayerCause';

function TabellaMalattie(props){
    
    const [showLayer,setShowLayer]=React.useState(false);
    const [malattiaSel,setMalattiaSel]=React.useState("");


    return(
        <Card elevation="5">
                <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Malattia</TableCell>
                    <TableCell>Numero casi</TableCell>
                    <TableCell>Indice mortalità</TableCell>
                    <TableCell>Durata media</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.elencoMalattie.map((malattia) => (
                    <TableRow
                    key={malattia.nome_malattia}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {malattia.nome_malattia}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {malattia.count}
                    </TableCell>
                    <TableCell>{malattia.indice_mortalita}</TableCell>
                    <TableCell>{malattia.giorni_durata_media}</TableCell>
                    <TableCell><Button variant="outlined" onClick={()=>{setMalattiaSel(malattia.nome_malattia);setShowLayer(true)}}>Mostra Cause</Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            {
                showLayer?
                <LayerCause malattia={malattiaSel} onEscLayer={()=>setShowLayer(false)}/>
                :
                null
            }
    </Card>
    )
}

export default TabellaMalattie;