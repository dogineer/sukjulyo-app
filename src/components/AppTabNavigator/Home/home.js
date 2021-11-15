import React, { Component  } from 'react';
import { View, Button, Text, FlatList, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import style from "./styles";

import AsyncStorage from '@react-native-async-storage/async-storage';
import cookie from 'react-cookies';

const SERVER_URL = 'http://localhost:8080';

class HomeScreen extends Component{
    constructor(props){ 
        super(props);

		let _c = cookie.load('sukjulyo-app-jwt');
		this.state={
			datas: [],

			fetch_datas: [],
			isLoading: false,
			isFetching: false,
			token: _c?_c:'',
		};
    }

	componentDidMount() {
		let _c = this.state.token;
		
		if(_c==null || _c=='') {
			AsyncStorage.getItem('jwt', (err, result) => result)
			.then((token)=>{
				console.log(token)
				this.setState({
					...this.state,
					token: token
				})
				console.log(this.state.token);

				this.LoadNews();
			});
		}
		else {
			this.LoadNews();
		}

		this.setState({ isLoading: false});
	}

    LoadNews() {
		let url = SERVER_URL+'/api/v1/news/색'
		fetch( url ,  {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer '+this.state.token
			}
		})
		.then(res => res.json())
		.then(json => {
			this.setState({ 
				...this.state,
				fetch_datas: json.items, 
				isLoading: false
			})
		})
		.catch(err => { console.log('DATA GET ERROR',{ err })})
	}

	onRefresh() {
		console.log('refreshing')
		this.setState({ isFetching: true }, function(){
			this.fetchData()
		});
	}

	fetchData() {
		alert('refreshing data');
	}
    
    news_detail(item){
        this.props.navigation.navigate('NewsDetailPage', {item: item});
    }

    render(){
        const { isLoading } = this.state;
        
        if (isLoading) {
            return <View>
                        <Text style={style.Loading}> 석줄요 준비중 ...</Text>
                    </View>
        }

        return( 
            <>
                <View style={style.container}>
                    <View style={style.title}>
                            <View style={style.titleContent}>
                                <Text>
                                    💡 "ARCHIVE TEAM"로 검색한 결과입니다. 💡
                                </Text>
                            </View>
                        </View>
                    <View style={style.triangle}></View>
                </View>

                <View style={style.root}>
                    <FlatList
                        data={this.state.fetch_datas} 
                        renderItem={this.renderItem}
                        keyExtractor={ item=> item.link }
                        onRefresh={() => this.onRefresh}
                        refreshing={this.state.isFetching}
                        />
                </View>
            </>
        );
    }

    renderItem=({item})=>{
        return(
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <TouchableOpacity 
                        style={style.contentView} 
                        onPress={()=> this.news_detail(item)}
                        >

                        <View style={style.infoView}>
                            <Text style={style.titleText}>{item.title}</Text>
                            {/*<Text style={style.contentText}>{item.content}</Text>*/}
                            {/*<Text style={style.contentText}>{item.reg}</Text>*/}
                            
                            <TouchableOpacity 
                                style={style.ButtonView}
                                onPress={()=>alert("좋아요")}>
                                <Text>❤️</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default HomeScreen;