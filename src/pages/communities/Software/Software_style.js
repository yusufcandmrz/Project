import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "black",
    },


    //MessageCard
    messageListContainer: {
        flex: 1,
    },
    messageCard: {
        marginTop: 10,
        marginHorizontal: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderBottomEndRadius: 0,
        borderColor: "green",
    },
    messageCardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1.5,
        borderColor: "green",
    },
    messageCardText: {
        color: "green",
        margin: 5,
    },
    messageCardButton: {
        flexDirection: "row",
        alignSelf: 'flex-end',
        alignItems: "center",
        height: 25,
        width: 75,
        marginRight: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: "green",
    },
    messageCardButtonIcon: {
        color: "green",
    },
    messageCardButtonText: {
        flex: 1,
        color: "green",
        fontSize: 10,
        fontWeight: "bold",
        padding: 5,
    },



    //MessageInputArea
    messageInputArea: {
        flexDirection: "row",
        marginTop: 10,
    },
    messageInput: {
        flex: 1,
        color: "green",
        paddingHorizontal: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderColor: "green",
    },
    messageSubmit: {
        borderWidth: 1.5,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderColor: "green",
    },
    messageSubmitText: {
        flex: 1,
        color: "green",
        textAlign: "center",
        textAlignVertical: "center",
        padding: 5,
    }
});

export default styles;