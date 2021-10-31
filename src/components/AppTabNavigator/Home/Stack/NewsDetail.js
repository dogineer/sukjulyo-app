import React, {Component} from 'react';
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

class NewsDetail extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            item: this.props.navigation.state.params.item
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.infoView}>
                        <Text style={styles.titleText}>{this.state.item.title}</Text>
                        <Text style={styles.contentText}>{this.state.item.content}</Text>
                        <Text style={styles.contentText}>{this.state.item.reg}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default NewsDetail;