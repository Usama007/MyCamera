import React from 'react'
import {  StyleSheet} from "react-native";
import { Modal, Portal, Card, Button } from 'react-native-paper';

export default function ImageModal({ visibleImageModal, hideModal, uri }) {
    const containerStyle = { backgroundColor: 'white', paddingBottom: 20, marginHorizontal: 20 };

    return (
        <Portal>
            <Modal visible={visibleImageModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Card >
                    <Card.Actions style={styles.cardAction}>
                        <Button icon='close' onPress={() => hideModal()}></Button>
                    </Card.Actions>
                    <Card.Cover style={styles.cardCover} source={{ uri: 'file://' + uri }} />
                </Card>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    cardAction: {
        justifyContent: 'flex-end',
        paddingBottom: 0,
        paddingTop: 0,
        paddingRight: 0,
        marginRight: 0
    },
    cardCover: {
        paddingHorizontal: 15
    }
});
