import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from "react-native";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        top: -40,
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white'
    },

    font_M:{
        textAlign: 'center',
        fontSize:0.05*Width,
        margin: 5
    },
});

class Help extends Component {

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.font_M}>
                    <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}
                    >Team ARCHIVE</Text>
                </Text>
            </View>
        );
    }
}

export default Help;