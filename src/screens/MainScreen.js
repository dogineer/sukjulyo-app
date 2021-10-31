import React, { Component } from 'react';
import { View, Text } from "react-native";
import LoginScreen from './LoginScreen';
import styles from "./styles";

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://kapi.kakao.com/v2/user/me', 
            access_token: ''
        };
    }

    goScreen(){
        this.props.navigation.navigate('UserBasis')
    }

    token_test(){
        console.log(this.state.access_token);
        fetch(this.state.url, {
            method: 'GET',
            headers:{
                'Authorization' : `Bearer ${this.state.access_token}`,
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
            }
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => {
            console.error(error);
        });
    }

    render() {
        return (
            <View>
                <View style={styles.title}>
                    <Text style={styles.font_M}>{"Sukjulyo-App"}</Text>

                    <Text style={styles.font_L}>{"석줄요"}</Text>

                    <Text style={{color: 'white'}}>{"모든것을 석줄로 요악한다.\n" }</Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.triangle}></View>                    
                </View>

                <View style={styles.login_view}>
                    <Text style={{color: 'grey'}}>{
                    "바쁜 현대인들의 위한 짧고 간결한 원하는 뉴스를 제공합니다. \n카카오톡 서비스를 이용하고 있으며 개인정보는 \n'이메일', '이름'만 가져올 뿐 다른 개인정보는 수집하지 않습니다. \n"
                    }</Text>
                    <LoginScreen />
                    <Text style={{color: 'grey'}}>{"카카오톡앱을 사용하여 로그인을 해주세요! :)\n"}</Text>
                    <Text 
                        style={styles.button}
                        onPress={() => this.goScreen()} >
                            개발자 테스트 모드
                    </Text>

                    <Text 
                        style={styles.button}
                        onPress={() => this.token_test()} >
                            토큰테스트
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={{color: 'black'}}>{"Team ARCHIVE \n\n"}</Text>
                </View>
            </View>
        )
    }
}

