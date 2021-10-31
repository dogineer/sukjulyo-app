import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from "react-native";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        top: -40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white'
    },

    font_M:{
        textAlign: 'center',
        fontSize:0.03*Width,
        margin: 5
    },
});

class AppInfo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{
                    width: '50%',
                    height: '30%',
                    }}
                    source={require('../../../../../assets/icon.png')}
                />

                <Text style={styles.font_M}>
                    {"버전: Test version 1.5"}
                </Text>
            </View>
        );
    }
}

export default AppInfo;