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

const LAST_GOAL_POLLUTANT_CITY=gql`
query PlanCity($city:String!,$pollutant:String!){
  lastCityGoal(city:$city,pollutant:$pollutant){
    id
    goalThreshold
  }
}
`

export {SENSOR_RILEVATIONS,LAST_GOAL_POLLUTANT_CITY};