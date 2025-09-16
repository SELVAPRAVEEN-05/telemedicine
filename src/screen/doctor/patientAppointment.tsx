// AppointmentsQueueScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PatientQueueCard } from '../../components/patientQueueCard';

const PatientQueueScreen = ({ navigation }: any) => {
  const [patientQueue] = useState([
    {
      id: 1,
      name: 'Sunita Devi',
      waitTime: '5 mins',
      age: 28,
      gender: 'Female',
    },
    {
      id: 2,
      name: 'Anil Kumar',
      waitTime: '2 mins',
      age: 50,
      gender: 'Male',
    },
    {
      id: 3,
      name: 'Kavita Joshi',
      waitTime: '8 mins',
      age: 34,
      gender: 'Female',
    },
    {
      id: 4,
      name: 'Ravi Sharma',
      waitTime: '3 mins',
      age: 41,
      gender: 'Male',
    },
  ]);

  const getGenderColor = (gender: string) => {
    return gender === 'Male' ? '#3B82F6' : '#EC4899';
  };

  const getGenderIcon = (gender: string) => {
    return gender === 'Male' ? 'man' : 'woman';
  };

  const handleQueuePatientPress = (patient: any) => {
    console.log('Queue patient selected:', patient);
    // navigation.navigate("PatientDetails", { patient });  // Example navigation
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardsContainer}>
            {patientQueue.map((patient) => (
              <PatientQueueCard patient={patient} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientQueueScreen;

const styles = StyleSheet.create({
  container: {
    width:400,
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  countBadge: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  cardsContainer: {
    gap: 12,
  },
  queueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  queueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  queuePatientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  queueAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  queuePatientDetails: {},
  queuePatientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  queuePatientMeta: {
    fontSize: 14,
    color: '#6B7280',
  },
  waitTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  waitTimeText: {
    fontSize: 14,
    color: '#F59E0B',
    marginLeft: 4,
  },
  queueActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  callButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
});
