import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-paper';


export default function ImageLists({ uri,onPressImage }) {
    return (
        <>
            <TouchableOpacity style={styles.touchableOpacity} onPress={()=>{
               onPressImage(uri)
            }}>
                <Card >
                    <Card.Cover source={{ uri: 'file://' + uri }} />
                </Card>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    touchableOpacity: {
        flex: 1,
        padding: 2
    }
})

