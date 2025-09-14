// DoctorDashboard.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { JSX, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppointmentCard } from '../../components/appointmentCard';
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
    { value: '6', label: 'Today\nAppointments', bg: '#ffe6e0' }, // light peach
    { value: '3', label: 'Pending\nRequests', bg: '#fff2cc' }, // light yellow
    { value: '4.9', label: 'Rating', bg: '#e6f7ff' }, // light blue
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>Dr</Text>
        </TouchableOpacity>
      </View>

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
            <Text style={styles.sectionTitle}>Today's Appointments</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DoctorAppointments')}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {appointments.slice(0, 2).map(a => (
            <AppointmentCard
              key={a.id}
              appointment={a}
              onpress={() => openModal(a?.id)}
            />
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

          {patientQueue.slice(0, 2).map(p => (
            <PatientQueueCard key={p.id} patient={p} />
          ))}
        </View>
      </ScrollView>

      {/* ---------------- Appointment Modal ---------------- */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalContent,
                  { transform: [{ translateY: slideAnim }] },
                ]}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Appointment Details</Text>
                  <TouchableOpacity onPress={closeModal}>
                    <MaterialIcons name="close" size={22} color="#666" />
                  </TouchableOpacity>
                </View>

                {selectedAppointment && (
                  <>
                    <View style={styles.modalPatientSection}>
                      <View style={styles.largeAvatar}>
                        <Text style={styles.largeAvatarText}>
                          {selectedAppointment.name.charAt(0)}
                        </Text>
                      </View>
                      <Text style={styles.modalPatientName}>
                        {selectedAppointment.name}
                      </Text>

                      <View style={styles.modalPatientDetails}>
                        <View style={styles.iconRow}>
                          <MaterialIcons name="schedule" size={18} />
                          <Text style={styles.modalDetailText}>
                            {selectedAppointment.time}
                          </Text>
                        </View>
                        <View style={styles.iconRow}>
                          <MaterialIcons name="person" size={18} />
                          <Text style={styles.modalDetailText}>
                            Age: {selectedAppointment.age},{' '}
                            {selectedAppointment.gender}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.reasonSection}>
                      <Text style={styles.reasonTitle}>
                        Reason for Appointment
                      </Text>
                      <View style={styles.reasonBox}>
                        <Text style={styles.reasonText}>
                          {selectedAppointment.reason}
                        </Text>
                        {selectedAppointment.status === 'rejected' &&
                        selectedAppointment.rejectReason ? (
                          <Text style={styles.rejectReasonText}>
                            Reject reason: {selectedAppointment.rejectReason}
                          </Text>
                        ) : null}
                      </View>
                    </View>

                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={[
                          styles.rejectButton,
                          selectedAppointment.status !== 'pending' &&
                            styles.buttonDisabled,
                        ]}
                        onPress={() => setRejectModalVisible(true)}
                        disabled={selectedAppointment.status !== 'pending'}
                      >
                        <Text style={styles.rejectButtonText}>Reject</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.approveButton,
                          selectedAppointment.status === 'approved' &&
                            styles.approvedButton,
                        ]}
                        onPress={handleApprove}
                        disabled={selectedAppointment.status === 'approved'}
                      >
                        <Text style={styles.approveButtonText}>
                          {selectedAppointment.status === 'approved'
                            ? 'Approved'
                            : 'Approve'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* ---------------- Reject Reason Modal (sibling) ---------------- */}
      <Modal
        transparent
        visible={rejectModalVisible}
        animationType="slide"
        onRequestClose={() => setRejectModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.rejectOverlay}
        >
          <View style={styles.rejectModal}>
            <Text style={styles.rejectTitle}>Reason for Rejection</Text>
            <TextInput
              value={rejectReason}
              onChangeText={setRejectReason}
              placeholder="Enter reason"
              style={styles.rejectInput}
              multiline
              numberOfLines={3}
            />

            <View style={styles.rejectActions}>
              <TouchableOpacity
                style={styles.rejectCancel}
                onPress={() => setRejectModalVisible(false)}
              >
                <Text style={styles.rejectCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.rejectConfirm,
                  !rejectReason.trim() && styles.buttonDisabled,
                ]}
                onPress={handleRejectConfirm}
                disabled={!rejectReason.trim()}
              >
                <Text style={styles.rejectConfirmText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
