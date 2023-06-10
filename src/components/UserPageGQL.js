import { gql } from '@apollo/client';

const UPDATE_USER=gql`
mutation User($id:ID,$username:String!,$email:String!,$password:String!,$imageProfile:String,$viewPlan:Boolean,$viewGraph:Boolean,$viewSick:Boolean,$viewSensor:Boolean){
  upsertUser(input:{id:$id,username:$username,email:$email,password:$password,profileImage:$imageProfile,viewPlan:$viewPlan,viewSick:$viewSick,viewGraph:$viewGraph,viewSensor:$viewSensor}){
    user{
      id
      username
    }
    errors{
      field
      messages
    }
  }
}
`

export {UPDATE_USER};