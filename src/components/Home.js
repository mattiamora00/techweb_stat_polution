import React from "react";
import { AppBar,Toolbar,Typography } from '@mui/material';
import {Box} from "grommet";
import MapComponent from "./MapComp"
import { ApolloProvider,ApolloClient,InMemoryCache,HttpLink} from '@apollo/client';
import { useLocation } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import {SESSION} from "./LoginGQL";
import { URL_MEDIA_ROOT ,readDataSession,checkToken} from "./global";
import AvatarComponent from "./AvatarComponent";

function HomeComp() {

  const location=useLocation();
  const [client]=React.useState(location.client)
  const [imageProfile,setImageProfile]=React.useState();
  const [userData,setUserData]=React.useState({});

  const [ querySession,
  ] = useLazyQuery(SESSION, { //
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      console.log(data)
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
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" color="inherit" component="div">
              Pollution Stats
            </Typography>     
            {
              imageProfile &&  
                <AvatarComponent imageProfile={imageProfile}/>
            }
          </Toolbar>
        </AppBar>
        <Box height="100vh" width="100%">
            <MapComponent userData={userData}/>
        </Box>
      </Box>
    </ApolloProvider>
  );
}

export default HomeComp;
