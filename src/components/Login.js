import React from "react";
import { AppBar,Toolbar,Typography } from '@mui/material';
import {Box,Card} from "grommet";
import MapComponent from "./MapComp"
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useHistory } from "react-router-dom";
import { ApolloProvider,ApolloClient,InMemoryCache,HttpLink} from '@apollo/client';

function Login() {
    
    const history=useHistory();
    const [loginData,setLoginData]=React.useState({});

    const onChangeTextInput=(event)=>{
        setLoginData({...loginData,[event.target.name]:event.target.value})
    }

    function login(){
        const tenant="milano"
        const apolloClient=new ApolloClient({
            uri: 'http://milano.localhost:8000/graphql',
            cache: new InMemoryCache(),
          });

        history.push(
            {
                pathname: '/home',
                tenant: tenant,
                client:apolloClient
            }
        )
    }

    return (
    <Box height="100vh" background="#e8ecfc ">
        <AppBar position="static">
        <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
                Pollution Stats Login
            </Typography>
        </Toolbar>
        </AppBar>
        <Box margin="large" gap="medium" align="center">
            <Card elevation="medium" background="white">
                <Box gap="medium" pad="medium">
                    <FormControl sx={{ width: '50ch' }}>
                        <TextField
                            id="username"
                            label="Username"
                            value={loginData && loginData.username}
                            onChange={onChangeTextInput}
                        />
                    </FormControl>
                    <FormControl sx={{ width: '50ch' }}>
                    <TextField
                        id="password"
                        label="Password"
                        value={loginData && loginData.password}
                        onChange={onChangeTextInput}
                    />
                    </FormControl>
                    <Button variant="contained" endIcon={<LoginIcon />} onClick={login}>
                        Login
                    </Button>
                </Box>
            </Card>
        </Box>
    </Box>
    );
}

export default Login;
