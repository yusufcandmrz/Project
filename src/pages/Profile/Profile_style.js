import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "black",
    },
    infoContainer: {
        flexDirection: "row",
        flex: 0.50,
        margin: 10,
    },
    userAvatar: {
        flex: 0.5,
        height: 177.5,
        borderWidth: 1.5,
        borderColor: "green",
    },
    innerInfoContainer: {
        flex: 1,
        borderTopWidth: 1.5,
        borderRightWidth: 1.5,
        borderBottomWidth: 1.5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: "green",
    },
    userName: {
        color: "green",
        padding: 5,
        borderBottomWidth: 1.5,
        borderColor: "green",
    },
    userDescription: {
        color: "green",
        padding: 5,
    },





    //NoteCard
    userNotesContainer: {
        flex: 1,
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5,
        borderColor: "green",
        marginHorizontal: 10,
    },
    userNotesIcon: {
        color: "green",
        fontSize: 20,
    },
    softwareFlatListContainer: {
        margin: 10,
    },
    hardwareFlatListContainer:{
        marginHorizontal: 10,
        marginBottom: 10,
        marginTop: 5,
    },
    userNotesContainerText: {
        color: "green",
        marginTop: 5,
        marginHorizontal: 5,
    },
    noteCard: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderBottomEndRadius: 0,
        borderColor: "green",
    },
    noteCardDatas: {
        flex: 1,
    },
    noteCardText: {
        color: "green",
        marginTop: 5,
        marginHorizontal: 5,
        padding: 1.5,
    },
    noteCardDate: {
        color: "green",
        alignSelf: 'flex-end',
        marginRight: 5,
        padding: 1.5,
    },
    noteCardButton: {
        borderLeftWidth: 1.5,
        borderColor: "green",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    noteCardButtonIcon: {
        color: "green",
    },
    noteCardButtonText: {
        color: "green",
    },




    //Button
    button: {
        marginHorizontal: 100,
        marginVertical: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "green",
    },
    buttonText: {
        color: "green",
        fontSize: 15,
        textAlign: "center",
        textAlignVertical: "center",
        padding: 5,
    }
});

export default styles;