import React from "react";
import { AppBar,Toolbar,Typography} from '@mui/material';
import { Box,FileInput } from "grommet";
import { useLazyQuery ,useMutation} from "@apollo/client";
import {SESSION} from "../login/LoginGQL";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Update,Logout } from "@mui/icons-material";
import { readDataSession,checkToken} from "../global";
import Avatar from '@mui/material/Avatar';
import LoadingLayer from "../LoadingLayer";
import {UPDATE_USER} from "../home/UserPageGQL";


function UserProfilePage(props) {

  const [userData,setUserData]=React.useState({});
  const [imageProfile,setImageProfile]=React.useState();
  const [file,setFile]=React.useState();
  const [ querySession,{loading}
  ] = useLazyQuery(SESSION, { //
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      readDataSession(data,setImageProfile,setUserData)
    },
    notifyOnNetworkStatusChange: true, // did the work
  });
  const [ mutationUpdateUser] = useMutation(UPDATE_USER)

  React.useEffect(()=>{
     checkToken(querySession)
  },[])

  
  const onChangeTextInput=(event)=>{
    setUserData({...userData,[event.target.name]:event.target.value})
  }

  function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      return true
    }
    return false
  }

  function update(){;
    let userDataApp={...userData}
    delete userDataApp.imageProfile
    if(file){
      userDataApp["imageProfile"]=JSON.stringify(file)
    }
    if(validateEmail(userDataApp.email)){
      mutationUpdateUser({variables:userDataApp})
      .then((value)=>{
        alert("Operazione avvenuta con successo"); 
        window.location.href = window.location.origin + "/home";
      })
      .catch((error)=>{
        console.log(error.message);
        if(error.message.toString().includes("duplicate key value violates unique constraint")){
          alert("Username già esistente, prova con un altro");
        }
      })
    }else{
      alert("Email non valida")
    }
  }

  function logout(){
    alert("Logout avvenuta correttamente")
    sessionStorage.clear();
    window.location.href = window.location.origin + "/";
  }

  return (
      <Box>
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" color="inherit" component="div">
              Pagina Utente
            </Typography>
          </Toolbar>
        </AppBar>
        <Box  direction={"column"} overflow="auto" pad="small" align="center" gap="small">
              <Avatar sx={{ height: '100px', width: '100px' }} align="center" src={imageProfile}/>
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
              <Button sx={{width:"50ch"}} variant="contained" color="success" endIcon={<Update />} onClick={update}>
                  Aggiorna
              </Button>  
              <Button sx={{width:"50ch"}} variant="contained" color="primary" endIcon={<Logout />} onClick={logout}>
                  Logout
              </Button>  
        </Box>
        {
          loading && <LoadingLayer/>
        }
    </Box>
  );
}

export default UserProfilePage;
