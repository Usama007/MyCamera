import React, { useState, useEffect } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";
import ImageLists from './../components/ImageLists'
import ImageModal from './../components/ImageModal'
import { Provider } from 'react-native-paper';

const NUMBER_OF_IMAGE_TO_BE_SHOWN = 2;

export default function HomeScreen({ navigation }) {
    var RNFS = require('react-native-fs');
    const isFocused = useIsFocused();
    const [fetchedImages, setfetchedImages] = useState([]);
    const [imageList, setimageList] = useState([])
    const [visibleImageModal, setvisibleImageModal] = useState(false)
    const [selectedImageURI, setselectedImageURI] = useState('')
    const [showLoadMoreButton, setshowLoadMoreButton] = useState(false)

    useEffect(() => {
        if (isFocused) {
            setfetchedImages([])
        }
    }, [isFocused])

    useEffect(() => {
        if (fetchedImages.length == 0) {
            getImagesFromCache();
        } else {
            setimageList(fetchedImages.slice(0, NUMBER_OF_IMAGE_TO_BE_SHOWN))
        }
    }, [fetchedImages])

    useEffect(() => {
        if (imageList.length < fetchedImages.length) {
            setshowLoadMoreButton(true);
        } else {
            setshowLoadMoreButton(false);
        }
    }, [imageList])

    const getImagesFromCache = () => {
        RNFS.exists(RNFS.CachesDirectoryPath + '/Camera')
            .then((exists) => {
                if (exists) {
                    RNFS.readDir(RNFS.CachesDirectoryPath + '/Camera').then((results) => {
                        setfetchedImages(results);
                    })
                }
            });
    }

    const onPressTakePicture = () => {
        navigation.navigate('Camera')
    }

    const onPressImage = (path) => {
        setselectedImageURI(path)
        setvisibleImageModal(true);
    }

    const hideModal = () => {
        setvisibleImageModal(false);
    }

    const onPressLoadMore = () => {
        let tempFetchedImgs = fetchedImages;
        let tempImgLst = imageList;
        let lastValueOfImageList = tempImgLst[tempImgLst.length - 1];

        let index = tempFetchedImgs.findIndex(item => item.path == lastValueOfImageList.path)

        let count = 0;
        for (var a = index + 1; a < tempFetchedImgs.length; a++) {
            if (count >= NUMBER_OF_IMAGE_TO_BE_SHOWN) {
                break
            }
            count++;
            tempImgLst = [...tempImgLst, tempFetchedImgs[a]];

        }
        setimageList(tempImgLst);
    }

    return (
        <Provider style={styles.container}>
            <Button style={styles.button} icon="camera" mode="contained" onPress={onPressTakePicture}>
                Take a Picture
            </Button>
            <View style={styles.gallery}>
                {imageList.length == 0 ? (
                    //if there is no image to display
                    <View>
                        <Icon name="info-circle" style={styles.icon} size={200} color='#c1c1c1' />
                        <Text style={styles.noImageText}>NO IMAGE TO DISPLAY</Text>
                    </View>
                ) : (
                    //if there are images to display
                    <>
                        {visibleImageModal && (
                            //on click visible modal
                            <ImageModal visibleImageModal={visibleImageModal} hideModal={hideModal} uri={selectedImageURI}
                            />
                        )}
                        <FlatList
                            data={imageList}
                            keyExtractor={item => item.path}
                            renderItem={({ item }) => <ImageLists uri={item.path} onPressImage={onPressImage} />}
                            numColumns={2}
                        />
                        {showLoadMoreButton && (
                            <Button icon="refresh" mode="text" onPress={onPressLoadMore}>
                                Load more data
                            </Button>
                        )}
                    </>
                )}
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        alignSelf: 'center'
    },
    noImageText: {
        textAlign: 'center',
        color: '#c1c1c1',
        fontSize: 18
    },
    button: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    gallery: {
        marginVertical: 5,
        maxHeight: Dimensions.get('window').height * .85
    }
})


