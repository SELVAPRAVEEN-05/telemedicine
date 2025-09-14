import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { docterDashboardstyles as styles } from '../styles/doctordashboard';

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

export const AppointmentCard = ({
  appointment,
  onpress,
}: {
  appointment: Appointment;
  onpress: any;
}) => {
  return (
    <TouchableOpacity
      style={styles.appointmentCard}
      activeOpacity={0.85}
      onPress={onpress}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{appointment.name.charAt(0)}</Text>
      </View>

      <View style={styles.appointmentInfo}>
        <Text style={styles.patientName}>{appointment.name}</Text>
        <Text style={styles.appointmentTime}>{appointment.time}</Text>
        <Text style={styles.patientDetails}>
          Age: {appointment.age}, {appointment.gender}
        </Text>
      </View>

      <View style={styles.cardRight}>
        {appointment.status === 'approved' ? (
          <View style={styles.statusBadgeApproved}>
            <MaterialIcons name="check-circle" size={16} />
            <Text style={styles.statusBadgeText}>Approved</Text>
          </View>
        ) : appointment.status === 'rejected' ? (
          <View style={styles.statusBadgeRejected}>
            <MaterialIcons name="block" size={16} />
            <Text style={styles.statusBadgeText}>Rejected</Text>
          </View>
        ) : (
          <MaterialIcons name="info-outline" size={26} color="orange" />
        )}
      </View>
    </TouchableOpacity>
  );
};
