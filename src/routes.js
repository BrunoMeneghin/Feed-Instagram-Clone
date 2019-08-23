import React from 'react'; 
import { Image } from 'react-native'; 
import Feed from './pages/Feed'; 
import logo from './assets/instagram.png'; 
import { createAppContainer, createStackNavigator } from 'react-navigation'; 

const Routes = createAppContainer(
    createStackNavigator({
        Feed
    }, {
        headerLayoutPreset: "center", 
        defaultNavigationOptions: {
            headerTitle: <Image source={logo} />, 
            headerStyle: {
                backgroundColor: '#f5f5f5'
            } 
        }
    })
);

export default Routes; // exportar para que elas possam ser acessíveis por outros componentes