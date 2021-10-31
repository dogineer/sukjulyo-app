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

    INJECTED_JAVASCRIPT =
        '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';

    _handleMessage = async (event) => {
        console.log("_handleMessage start");
        console.log(JSON.parse(event.nativeEvent.data));

        let result = JSON.parse(event.nativeEvent.data);
        let success = result.message;

        if (success) {
            let userToken = result.Authorization;

            try {
                await storeData(userToken);
            } catch (e) {
                console.log(e);
            }
        }
    
    this.props.closeSocialModal();
};

render() {
    return (
        <WebView
            originWhitelist={['*']}
            injectedJavaScript={this.INJECTED_JAVASCRIPT}
            source={this.props.source}
            javaScriptEnabled={true}
            onMessage={this._handleMessage}
        />
    );
}
}