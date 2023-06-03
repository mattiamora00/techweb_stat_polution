import React from "react";
import { AppBar,Toolbar,Typography } from '@mui/material';
import {Box} from "grommet";
import MapComponent from "./MapComp"
import { ApolloProvider,ApolloClient,InMemoryCache,HttpLink} from '@apollo/client';
import { useLocation } from "react-router-dom";

function HomeComp() {

  const location=useLocation();
  const [client]=React.useState(location.client)

  const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri:"http://localhost:8000/graphql/",
        options: {
          reconnect: true,
          connectionParams: {
            headers: {
              ["Access-Control-Allow-Origin"]: "*",
              ["Access-Control-Allow-Headers"]: "Access-Control-Allow-Headers",
              ["Access-Control-Allow-Methods"]: "GET, POST, PATCH, PUT, DELETE, OPTIONS"
            }
          }
        },
        includeExtensions: true,
        includeUnusedVariables: true
      }),
    cache:new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <Box height="100vh">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Pollution Stats
            </Typography>
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
