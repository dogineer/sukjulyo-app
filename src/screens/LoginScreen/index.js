import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Platform } from 'react-native';

import SocialWebviewModal from './Modal';

export default class LoginScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            socialModalVisible: false,
            source: undefined,
            CLIENT_URL: '',
            REDIRECT_URL: 'http://localhost:8080/oauth2/authorization/kakao',
			CALLBACK_URL:'http://localhost:8080/auth'
        };
    }

    onPressSocial = async () => {
		if (Platform.OS === 'web') {
			Linking.openURL(`${this.state.REDIRECT_URL}`)
		}
		else {
			this.setState({
				...this.state,
				socialModalVisible: !this.state.socialModalVisible,
				source: `${this.state.REDIRECT_URL}`,
			});
		}
    };

    closeSocialModal = async () => {
        this.setState({
            socialModalVisible: !this.state.socialModalVisible,
        });

		this.props.nav.navigate('UserBasis');
    };

    render() {
        return (
            <View>
                {
					this.state.source !== undefined ? (
						<SocialWebviewModal
							visible={this.state.socialModalVisible}
							source={this.state.source}
							closeSocialModal={this.closeSocialModal}
							callbackUrl={this.state.CALLBACK_URL}
						/>
					): null}
                <TouchableOpacity
                    onPress={() => this.onPressSocial()}>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            width: '100%',
                            height: 50,}}
                        source={
                            require('../../../assets/kakao_login_large_wide.png')}/>

                    <Text style={{ 
                        color: '#391B1B', 
                        backgroundColor: 'gold',
                        textAlign: 'center',
                        width: 300,
                        opacity: 0,
                        fontSize: 18, 
                        fontWeight: 'bold' }}>
                        카카오 로그인
                    </Text>
                </TouchableOpacity>
        </View>
        );
    }
}