import React from 'react';
import { Modal, StyleSheet, Platform } from 'react-native';

//import Modal from 'react-native-modal';
import SocialWebview from './SocialWebview';

const SocialWebviewModal = (props) => {
    console.log("Modal on! => Login \n", "uri: ", props.source);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            style={styles.container}
        >
            <SocialWebview
                source={{ uri: props.source }}
                closeSocialModal={props.closeSocialModal}
				setToken={props.setToken}
				callbackUrl={props.callbackUrl}
            />
        </Modal>
    );
};
export default SocialWebviewModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
		...Platform.select({
			web: {
				position: 'fixed',
				top: 0, left: 0,
				width: '100vw',height: '100vh',
				//backgroundColor: 'white',
				zIndex: 1,
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-between', 
				flexDirection:'column'
			},
			default: {
				width: '100%',height: '100%',
			}
		})
    },
});

//import React, { useState, useMemo } from 'react';
//import { Modal, View, Text, Button, StyleSheet } from 'react-native';
////import Example from '../../shared/example';
//import SocialWebview from './SocialWebview';

//const SocialWebviewModal = (props) => {
//    console.log("Modal on! => Login \n", "uri: ", props.source);

//    return (
//        //<Modal
//        //    animationType="slide"
//        //    transparent={false}
//        //    visible={props.visible}
//        //    style={styles.container}
//		//	onDismiss={() => {
//		//		alert('Modal has been closed.');
//		//	}}
//        //>
//        //    <SocialWebview
//        //        source={{ uri: props.source }}
//        //        closeSocialModal={props.closeSocialModal}
//        //    />
//        //</Modal>

//		<Modal
//        	animationType="slide"
//			transparent={true}
//			style={styles.container}
//        	visible={props.visible}>

			
//			<Text>Modal !!</Text>

//			{/*SocialWebview
//				source={{ uri: props.source }}
//				closeSocialModal={props.closeSocialModal}
//        	/>*/}
//      </Modal>
//    );
//};
//export default SocialWebviewModal;

//const styles = StyleSheet.create({
//    container: {
//        flex: 1,
//        margin: 0,
//        width: '100%',
//        height: '100%',
//    },
//});