import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../route/AppNavigator";

type RecordsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "RecordsScreen">;

// Updated records with patientId
const records = [
    {
        id: "1",
        patientId: "P1", // Added patientId
        date: "2024-03-15",
        title: "Dr. Sharma's Clinic",
        description: "General Checkup",
        icon: "document-text-outline",
        bgColor: "#2D9CDB",
        details: "Patient had a routine general health checkup.",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
    },
    {
        id: "2",
        patientId: "P1", // Added patientId - John Doe's second record
        date: "2024-05-10",
        title: "City Hospital",
        description: "Cardiology Consultation",
        icon: "receipt-outline",
        bgColor: "#F2994A",
        details: "Patient advised to monitor blood pressure daily.",
        img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
    },
    {
        id: "3",
        patientId: "P2", // Added patientId - Jane Smith's record
        date: "2024-08-20",
        title: "Sunrise Clinic",
        description: "Routine Checkup",
        icon: "medkit-outline",
        bgColor: "#EB5757",
        details: "Maintains a healthy lifestyle.",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
    },
];

export default function RecordsScreen() {
    const navigation = useNavigation<RecordsScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.header}>My Records</Text>
            </View>

            {/* Records List with map */}
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {records.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        onPress={() => navigation.navigate("RecordDetails", { record: item })}
                    >
                        <Image
                            source={{ uri: item.img }}
                            style={{ width: 50, height: 50, borderRadius: 8, marginRight: 15 }}
                        />

                        <View style={styles.textContainer}>
                            <Text style={styles.date}>{item.date}</Text>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.desc}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 40,
        marginBottom: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: "700",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 2, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
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