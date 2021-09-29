import React, { Component } from 'react';
import { View, Text } from "react-native";
import styles from "./styles";

export default class MainScreen extends Component {
    goScreen(){
        this.props.navigation.navigate('UserBasis')
    }

    render() {
        return (
            <View>
                <View style={styles.title}>
                    <Text style={styles.font_M}>
                        {"Sukjulyo-App"}
                    </Text>

                    <Text style={styles.font_L}>
                        {"석줄요"}
                    </Text>

                    <Text style={{color: 'white'}}>
                        {"모든것을 석줄로 요악한다.\n" }
                    </Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.triangle}></View>
                </View>

                <View style={styles.login_view}>
                    <Text 
                        style={styles.button}
                        onPress={() => this.goScreen()} >
                            Kakao Login
                    </Text>

                    <Text 
                        style={styles.button}
                        onPress={() => alert("준비중")} >
                            약관보기
                    </Text>

                    <Text 
                        style={{color: 'grey'}}>
                            {"카카오톡앱을 사용하여 로그인을 해주세요! :) \n\n"}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text 
                        style={{color: 'black'}}>
                            {"Team ARCHIVE \n\n"}
                    </Text>
                </View>
            </View>
        )
    }
}

