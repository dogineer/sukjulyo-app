import React, { useState } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

// AppTabNavigator
import MainScreen from './src/screens/MainScreen';

const AppStackNavigator = createStackNavigator(
    {
        // Navigatior router
        Login: { 
            screen: MainScreen, 
            navigationOptions: {
            headerShown: false }
        },
        // End Navigatior route

    },
    
    { initialRouteName: "Login", },
    
);

const App = createAppContainer(AppStackNavigator);

export default App;