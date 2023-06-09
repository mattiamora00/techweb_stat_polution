import React, { useEffect } from "react";
import { AppBar,Toolbar,Typography} from '@mui/material';
import { Box,FileInput } from "grommet";
import { useLocation } from "react-router-dom";
import { useLazyQuery ,useMutation} from "@apollo/client";
import {SESSION} from "./LoginGQL";
import { useHistory } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Update,Logout, Login } from "@mui/icons-material";
import { URL_MEDIA_ROOT ,readDataSession,checkToken} from "./global";
import Avatar from '@mui/material/Avatar';
import LoadingLayer from "./LoadingLayer";
import {UPDATE_USER} from "./UserPageGQL";

function RegisterUser(props) {

  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  const [userData,setUserData]=React.useState({});
  const [imageProfile,setImageProfile]=React.useState();
  const [file,setFile]=React.useState();
  const [passwordConfirm,setPasswordConfirm]=React.useState("");
  const [ mutationRegisterUser] = useMutation(UPDATE_USER)

  useEffect(()=>{
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  const onChangeTextInput=(event)=>{
    setUserData({...userData,[event.target.name]:event.target.value})
  }

  function register(){
    let userDataApp={...userData}
    if(file){
      delete userDataApp.imageProfile
      userDataApp["imageProfile"]=JSON.stringify(file)
    }
    console.log(userDataApp);
    if(userDataApp.password===passwordConfirm){
      mutationRegisterUser({variables:userDataApp})
      .then((value)=>{
        alert("Operazione avvenuta con successo"); 
        window.location.href = window.location.origin + "/";
      })
      .catch((error)=>{
        console.log(error.message);
        if(error.message.toString().includes("duplicate key value violates unique constraint")){
          alert("Username già esistente, prova con un altro");
        }else{
          alert("Errore durante l'operazione");
        }
      })
    }else{
      alert("PASSWORD NON UGUALI")
    }
   
  }

  return (
      <Box>
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" color="inherit" component="div">
              Registra Utente
            </Typography>
          </Toolbar>
        </AppBar>
        <Box  direction={"column"} overflow="auto" pad="small" align="center" gap="small">
              <Avatar sx={{ height: '100px', width: '100px' }} align="center" src={imageProfile}/>
              <FormControl sx={{ width: '50ch' }}>
                <TextField
                    placeholder="Username" 
                    name="username"
                    value={userData && userData.username}
                    onChange={onChangeTextInput}
                />  
              </FormControl>
              <FormControl sx={{ width: '50ch' }}>
                <TextField
                    placeholder="Email" 
                    name="email"
                    value={userData && userData.email}
                    onChange={onChangeTextInput}
                />
              </FormControl>
              <FormControl sx={{ width: '50ch' }}>
                <TextField
                    placeholder="Password" 
                    name="password"
                    type="password"
                    value={userData && userData.password}
                    onChange={onChangeTextInput}
                />
              </FormControl>
              <FormControl sx={{ width: '50ch' }}>
                <TextField
                    placeholder="Conferma password" 
                    name="password"
                    type="password"
                    value={passwordConfirm}
                    onChange={(event)=>setPasswordConfirm(event.target.value)}
                />
              </FormControl>
              <Box width="50ch">
                <FileInput
                  messages={{
                    browse: "carica", 
                    dropPrompt: "Trascina un immagine o", 
                    dropPromptMultiple: "Trascina un immagine o", 
                    files: "Immagini", 
                    remove: "Cancella", 
                  }}
                  multiple={false}
                  onChange={event => {
                    const fileList = event.target.files;
                    const file=fileList[0];
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = function () {
                        const result=reader.result;
                        let fileObj={
                            name: file.name, 
                            type:file.type,            
                            content:result,
                            size:file.size,
                            modified: file.lastModifiedDate,
                        }
                      setFile(fileObj);
                    }
                  }
                }
                />
              </Box>
              <Button sx={{width:"50ch"}} variant="contained" color="success" endIcon={<Login />} onClick={register}>
                  Registrati
              </Button>  
        </Box>
    </Box>
  );
}

export default RegisterUser;
