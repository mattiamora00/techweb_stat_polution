const URL_MEDIA_ROOT="http://localhost:8000/media/";

const readDataSession=(data,setImageProfile,setUserDataLogged=null)=>{
    const session=JSON.parse(data.sessionUserId);
      console.log(session)
      if(session){
        sessionStorage.setItem("ps_session_user_id", session.userId)
        setImageProfile(URL_MEDIA_ROOT + session.userData.imageProfile)
        if(setUserDataLogged){
            console.log(session);
            setUserDataLogged(session.userData)
        }
      }else{
        window.location.href = window.location.origin + "/";
        alert("Session scaduta, verrai reindirizzato alla pagina di login")
      }
}

const checkToken=(querySession)=>{
    const sessionToken=sessionStorage.getItem("ps_sessiontoken");
    if(sessionToken===undefined || sessionToken===null){
      window.location.href = window.location.origin + "/";
    }else{
      querySession({variables:{token:sessionToken}})
    }
}

export {URL_MEDIA_ROOT,readDataSession,checkToken};