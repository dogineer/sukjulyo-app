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
			<View>
				<WebView
					originWhitelist={['*']}
					source={{ uri: props.item.link }}
				/>
			</View>
        );
    }
}

export default NewsDetail;