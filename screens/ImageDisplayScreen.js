// ImageDisplayScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { s3, awsBucket } from '../configs/awsConfig';

export default function ImageDisplayScreen() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {

            try {
                const response = await s3.listObjectsV2({ Bucket: awsBucket }).promise();
                if (response.Contents) {
                    const urls = await Promise.all(
                        response.Contents.map(async (item) => {
                            // Generate pre-signed URL for each image
                            const params = {
                                Bucket: awsBucket,
                                Key: item.Key,
                                Expires: 60 * 5, // URL valid for 5 minutes
                            };
                            const url = await s3.getSignedUrlPromise('getObject', params);
                            return url;
                        })
                    );
                    console.log(urls);
                    setImages(urls);
                }
            } catch (error) {
                console.error('Error fetching images from S3:', error);
            }
        };

        fetchImages();
    }, []);

    const downloadImage = async (imageUri) => {
        const fileUri = FileSystem.documentDirectory + imageUri.split('/').pop(); // Create a unique filename
        try {
            const response = await FileSystem.downloadAsync(imageUri, fileUri);
            console.log('Finished downloading to ', response.uri);

            const asset = await MediaLibrary.createAssetAsync(response.uri);
            console.log('Image saved to media library:', asset.uri);

            alert('Download successful', `Image downloaded to: ${response.uri}`);
        } catch (error) {
            console.error(error);
            alert('Download failed', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {images.length === 0 ? (
                <Text>No images found</Text>
            ) : (
                // Map through the images and group them into rows
                images.reduce((rows, imageUri, index) => {
                    // Create a new row every two images
                    if (index % 2 === 0) {
                        rows.push([]);
                    }
                    rows[rows.length - 1].push(imageUri);
                    return rows;
                }, []).map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((imageUri, index) => (
                            <View key={index} style={styles.imageContainer}>
                                <Image source={{ uri: imageUri }} style={styles.image} />
                                <Button title="Download" onPress={() => downloadImage(imageUri)} />
                            </View>
                        ))}
                    </View>
                ))
            )}
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    imageContainer: {
        alignItems: 'center', // Center the button under the image
        width: '48%', // Adjust as needed
    },
    image: {
        width: '100%',
        height: 100,  // Set a height as per your requirement
    },
});

