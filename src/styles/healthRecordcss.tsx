import { StyleSheet } from 'react-native';
export const HealthRecordStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        padding : 20
    },
     header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e9ecef",

    },
    backButton: {
        marginBottom: 10,
        fontSize:26,
        marginRight:10,
        fontWeight:600
    },
     headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
    },
    // headerRow: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     paddingTop: 40,
    //     marginBottom: 20,
    // },
    // header: {
    //     fontSize: 22,
    //     fontWeight: "700",
    // },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fbefeaff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 2, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        borderWidth : 1 , 
        borderColor : "#ffa575ff"
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    date: {
        fontSize: 13,
        color: "#888",
        marginBottom: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
    },
    desc: {
        fontSize: 14,
        color: "#555",
    },
});