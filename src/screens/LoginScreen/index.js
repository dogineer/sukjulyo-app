import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import SocialWebviewModal from './Modal';

export default class LoginScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            socialModalVisible: false,
            source: undefined,
            CLIENT_URL: '',
            REDIRECT_URL: 'http://localhost:19006/'
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
                    onPress={() => this.onPressSocial(
                        `authorize?client_id=${this.state.CLIENT_URL}&redirect_uri=${this.state.REDIRECT_URL}&response_type=code`
                        )}>
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
                        Kakao Login
                    </Text>
                </TouchableOpacity>
        </View>
        );
    }
}