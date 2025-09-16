import { StyleSheet } from "react-native";

export const patientRecordDetails = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#fff",
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
    profile: {
        padding: 20,
        backgroundColor: "#f7f5f5ff",
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth : 2 , 
        borderColor : "#f0884fff"
    },
    headerInfo: {
        flex: 1,
    },
    title: { 
        fontSize: 22, 
        fontWeight: "700", 
        marginBottom: 5,
        color: "#333"
    },
    date: { 
        fontSize: 14, 
        color: "#666", 
        marginBottom: 5 
    },
    desc: { 
        fontSize: 16, 
        color: "#555",
        marginBottom: 10
    },
    patientInfo: {
        fontSize: 14,
        color: "#FF6B00",
        fontWeight: "600",
    },
    notescomponent: {
        flex: 1
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        marginBottom: 15,
    },
    detailsBox: {
        backgroundColor: "#fef0f0ff",
        padding: 18,
        borderRadius: 12,
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: "#FF6B00",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth : 0.5,
        borderColor:"#f4e2e2ff",
        elevation: 2,
    },
    recordHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    date1: { 
        fontSize: 14, 
        color: "#666", 
        fontWeight: "500"
    },
    viewMore: {
        fontSize: 12,
        color: "#FF6B00",
        fontWeight: "500",
    },
    recordTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    recordDescription: {
        fontSize: 16,
        color: "#555",
        marginBottom: 8,
    },
    diagnosis: {
        fontSize: 15,
        color: "#FF6B00",
        fontWeight: "500",
        marginBottom: 8,
    },
    medicationsCount: {
        fontSize: 14,
        color: "#4CAF50",
        fontWeight: "500",
        marginBottom: 8,
    },
    notes: { 
        fontSize: 15,   
        color: "#666", 
        lineHeight: 20,
        fontStyle: "italic"
    },
    noRecords: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 20,
        fontStyle: "italic",
    },
    Fullview : {
        display: "flex",
        flexDirection :"row",
        justifyContent:"center",
        alignItems:"center" ,
        alignContent:"center"  
    },
    arrow : {
        marginLeft : 2620,
        display:"flex",
        alignItems : "center",
        justifyContent: "center",
        fontSize: 12,
        color: "#FF6B00",
        fontWeight: "500",
    }
});