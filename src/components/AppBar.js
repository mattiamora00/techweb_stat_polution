import { AppBar,Toolbar,Typography,IconButton } from '@mui/material';
import { ArrowBack } from "@mui/icons-material";
import AvatarComponent from "./AvatarComponent";
import { useHistory } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

function AppBarApp({goBack,title,imageProfile,anonymous}){

    const history=useHistory();

    function logoutAnonymous(){
        sessionStorage.clear();
        history.push({pathname:"/"})
    }

    return(
        <AppBar position="static">
            <Toolbar variant="dense" sx={{ display: "flex" , justifyContent: "space-between" }}>
                {
                    goBack &&
                    <IconButton edge="start" color="inherit" aria-label="back" sx={{ marginLeft: "-12px" }} onClick={goBack}>
                        <ArrowBack />
                    </IconButton>
                }
                <Typography variant="h6" color="inherit" component="div" sx={{ flex: 1 }}>
                    {title}
                </Typography>
                {
                    imageProfile && !anonymous &&  
                        <AvatarComponent imageProfile={imageProfile}/>
                }
                {
                    anonymous &&   
                    <IconButton
                        edge="start"
                        color="inherit"
                        label="logout"
                        aria-label="back"
                        sx={{
                            marginLeft: "-12px",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={logoutAnonymous}
                    >
                        <LogoutIcon sx={{ fontSize: "large", marginRight: "4px" }} />
                        <span style={{ fontSize: "large", marginLeft: "4px" }}>Logout</span>
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
        )
}

export default AppBarApp;