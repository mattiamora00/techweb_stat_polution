import { gql } from '@apollo/client';

const QUERY_GET_SENSORS=gql`
query UserSensor($userId:Int) {
  user(id:$userId){
    sensorsusersSet{
      	sensor{
          id,
          lat,
          lng,
          sensorCode,
          pollutant{
            id,
            name
          },
          city{
            id,
            name
          }
        } 	
    }
  }
}
`

const QUERY_GET_CITIES=gql`
query cities {
  cities {
    id
    name
    lat
    lng
  }
}
`

export {QUERY_GET_SENSORS,QUERY_GET_CITIES};