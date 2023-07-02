import { gql } from '@apollo/client';

const USER_AUTH=gql`
query userAuth ($username:String!,$password:String!){
    userAuth(username:$username,password:$password)
  }
`
const SESSION=gql`
query session ($token:String!){
    sessionUserId(token:$token)
}
`

export {USER_AUTH,SESSION};