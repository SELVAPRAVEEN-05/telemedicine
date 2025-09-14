import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../route/AppNavigator";
import { patientRecordDetails as styles } from "../../styles/patientRecordStyle";

type RecordDetailsRouteProp = RouteProp<RootStackParamList>;
type RecordDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
    route: RecordDetailsRouteProp;
    navigation: RecordDetailsNavigationProp;
};

const patients = [
    {
        patientId: "P1",
        name: "John Doe",
        age: 30,
        records: [
            {
                id: "1",
                date: "2024-03-15",
                title: "Dr. Sharma's Clinic",
                description: "General Checkup",
                details: {
                    bloodPressure: "120/80 mmHg",
                    bloodPressurePrecision: "±2 mmHg",
                    fever: "98.6°F",
                    feverPrecision: "±0.1°F",
                    heartRate: "72 bpm",
                    heartRatePrecision: "±1 bpm",
                    weight: "70.0 kg",
                    weightPrecision: "±0.1 kg",
                    height: "175 cm (5'9\")",
                    heightPrecision: "±0.5 cm",
                    oxygenLevel: "98%",
                    oxygenLevelPrecision: "±1%",
                    diagnosis: "Healthy",
                    prescription: "No medication required",
                    medications: [],
                    notes: "Patient had a routine general health checkup.",
                },
            },
            {
                id: "2",
                date: "2024-05-10",
                title: "City Hospital",
                description: "Cardiology Consultation",
                details: {
                    bloodPressure: "130/85 mmHg",
                    bloodPressurePrecision: "±2 mmHg",
                    fever: "99.1°F",
                    feverPrecision: "±0.1°F",
                    heartRate: "78 bpm",
                    heartRatePrecision: "±1 bpm",
                    weight: "72.0 kg",
                    weightPrecision: "±0.1 kg",
                    height: "175 cm (5'9\")",
                    heightPrecision: "±0.5 cm",
                    oxygenLevel: "97%",
                    oxygenLevelPrecision: "±1%",
                    diagnosis: "Mild hypertension",
                    prescription: "Low-sodium diet and exercise recommended",
                    medications: [
                        {
                            name: "Amlodipine",
                            dosage: "5 mg",
                            timing: "Morning",
                            instruction: "After food"
                        },
                        {
                            name: "Aspirin",
                            dosage: "75 mg",
                            timing: "Night",
                            instruction: "After food"
                        }
                    ],
                    notes: "Patient advised to monitor blood pressure daily.",
                },
            },
            {
                id: "4",
                date: "2024-06-15",
                title: "City Hospital",
                description: "Follow-up Cardiology",
                details: {
                    bloodPressure: "125/82 mmHg",
                    bloodPressurePrecision: "±2 mmHg",
                    fever: "98.7°F",
                    feverPrecision: "±0.1°F",
                    heartRate: "75 bpm",
                    heartRatePrecision: "±1 bpm",
                    weight: "71.0 kg",
                    weightPrecision: "±0.1 kg",
                    height: "175 cm (5'9\")",
                    heightPrecision: "±0.5 cm",
                    oxygenLevel: "98%",
                    oxygenLevelPrecision: "±1%",
                    diagnosis: "Improving hypertension",
                    prescription: "Continue diet and exercise",
                    medications: [
                        {
                            name: "Amlodipine",
                            dosage: "5 mg",
                            timing: "Morning",
                            instruction: "After food"
                        }
                    ],
                    notes: "Blood pressure showing improvement with lifestyle changes.",
                },
            },
        ],
    },
    {
        patientId: "P2",
        name: "Jane Smith",
        age: 28,
        records: [
            {
                id: "3",
                date: "2024-08-20",
                title: "Sunrise Clinic",
                description: "Routine Checkup",
                details: {
                    bloodPressure: "118/76 mmHg",
                    bloodPressurePrecision: "±2 mmHg",
                    fever: "98.4°F",
                    feverPrecision: "±0.1°F",
                    heartRate: "70 bpm",
                    heartRatePrecision: "±1 bpm",
                    weight: "60.0 kg",
                    weightPrecision: "±0.1 kg",
                    height: "167 cm (5'6\")",
                    heightPrecision: "±0.5 cm",
                    oxygenLevel: "99%",
                    oxygenLevelPrecision: "±1%",
                    diagnosis: "Healthy",
                    prescription: "No medication required",
                    medications: [],
                    notes: "Maintains a healthy lifestyle.",
                },
            },
        ],
    },
];

export default function RecordDetailsScreen({ route, navigation }: Props) {
    const { record } = route.params;

    const handleViewFullDetails = (recordItem: any) => {
        // Navigate to full details page
        navigation.navigate("FullRecordDetailsScreen", { recordData: recordItem });
    };

    // Find the current patient based on the selected record
    const getCurrentPatient = () => {
        if (record.patientId) {
            return patients.find(patient => patient.patientId === record.patientId);
        }
        return patients.find(patient =>
            patient.records.some(r => r.id === record.id)
        );
    };

    const currentPatient = getCurrentPatient();

    // Get only records from the SAME HOSPITAL/CLINIC for this patient
    const hospitalRecords = currentPatient ? currentPatient.records
        .filter(r => r.title === record.title) // Filter by same hospital/clinic
        .map(record => ({
            ...record,
            patientName: currentPatient.name,
            patientAge: currentPatient.age,
            patientId: currentPatient.patientId
        })) : [];

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButton}>←</Text>

                </TouchableOpacity>
                <Text style={styles.headerTitle}>Record Details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.profile}>
                    <View style={styles.headerInfo}>
                        <Text style={styles.title}>{record.title}</Text>
                        <Text style={styles.date}>{record.date}</Text>
                        <Text style={styles.desc}>{record.description}</Text>
                        {currentPatient && (
                            <Text style={styles.patientInfo}>
                                Patient: {currentPatient.name} (Age: {currentPatient.age})
                            </Text>
                        )}
                    </View>
                </View>

                {/* Records List - Only from the same hospital for current patient */}
                <View style={styles.notescomponent}>
                    <Text style={styles.sectionTitle}>
                        {currentPatient ? `${currentPatient.name}'s Records at ${record.title}` : 'Medical Records'}
                    </Text>
                    {hospitalRecords.length > 0 ? (
                        hospitalRecords.map((recordItem) => (
                            <TouchableOpacity
                                key={`${recordItem.patientId}-${recordItem.id}`}
                                style={styles.detailsBox}
                                onPress={() => handleViewFullDetails(recordItem)}
                            >
                                <View style={styles.recordHeader}>
                                    <Text style={styles.date1}>{recordItem.date}</Text>
                                    <Text style={styles.Fullview}>
                                        <Text style={styles.viewMore}>
                                            Tap to view details
                                        </Text>
                                        <Text style={styles.arrow}>→</Text>
                                    </Text>
                                </View>
                                <Text style={styles.recordTitle}>{recordItem.title}</Text>
                                <Text style={styles.recordDescription}>{recordItem.description}</Text>
                                <Text style={styles.diagnosis}>
                                    Diagnosis: {recordItem.details.diagnosis}
                                </Text>
                                {recordItem.details.medications && recordItem.details.medications.length > 0 && (
                                    <Text style={styles.medicationsCount}>
                                        Medications: {recordItem.details.medications.length} prescribed
                                    </Text>
                                )}
                                <Text style={styles.notes}>
                                    {recordItem.details.notes || "No extra details available"}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.noRecords}>
                            No other records found at {record.title} for this patient.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

