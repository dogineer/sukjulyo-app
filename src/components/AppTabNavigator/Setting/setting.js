import React, { Component } from 'react';
import  { StyleSheet, Dimensions} from "react-native";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    settingContent:{
        marginTop: 80,
        justifyContent: 'center',
    },

    optionButton:{
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        margin: 10,
    },

    font_M:{
        fontSize:0.09*Width,
        margin: 3
    },

    triangle: {
        width: 0,
        height: 0,
        borderTopWidth: 40,
        borderRightWidth: 20,
        borderBottomWidth: 0,
        borderLeftWidth: 20,
        borderTopColor: 'rgb(31, 197, 142)',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },

    title: {
        height: 0.1*Height,
        width: '100%',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(31, 197, 142)'
    },

    titleContent: {
        padding: '5%',
        borderRadius: 10,
        backgroundColor: 'white',
    },
});

class SettingScreen extends Component {
    render() {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.title}>
                            <View style={styles.titleContent}>
                                <Text>
                                    ⚒ 설정페이지 ⚒
                                </Text>
                            </View>
                        </View>
                    <View style={styles.triangle}></View>

                    <View style={styles.settingContent}>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => this.props.navigation.navigate('UserBasis')}>
                        <Text style={styles.font_M}>
                            <Ionicons  
                                size={35} 
                                name='person-circle-outline' 
                                style={{ paddingRight:15 }}/>
                            {"뉴스 카테고리 수정"}
                                </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => alert('준비중입니다.')}>
                        <Text style={styles.font_M}>
                            <Ionicons 
                                size={35} 
                                name='ellipsis-horizontal-circle-outline' 
                                style={{ paddingRight:15 }}/>
                            {"기타"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => this.props.navigation.navigate('HelpPage')}>
                        <Text style={styles.font_M}>
                            <Ionicons 
                                size={35} 
                                name='happy-outline' 
                                style={{ paddingRight:15 }}/>
                            {"고객센터/도움말"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => this.props.navigation.navigate('AppInfoPage')}>
                        <Text style={styles.font_M}>
                            <Ionicons  
                                size={35}
                                name='information-circle-outline' 
                                style={{ paddingRight:15 }}/>
                            {"버전정보"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }
}

export default SettingScreen;
