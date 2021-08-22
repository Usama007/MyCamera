import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { FAB } from 'react-native-paper';


export default function CameraScreen({ navigation }) {
    const [cameraRef, setcameraRef] = useState()

    const onPressCameraIcon = async () => {
        const options = { quality: 0.8, base64: true };
        const data = await cameraRef.takePictureAsync(options);
        if (data.uri) {
            showAlert('Success', 'Want to take more pictures?');
        }
    }

    const showAlert = (Title, Message) => {
        Alert.alert(
            Title,
            Message,
            [
                {
                    text: "NO",
                    onPress: () => navigation.goBack(),
                },
                { text: "YES", onPress: () => { } }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <RNCamera
                ref={ref => {
                    setcameraRef(ref)
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                captureAudio={false}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
                <FAB
                    style={styles.fab}
                    small
                    icon="camera"

                    onPress={onPressCameraIcon}
                />
            </RNCamera>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    fab: {
        backgroundColor: '#6200ee'
    }
})

