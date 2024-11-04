import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
} from 'react-native';
import { useState, useEffect } from "react";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import Constants from "expo-constants";
import { s3, awsBucket } from '../configs/awsConfig';

export default function ImageUploadScreen() {
    const [multipleFile, setMultipleFile] = useState([]);
    const [image, setImage] = useState(null);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraRollStatus.status !== "granted" || cameraStatus.status !== "granted") {
                    alert("Sorry, we need these permissions to make this work!");
                }
            }
        })();
    }, []);

    const selectMultipleFile = async () => {
        try {
            const results = await DocumentPicker.getDocumentAsync({
                multiple: true
            });
            console.log(results);
            if (!results.canceled) {
                setMultipleFile(results.assets);
            }
        } catch (err) {
            console.log(err);
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
        }
    };

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            handleImagePicked(result.assets[0].uri);
        }
    };

    const handleImagePicked = async (uri) => {
        setPercentage(0);
        const blob = await fetchImageFromUri(uri);

        const fileName = `demo-${Date.now()}.jpg`;
        await uploadImageToS3(fileName, blob);
    };

    const fetchImageFromUri = async (uri) => {
        return await fetch(uri).then(res => res.blob());
    };

    const uploadImageToS3 = async (fileName, blob) => {
        const uploadParams = {
            Bucket: awsBucket,
            Key: 'public/demo/' + fileName,
            Body: blob,
            ContentType: 'image/jpeg',
        };

        s3.upload(uploadParams)
            .on('httpUploadProgress', (event) => {
                setPercentage(Math.round((event.loaded * 100) / event.total));
            })
            .send((err, data) => {
                if (err) {
                    console.log("Upload error:", err);
                    alert('Upload failed');
                } else {
                    console.log("Upload success:", data);
                    setImage(data.Location); // Set the image URL to display
                }
            });

    };

    const pickImageToGoogleDrive = async () => {};

    return (
        <View style={styles.container}>
            <Button title={"Browse files"} onPress={selectMultipleFile} />
            <Button title="Upload image to S3 Bucket" onPress={pickImage} />
            <Button title="Upload image to Google Drive" onPress={pickImageToGoogleDrive} />

            {percentage !== 0 && <Text style={styles.percentage}>{percentage}%</Text>}

            {image && (
                <View>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Text style={styles.info}>Uploaded image URL: {image}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        color: 'black',
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        padding: 5,
    },
    imageIconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'stretch',
    },
    image: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    info: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 5,
    },
    percentage: {
        fontSize: 16,
        marginVertical: 10,
    },
});