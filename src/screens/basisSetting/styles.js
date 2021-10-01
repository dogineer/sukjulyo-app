import  { StyleSheet, Dimensions } from "react-native";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        width: '100%',
        height: 0.1*Height,
        backgroundColor: 'rgb(31, 197, 142)'
    },

    login_view: {
        width: window.width,
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },  

    font_L:{
        margin: 10,
        fontSize: 70,
        fontWeight:'bold',
        color: 'white',
        shadowColor: 'rgba(0,0,0,0.2)'
    },

    font_M:{
        fontSize:20,
        color: 'white',
    },

    button: {
        margin: 10,
        width: 300,
        height: 50,
        padding: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'rgb(31, 197, 142)'
    },

    textInput:{
        fontSize:0.05*Width,
        width: 300,
        height: 30,
        paddingLeft: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        margin: 5
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

    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        bottom: 0,
    },

    //Search styles
    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 50 : 0,
    },
    textStyle: {
        margin: 5,
        width: '100%',
        padding: 10,
        backgroundColor: 'white',
    },
    //End Search styles
});

export default styles;