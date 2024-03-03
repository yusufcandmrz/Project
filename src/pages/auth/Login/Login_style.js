import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "black",
    },
    title: {
        color: "green",
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        height: 250,
        margin: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "green",
    },

    //TextInput
    textInput: {
        flexDirection: "row",
        height: 75,
        margin: 10,
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderRadius: 50,
        borderColor: "green",
    },
    textInputText: {
        flex: 1,
        color: "green",
        fontSize: 15,
    },
    textInputIcon: {
        color: "green",
        alignSelf: "center",
    },


    //Button
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 10,
    },
    button: {
        flex: 1,
        height: 50,
        width: 25,
        margin: 25,
    },
    buttonText: {
        flex: 1,
        color: "green",
        textAlign: "center",
        textAlignVertical: "center",
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "green",
    }
});

export default styles;