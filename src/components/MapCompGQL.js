import { gql } from '@apollo/client';

const QUERY_GET_SENSORS=gql`
query MyQuery {
  cities{
    edges{
      node{
        id
        name
      }
    }
  }
}
`
export {QUERY_GET_SENSORS};