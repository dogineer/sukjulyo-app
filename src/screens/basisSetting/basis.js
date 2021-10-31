import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, FlatList, ActivityIndicator, Platform,
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
        const itemData = item.username ? item.username.toUpperCase() : ''.toUpperCase();
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

        const renderItem = ({item}) => {
            console.log(item);
            return(
                <TouchableOpacity
                    style={styles.contentView} 
                    onPress={() => alert("click : " + item.username)}
                    >
                    <View>
                        <Text>{item.username}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        
        return(
            <View style={styles.viewStyle}>
                <View style={styles.title}>
                    <SearchBar
                        round
                        inputStyle={{backgroundColor: 'white'}}
                        inputContainerStyle={{backgroundColor: 'white'}}
                        containerStyle={{ 
                            margin: 8,
                            borderWidth: 1, 
                            borderRadius: 5,
                            backgroundColor: 'rgb(31, 197, 142)',
                            borderColor: 'rgb(31, 197, 142)',
                            borderTopColor: 'rgb(31, 197, 142)',
                            borderBottomColor: 'rgb(31, 197, 142)' 
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
                    // ItemSeparatorComponent={this.ListViewItemSeparator}
                    renderItem={renderItem}
                    enableEmptySections={true}
                    style={{ marginTop: 25 }}
                    keyExtractor={(item, index) => index.toString()}
                />

                    <View style={styles.textStyle}>
                        <Text>{"추가한 항목 : "}</Text>
                    </View>

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