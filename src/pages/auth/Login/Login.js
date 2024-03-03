import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Alert, TouchableOpacity, ScrollView } from "react-native";
import styles from "./Login_style";

import { Formik } from "formik";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const initialFormValues = {
    userEmail: "",
    userPassword: "",
}

const Login = () => {

    const navigation = useNavigation();

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [passwordIcon, setPasswordIcon] = useState('eye')

    async function handleFormSubmit(formValues) {
        if (formValues.userEmail == "" || formValues.userPassword == "") {
            Alert.alert("You should enter all inputs")
        }
        else {
            await auth().signInWithEmailAndPassword(formValues.userEmail, formValues.userPassword)
                .then(console.log("You are signed in")).catch(() => Alert.alert("Email or password is wrong"))
        }
    }

    function handlePasswordVisibility() {

        if (passwordIcon === 'eye') {
            setPasswordIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (passwordIcon === 'eye-off') {
            setPasswordIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Wellcome Login</Text>
                <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                    {({ values, handleChange, handleSubmit }) => (
                        <>
                            <View style={styles.textInput}>
                                <TextInput
                                    value={values.userEmail}
                                    onChangeText={handleChange("userEmail")}
                                    placeholder="Enter your email"
                                    placeholderTextColor={"green"}
                                    style={styles.textInputText} />
                            </View>
                            <View style={styles.textInput}>
                                <TextInput
                                    value={values.userPassword}
                                    onChangeText={handleChange("userPassword")}
                                    placeholder="Enter your password"
                                    placeholderTextColor={"green"}
                                    secureTextEntry={passwordVisibility}
                                    style={styles.textInputText}
                                />
                                <Icon name={passwordIcon} style={styles.textInputIcon} size={30} onPress={handlePasswordVisibility} />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                                    <Text style={styles.buttonText}>Sign In</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate("SignUp"); }} style={styles.button}>
                                    <Text style={styles.buttonText}>Creat Account</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Login;