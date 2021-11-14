import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, FlatList, ActivityIndicator, Platform,
} from 'react-native';
import { CheckBox,Chip,SearchBar } from 'react-native-elements';
import styles from "./styles";

class BasisScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true, 
            search: '' ,
            
            isSelected: [],
            setSelection: [],

            isChecked: false
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

            console.log(this.state.dataSource);
        })
        .catch(error => { console.error(error);});
    }

    search = text => { console.log(text);} ;
    clear = () => { this.search.clear(); };
    
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
                height: 1,
                width: '100%',
                backgroundColor: '#080808',}}
        />
        );
    };

    goScreen(){
        this.props.navigation.navigate('Home')

        // console.log("fetch run !!");

        // let url = "106.246.235.109:8080/news"
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //     },
        //     body: this.state.isSelected
        // })
        // .then(response => response.json())
        // .catch(error => { console.error(error);});
    }

    All_Delete(){
        console.log("content all clear run ...");
        this.setState({
            isSelected: [],
        })
    }
    
    handleAddToItem(item){
        console.log('Detail item:', item);
    }

    checkChange = (item) => {
        console.log("checkChange run ...        ID value:", item.id         ,"\n",this.state.isSelected);
        
        this.setState({isChecked: !this.state.isChecked})
        
        this.setState({
            isSelected: this.state.isSelected.concat(item.username)
        })
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
        
        const fecthITEM = (item) => {
            url = "";

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: item
            })
            .then(console.log("Fetch ADDITEM ..."))
            .catch(err => { console.log('DATA GET ERROR',{ err })})
        }

        const renderItem = ({item}) => {
            return(
                <View
                    // style={styles.contentView} 
                    // onPress={() => this.checkChange(item)}
                    >
                    {/* <View>
                        <Text>{item.username}</Text>    
                    </View> */}
                    <CheckBox
                        containerStyle={{borderRadius: "50",}}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checkedColor="red"
                        title={item.username}
                        checked={this.state.isChecked}
                        uncheckedColor='rgb(31, 197, 142)'
                        onPress={()=> this.checkChange(item)}
                        onLongPress={()=>alert(item.username, console.log(item.username))}
                        />
                </View>
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

                <View style={styles.selectContent}>
                    <Text style={{fontWeight: 'bold',color: 'white'}}>{'selete : '+this.state.isSelected + ' '}</Text>
                </View>

                <FlatList
                    data={this.state.dataSource}
                    // ItemSeparatorComponent={this.ListViewItemSeparator}
                    renderItem={renderItem}
                    enableEmptySections={true}
                    style={{ marginTop: 5 }}
                    keyExtractor={(item, index) => index.toString()}
                />

                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={styles.button_delete}
                        onPress={() => this.All_Delete()}>
                        <Text style={{fontWeight: 'bold',color: 'white'}}> 초기화</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.goScreen()}>
                        <Text style={{fontWeight: 'bold',color: 'white'}}> 완료</Text>
                    </TouchableOpacity>
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