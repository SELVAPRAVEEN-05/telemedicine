import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../../route/appNavigator';
import { DoctorProfileStyles as styles } from '../../styles/docterProfileStyles';

type DoctorProfileProps = NativeStackNavigationProp<RootStackParamList>;

// Mock doctor data - replace with actual data from your backend
const doctorData = {
  name: 'Dr. Sarah Johnson',
  username: 'dr_sarah_j',
  phone: '+91 9876543210',
  profileImage: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg',
  age: 35,
  dob: '1988-05-15',
  doctor_id: 'DOC001',
  gender: 'Female',
  address: '123 Medical Center, Chennai, Tamil Nadu',
  hospitalName: 'Apollo Hospitals',
  details: {
    specialization: 'Cardiology',
    degrees: ['MBBS', 'MD', 'DM Cardiology'],
    experience: '10 Years',
    languages: ['English', 'Tamil', 'Hindi'],
  },
  rating: 4.8,
  callsAttended: 245,
  totalCallDuration: 1850, // in minutes
  creditsPerMinute: 45,
  role: 'doctor',
  isApproved: true,
  approved_by: 'Dr. Admin',
  joined_date: '2020-03-15',
  status: 'Available', // Available, Busy, Offline
};

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(doctorData);
  const navigation = useNavigation<DoctorProfileProps>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return '#4CAF50';
      case 'Busy':
        return '#FF9800';
      case 'Offline':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const changeStatus = () => {
    const statuses = ['Available', 'Busy', 'Offline'];
    const currentIndex = statuses.indexOf(doctor.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    setDoctor(prev => ({ ...prev, status: nextStatus }));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          ★
        </Text>,
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Text key="half" style={styles.star}>
          ☆
        </Text>,
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: doctor.profileImage }}
              style={styles.profileImage}
            />
            <View style={styles.headerInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.specialization}>
                {doctor.details.specialization}
              </Text>
              <Text style={styles.doctorId}>ID: {doctor.doctor_id}</Text>

              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(doctor.status) },
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(doctor.status) },
                  ]}
                >
                  {doctor.status}
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <View style={styles.ratingContainer}>
                {renderStars(doctor.rating)}
                <Text style={styles.ratingText}>{doctor.rating}</Text>
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{doctor.callsAttended}</Text>
              <Text style={styles.statLabel}>Calls</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {formatDuration(doctor.totalCallDuration)}
              </Text>
              <Text style={styles.statLabel}>Total Time</Text>
            </View>
          </View>

          {/* Status Change Button */}
          <TouchableOpacity style={styles.statusButton} onPress={changeStatus}>
            <Text style={styles.statusButtonText}>Change Status</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 Personal Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name:</Text>
            <Text style={styles.infoValue}>{doctor.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Username:</Text>
            <Text style={styles.infoValue}>{doctor.username}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age:</Text>
            <Text style={styles.infoValue}>{doctor.age} years</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date of Birth:</Text>
            <Text style={styles.infoValue}>{formatDate(doctor.dob)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender:</Text>
            <Text style={styles.infoValue}>{doctor.gender}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{doctor.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>{doctor.address}</Text>
          </View>
        </View>

        {/* Professional Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🩺 Professional Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hospital:</Text>
            <Text style={styles.infoValue}>{doctor.hospitalName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Specialization:</Text>
            <Text style={styles.infoValue}>
              {doctor.details.specialization}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Degrees:</Text>
            <View style={styles.degreeContainer}>
              {doctor.details.degrees.map((degree, index) => (
                <View key={index} style={styles.degreeTag}>
                  <Text style={styles.degreeText}>{degree}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Experience:</Text>
            <Text style={styles.infoValue}>{doctor.details.experience}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Languages:</Text>
            <View style={styles.languageContainer}>
              {doctor.details.languages.map((language, index) => (
                <View key={index} style={styles.languageTag}>
                  <Text style={styles.languageText}>{language}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Credits/Min:</Text>
            <Text style={styles.creditsValue}>
              {doctor.creditsPerMinute} credits
            </Text>
          </View>
        </View>

        {/* Account Status */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✅ Account Status</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Approval Status:</Text>
            <View style={styles.approvalContainer}>
              <View
                style={[
                  styles.approvalDot,
                  {
                    backgroundColor: doctor.isApproved ? '#4CAF50' : '#F44336',
                  },
                ]}
              />
              <Text
                style={[
                  styles.approvalText,
                  {
                    color: doctor.isApproved ? '#4CAF50' : '#F44336',
                  },
                ]}
              >
                {doctor.isApproved ? 'Approved' : 'Pending Approval'}
              </Text>
            </View>
          </View>

          {doctor.isApproved && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Approved By:</Text>
              <Text style={styles.infoValue}>{doctor.approved_by}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Joined:</Text>
            <Text style={styles.infoValue}>
              {formatDate(doctor.joined_date)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role:</Text>
            <Text style={styles.roleText}>{doctor.role.toUpperCase()}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}> Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              Alert.alert('Logout', 'Are you sure you want to logout?', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Logout',
                  style: 'destructive',
                  onPress: () => {
                    // Handle logout
                    navigation.navigate('Login');
                  },
                },
              ]);
            }}
          >
            <Text style={styles.logoutButtonText}> Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
