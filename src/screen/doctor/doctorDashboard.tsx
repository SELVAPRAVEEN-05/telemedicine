import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Appointment {
  id: number;
  name: string;
  time: string;
  age: number;
  gender: string;
  reason: string;
}

interface Patient {
  id: number;
  name: string;
  waitTime: string;
  age: number;
  gender: string;
}

export default function DoctorDashboard() {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  const appointments: Appointment[] = [
    {
      id: 1,
      name: 'Priya Sharma',
      time: '10:00 AM',
      age: 32,
      gender: 'Female',
      reason:
        'Follow-up consultation for diabetes management and blood sugar monitoring',
    },
    {
      id: 2,
      name: 'Rajesh Verma',
      time: '11:30 AM',
      age: 45,
      gender: 'Male',
      reason: 'Chest pain evaluation and cardiovascular health assessment',
    },
  ];

  const patientQueue: Patient[] = [
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
  ];

  const openModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedAppointment(null);
    });
  };

  const handleApprove = () => {
    console.log(`Approved appointment for ${selectedAppointment?.name}`);
    closeModal();
  };

  const handleReject = () => {
    console.log(`Rejected appointment for ${selectedAppointment?.name}`);
    closeModal();
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <TouchableOpacity
      style={styles.appointmentCard}
      onPress={() => openModal(appointment)}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{appointment.name.charAt(0)}</Text>
        </View>
      </View>
      <View style={styles.appointmentInfo}>
        <Text style={styles.patientName}>{appointment.name}</Text>
        <Text style={styles.appointmentTime}>{appointment.time}</Text>
        <Text style={styles.patientDetails}>
          Age: {appointment.age}, {appointment.gender}
        </Text>
      </View>
      <TouchableOpacity style={styles.chatButton}>
        <MaterialIcons name="info" size={30} color="orange" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const PatientQueueCard = ({ patient }: { patient: Patient }) => (
    <View style={styles.queueCard}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{patient.name.charAt(0)}</Text>
        </View>
      </View>
      <View style={styles.queueInfo}>
        <Text style={styles.patientName}>{patient.name}</Text>
        <Text style={styles.waitTime}>Waiting for {patient.waitTime}</Text>
        <Text style={styles.patientDetails}>
          Age: {patient.age}, {patient.gender}
        </Text>
      </View>
      <TouchableOpacity style={styles.startCallButton}>
        <Text style={styles.startCallText}>Start Call</Text>
      </TouchableOpacity>
    </View>
  );

  const AppointmentModal = () => (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Appointment Details</Text>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              {selectedAppointment && (
                <>
                  <View style={styles.modalPatientSection}>
                    <View style={styles.largeAvatarContainer}>
                      <View style={styles.largeAvatar}>
                        <Text style={styles.largeAvatarText}>
                          {selectedAppointment.name.charAt(0)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.modalPatientName}>
                      {selectedAppointment.name}
                    </Text>
                    <View style={styles.modalPatientDetails}>
                      <Text style={styles.modalDetailText}>
                        📅 {selectedAppointment.time}
                      </Text>
                      <Text style={styles.modalDetailText}>
                        👤 Age: {selectedAppointment.age},{' '}
                        {selectedAppointment.gender}
                      </Text>
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
                    </View>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={handleReject}
                    >
                      <Text style={styles.rejectButtonText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.approveButton}
                      onPress={handleApprove}
                    >
                      <Text style={styles.approveButtonText}>Approve</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <TouchableOpacity style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>Dr</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.doctorName}>Dr. Selvapraveen</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {appointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Patient Queue</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {patientQueue.map(patient => (
            <PatientQueueCard key={patient.id} patient={patient} />
          ))}
        </View>
      </ScrollView>

      <AppointmentModal />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
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
  welcomeSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#F97316',
    fontWeight: '500',
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  queueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  appointmentInfo: {
    flex: 1,
  },
  queueInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  waitTime: {
    fontSize: 14,
    color: '#FF9500',
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 12,
    color: '#666',
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff2dfff',
    borderWidth: 1,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startCallButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  startCallText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    maxHeight: screenHeight * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  modalPatientSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  largeAvatarContainer: {
    marginBottom: 16,
  },
  largeAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeAvatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
  },
  modalPatientName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  modalPatientDetails: {
    alignItems: 'center',
  },
  modalDetailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
  },
  reasonSection: {
    marginVertical: 20,
  },
  reasonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  reasonBox: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F97316',
  },
  reasonText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#dc3545',
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3545',
  },
  approveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#28a745',
    alignItems: 'center',
  },
  approveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
