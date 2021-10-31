import  { StyleSheet, Dimensions} from "react-native";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },

    infoView:{
        flex:1,
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
});

export default styles;