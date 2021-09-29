import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from "./styles";


class BasisScreen extends Component {
    goScreen(){
        this.props.navigation.navigate('Home')
    }

    goSearchTest(){
        this.props.navigation.navigate('SearchTest')
    }
    
    render(){
        return(
            <View>
            <View style={styles.title}>
                <Text style={styles.font_M}>
                    {"카테고리를 검색해주세요"}
                </Text>
            </View>

            <View style={styles.container}>
                <View style={styles.triangle}></View>
            </View>

            <View style={styles.login_view}>
                <Text 
                    style={styles.button}
                    onPress={() => this.goSearchTest()} >
                        검색창 테스트 버튼
                </Text>

                <Text 
                    style={styles.button}
                    onPress={() => this.goScreen()} >
                        완료
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

export default BasisScreen;