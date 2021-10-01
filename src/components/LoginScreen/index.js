import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import SocialWebviewModal from './Modal';


export default class LoginScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            socialModalVisible: false,
            source: undefined,
            CLIENT_URL: 'CLIENT_URL',
            REDIRECT_URL: 'REDIRECT_URL'
        };
    }

    onPressSocial = async (social) => {
        this.setState({
            socialModalVisible: !this.state.socialModalVisible,
            source: `https://kauth.kakao.com/oauth/${social}`,
        });
    };

    closeSocialModal = async () => {
        this.setState({
            socialModalVisible: !this.state.socialModalVisible,
        });
    };

    render() {
        return (
            <View>
                {this.state.source !== undefined ? (
                <SocialWebviewModal
                    visible={this.state.socialModalVisible}
                    source={this.state.source}
                    closeSocialModal={this.closeSocialModal}
                />
                ) : null}
                <TouchableOpacity
                    style={{
                        //
                    }}
                    onPress={() => this.onPressSocial(
                        `authorize?client_id=${this.state.CLIENT_URL}&redirect_uri=${this.state.REDIRECT_URL}&response_type=code`
                        )}
                >
                <Text style={{ 
                    color: '#391B1B', 
                    backgroundColor:'yellow',
                    padding: 10,
                    fontSize: 18, 
                    fontWeight: 'bold' }}>
                    카카오 로그인
                </Text>
                </TouchableOpacity>
        </View>
        );
    }
}

