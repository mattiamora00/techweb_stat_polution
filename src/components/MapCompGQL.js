import { gql } from '@apollo/client';

const QUERY_GET_SENSORS=gql`
query sensors{
	sensors{
    id
    lat
    lng
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