// DoctorDashboard.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { JSX, useRef, useState } from 'react';
import {
  Animated,
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

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      name: 'Priya Sharma',
      time: '10:00 AM',
      age: 32,
      gender: 'Female',
      reason:
        'Follow-up consultation for diabetes management and blood sugar monitoring',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Rajesh Verma',
      time: '11:30 AM',
      age: 45,
      gender: 'Male',
      reason: 'Chest pain evaluation and cardiovascular health assessment',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Anita Singh',
      time: '12:30 PM',
      age: 29,
      gender: 'Female',
      reason: 'Routine health check-up',
      status: 'pending',
    },
    {
      id: 4,
      name: 'Rohit Mehta',
      time: '2:00 PM',
      age: 38,
      gender: 'Male',
      reason: 'Back pain and physiotherapy consultation',
      status: 'pending',
    },
  ]);

  const patientQueue = [
    {
      id: 1,
      name: 'Sunita Devi',
      waitTime: '5 mins',
      age: 28,
      gender: 'Female',
    },
    { id: 2, name: 'Anil Kumar', waitTime: '2 mins', age: 50, gender: 'Male' },
    {
      id: 3,
      name: 'Kavita Joshi',
      waitTime: '8 mins',
      age: 34,
      gender: 'Female',
    },
    { id: 4, name: 'Ravi Sharma', waitTime: '3 mins', age: 41, gender: 'Male' },
  ];

  const stats = [
    { value: '6', label: 'Total Attended\nAppointments', bg: '#ffe6e0' },
    { value: '3', label: 'Waiting\nPatients', bg: '#fff2cc' },
    { value: '4.9', label: 'Rating', bg: '#e6ffe6ff' },
  ];

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  // Separate reject modal (sibling) to avoid nested-modals issues
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Open modal for a given appointment id
  const openModal = (appointmentId: number) => {
    const appt = appointments.find(a => a.id === appointmentId) || null;
    setSelectedAppointment(appt);
    setRejectReason('');
    setModalVisible(true);
    // Ensure slide starts from bottom
    slideAnim.setValue(screenHeight);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 260,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 260,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedAppointment(null);
      setRejectReason('');
    });
  };

  // Mark approved (stateful)
  const handleApprove = () => {
    if (!selectedAppointment) return;
    setAppointments(prev =>
      prev.map(a =>
        a.id === selectedAppointment.id
          ? { ...a, status: 'approved', rejectReason: undefined }
          : a,
      ),
    );
    // Update selectedAppointment locally so modal shows Approved immediately
    setSelectedAppointment(prev =>
      prev ? { ...prev, status: 'approved' } : prev,
    );
  };

  // When the user confirms reject reason
  const handleRejectConfirm = () => {
    if (!selectedAppointment) return;
    setAppointments(prev =>
      prev.map(a =>
        a.id === selectedAppointment.id
          ? {
              ...a,
              status: 'rejected',
              rejectReason: rejectReason || 'No reason provided',
            }
          : a,
      ),
    );
    setRejectModalVisible(false);
    // close appointment modal - user asked "ask reason and ok" (then OK should finalize)
    closeModal();
  };

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
