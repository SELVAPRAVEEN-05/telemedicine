// PharmacyDashboard.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { pharmacyStyles as styles } from '../../styles/pharmacyStyles';
import MedicineScreen from './medicineScreen';

export default function PharmacyDashboard() {
  const pharmacyName = 'MediCare Pharmacy';
  const getProfileLetter = () => {
    return pharmacyName.charAt(0).toUpperCase();
  };

  return (
    <View style={styles.container}>
      {/* Header with Pharmacy Name and Profile */}
      <View style={styles.header}>
        <Text style={styles.pharmacyName}>{pharmacyName}</Text>
        <TouchableOpacity style={styles.profileCircle}>
          <Text style={styles.profileLetter}>{getProfileLetter()}</Text>
        </TouchableOpacity>
      </View>
      <MedicineScreen />
    </View>
  );
}
