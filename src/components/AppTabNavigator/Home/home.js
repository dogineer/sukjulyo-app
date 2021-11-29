import React, { Component  } from 'react';
import { View, Button, Text, FlatList, TouchableOpacity, ScrollView, SafeAreaView, Linking, Platform} from 'react-native';
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
			top_3_news: [],
			summary: '',

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
				this.setState({
					...this.state,
					token: token
				})

				this.LoadNews();
			});
		}
		else {
			this.LoadNews();
		}

		this.setState({ isLoading: false });
	}

    LoadNews() {
		
		fetch( SERVER_URL+'/news/recommendation' ,  {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer '+this.state.token
			}
		})
		.then(res => res.json())
		.then(json => {
			let news = json.news;

			let summary_text = ''
			for(let i = 0; i < ( (news?.length >= 3) ? 3 : news.length ); i++) {
				console.log(i, " : ", news[i])
				summary_text += (news[i]['summary'] == null ? '' : (news[i]['summary']+'\n'))
			}
			if(summary_text != '') summary_text = summary_text.slice(0, -1);

			this.setState({ 
				...this.state,
				top_3_news: news.slice(2),
				fetch_datas: news.slice(3, news.length),
				summary: (summary_text == '' ? '오늘 뉴스를 요약할 수 없습니다 😥' : summary_text)
			});

			return json.hashtags;
		})
		.then( (hashtags) => {
			for(let i = 0; i < 3; i++) {
				if(i >= hashtags.length) break;

				this.loadNewsFromNaver(hashtags[i])
			}
		})
		.catch(err => { console.log('DATA GET ERROR',{ err })})

	}

	loadNewsFromNaver(hashtag) {
		fetch( SERVER_URL+'/api/v1/news/'+hashtag ,  {
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
				fetch_datas: this.state.fetch_datas.concat(json.items), 
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
		if (Platform.OS === 'web') {
			Linking.openURL(`${item.link}`)
		}
		else {
			this.props.navigation.navigate('NewsDetailPage', {item: item});
		}
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
                                    {this.state.summary}
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