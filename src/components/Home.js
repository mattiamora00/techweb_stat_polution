import React from "react";
import { AppBar,Toolbar,Typography } from '@mui/material';
import {Box} from "grommet";
import MapComponent from "./MapComp"
import { ApolloProvider,ApolloClient,InMemoryCache,HttpLink} from '@apollo/client';
import { useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {Box as BoxMui} from '@mui/material';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import {SESSION} from "./LoginGQL";
import Cookies from 'js-cookie';
import  { Redirect } from 'react-router-dom';
 
function HomeComp() {

  const location=useLocation();
  const history=useHistory();
  const [client]=React.useState(location.client)

  const [ querySession,
  ] = useLazyQuery(SESSION, { //
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      console.log(data);
      const userId=data.sessionUserId
      if(userId>0){
        sessionStorage.setItem("ps_session_user_id", userId)
      }else{
        window.location.href = window.location.origin + "/";
      }
    },
    notifyOnNetworkStatusChange: true, // did the work
  });

  React.useEffect(()=>{
      const sessionToken=sessionStorage.getItem("ps_sessiontoken");
      if(sessionToken===undefined || sessionToken===null){
        window.location.href = window.location.origin + "/";
      }else{
        console.log("ELSE");
        querySession({variables:{token:sessionToken}})
      }
  },[])

  return (
    <ApolloProvider client={client}>
      <Box height="100vh">
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" color="inherit" component="div">
              Pollution Stats
            </Typography>     
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </Toolbar>
        </AppBar>
        <Box height="100vh" width="100%">
            <MapComponent/>
        </Box>
      </Box>
    </ApolloProvider>
  );
}

export default HomeComp;
