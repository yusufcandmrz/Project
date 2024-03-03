import React from "react";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";

import styles from "./CommunityList_style";
import TopToolbar from "../../tools/TopToolbar";

import { useNavigation } from "@react-navigation/native";

const CommunityList = () => {

    const navigation = useNavigation();

    return (

        <SafeAreaView style={styles.container}>
            <TopToolbar />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Software') }}>
                    <Text style={styles.buttonText}>
                        Software
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Hardware') }}>
                    <Text style={styles.buttonText}>
                        Hardware
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default CommunityList;