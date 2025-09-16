// DoctorDashboard.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { JSX } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PatientQueueCard } from '../../components/patientQueueCard';
import { RootStackParamList } from '../../route/appNavigator';
import { docterDashboardstyles as styles } from '../../styles/doctordashboard';

const { height: screenHeight } = Dimensions.get('window');

type AppointmentStatus = 'pending' | 'approved' | 'rejected';

interface Appointment {
  id: number;
  name: string;
  time: string;
  age: number;
  gender: string;
  reason: string;
  status?: AppointmentStatus;
  rejectReason?: string;
}
type DoctorDashboard = NativeStackNavigationProp<RootStackParamList>;

export default function DoctorDashboard(): JSX.Element {
  const navigation = useNavigation<DoctorDashboard>();

  const patientQueue = [
    {
      id: 1,
      name: 'Sunita Devi',
      waitTime: '5 mins',
      age: 28,
      gender: 'Female',
    },
  ];

  const stats = [
    { value: '61', label: 'Total Attended\nAppointments', bg: '#ffe6e0' },
    { value: '7', label: 'Toadys\nPatients', bg: '#fff2cc' },
    { value: '4.9', label: 'Rating', bg: '#e6ffe6ff' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.doctorName}>Dr. Selvapraveen</Text>
        </View>

        <View style={styles.scontainer}>
          {stats.map((item, index) => (
            <View
              key={index}
              style={[styles.scard, { backgroundColor: item.bg }]}
            >
              <Text style={styles.svalue}>{item.value}</Text>
              <Text style={styles.slabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Patient Queue</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DoctorAppointments')}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {patientQueue.slice(0, 3).map(p => (
            <PatientQueueCard key={p.id} patient={p} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
