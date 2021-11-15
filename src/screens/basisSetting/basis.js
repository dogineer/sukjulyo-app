import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, FlatList, ActivityIndicator, Platform,
} from 'react-native';
import { CheckBox,SearchBar } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import cookie from 'react-cookies';

import BrickList from 'react-native-masonry-brick-list';
import styles from "./styles";

const SERVER_URL = 'http://localhost:8080';
const BASIC_SCORE = 10;

class BasisScreen extends Component {
    constructor(props) {
        super(props);

		let _c = cookie.load('sukjulyo-app-jwt');
		this.state = { 
			isLoading: true, 
			page:-1,
			search: '' ,
			isSelected: [],
			setSelection: [],
			isChecked: false,
			dataSource: [],
			token: _c?_c:'',
		};
		this.arrayholder = [];
    }

	componentDidMount() {
		let _c = this.state.token;
		console.log("_c is ", _c);
		if(_c==null || _c=='') {
			console.log("asnyc storage");
			AsyncStorage.getItem('jwt', (err, result) => result)
			.then((token)=>{
				console.log(token)
				this.setState({
					...this.state,
					token: token
				})
				console.log(this.state.token);

				this.LoadHashtags();
			}).done()
		}
		else {
			this.LoadHashtags();
		}
		this.setState({ isLoading: false});
	}

	LoadHashtags() {
		const _page = this.state.page+1;
		let url = SERVER_URL+"/hashtag/client/has";
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer '+this.state.token
			}
		})
		.then(response => response.json())
		.then(json => {
			console.log(json)
			if(json) 
				this.props.navigation.navigate('Home')
			else {
				let url = SERVER_URL+"/hashtag?page="+_page+"&size=30"
				fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Authorization': 'Bearer '+this.state.token
					}
				})
				.then(response => response.json())
				.then(json => {
					const processedDate = json.map((elem)=>{
						elem.name = elem.tag;
						delete elem.tag;
						
						elem.span = 1;

						return elem;
					});

					this.setState({
						isLoading: false,
						page: _page,
						dataSource: this.state.dataSource.concat(processedDate),
					},
					function() {
						this.arrayholder = json;
					});
				})
				.catch(error => {
					console.error(error);
				});
			}
				
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

	ResetSearch () {
		this.setState({
			...this.state,
			isLoading: false,
			page: 0,
			//dataSource: this.state.dataSource.concat(processedDate),
			search: ''
		});
	}
    
	SetSearchText = (text) => {
		this.setState({
			...this.state,
			search: text
		});
	}

    SearchFilterFunction = async (text, isNew) => {
        const newData = this.arrayholder.filter(function(item) {
			const itemData = item.username ? item.username.toUpperCase() : ''.toUpperCase();
			const textData = text.toUpperCase();
			return itemData.indexOf(textData) > -1;
        });

		const _page = isNew?0:this.state.page+1;
		let url = SERVER_URL+"/hashtag?q="+text+"&page="+_page+"&size=30";
		fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
				'Authorization': 'Bearer '+this.state.token
            }
        })
        .then(response => response.text())
        .then(json => {
			const processedDate = json.map((elem)=>{
				elem.name = elem.tag;
				delete elem.tag;
				
				elem.span = 1;

				return elem;
			});

            this.setState({
				...this.state,
                isLoading: false,
				page: _page,
                dataSource: processedDate
            },
            function() {
                this.arrayholder = json;
            });
        })
        .catch(error => {
            console.error(error);
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

    finish(){

		let url = SERVER_URL+"/hashtag/client"
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer '+this.state.token
			},
			body: JSON.stringify(
				this.state.isSelected.map((it)=>{
					it.score=BASIC_SCORE;

					it.hashtag = it.name;
					delete it.name;

					return it;
				})
			)
		})
		.then(response => {
			if(response.status == 200) {
				this.props.navigation.navigate('Home')
			}
		})
		.catch(error => { console.error(error);});
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
        
        this.setState({isChecked: !this.state.isChecked})

		const i = this.state.isSelected.findIndex((it)=>it.name==item.name?true:false)
		console.log(i);
		if(i==-1) {
			this.setState({
				...this.state,
				isSelected: this.state.isSelected.concat(item)
			});
		}
		else {
			const result = this.state.isSelected;
			result.splice(i,1);

			this.setState({
				...this.state,
				isSelected: result
			});
		}
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

        const renderItem = (item) => {
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
                        title={item.name}
                        checked={this.state.isSelected.find((it)=>it.name==item.name?true:false)}
                        uncheckedColor='rgb(31, 197, 142)'
                        onPress={()=> this.checkChange(item)}
                        onLongPress={()=>alert(item.name, console.log(item.name))}
                        />
                </View>
                //    <View>
                //        <Text>{item.name}</Text>
                //    </View>
                //</TouchableOpacity>
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
                        onChangeText={text => {
							this.SetSearchText(text);
							this.SearchFilterFunction(text, true)
						}}
                        onClear={text => this.ResetSearch('')}
                        placeholder="찾으시는 카테고리를 검색해주세요 ...."
                        value={this.state.search}
                    />
                </View>
                
                <View style={styles.triangle}></View>

				<View style={{
					padding: 25,
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				}}>
					{ this.state.dataSource != null ?
						( Platform.OS=='web' 
							?<BrickList
								data={this.state.dataSource}
								renderItem={renderItem}
								/>
							:<BrickList
								data={this.state.dataSource}
								renderItem={renderItem}
								columns = {1}
								rowHeight = {60}
								/>
						) : null
					}
				</View>

				<TouchableOpacity
                    style={styles.moreBtn} 
                    onPress={() => this.LoadHashtags()}
                    >
                    <View>
                        <Text> more </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={styles.button_delete}
                        onPress={() => this.All_Delete()}>
                        <Text style={{fontWeight: 'bold',color: 'white'}}> 초기화</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.finish()}>
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