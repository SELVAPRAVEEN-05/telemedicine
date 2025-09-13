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
import { patientFullDetailsStyle as styles } from "../../styles/patientFullDetailsStyle";

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
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                    >
                        <Text style = {styles.backButton}>←</Text>
                    
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Medical Record Details</Text>
                </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Main Info Card */}
                {/* <View style={styles.mainCard}>
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
                </View> */}

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
