// PatientRecordsScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../route/appNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PatientRecordsScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const records = [
    {
      id: 1,
      date: '2024-05-18',
      title: "Dr. Sharma's Clinic",
      subtitle: 'General Checkup',
      backgroundColor: '#bfede3ff',
      iconColor: '#0D9488',
      doctorName: 'Dr. Rajesh Sharma',
      specialty: 'General Physician',
      location: 'Main Street Medical Center, Chennai',
      time: '10:30 AM',
      duration: '30 minutes',
      visitReason: 'Annual health checkup and routine examination',
      diagnosis: 'Patient is in good health. All vital signs normal.',
      prescription: [
        'Vitamin D3 - 1 tablet daily for 30 days',
        'Multivitamin - 1 capsule daily after breakfast'
      ],
      nextAppointment: '2024-11-18',
      vitals: {
        bloodPressure: '120/80 mmHg',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '70 kg',
        height: '175 cm'
      },
      labTests: ['Complete Blood Count', 'Lipid Profile', 'Blood Sugar'],
      notes: 'Patient advised to maintain current diet and exercise routine. Follow up in 6 months.',
      patientInfo: {
        name: 'John Doe',
        age: 35,
        gender: 'Male',
        bloodGroup: 'O+',
        phone: '+91 9876543210',
        email: 'john.doe@email.com',
        address: '123 Anna Salai, Chennai, Tamil Nadu 600002'
      }
    },
    {
      id: 2,
      date: '2024-04-25',
      title: 'City Hospital',
      subtitle: 'Blood Test Results',
      backgroundColor: '#FED7AA',
      iconColor: '#EA580C',
      doctorName: 'Dr. Priya Nair',
      specialty: 'Pathologist',
      location: 'City Hospital Laboratory, Chennai',
      time: '9:00 AM',
      duration: '15 minutes',
      visitReason: 'Blood work and laboratory testing',
      diagnosis: 'All blood parameters within normal range',
      prescription: [],
      nextAppointment: null,
      vitals: {
        bloodPressure: 'Not measured',
        heartRate: 'Not measured',
        temperature: 'Not measured',
        weight: 'Not measured',
        height: 'Not measured'
      },
      labTests: ['Hemoglobin: 13.5 g/dL (Normal)', 'WBC Count: 7,200/μL (Normal)', 'Platelet Count: 250,000/μL (Normal)'],
      notes: 'All test results are within normal limits. No further action required.',
      patientInfo: {
        name: 'John Doe',
        age: 35,
        gender: 'Male',
        bloodGroup: 'O+',
        phone: '+91 9876543210',
        email: 'john.doe@email.com',
        address: '123 Anna Salai, Chennai, Tamil Nadu 600002'
      }
    },
    {
      id: 3,
      date: '2024-04-12',
      title: "Dr. Patel's Clinic",
      subtitle: 'Eye Exam',
      backgroundColor: '#FECACA',
      iconColor: '#DC2626',
      doctorName: 'Dr. Amit Patel',
      specialty: 'Ophthalmologist',
      location: 'Vision Care Center, Chennai',
      time: '2:15 PM',
      duration: '45 minutes',
      visitReason: 'Routine eye examination and vision test',
      diagnosis: 'Mild myopia in both eyes. Prescription updated.',
      prescription: [
        'New eyeglasses prescription: -1.25 D (both eyes)',
        'Eye drops for dry eyes - 2 drops twice daily'
      ],
      nextAppointment: '2025-04-12',
      vitals: {
        bloodPressure: 'Not measured',
        heartRate: 'Not measured',
        temperature: 'Not measured',
        weight: 'Not measured',
        height: 'Not measured'
      },
      labTests: ['Visual Acuity Test', 'Refraction Test', 'Eye Pressure Test'],
      notes: 'Patient should wear prescribed glasses regularly. Avoid prolonged screen time without breaks.',
      patientInfo: {
        name: 'John Doe',
        age: 35,
        gender: 'Male',
        bloodGroup: 'O+',
        phone: '+91 9876543210',
        email: 'john.doe@email.com',
        address: '123 Anna Salai, Chennai, Tamil Nadu 600002'
      }
    }
  ];

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleRecordPress = (record: any) => {
  navigation.navigate('PatientDetailsScreen', { record });
};


  const RecordItem = ({ record }: any) => (
    <TouchableOpacity
      style={styles.recordItem}
      activeOpacity={0.7}
      onPress={() => handleRecordPress(record)}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.firstChar}>{record.title.charAt(0)}</Text>
      </View>

      <View style={styles.recordContent}>
        <Text style={styles.dateText}>{formatDate(record.date)}</Text>
        <Text style={styles.titleText}>{record.title}</Text>
        <Text style={styles.subtitleText}>{record.subtitle}</Text>
      </View>

      <Icon name="chevron-right" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.recordsSection}>
          <View style={styles.recordsList}>
            {records.map((record) => (
              <RecordItem key={record.id} record={record} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  firstChar:{
    fontSize:20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 25,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    padding: 4,
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  recordsSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F97316',
  },
  recordsList: {
    gap: 16,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 16,
  },
  iconContainer: {
     width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e9eefc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recordContent: {
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default PatientRecordsScreen;
