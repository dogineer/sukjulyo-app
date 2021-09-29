import React, { Component  } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import style from "./styles";

class HomeScreen extends Component{
    constructor(props){ 
        super(props); 
            this.state={
                datas: [
                    {
                        //Sample datas 1
                        "title" : "제목",
                        "content" : "내용",
                        "reg" : "날짜",
                    },
                    {
                        //Sample datas 2
                        "title" : "제목",
                        "content" : "내용",
                        "reg" : "날짜",
                    },
                    {
                        //Sample datas 3
                        "title" : "제목",
                        "content" : "내용",
                        "reg" : "날짜",
                    },
                    {
                        //Sample datas 4
                        "title" : "제목",
                        "content" : "내용",
                        "reg" : "날짜",
                    }
                ],

                fetch_datas: [],
                isLoading: false,
                isFetching: false
            };
    }

    componentDidMount() {
        this.setState({ isLoading: false});
        let url = "url"
            fetch( url ,  {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
            .then(console.log("get fetch_datas run..."))
            .then(res => {
                console.log(JSON.stringify(res));
                return res.json()})
            .then(res => this.setState({ fetch_datas: res, isLoading: false }, 
                () => console.log('data Success')))
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
        this.props.navigation.navigate('news_detail', {item: item});
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
                        <Text>
                            3줄 요약 본
                        </Text>
                        </View>
                    <View style={style.triangle}></View>
                </View>

                <View style={style.root}>
                    <FlatList
                        data={this.state.datas} 
                        renderItem={this.renderItem}
                        keyExtractor={ item=> item.name }
                        onRefresh={() => this.onRefresh}
                        refreshing={this.state.isFetching}
                        />
                </View>
            </>
        );
    }

    renderItem=({item})=>{ 
        console.log(item);
        return(
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                <TouchableOpacity 
                    style={style.contentView} 
                    onPress={()=> alert("상세보기 준비중")}
                    >

                    <View style={style.infoView}>
                        <Text style={style.titleText}>{item.title}</Text>
                        <Text style={style.contentText}>{item.content}</Text>
                        <Text style={style.contentText}>{item.reg}</Text>
                    </View>
                </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default HomeScreen;