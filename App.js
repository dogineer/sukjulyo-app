import React, { useState } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

// AppTabNavigator
import MainScreen from './src/screens/MainScreen';
import BasisScreen from './src/screens/basisSetting/basis'
import NavScreen from './src/components/TabNavigator';

import SearchTest from './src/screens/basisSetting/SearchBar/SearchBar'

const AppStackNavigator = createStackNavigator(
    {
        // Navigatior router
        Login: { 
            screen: MainScreen, 
            navigationOptions: {
            headerShown: false }
        },
        // End Navigatior route

        SearchTest: {
            screen: SearchTest, 
            navigationOptions: {
            headerShown: false }
        },

        UserBasis: {
            screen: BasisScreen,
            navigationOptions: {
                headerShown: false }
        },

        Home: { 
            screen: NavScreen ,
            navigationOptions:{
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: 'rgb(31, 197, 142)',
                    shadowColor: 'transparent',
                    borderBottomWidth: 0,
                    elevation:0
                },
                headerLeft: 0,
                title: '석줄요',
                headerTitleAlign: 'center',  
                headerRight: 0,
            }}, 
    },
    
    { initialRouteName: "Login", },
    
);

const App = createAppContainer(AppStackNavigator);

export default App;