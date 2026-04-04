import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { patientFullDetailsStyle as styles } from '../../styles/patientFullDetailsStyle';

type Props = {
  route: any;
  navigation: any;
};

export default function FullRecordDetailsScreen({ route, navigation }: Props) {
  const [recordData, setRecordData] = useState<any>(route.params?.recordData || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecordDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        if (!token) {
          // Alert.alert('Error', 'No authentication token found. Please login again.');
          setLoading(false);
          return;
        }

        // Assume the API endpoint is /patient/get-record-details/:id
        const recordId = route.params?.recordData?.id;
        if (!recordId) {
          // Alert.alert('Error', 'Record ID not found.');
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `https://telemedicine-server-o5tc.onrender.com/patient/get-record-details/${recordId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.status === 200) {
          setRecordData(res.data);
        } else {
          // Alert.alert('Error', 'Failed to fetch record details.');
        }
      } catch (error) {
        console.error('Error fetching record details:', error);
        // Alert.alert('Error', 'Failed to fetch record details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecordDetails();
  }, [route.params]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleDownload = () => {
    Alert.alert(
      'Download',
      `${recordData?.title} record downloaded successfully!`,
    );
  };

  const handleShare = () => {
    Alert.alert('Share', 'Record shared successfully!');
  };

  const DetailRow = ({
    label,
    value,
    precision,
  }: {
    label: string;
    value: string;
    precision?: string;
  }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <View style={styles.detailValueContainer}>
        <Text style={styles.detailValue}>{value}</Text>
        {precision && <Text style={styles.precisionText}>{precision}</Text>}
      </View>
    </View>
  );

  const VitalCard = ({
    label,
    value,
    precision,
  }: {
    label: string;
    value: string;
    precision?: string;
  }) => (
    <View style={styles.vitalCard}>
      <Text style={styles.vitalLabel}>{label}</Text>
      <Text style={styles.vitalValue}>{value}</Text>
      {precision && <Text style={styles.vitalPrecision}>{precision}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        >
          <Icon
            name="arrow-left"
            size={26}
            style={{ marginLeft: 15, marginTop: 5, marginRight: 10 }}
            color="#000000"
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          My Health Record
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Info Card */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.clinicName}>{recordData?.title}</Text>
              <Text style={styles.visitDate}>{recordData?.date}</Text>
              <Text style={styles.visitType}>{recordData?.description}</Text>
              {recordData?.patientName && (
                <Text style={styles.patientName}>
                  Patient: {recordData.patientName} (Age:{' '}
                  {recordData.patientAge})
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Vital Signs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vital Signs</Text>
          <View style={styles.vitalsGrid}>
            <VitalCard
              label="Blood Pressure"
              value={recordData?.details?.bloodPressure || 'N/A'}
              precision={recordData?.details?.bloodPressurePrecision}
            />
            <VitalCard
              label="Heart Rate"
              value={recordData?.details?.heartRate || 'N/A'}
              precision={recordData?.details?.heartRatePrecision}
            />
            <VitalCard
              label="Temperature"
              value={recordData?.details?.fever || 'N/A'}
              precision={recordData?.details?.feverPrecision}
            />
            <VitalCard
              label="Oxygen Level"
              value={recordData?.details?.oxygenLevel || 'N/A'}
              precision={recordData?.details?.oxygenLevelPrecision}
            />
          </View>
        </View>

        {/* Physical Measurements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physical Measurements</Text>
          <View style={styles.detailsCard}>
            <DetailRow
              label="Weight"
              value={recordData?.details?.weight || 'N/A'}
            />
            <DetailRow
              label="Height"
              value={recordData?.details?.height || 'N/A'}
            />
          </View>
        </View>

        {/* Medications Section */}
        {recordData?.details?.medications &&
          recordData.details.medications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prescribed Medications</Text>
              <View style={styles.detailsCard}>
                {recordData.details.medications.map(
                  (medication: any, index: number) => (
                    <View key={index} style={styles.medicationItem}>
                      <View style={styles.medicationHeader}>
                        <Text style={styles.medicationName}>
                          {medication.name}
                        </Text>
                        <Text style={styles.medicationDosage}>
                          {medication.dosage}
                        </Text>
                      </View>
                      <View style={styles.medicationDetails}>
                        <Text style={styles.medicationTiming}>
                          Timing: {medication.timing}
                        </Text>
                        <Text style={styles.medicationInstruction}>
                          {medication.instruction}
                        </Text>
                      </View>
                    </View>
                  ),
                )}
              </View>
            </View>
          )}

        {/* Diagnosis & Treatment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diagnosis & Treatment</Text>
          <View style={styles.detailsCard}>
            <DetailRow
              label="Diagnosis"
              value={recordData?.details?.diagnosis || 'N/A'}
            />
            <DetailRow
              label="Prescription"
              value={recordData?.details?.prescription || 'N/A'}
            />
          </View>
        </View>

        {/* Doctor's Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doctor's Notes</Text>
          <View style={styles.notesCard}>
            <Text style={styles.notesText}>
              {recordData?.details?.notes || 'No additional notes provided.'}
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
    </View>
  );
}
