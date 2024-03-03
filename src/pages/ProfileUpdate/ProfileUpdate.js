import React, { useState, useEffect } from "react";
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, ScrollView, Alert, ImageBackground, PermissionsAndroid } from "react-native";

import styles from "./ProfileUpdate_style";
import TopToolbar from "../../tools/TopToolbar/TopToolbar";

import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import { useNavigation } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const ProfileUpdate = () => {

    const currentUserID = auth().currentUser.uid;
    const currentUserReference = firebase.app().database('https://proje-fcbf6-default-rtdb.europe-west1.firebasedatabase.app/').ref('/users/' + currentUserID);
    const navigation = useNavigation();

    const [currentUserData, setCurrentUserData] = useState([]);
    const [userName, setUserName] = useState();
    const [userDescription, setUserDescription] = useState();
    const [userAvatar, setUserAvatar] = useState();
    const [passwordIcon, setPasswordIcon] = useState('eye');
    const [passwordVisibility, setPasswordVisibility] = useState(true);

    useEffect(() => {
        currentUserReference.on('value', snapshot => {
            const userData = snapshot.val();
            setCurrentUserData(userData);
        })
    }, [])

    useEffect(() => {
        setUserName(currentUserData.name);
        setUserDescription(currentUserData.description);
        setUserAvatar(currentUserData.avatar);
    }, [currentUserData])

    function updateProfile() {

        currentUserReference.update({ avatar: userAvatar, name: userName, description: userDescription })
        Alert.alert("Your profile updated")
        navigation.navigate('Profile');
    }

    useEffect(() => {
        try {
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given")
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }, [])

    const openCamera = () => {

        const options = {
            mediaType: 'photo',
            includeBase64: true,
        };

        launchCamera(options, response => {

            console.log('Response: ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.errorCode) {
                console.log('Error code: ', response.errorCode);
            }
            else {
                const source = { uri: response.assets[0].uri };
                setUserAvatar(source);
            }
        })
    }

    const openGallery = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
        };

        launchImageLibrary(options, response => {

            console.log('Response: ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.errorCode) {
                console.log('ImagePicker error code: ', response.errorCode);
            }
            else {
                const source = { uri: response.assets[0].uri };
                setUserAvatar(source);
            }
        })
    }

    const removeAvatar = () => {

        if (userAvatar != "") {
            return (
                Alert.alert(
                    'WARNING',
                    'Are you sure about that removing your avatar?',
                    [
                        { text: 'YES', onPress: () => setUserAvatar('') },
                        { text: 'NO', onPress: () => console.log("User cancelled the removing avatar") }
                    ]
                )
            )
        }
    }

    function handlePasswordVisibility() {
        if (passwordIcon === "eye") {
            setPasswordIcon("eye-off");
            setPasswordVisibility(false);
        }
        else if (passwordIcon === "eye-off") {
            setPasswordIcon("eye");
            setPasswordVisibility(true);
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TopToolbar />
                <View style={styles.infoContainer}>
                    <View style={styles.infoAvatarContainer}>
                        <ImageBackground style={styles.infoAvatar} source={userAvatar}>
                            <View style={styles.infoAvatarButtonContainer}>
                                <TouchableOpacity style={styles.infoAvatarButton} onPress={openCamera}>
                                    <Icon name="camera" style={styles.infoAvatarButtonIcon} size={15}></Icon>
                                    <Text style={styles.infoAvatarButtonText}>
                                        Camera
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.infoAvatarButton} onPress={openGallery}>
                                    <Icon name="image" style={styles.infoAvatarButtonIcon} size={15}></Icon>
                                    <Text style={styles.infoAvatarButtonText}>
                                        Gallery
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.infoAvatarButton} onPress={removeAvatar}>
                                    <Icon name="image-remove" style={styles.infoAvatarButtonIcon} size={15}></Icon>
                                    <Text style={styles.infoAvatarButtonText}>
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.innerInfoContainer}>
                        <View>
                            <Text style={styles.innerInfoText}>Name</Text>
                            <TextInput
                                style={styles.innerInfoTextInputName}
                                defaultValue={userName}
                                onChangeText={setUserName}>
                            </TextInput>
                        </View>
                        <View>
                            <Text style={styles.innerInfoText}>Description</Text>
                            <ScrollView>
                                <TextInput
                                    style={styles.innerInfoTextInputDescription}
                                    defaultValue={userDescription}
                                    onChangeText={setUserDescription}
                                    multiline={true}
                                    numberOfLines={8}>
                                </TextInput>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <View style={styles.privateInfoContainer}>
                    <View style={styles.privateInfoView}>
                        <Text style={styles.privateInfoText}>Email</Text>
                        <TextInput style={styles.privateInfoEmail} editable={false}>{currentUserData.email}</TextInput>
                    </View>
                    <View style={styles.privateInfoView}>
                        <Text style={styles.privateInfoText}>Password</Text>
                        <View style={styles.privateInfoPasswordContainer}>
                            <TextInput style={styles.privateInfoPasswordText} editable={false} secureTextEntry={passwordVisibility}>{currentUserData.password}</TextInput>
                            <Icon name={passwordIcon} style={styles.privateInfoPasswordIcon} size={25} onPress={handlePasswordVisibility}></Icon>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={updateProfile}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Profile') }}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default ProfileUpdate;