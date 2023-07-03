import React from "react";
import {Box} from "grommet";
import MapComponent from "../map/MapComp"
import { ApolloProvider} from '@apollo/client';
import { useLocation } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import {SESSION} from "../login/LoginGQL";
import { readDataSession,checkToken} from "../global";
import AppBarApp from "../AppBar";

function HomeComp() {

  const location=useLocation();
  const [client]=React.useState(location.client)
  const [imageProfile,setImageProfile]=React.useState();
  const [userData,setUserData]=React.useState({});

  const [ querySession,
  ] = useLazyQuery(SESSION, { //
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      readDataSession(data,setImageProfile,setUserData)
    },
    notifyOnNetworkStatusChange: true, // did the work
  });

  React.useEffect(()=>{
    checkToken(querySession)
  },[])

  return (
    <ApolloProvider client={client}>
      <Box height="100vh">
        <AppBarApp goBack={null} title="Pollution Stats" imageProfile={imageProfile} anonymous={userData.email==="anonymous@example.com"}/>
        <Box height="100vh" width="100%">
            <MapComponent userData={userData}/>
        </Box>
      </Box>
    </ApolloProvider>
  );
}

export default HomeComp;
