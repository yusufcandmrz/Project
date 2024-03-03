import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, TextInput, Text, TouchableOpacity } from "react-native";
import styles from "./Hardware_style";
import TopToolbar from "../../../tools/TopToolbar";

import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import { formatDistance, parseISO } from "date-fns";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MessageCard = ({ message }) => {

    const currentUser = auth().currentUser.uid;
    const dateDistance = formatDistance(parseISO(message.messageDate), new Date(), { addSuffix: true });

    function addNotes() {

        firebase.app().database('https://proje-fcbf6-default-rtdb.europe-west1.firebasedatabase.app/').ref('/users/' + currentUser + '/notes/communities/hardware/' + message.id).set({
            messageDate: new Date().toISOString(),
            messageText: message.userMessage,
        })
    }

    return (
        <View style={styles.messageCard}>
            <View style={styles.messageCardHeader}>
                <Text style={styles.messageCardText}>{message.userEmail}</Text>
                <Text style={styles.messageCardText}>{dateDistance}</Text>
            </View>
            <Text style={styles.messageCardText}>{message.userMessage}</Text>
            <TouchableOpacity style={styles.messageCardButton} onPress={addNotes}>
                <Icon name="note-plus" style={styles.messageCardButtonIcon} size={15}></Icon>
                <Text style={styles.messageCardButtonText}>Add notes</Text>
            </TouchableOpacity>
        </View>
    );
}

const Hardware = () => {

    let [message, setMessage] = useState("");
    const [contentDataList, setContentDataList] = useState([]);
    const messagesReference = firebase.app().database('https://proje-fcbf6-default-rtdb.europe-west1.firebasedatabase.app/').ref('/messages/communities/hardware');

    useEffect(() => {

        messagesReference.on('value', snapshot => {
            const contentData = snapshot.val();

            if (!contentData) {
                return;
            }

            const parsedContentData = parseContentData(contentData);
            setContentDataList(parsedContentData);
        })
    }, []);

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

    function sendMessage() {
        if (message == "") {
            console.log("Empty message");
        }
        else {
            const messageObject = {
                userEmail: auth().currentUser.email,
                userMessage: message,
                messageDate: new Date().toISOString(),
            }
            messagesReference.push(messageObject);
        }
        setMessage("");
    }

    const renderContentData = ({ item }) => <MessageCard message={item} />;

    return (

        <SafeAreaView style={styles.container}>
            <TopToolbar />
            <View style={styles.messageListContainer}>
                <FlatList
                    data={contentDataList}
                    renderItem={renderContentData}
                />
            </View>
            <View style={styles.messageInputArea}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    style={styles.messageInput}
                    placeholder="Enter your message here..."
                    placeholderTextColor={"green"}
                />
                <TouchableOpacity style={styles.messageSubmit} onPress={sendMessage}>
                    <Text style={styles.messageSubmitText}>
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Hardware;