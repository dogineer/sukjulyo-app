import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Modal from 'react-native-modal';
import SocialWebview from './SocialWebview';

const SocialWebviewModal = (props) => {
    console.log("uri: ", props.source);

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
            />
        </Modal>
    );
};
export default SocialWebviewModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        width: '100%',
        height: '100%',
    },
});