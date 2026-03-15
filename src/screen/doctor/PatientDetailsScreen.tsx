// PatientDetailsScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PatientDetailsShowDoctor = ({ route, navigation } : any) => {
  const { record } = route.params;

  const formatDate = (dateString : any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}
      
      {/* Detail Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Record</Text>
      </View>



      <ScrollView style={styles.detailContainer} showsVerticalScrollIndicator={false}>
        {/* Header Info */}
        <View style={styles.detailHeader}>
          <View style={[styles.detailIconContainer, { backgroundColor: record.backgroundColor }]}>
            {/* <Icon name="description" size={32} color={record.iconColor} /> */}
            <Text style={styles.nameFirst}>{record.title.charAt(0)}</Text>
            
          </View>
          <Text style={styles.detailTitle}>{record.title}</Text>
          <Text style={styles.detailDate}>{formatDate(record.date)} at {record.time}</Text>
        </View>

        {/* Patient Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.patientCard}>
            <View style={styles.infoRow}>
              <Icon name="person" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{record.patientInfo.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="cake" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{record.patientInfo.age} years old • {record.patientInfo.gender}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="opacity" size={20} color="#6B7280" />
              <Text style={styles.infoText}>Blood Group: {record.patientInfo.bloodGroup}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="phone" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{record.patientInfo.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="email" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{record.patientInfo.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="location-on" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{record.patientInfo.address}</Text>
            </View>
          </View>
        </View>

     

        {/* Visit Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visit Details</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Reason for Visit</Text>
            <Text style={styles.infoValue}>{record.visitReason}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{record.duration}</Text>
          </View>
        </View>

        {/* Diagnosis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diagnosis</Text>
          <View style={styles.diagnosisCard}>
            <Text style={styles.diagnosisText}>{record.diagnosis}</Text>
          </View>
        </View>

        {/* Vitals (if available) */}
        {record.vitals.bloodPressure !== 'Not measured' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vital Signs</Text>
            <View style={styles.vitalsGrid}>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Blood Pressure</Text>
                <Text style={styles.vitalValue}>{record.vitals.bloodPressure}</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Heart Rate</Text>
                <Text style={styles.vitalValue}>{record.vitals.heartRate}</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Temperature</Text>
                <Text style={styles.vitalValue}>{record.vitals.temperature}</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Weight</Text>
                <Text style={styles.vitalValue}>{record.vitals.weight}</Text>
              </View>
            </View>
          </View>
        )}


        {/* Prescription */}
        {record.prescription.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prescription</Text>
            {record.prescription.map((medicine : any, index : any) => (
              <View key={index} style={styles.prescriptionItem}>
                <Icon name="medication" size={16} color="#F59E0B" />
                <Text style={styles.prescriptionText}>{medicine}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doctor's Notes</Text>
          <View style={styles.notesCard}>
            <Text style={styles.notesText}>{record.notes}</Text>
          </View>
        </View>

        {/* Next Appointment */}
        {record.nextAppointment && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Next Appointment</Text>
            <View style={styles.appointmentCard}>
              <Icon name="event" size={20} color="#3B82F6" />
              <Text style={styles.appointmentText}>
                {formatDate(record.nextAppointment)}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  nameFirst:{
    fontWeight: '700', color: '#333',fontSize:40 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },

  headerTitle: {
    fontSize: 18,
    marginLeft:20,
    fontWeight: '600',
    color: '#1F2937',
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  detailHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
  },
  detailIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  detailDate: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  patientCard: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  diagnosisCard: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  diagnosisText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vitalItem: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    width: '48%',
    marginBottom: 8,
  },
  vitalLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  testItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  testText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
  },
  prescriptionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  prescriptionText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  notesCard: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  notesText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
  },
  appointmentText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    marginLeft: 12,
  },
  bottomPadding: {
    height: 32,
  },
});

export default PatientDetailsShowDoctor;