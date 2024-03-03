import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "black",
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
        fontSize: 25,
        textAlign: "center",
        textAlignVertical: "center",
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "green",
    }
});

export default styles;