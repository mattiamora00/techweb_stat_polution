import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useHistory } from "react-router-dom";

function AvatarComponent({imageProfile}){
    
    const history=useHistory();

    function onClick(){
        history.push( {
            pathname: '/userProfilePage',
        })
    }

    return(
        <IconButton onClick={onClick}>
            <Avatar src={imageProfile} />
        </IconButton>
    )
}

export default AvatarComponent;