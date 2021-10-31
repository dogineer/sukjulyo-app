import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './AppTabNavigator/Home/home'
import SettingScreen from './AppTabNavigator/Setting/setting'

const AppTabNavigator = createBottomTabNavigator(
    {
        // TabNavigatior router
        Home: { 
            screen: HomeScreen,
            navigationOptions: {
                tabBarOptions: { 
                    showLabel: false,
                    tabStyle: [{backgroundColor: 'rgb(31, 197, 142)'}],
                    activeTintColor: 'rgb(31, 297, 142)',
                    inactiveTintColor: 'white',
                    },
                tabBarLabel: '홈',
                }, 
            },

        Setting: { 
            screen: SettingScreen,
            navigationOptions: {
                tabBarOptions: { 
                    showLabel: false,
                    tabStyle: [{backgroundColor: 'rgb(31, 197, 142)'}],
                    activeTintColor: 'rgb(31, 297, 142)',
                    inactiveTintColor: 'white',
                    },
                tabBarLabel: '설정',
                }, 
            },
        // End TabNavigatior router
    },

    {   
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                
                let iconName;
                
                if (routeName === 'Home') {
                    iconName = 'reader-outline';
                }else if (routeName === 'Setting') {
                    iconName = "settings-outline"
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={horizontal ? 25 : 25}
                        color={tintColor}
                    />
                )
            }
        })
    },
)

export default createAppContainer(AppTabNavigator );