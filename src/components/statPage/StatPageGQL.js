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
query city($city:String!){
  city(name:$city){
    planSet{
      edges{
        node{
          id
          name
          startDate
          endDate
          success
          description
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

const CAUSE_OF_ILLNESS=gql`
query CauseIllness($id:Int!){
  ilnes(id:$id){
    nome
    causeSet{
      edges{
        node{
          id
          pollutionType{
            name
            pollutantSet{
              edges{
                node{
                  id
                  name
                  description
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

export {POLLUTANT_OF_CITY,ILLNESS_OF_CITY,PLANS_OF_CITY,CAUSE_OF_ILLNESS};