import React from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { docterDashboardstyles as styles} from '../styles/doctordashboard';

interface Patient {
  id: number;
  name: string;
  waitTime: string;
  age: number;
  gender: string;
}

export const PatientQueueCard = ({ patient }: { patient: Patient }) => (
    <TouchableOpacity style={styles.queueCard} activeOpacity={0.85}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{patient.name.charAt(0)}</Text>
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
    </TouchableOpacity>
  );