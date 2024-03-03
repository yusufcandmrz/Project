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
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        height: 75,
        width: 250,
        margin: 25,
    },
    buttonText: {
        flex: 1,
        color: "green",
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center",
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "green",
    }
});

export default styles;