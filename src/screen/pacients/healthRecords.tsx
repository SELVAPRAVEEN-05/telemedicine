import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../route/appNavigator';
import { HealthRecordStyles as styles } from '../../styles/healthRecordcss';

type RecordsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

// Updated records with patientId
const records = [
  {
    id: '1',
    patientId: 'P1', // Added patientId
    date: '2024-03-15',
    title: "Dr. Sharma's Clinic",
    description: 'General Checkup',
    icon: 'document-text-outline',
    bgColor: '#2D9CDB',
    details: 'Patient had a routine general health checkup.',
    img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
  },
  {
    id: '2',
    patientId: 'P1', // Added patientId - John Doe's second record
    date: '2024-05-10',
    title: 'City Hospital',
    description: 'Cardiology Consultation',
    icon: 'receipt-outline',
    bgColor: '#F2994A',
    details: 'Patient advised to monitor blood pressure daily.',
    img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
  },
  {
    id: '3',
    patientId: 'P2', // Added patientId - Jane Smith's record
    date: '2024-08-20',
    title: 'Sunrise Clinic',
    description: 'Routine Checkup',
    icon: 'medkit-outline',
    bgColor: '#EB5757',
    details: 'Maintains a healthy lifestyle.',
    img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
  },
];

export default function HealthRecords() {
  const navigation = useNavigation<RecordsScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {records.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate('PatientRecordDetails', { record: item })
            }
          >
            <Image
              source={{ uri: item.img }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                marginRight: 15,
              }}
            />

            <View style={styles.textContainer}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}