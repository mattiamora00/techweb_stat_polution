import {Layer,Box,Text} from "grommet";
import CircularProgress from '@mui/material/CircularProgress';

function LoadingLayer(){
    return(
        <Layer>
            <Box align="center" pad="medium" gap="small">
                <CircularProgress/>
                <Text>Loading...</Text>
            </Box>
        </Layer>
    )
}

export default LoadingLayer;