import React from "react";
import { AppBar,Toolbar,Typography } from '@mui/material';
import {Box,Card,Text} from "grommet";
import MapComponent from "./MapComp"
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useHistory } from "react-router-dom";
import { ApolloProvider,ApolloClient,InMemoryCache,HttpLink} from '@apollo/client';
import {USER_AUTH,SESSION} from "./LoginGQL";
import { useLazyQuery } from "@apollo/client";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import RegisterUser from "./RegisterUser";

function Login(props) {
    
    const history=useHistory();
    const [loginData,setLoginData]=React.useState({username:"",password:""});
    const [loginError,setLoginError]=React.useState(null);
    const [ queryLogin,
    ] = useLazyQuery(USER_AUTH, { //
      fetchPolicy: "no-cache",
      onCompleted: (data) => { 
        const res=JSON.parse(data.userAuth);
        if(res){
            if(res.success){
                setLoginError(null);
                sessionStorage.setItem("ps_sessiontoken",res.token)
                history.push(
                    {
                        pathname: '/home',
                    })
            }else{
                alert(res.error)
                setLoginError(res.error)
            }
        }
      },
      onError:(error)=>{
        if(error.message==="User matching query does not exist."){
            alert("Errors, user not found")
        }
       
      },
      notifyOnNetworkStatusChange: true, // did the work
    });

    const onChangeTextInput=(event)=>{
        setLoginData({...loginData,[event.target.name]:event.target.value})
    }

    function login(){
        queryLogin({variables:loginData})
    }

    function goToReisterUser(){
        history.push({
            pathname:"/RegisterUser"
        })
    }

    React.useEffect(()=>{
        sessionStorage.clear();
    })

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
                            name="username"
                            label="Username"
                            value={loginData && loginData.username}
                            onChange={onChangeTextInput}
                        />
                    </FormControl>
                    <FormControl sx={{ width: '50ch' }}>
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={loginData && loginData.password}
                        onChange={onChangeTextInput}
                    />
                    </FormControl>
                    <Button variant="contained" endIcon={<LoginIcon />} onClick={login}>
                        Login
                    </Button>
                    <Button color="success" variant="contained" endIcon={<AssignmentIndIcon />} onClick={goToReisterUser}>
                        Registrati
                    </Button>
                    {
                        loginError && <Text weight="bold" color="red">{loginError}</Text>
                    }
                </Box>
            </Card>
        </Box>
    </Box>
    );
}

export default Login;
