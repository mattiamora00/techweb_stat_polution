import { gql } from '@apollo/client';

const SENSOR_RILEVATIONS=gql`
query SensorRilevations($sensorCode:String!){
  sensor(sensorCode:$sensorCode){
    sensorCode
    rilevationSet{
      edges{
        node{
          id
          timestamp
          quantity
        }
      }
    }
  }
}
`

export {SENSOR_RILEVATIONS};