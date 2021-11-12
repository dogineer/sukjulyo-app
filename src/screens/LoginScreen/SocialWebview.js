import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
            console.log(e);
        }
    }

    _handleMessage = async (syntheticEvent) => {
		const { nativeEvent } = syntheticEvent;

		console.log(nativeEvent)

		if(nativeEvent.url.indexOf(this.props.callbackUrl) != -1) {
			
			let params = {};
			nativeEvent.url.replace(
				/[?&]{1}([^=&#]+)=([^&#]*)/g, 
				(s, k, v) => { 
					url=s;
					params[k] = decodeURIComponent(v); 
				}
			);

			this.props.setToken(params['token'])

			this.props.closeSocialModal();
		}

	};

	render() {
		return (
			<WebView
				originWhitelist={['*']}
				source={this.props.source}
				onLoadStart={this._handleMessage}
			/>
		);
	}
}