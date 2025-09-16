import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Appointment {
  id: number;
  name: string;
  time: string;
  age: number;
  gender: string;
  reason: string;
}

const initialAppointments: Appointment[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    time: '10:00 AM',
    age: 32,
    gender: 'Female',
    reason:
      'Follow-up consultation for diabetes management and blood sugar monitoring',
  },
];

const AppointmentsQueueScreen: React.FC = () => {
  const [appointments] = useState<Appointment[]>(initialAppointments);

  const handleAttendCall = (name: string) => {
    Alert.alert('Attend Call', `Connecting to ${name}'s appointment...`);
  };

  const AppointmentCard: React.FC<{ appointment: Appointment }> = ({
    appointment,
  }) => (
    <View style={styles.appointmentCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.patientInfo}>
          {/* Avatar with First Letter */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {appointment.name.charAt(0).toUpperCase()}
            </Text>
          </View>

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

      {/* Reason */}
      <View style={styles.reasonContainer}>
        <Text style={styles.reasonLabel}>Reason for Visit:</Text>
        <Text style={styles.reasonText}>{appointment.reason}</Text>
      </View>

      {/* Attend Call Button */}
      <TouchableOpacity
        style={styles.callButton}
        onPress={() => handleAttendCall(appointment.name)}
      >
        <Icon name="call" size={16} color="#FFFFFF" />
        <Text style={styles.callButtonText}>Attend Call</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {appointments.map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </ScrollView>
    </View>
  );
};

export default AppointmentsQueueScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  appointmentCard: {
    backgroundColor: '#fffcfbff',
    borderWidth: 1,
    borderColor: '#e4e4e4ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
  patientInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e9eefc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontWeight: '700', color: '#333', fontSize: 18 },
  patientDetails: { marginLeft: 12, flex: 1 },
  patientName: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  patientMeta: { fontSize: 14, color: '#6B7280' },
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
  reasonContainer: { marginBottom: 16 },
  reasonLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  reasonText: { fontSize: 14, color: '#374151', lineHeight: 20 },

  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    gap: 6,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});
