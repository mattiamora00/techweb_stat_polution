import { Line } from 'react-chartjs-2';
import {Card,CardContent,Divider } from '@mui/material';

function LineChartComp(props){

    const data = {
        labels: props.data.map((ril)=>ril.timestamp),
        datasets: [{
          label: props.agente,
          data: props.data.map((ril)=>ril.quantity),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

    return(
        <Card elevation={5} {...props}>
          <Divider />
          <CardContent>       
              <Line
                data={data}
              />     
          </CardContent>
          <Divider/>
        </Card>
    )
}

export default LineChartComp;