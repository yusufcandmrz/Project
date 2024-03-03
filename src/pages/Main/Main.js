import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

import styles from "./Main_style";
import TopToolbar from "../../tools/TopToolbar";

import { useNavigation } from "@react-navigation/native";

const Main = () => {

    const navigation = useNavigation();

    return (

        <SafeAreaView style={styles.container}>
            <TopToolbar />
            <Text style={styles.title}>Wellcome Main</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('CommunityList') }}>
                    <Text style={styles.buttonText}>
                        Look for Community
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Main;