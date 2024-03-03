import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, ScrollView, Image, Alert, LogBox } from "react-native";

import styles from "./Profile_style";
import TopToolbar from "../../tools/TopToolbar/TopToolbar";

import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import { useNavigation } from "@react-navigation/native";
import { formatDistance, parseISO } from "date-fns";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MessageCard = ({ message, communityName }) => {

    const currentUserID = auth().currentUser.uid;

    const dateDistance = formatDistance(parseISO(message.messageDate), new Date(), { addSuffix: true });

    function deleteNote() {
        Alert.alert(
            'WARNING',
            'Are you sure about that removing your note?',
            [
                { text: 'YES', onPress: () => { firebase.app().database('https://proje-fcbf6-default-rtdb.europe-west1.firebasedatabase.app/').ref('/users/' + currentUserID + '/notes/communities/' + communityName + '/' + message.id).remove() } },
                { text: 'NO', onPress: () => console.log("User cancelled the removing note") }
            ]
        )
    }

    return (
        <View style={styles.noteCard}>
            <View style={styles.noteCardDatas}>
                <Text style={styles.noteCardText}>{message.messageText}</Text>
                <Text style={styles.noteCardDate}>{dateDistance}</Text>
            </View>
            <TouchableOpacity style={styles.noteCardButton} onPress={deleteNote}>
                <Icon name="note-remove" size={15} style={styles.noteCardButtonIcon}></Icon>
                <Text style={styles.noteCardButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );
}

const Profile = () => {

    const currentUserID = auth().currentUser.uid;
    const currentUserReference = firebase.app().database('https://proje-fcbf6-default-rtdb.europe-west1.firebasedatabase.app/').ref('/users/' + currentUserID);
    const currentUserSoftwareNotesReference = firebase.app().database('https://proje-fcbf6-default-rtdb.europe-west1.firebasedatabase.app/').ref('/users/' + currentUserID + '/notes/communities/software');
    const currentUserHardwareNotesReference = firebase.app().database('https://proje-fcbf6-default-rtdb.europe-west1.firebasedatabase.app/').ref('/users/' + currentUserID + '/notes/communities/hardware');
    const navigation = useNavigation();

    const [currentUserData, setCurrentUserData] = useState([]);
    const [softwareFlatList, setSoftwareFlatList] = useState([]);
    const [hardwareFlatList, setHardwareFlatList] = useState([]);
    const [softwareFlatlistIcon, setSoftwareFlatlistIcon] = useState("chevron-down");
    const [softwareFlatlistShow, setSoftwareFlatlistShow] = useState(true);
    const [hardwareFlatlistIcon, setHardwareFlatlistIcon] = useState("chevron-down");
    const [hardwareFlatlistShow, setHardwareFlatlistShow] = useState(true);

    useEffect(() => {
        currentUserReference.on('value', snapshot => {
            const userData = snapshot.val();
            setCurrentUserData(userData);
        })
    }, []);

    useEffect(() => {

        currentUserSoftwareNotesReference.on('value', snapshot => {
            const contentData = snapshot.val();

            if (!contentData) {
                return;
            }

            const parsedContentData = parseContentData(contentData);
            setSoftwareFlatList(parsedContentData);
        })
    }, []);

    useEffect(() => {
        currentUserHardwareNotesReference.on('value', snapshot => {
            const contentData = snapshot.val();

            if (!contentData) {
                return;
            }

            const parsedContentData = parseContentData(contentData);
            setHardwareFlatList(parsedContentData);
        })
    }, [])

    function parseContentData(data) {
        return Object.keys(data)
            .map(key => {
                return {
                    id: key,
                    ...data[key],
                };
            })
            .sort(function (a, b) {
                return (a.messageDate > b.messageDate) ? -1 : ((a.messageDate > b.messageDate) ? 1 : 0);
            });
    }

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    function showName() {
        return (currentUserData.name == "") ? "Name is not defined" : currentUserData.name;
    }

    function showDescription() {
        return (currentUserData.description == "") ? "Description is not defined" : currentUserData.description;
    }

    function handleSoftwareNotesVisibility() {

        if (softwareFlatlistIcon === 'chevron-down') {
            setSoftwareFlatlistIcon('chevron-right');
            setSoftwareFlatlistShow(false);
        } else if (softwareFlatlistIcon === 'chevron-right') {
            setSoftwareFlatlistIcon('chevron-down');
            setSoftwareFlatlistShow(true);
        }
    }

    function handleHardwareNotesVisibility() {

        if (hardwareFlatlistIcon === 'chevron-down') {
            setHardwareFlatlistIcon('chevron-right');
            setHardwareFlatlistShow(false);
        } else if (hardwareFlatlistIcon === 'chevron-right') {
            setHardwareFlatlistIcon('chevron-down');
            setHardwareFlatlistShow(true);
        }
    }

    const renderSoftwareFlatList = ({ item }) => <MessageCard message={item} communityName="software" />;
    const renderHardwareFlatList = ({ item }) => <MessageCard message={item} communityName="hardware" />;

    return (
        <SafeAreaView style={styles.container}>
            <TopToolbar></TopToolbar>
            <View style={styles.infoContainer}>
                {
                    (currentUserData.avatar == "") ?
                        <Image style={styles.userAvatar} source={require('../../assets/defaultAvatar.png')}></Image>
                        :
                        <Image style={styles.userAvatar} source={currentUserData.avatar}></Image>
                }
                <View style={styles.innerInfoContainer}>
                    <Text style={styles.userName}>
                        {showName()}
                    </Text>
                    <ScrollView>
                        <Text style={styles.userDescription}>
                            {showDescription()}
                        </Text>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.userNotesContainer}>
                <ScrollView>
                    <View style={styles.softwareFlatListContainer}>
                        <TouchableOpacity onPress={handleSoftwareNotesVisibility}>
                            <Icon name={softwareFlatlistIcon} style={styles.userNotesIcon}>Software</Icon>
                        </TouchableOpacity>
                        {
                            softwareFlatlistShow ?
                                (<FlatList
                                    data={softwareFlatList}
                                    renderItem={renderSoftwareFlatList}
                                    ListEmptyComponent={() => {
                                        return (
                                            <Text style={styles.userNotesContainerText}>
                                                No note has been added to software
                                            </Text>
                                        )
                                    }}
                                />)
                                :
                                null
                        }
                    </View>
                    <View style={styles.hardwareFlatListContainer}>
                        <TouchableOpacity onPress={handleHardwareNotesVisibility}>
                            <Icon name={hardwareFlatlistIcon} style={styles.userNotesIcon}>Hardware</Icon>
                        </TouchableOpacity>
                        {hardwareFlatlistShow ?
                            (
                                < FlatList
                                    data={hardwareFlatList}
                                    renderItem={renderHardwareFlatList}
                                    ListEmptyComponent={() => {
                                        return (
                                            <Text style={styles.userNotesContainerText}>
                                                No note has been added to hardware
                                            </Text>
                                        )
                                    }}
                                />
                            )
                            :
                            null
                        }
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('ProfileUpdate') }}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Profile;