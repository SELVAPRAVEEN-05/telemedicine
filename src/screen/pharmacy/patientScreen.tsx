import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { pharmacyStyles as styles } from '../../styles/pharmacyStyles';

interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  address: string;
  lastVisit: string;
  prescriptionCount: number;
}

const SAMPLE_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 45,
    phone: '+1234567890',
    address: '123 Main Street',
    lastVisit: '2024-09-10',
    prescriptionCount: 3,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    age: 32,
    phone: '+1234567891',
    address: '456 Oak Avenue',
    lastVisit: '2024-09-12',
    prescriptionCount: 2,
  },
  {
    id: '3',
    name: 'Mike Davis',
    age: 58,
    phone: '+1234567892',
    address: '789 Pine Street',
    lastVisit: '2024-09-08',
    prescriptionCount: 1,
  },
  {
    id: '4',
    name: 'Emily Wilson',
    age: 28,
    phone: '+1234567893',
    address: '321 Elm Drive',
    lastVisit: '2024-09-13',
    prescriptionCount: 4,
  },
];

export default function PatientScreen() {
  const [patients, setPatients] = useState<Patient[]>(SAMPLE_PATIENTS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(
    patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery),
  );

  const handlePatientPress = (patient: Patient) => {
    Alert.alert(
      'Patient Details',
      `Name: ${patient.name}\nAge: ${patient.age}\nPhone: ${patient.phone}\nAddress: ${patient.address}\nLast Reserved: ${patient.lastVisit}\nPrescriptions: ${patient.prescriptionCount}`,
      [{ text: 'Cancel', style: 'cancel' }],
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Patient Records</Text>

      {/* Search Bar */}
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            fontSize: 16,
          }}
          placeholder="Search patients by name or phone..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.content}>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text style={styles.contentText}>
            👥 Patient List ({filteredPatients.length})
          </Text>
        </View> */}

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredPatients.length > 0 ? (
            filteredPatients.map(patient => (
              <TouchableOpacity
                key={patient.id}
                style={styles.patientItem}
                onPress={() => handlePatientPress(patient)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: '#E3F2FD',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#1976D2',
                      }}
                    >
                      {getInitials(patient.name)}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.patientName}>{patient.name}</Text>
                    <Text style={styles.patientDetails}>
                      Age: {patient.age} | {patient.phone}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#999', marginTop: 2 }}>
                      Last visit: {patient.lastVisit} •{' '}
                      {patient.prescriptionCount} prescriptions
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No patients found matching "{searchQuery}"
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
