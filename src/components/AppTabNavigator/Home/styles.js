import  { StyleSheet, Dimensions} from "react-native";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const style= StyleSheet.create({
    root:{flex:1, padding:30},

    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    triangle: {
        width: 0,
        height: 0,
        borderTopWidth: 40,
        borderRightWidth: 20,
        borderBottomWidth: 0,
        borderLeftWidth: 20,
        borderTopColor: 'rgb(31, 197, 142)',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },

    title: {
        height: 0.15*Height,
        width: '100%',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(31, 197, 142)'
    },

    titleContent: {
		padding: "25px",
		borderWidth: 0,
		borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    
    titleText:{
        fontSize:0.05*Width,
        fontWeight:'bold',
        textAlign:'center',
        flex: 0,
        paddingBottom:16,
    },

    infoView:{
        flex:1,
        textAlign: 'center',
        alignItems: 'center'
    },

    contentView:{
        flexDirection:'row',
        alignItems: 'center',
        width: '100%',
        borderWidth:0,
        padding:10,
        paddingTop: 25,
        marginBottom:10,
        backgroundColor: 'white',
        borderRadius: 10,
    },

    contentText:{
        fontSize:0.04*Width,
        color: 'darkgrey',
        padding: 1
    },
    
    Loading: {
        fontSize:0.05*Width,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 300
    },
    
    ButtonView: {
        flex: 3,
        margin: 10,
        width: '15%',
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: 'rgb(31, 197, 142)',
        padding:10,
    }
});

export default style;