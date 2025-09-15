// DoctorAppointments.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppointmentsQueueScreen from './appointmentDetails';
import PatientQueueScreen from './patientAppointment';

export default function DoctorAppointments() {
  const [activeTab, setActiveTab] = useState<'appointments' | 'meetings'>(
    'appointments',
  );

  return (
    <View style={styles.container}>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'appointments' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('appointments')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'appointments' && styles.activeTabText,
            ]}
          >
            Appointments
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'meetings' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('meetings')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'meetings' && styles.activeTabText,
            ]}
          >
            Meetings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {activeTab === 'appointments' ? (
          // <Text>📋 All Appointments will be listed here.</Text>
          <AppointmentsQueueScreen />
        ) : (
          // <Text>📅 All Meetings will be listed here.</Text>
          <PatientQueueScreen />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
    marginBottom: 20,
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
  tabContainer: {
    margin: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#F97316',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#F97316',
  },
  tabText: {
    fontSize: 16,
    color: '#F97316',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
});
