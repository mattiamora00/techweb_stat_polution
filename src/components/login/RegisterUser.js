import React from "react";
import { Box,FileInput } from "grommet";
import { useMutation} from "@apollo/client";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Login } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import {UPDATE_USER} from "../home/UserPageGQL";
import AppBarApp from "../AppBar";
import { useHistory } from "react-router-dom";

function RegisterUser(props) {

  const history=useHistory();
  const [userData,setUserData]=React.useState({});
  const [imageProfile,]=React.useState();
  const [file,setFile]=React.useState();
  const [passwordConfirm,setPasswordConfirm]=React.useState("");
  const [ mutationRegisterUser] = useMutation(UPDATE_USER)
  
  function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      return true
    }
    return false
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
    if(userDataApp.password===passwordConfirm){
      if(validateEmail(userDataApp.email)){
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
        alert("Email non valida")
      }
    }else{
      alert("PASSWORD NON UGUALI")
    }
  }

  return (
      <Box>
        <AppBarApp goBack={()=>history.goBack()} title="Registra utente" imageProfile={null}/>
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
                    placeholder="Nome" 
                    name="name"
                    value={userData && userData.name}
                    onChange={onChangeTextInput}
                />  
              </FormControl>
              <FormControl sx={{ width: '50ch' }}>
              <TextField
                    placeholder="Cognome" 
                    name="surname"
                    value={userData && userData.surname}
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
