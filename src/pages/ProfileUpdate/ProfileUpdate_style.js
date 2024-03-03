import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "black",
    },
    infoContainer: {
        flexDirection: "row",
        margin: 10,
    },
    infoAvatarContainer: {
        flex: 0.75,
        borderWidth: 1.5,
        borderColor: "green",
        borderRadius: 10,
    },
    infoAvatar: {
        flex: 1,
    },
    infoAvatarButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    infoAvatarButton: {
        marginTop: 200,
    },
    infoAvatarButtonIcon: {
        color: "green",
        alignSelf: "center",
    },
    infoAvatarButtonText: {
        color: "green",
        backgroundColor: "black",
        textAlign: "center",
        fontSize: 12.5,
    },
    innerInfoContainer: {
        flex: 1,
        marginLeft: 20,
    },
    innerInfoText: {
        color: "green",
    },
    innerInfoTextInputName: {
        color: "green",
        height: 50,
        padding: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "green",
    },
    innerInfoTextInputDescription: {
        color: "green",
        height: 150,
        textAlignVertical: "top",
        padding: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "green",
    },

    //Private Info
    privateInfoContainer: {
        marginHorizontal: 10,
    },
    privateInfoView: {
        marginTop: 10,
    },
    privateInfoText: {
        color: "green",
        fontSize: 20,
        marginLeft: 15,
    },
    privateInfoEmail: {
        color: "green",
        fontSize: 15,
        height: 50,
        marginHorizontal: 10,
        padding: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "green",
    },
    privateInfoPasswordContainer: {
        flex: 1,
        flexDirection: "row",
        height: 50,
        marginHorizontal: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "green",
    },
    privateInfoPasswordText: {
        flex: 1,
        color: "green",
        fontSize: 15,
        padding: 10,
    },
    privateInfoPasswordIcon: {
        color: "green",
        alignSelf: "center",
        padding: 10,
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