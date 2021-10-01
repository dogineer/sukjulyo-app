import React, { Component } from 'react';
import {
    Text, View, StyleSheet, FlatList, ActivityIndicator, Platform,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from "./styles";


class BasisScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true, 
            search: '' ,
        };
        this.arrayholder = [];
    }

    componentDidMount() {
        this.setState({ isLoading: false});
        let url = "https://jsonplaceholder.typicode.com/users"
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                isLoading: false,
                dataSource: responseJson,
            },
            function() {
                this.arrayholder = responseJson;
            });
        })
        .catch(error => {
            console.error(error);
        });
    }

    search = text => {
        console.log(text);
    };
    clear = () => {
        this.search.clear();
    };
    
    SearchFilterFunction(text) {
        const newData = this.arrayholder.filter(function(item) {
        const itemData = item.email ? item.email.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        });
    
        this.setState({
            dataSource: newData,
            search: text,
        });
    }
    
    ListViewItemSeparator = () => {
        return (
        <View
            style={{
                height: 0.3,
                width: '90%',
                backgroundColor: '#080808',}}
        />
        );
    };

    goScreen(){
        this.props.navigation.navigate('Home')
    }

    goSearchTest(){
        this.props.navigation.navigate('SearchTest')
    }
    
    render(){
        if (this.state.isLoading) {
            return (
                <View style={{ 
                    flex: 1, 
                    marginTop: Platform.OS == 'ios' ? 400 : 0, }}>
                    <ActivityIndicator />
                </View>
            );
        }
        
        return(
            <View style={styles.viewStyle}>
                <View style={styles.title}>
                    <SearchBar
                        round
                        inputStyle={{backgroundColor: 'white'}}
                        inputContainerStyle={{backgroundColor: 'white'}}
                        containerStyle={{
                            backgroundColor: 'white', 
                            margin: 10,
                            borderWidth: 1, 
                            borderRadius: 5
                        }}
                        searchIcon={{ size: 30 }}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        onClear={text => this.SearchFilterFunction('')}
                        placeholder="찾으시는 카테고리를 검색해주세요 ...."
                        value={this.state.search}
                    />
                </View>
                
                <View style={styles.triangle}></View>

                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    renderItem={({ item }) => (
                        <Text style={styles.textStyle}>{item.email}</Text>
                )}
                    enableEmptySections={true}
                    style={{ marginTop: 10 }}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.footer}>

                    <Text 
                        style={styles.button}
                        onPress={() => this.goScreen()} >
                            완료
                    </Text>

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