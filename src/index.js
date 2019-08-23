import React from 'react'; 
import { StatusBar } from 'react-native'; 
import Routes from './routes'; 

export default function App() {
    // Statusbar config for para Android 
    return(
        <>
          <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />   
          <Routes /> 
        </> 
    );
}

/* 
Execute yarn json-server server.json -d 1000 -w
    -d delay of 1s because it's in localhost. 
    -w restart server in any change 
*/