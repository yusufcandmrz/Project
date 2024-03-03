import React from "react";
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import styles from "./SignUp_style";

import { Formik } from "formik";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";

const initialFormValues = {
    userEmail: "",
    userPassword: "",
    userPasswordAgain: "",
}

const SignUp = () => {

    const navigation = useNavigation();

    async function handleFormSubmit(formValues) {
        if (formValues.userEmail == "" || formValues.userPassword == "" || formValues.userPasswordAgain == "") {
            Alert.alert("You should enter all inputs");
        }
        else {
            if (formValues.userPassword != formValues.userPasswordAgain) {
                Alert.alert("Passwords are not the same");
            }
            else {
                console.log("User Email: " + formValues.userEmail + ", User Password: " + formValues.userPassword);
                try {
                    await auth().createUserWithEmailAndPassword(formValues.userEmail, formValues.userPassword)
                    const userID = auth().currentUser.uid;
                    firebase.app().database('https://proje-fcbf6-default-rtdb.europe-west1.firebasedatabase.app/').ref('/users/' + userID).set({
                        email: formValues.userEmail,
                        password: formValues.userPassword,
                        avatar: "",
                        name: "",
                        description: "",
                        notes: "",
                    });
                    Alert.alert("Your account is created");
                }
                catch (error) {
                    console.log(error)
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            return Alert.alert("The email address is already in use by another account")
                        case 'auth/invalid-email':
                            return Alert.alert("The email address is badly formatted")
                        default:
                            return Alert.alert("Your account is not created")
                    }
                }
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Wellcome SignUp</Text>
                <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                    {({ values, handleChange, handleSubmit }) => (
                        <>
                            <TextInput
                                value={values.userEmail}
                                onChangeText={handleChange("userEmail")}
                                placeholder="Enter your e-mail"
                                placeholderTextColor={"green"}
                                style={styles.textInput} />

                            <TextInput
                                value={values.userPassword}
                                onChangeText={handleChange("userPassword")}
                                placeholder="Enter your password"
                                placeholderTextColor={"green"}
                                secureTextEntry
                                style={styles.textInput} />
                            <TextInput
                                value={values.userPasswordAgain}
                                onChangeText={handleChange("userPasswordAgain")}
                                placeholder="Enter your password again"
                                placeholderTextColor={"green"}
                                secureTextEntry
                                style={styles.textInput} />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignUp;