import React, { useState } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

// AppTabNavigator
import MainScreen from './src/screens/MainScreen';
import BasisScreen from './src/screens/basisSetting/basis'
import NavScreen from './src/components/TabNavigator';

import SearchTest from './src/screens/basisSetting/SearchBar/SearchBar'

//Home
import NewsDetail from './src/components/AppTabNavigator/Home/Stack/NewsDetail'

//Setting
import Help from './src/components/AppTabNavigator/Setting/Stack/Help'
import appInfo from './src/components/AppTabNavigator/Setting/Stack/AppInfo'

const AppStackNavigator = createStackNavigator(
    {
        // Navigatior router
        Login: { 
            screen: MainScreen, 
            navigationOptions: {
				headerShown: false 
			}
        },
        // End Navigatior route

        NewsDetailPage: { 
            screen: NewsDetail,
            navigationOptions:{
                title: 'News Detail'
            }// 뉴스 세부 디테일 내용
        },

        UserBasis: { 
            screen: BasisScreen,
            navigationOptions: {
                gestureEnabled: false,
                headerShown: false 
			}
        }, //사용자 카테고리 페이지

        HelpPage: { 
            screen: Help,
            navigationOptions:{
                title: '고객센터/도움말'
            } 
        },

        AppInfoPage: { 
            screen: appInfo,
            navigationOptions:{
                title: '버전 정보'
            } 
        },

        Home: { 
            screen: NavScreen ,
            navigationOptions:{
                gestureEnabled: false,
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
            }
        }, 
    },
    
    { initialRouteName: "Login", },
    
);

const App = createAppContainer(AppStackNavigator);

export default App;