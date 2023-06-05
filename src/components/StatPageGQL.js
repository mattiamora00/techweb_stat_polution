import { gql } from '@apollo/client';

const POLLUTANT_OF_CITY=gql`
query PollutantOfCity($city:String!){
  pollutantsOfCity(city:$city)
}
`

const ILLNESS_OF_CITY=gql`
query IllessCity($city:String!){
  ilnessCity(city:$city)
}
`

const PLANS_OF_CITY=gql`
query city($name:String!){
  city(name:$name){
    planSet{
      edges{
        node{
          id
          name
          startDate
          endDate
          success
          goalSet{
            edges{
              node{
                id
                goalThreshold
                pollutant{
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
	}
}
`

export {POLLUTANT_OF_CITY,ILLNESS_OF_CITY,PLANS_OF_CITY};