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
import { RootStackParamList } from "../route/AppNavigator";

type FullRecordDetailsRouteProp = RouteProp<RootStackParamList, "FullRecordDetailsScreen">;
type FullRecordDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, "FullRecordDetailsScreen">;

type Props = {
    route: FullRecordDetailsRouteProp;
    navigation: FullRecordDetailsNavigationProp;
};

export default function FullRecordDetailsScreen({ route, navigation }: Props) {
    const { recordData } = route.params;

    const handleDownload = () => {
        Alert.alert("Download", `${recordData.title} record downloaded successfully!`);
    };

    const handleShare = () => {
        Alert.alert("Share", "Record shared successfully!");
    };

    const DetailRow = ({ label, value, precision }: { label: string; value: string; precision?: string }) => (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}:</Text>
            <View style={styles.detailValueContainer}>
                <Text style={styles.detailValue}>{value}</Text>
                {precision && <Text style={styles.precisionText}>{precision}</Text>}
            </View>
        </View>
    );

    const VitalCard = ({ label, value, precision }: { label: string; value: string; precision?: string }) => (
        <View style={styles.vitalCard}>
            <Text style={styles.vitalLabel}>{label}</Text>
            <Text style={styles.vitalValue}>{value}</Text>
            {precision && <Text style={styles.vitalPrecision}>{precision}</Text>}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Medical Record Details</Text>
                </View>

                {/* Main Info Card */}
                <View style={styles.mainCard}>
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.clinicName}>{recordData.title}</Text>
                            <Text style={styles.visitDate}>{recordData.date}</Text>
                            <Text style={styles.visitType}>{recordData.description}</Text>
                            {recordData.patientName && (
                                <Text style={styles.patientName}>
                                    Patient: {recordData.patientName} (Age: {recordData.patientAge})
                                </Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Vital Signs Section
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Vital Signs</Text>
                    <View style={styles.vitalsGrid}>
                        <VitalCard 
                            label="Blood Pressure" 
                            value={recordData.details.bloodPressure}
                            precision={recordData.details.bloodPressurePrecision}
                        />
                        <VitalCard 
                            label="Heart Rate" 
                            value={recordData.details.heartRate}
                            precision={recordData.details.heartRatePrecision}
                        />
                        <VitalCard 
                            label="Temperature" 
                            value={recordData.details.fever}
                            precision={recordData.details.feverPrecision}
                        />
                        <VitalCard 
                            label="Oxygen Level" 
                            value={recordData.details.oxygenLevel}
                            precision={recordData.details.oxygenLevelPrecision}
                        />
                    </View>
                </View> */}

                {/* Physical Measurements */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Physical Measurements</Text>
                    <View style={styles.detailsCard}>
                        <DetailRow 
                            label="Weight" 
                            value={recordData.details.weight}
                        />
                        <DetailRow 
                            label="Height" 
                            value={recordData.details.height}
                        />
                    </View>
                </View>

                {/* Medications Section */}
                {recordData.details.medications && recordData.details.medications.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Prescribed Medications</Text>
                        <View style={styles.detailsCard}>
                            {recordData.details.medications.map((medication:any, index : any) => (
                                <View key={index} style={styles.medicationItem}>
                                    <View style={styles.medicationHeader}>
                                        <Text style={styles.medicationName}>{medication.name}</Text>
                                        <Text style={styles.medicationDosage}>{medication.dosage}</Text>
                                    </View>
                                    <View style={styles.medicationDetails}>
                                        <Text style={styles.medicationTiming}>Timing: {medication.timing}</Text>
                                        <Text style={styles.medicationInstruction}>{medication.instruction}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Diagnosis & Treatment */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Diagnosis & Treatment</Text>
                    <View style={styles.detailsCard}>
                        <DetailRow label="Diagnosis" value={recordData.details.diagnosis} />
                        <DetailRow label="Prescription" value={recordData.details.prescription} />
                    </View>
                </View>

                {/* Doctor's Notes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Doctor's Notes</Text>
                    <View style={styles.notesCard}>
                        <Text style={styles.notesText}>
                            {recordData.details.notes || "No additional notes provided."}
                        </Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
                        <Text style={styles.downloadBtnText}>Download PDF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
                        <Text style={styles.shareBtnText}>Share Record</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        marginTop:20
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e9ecef",
    },
    backButton: {
        marginRight: 15,
    },
    backButtonText: {
        color: "#FF6B00",
        fontSize: 16,
        fontWeight: "600",
        justifyContent:"center"
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
    },
    mainCard: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    clinicName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#333",
        marginBottom: 5,
    },
    visitDate: {
        fontSize: 16,
        color: "#666",
        marginBottom: 5,
    },
    visitType: {
        fontSize: 18,
        color: "#555",
        fontWeight: "500",
        marginBottom: 8,
    },
    patientName: {
        fontSize: 14,
        color: "#FF6B00",
        fontWeight: "600",
    },
    statusBadge: {
        backgroundColor: "#e8f5e8",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#4CAF50",
    },
    statusText: {
        color: "#2E7D32",
        fontWeight: "600",
        fontSize: 14,
    },
    section: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
        marginBottom: 15,
    },
    vitalsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    vitalCard: {
        backgroundColor: "#fff",
        width: "48%",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    vitalLabel: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
        textAlign: "center",
    },
    vitalValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FF6B00",
        textAlign: "center",
    },
    vitalPrecision: {
        fontSize: 12,
        color: "#888",
        marginTop: 2,
        textAlign: "center",
    },
    detailsCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f3f4",
    },
    detailLabel: {
        fontSize: 16,
        color: "#555",
        fontWeight: "500",
        flex: 1,
    },
    detailValueContainer: {
        flex: 1,
        alignItems: "flex-end",
    },
    detailValue: {
        fontSize: 16,
        color: "#333",
        fontWeight: "600",
        textAlign: "right",
    },
    precisionText: {
        fontSize: 12,
        color: "#888",
        textAlign: "right",
        marginTop: 2,
    },
    medicationItem: {
        backgroundColor: "#f8f9fa",
        padding: 15,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 3,
        borderLeftColor: "#FF6B00",
    },
    medicationHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
    },
    medicationDosage: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FF6B00",
    },
    medicationDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    medicationTiming: {
        fontSize: 14,
        color: "#666",
        fontWeight: "500",
    },
    medicationInstruction: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
    },
    notesCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    notesText: {
        fontSize: 16,
        color: "#555",
        lineHeight: 24,
        fontStyle: "italic",
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
        marginBottom: 40,
    },
    downloadBtn: {
        backgroundColor: "#FF6B00",
        flex: 1,
        marginRight: 10,
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#FF6B00",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    downloadBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    shareBtn: {
        backgroundColor: "#fff",
        flex: 1,
        marginLeft: 10,
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FF6B00",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    shareBtnText: {
        color: "#FF6B00",
        fontSize: 16,
        fontWeight: "600",
    },
});