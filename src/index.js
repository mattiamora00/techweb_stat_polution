import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider,ApolloClient,InMemoryCache,HttpLink} from '@apollo/client';
import Routes from "./routes";

ReactDOM.render(
  <React.StrictMode>
     <Root/>
  </React.StrictMode>,
  document.getElementById('root')
);

function Root(){
 
  const apolloClient=new ApolloClient({
    uri: `http://localhost:8000/graphql/`,
    cache: new InMemoryCache(),
  });

  const [client,setClient]=React.useState(apolloClient)
  
  React.useEffect(()=>{
    console.log(client)
  },[client])
  
  return (
    <ApolloProvider client={client}>
      <Routes setClient={setClient}/>
    </ApolloProvider>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
