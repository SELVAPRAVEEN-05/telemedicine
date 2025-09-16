import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface PastMeeting {
  id: number;
  name: string;
  date: string;
  time: string;
  duration: string;
}

const initialPastMeetings: PastMeeting[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    date: '12 Sep 2025',
    time: '10:00 AM',
    duration: '25 mins',
  },
  {
    id: 2,
    name: 'Rajesh Verma',
    date: '14 Sep 2025',
    time: '11:30 AM',
    duration: '40 mins',
  },
  {
    id: 3,
    name: 'Anita Singh',
    date: '15 Sep 2025',
    time: '2:00 PM',
    duration: '30 mins',
  },
];

const PatientQueueScreen: React.FC = () => {
  const [meetings] = useState<PastMeeting[]>(initialPastMeetings);

  const handleViewDetails = (meeting: PastMeeting) => {
    Alert.alert(
      'Meeting Details',
      `${meeting.name}\nDate: ${meeting.date}\nTime: ${meeting.time}\nDuration: ${meeting.duration}`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        {meetings.map(meeting => (
          <View key={meeting.id} style={styles.meetingCard}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              {/* Avatar with First Letter */}
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {meeting.name.charAt(0).toUpperCase()}
                </Text>
              </View>

              {/* Patient Details */}
              <View style={styles.patientDetails}>
                <Text style={styles.patientName}>{meeting.name}</Text>
                <Text style={styles.patientMeta}>
                  {meeting.date} • {meeting.time}
                </Text>
                <Text style={styles.durationText}>
                  Duration: {meeting.duration}
                </Text>
              </View>
            </View>

            {/* View Details Button */}
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => handleViewDetails(meeting)}
            >
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientQueueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    gap: 12,
  },
  meetingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E9EEFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: '700',
    color: '#333',
    fontSize: 18,
  },
  patientDetails: {
    marginLeft: 12,
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  patientMeta: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  durationText: {
    fontSize: 13,
    color: '#374151',
  },
  viewButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
