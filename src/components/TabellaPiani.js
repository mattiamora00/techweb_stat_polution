import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import React from 'react';
import Paper from '@mui/material/Paper';
import {Card} from '@mui/material';
import {Layer,Box,TextArea} from "grommet";

function TabellaPiani(props){

    const [showLayerDescrizione,setShowLayerDescrizione]=React.useState(false);
    const [descrizionePianoSel,setDescrizionePianoSel]=React.useState("");

    function LayerDescrizione(){
        return(
          <Layer onEsc={()=>setShowLayerDescrizione(false)} onClickOutside={()=>setShowLayerDescrizione(false)}>
            <Box pad="small" gap="small" width="40vw" height="40vh">
                <TextArea readOnly={true} resize={false} fill >
                  {descrizionePianoSel}
                </TextArea>
              <Button color="primary" style={{height:"40px"}}   variant="contained" onClick={()=>{setShowLayerDescrizione(false)}}>Chiudi</Button>
            </Box>
          </Layer>
        )
      }


    return(
        <Card elevation="5">
                <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Data inizio</TableCell>
                    <TableCell>Data fine</TableCell>
                    <TableCell>Agente inquinante</TableCell>
                    <TableCell>Successo</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.elencoPiani.map((piano) => (
                    <TableRow
                    key={piano.nome}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {piano.nome}
                    </TableCell>
                    <TableCell>{piano.data_inizio.toString().split('T')[0]}</TableCell>
                    <TableCell>{piano.data_fine.toString().split('T')[0]}</TableCell>
                    <TableCell>{piano.inquinante}</TableCell>
                    <TableCell>{(piano.successo)?"Sì":"No"}</TableCell>
                    <TableCell><Button variant="outlined" onClick={()=>{setDescrizionePianoSel(piano.descrizione);setShowLayerDescrizione(true)}}>Mostra Descrizione</Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            {
                showLayerDescrizione?
                <LayerDescrizione/>
                :
                null
            }
    </Card>
    )
}

export default TabellaPiani;