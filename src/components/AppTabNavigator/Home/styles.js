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
        height: 0.1*Height,
        width: '100%',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(31, 197, 142)'
    },

    titleContent: {
        padding: '5%',
        borderRadius: 10,
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
        flexDirection:'column',
    },

    contentView:{
        flexDirection:'row',
        alignItems: 'center',
        width: '100%',
        borderWidth:0,
        padding:10,
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
    
});

export default style;