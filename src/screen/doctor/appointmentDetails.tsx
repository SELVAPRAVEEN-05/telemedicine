import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Status = 'pending' | 'approved' | 'rejected';

interface Appointment {
  id: number;
  name: string;
  time: string;
  age: number;
  gender: string;
  reason: string;
  status: Status;
  image?: string;
  rejectReason?: string;
}

const initialAppointments: Appointment[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    time: '10:00 AM',
    age: 32,
    gender: 'Female',
    reason: 'Follow-up consultation for diabetes management and blood sugar monitoring',
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
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Anita Singh',
    time: '12:30 PM',
    age: 29,
    gender: 'Female',
    reason: 'Routine health check-up',
    status: 'pending',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Rohit Mehta',
    time: '2:00 PM',
    age: 38,
    gender: 'Male',
    reason: 'Back pain and physiotherapy consultation',
    status: 'pending',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
];

const AppointmentsQueueScreen: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(
    initialAppointments,
  );

  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'approved':
        return '#10B981';
      case 'rejected':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const handleAppointmentPress = (appointment: Appointment) => {
    // navigate or show details
    console.log('Appointment selected:', appointment);
  };
const handleApprove = (appointmentId: number) => {
  Alert.alert(
    "Confirm Approval",
    "Do you want to approve this appointment?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Approval cancelled"),
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          setAppointments(prev =>
            prev.map(apt =>
              apt.id === appointmentId
                ? { ...apt, status: "approved", rejectReason: undefined }
                : apt
            )
          );
        },
      },
    ],
    { cancelable: true }
  );
};


  // Open the reject modal and attach the selected appointment
  const handleReject = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setRejectReason(''); // clear previous reason
    setRejectModalVisible(true);
  };

  const handleRejectConfirm = () => {
    if (!selectedAppointment) return;

    setAppointments(prev =>
      prev.map(a =>
        a.id === selectedAppointment.id
          ? { ...a, status: 'rejected', rejectReason: rejectReason || 'No reason provided' }
          : a,
      ),
    );

    setRejectModalVisible(false);
    setSelectedAppointment(null);
    setRejectReason('');

    Alert.alert('Appointment rejected');
  };

  const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
    <TouchableOpacity
      style={styles.appointmentCard}
      activeOpacity={0.8}
      onPress={() => handleAppointmentPress(appointment)}>
      <View style={styles.cardHeader}>
        <View style={styles.patientInfo}>
          {appointment.image ? (
            <Image source={{ uri: appointment.image }} style={styles.patientImage} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {appointment.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{appointment.name}</Text>
            <Text style={styles.patientMeta}>
              {appointment.age} years • {appointment.gender}
            </Text>
          </View>
        </View>

        <View style={styles.appointmentTime}>
          <Icon name="schedule" size={16} color="#6B7280" />
          <Text style={styles.timeText}>{appointment.time}</Text>
        </View>
      </View>

      <View style={styles.reasonContainer}>
        <Text style={styles.reasonLabel}>Reason for Visit:</Text>
        <Text style={styles.reasonText}>{appointment.reason}</Text>
        {appointment.status === 'rejected' && appointment.rejectReason ? (
          <Text style={styles.rejectReasonText}>Rejection reason: {appointment.rejectReason}</Text>
        ) : null}
      </View>

      <View style={styles.cardFooter}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(appointment.status) + '20' },
          ]}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(appointment.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Text>
        </View>

        {appointment.status === 'pending' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => handleReject(appointment)}>
              <Icon name="close" size={16} color="#FFFFFF" />
              <Text style={styles.rejectButtonText}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.approveButton}
              onPress={() => handleApprove(appointment.id)}>
              <Icon name="check" size={16} color="#FFFFFF" />
              <Text style={styles.approveButtonText}>Approve</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cardsContainer}>
        {appointments.map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </ScrollView>

      <Modal
        transparent
        visible={rejectModalVisible}
        animationType="slide"
        onRequestClose={() => setRejectModalVisible(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.rejectOverlay}>
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
                onPress={() => {
                  setRejectModalVisible(false);
                  setSelectedAppointment(null);
                  setRejectReason('');
                }}>
                <Text style={styles.rejectCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.rejectConfirm, !rejectReason.trim() && styles.buttonDisabled]}
                onPress={handleRejectConfirm}
                disabled={!rejectReason.trim()}>
                <Text style={styles.rejectConfirmText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default AppointmentsQueueScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonDisabled: { opacity: 0.5 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  countBadge: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardsContainer: {
    gap: 12,
  },
  // Appointment Card Styles
  appointmentCard: {
    backgroundColor: '#fffcfbff',
    borderWidth: 1,
    borderColor: '#e4e4e4ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  patientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#F3F4F6',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e9eefc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { fontWeight: '700', color: '#333' },
  patientDetails: {
    marginLeft: 12,
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  patientMeta: {
    fontSize: 14,
    color: '#6B7280',
  },
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 4,
  },
  reasonContainer: {
    marginBottom: 16,
  },
  reasonLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  approveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  approveButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  rejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  rejectButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionButton: {
    padding: 4,
  },
  // Queue Card Styles
  queueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  queuePatientDetails: {
    marginLeft: 12,
  },
  queuePatientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  queuePatientMeta: {
    fontSize: 14,
    color: '#6B7280',
  },
  waitTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  waitTimeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F59E0B',
    marginLeft: 4,
  },
  queueActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    flex: 1,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
    marginLeft: 6,
  },
  bottomPadding: {
    height: 32,
  },
  rejectOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  rejectModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
  },
  rejectTitle: { fontWeight: '700', marginBottom: 8 },
  rejectInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  rejectActions: { flexDirection: 'row', justifyContent: 'flex-end' },
  rejectCancel: { paddingVertical: 8, paddingHorizontal: 12, marginRight: 8 },
  rejectCancelText: { color: '#333' },
  rejectConfirm: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectConfirmText: { color: '#fff', fontWeight: '700' },
  rejectReasonText: { color: '#EF4444', marginTop: 6, fontStyle: 'italic' },

});