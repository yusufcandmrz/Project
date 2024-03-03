import React from "react";
import { SafeAreaView, TouchableOpacity, Text } from "react-native";

import styles from "./TopToolbar_style";

import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TopToolbar = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Main') }}>
                <Icon name="home" style={styles.icon} size={25}></Icon>
                <Text style={styles.buttonText}>Main</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Profile') }}>
                <Icon name="account" style={styles.icon} size={25}></Icon>
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                auth().signOut();
                console.log("You are signed out")
            }}>
                <Icon name="account-off" style={styles.icon} size={25}></Icon>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default TopToolbar;