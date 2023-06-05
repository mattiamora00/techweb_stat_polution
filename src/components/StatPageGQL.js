import { gql } from '@apollo/client';

const POLLUTANT_OF_CITY=gql`
query PollutantOfCity($city:String!){
  pollutantsOfCity(city:$city)
}
`

export {POLLUTANT_OF_CITY};