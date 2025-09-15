import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../route/appNavigator';
import axios from 'axios';
type DashboardNav = NativeStackNavigationProp<RootStackParamList>;
export default function UserProfile() {
  const navigation = useNavigation<DashboardNav>();

  // Sample user data - you can replace this with actual user data from props or state
  const userData = {
    username: 'Sohn_doe',
    mobileNo: '+1 234 567 890',
    email: 'sohn_doe@example.com',
    dateOfBirth: '1990-05-15',
    age: 34,
    location: 'New York, USA',
  };

  const firstLetter = userData.username.charAt(0).toUpperCase();

  const handleEdit = () => {};

  const handleLogout = async () => {
    try {
      await Keychain.resetGenericPassword();
      Alert.alert('Logged out', 'Your token has been removed');
      navigation.navigate('PatientDashboard'); // 👈 redirect to Login screen
    } catch (err) {
      console.error('❌ Error clearing token:', err);
    }
  };

  const [ResponseData, setResponseData] = useState<any>(null);

  const profileAPI = async (): Promise<any> => {
    try {
      const token = await Keychain.getGenericPassword().then(
        creds => creds?.password || null,
      );
      const response = await axios.get(
        'https://telemedicine-server-o5tc.onrender.com/patient/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token
          },
        },
      );

      setResponseData(response.data);
      console.log('Profile response:', response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('API Error:', error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error('Network Error:', error.request);
        throw 'Network error. Please check your connection.';
      } else {
        console.error('Unexpected Error:', error.message);
        throw error.message;
      }
    }
  };

  useEffect(() => {
    profileAPI();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* Left section: Back arrow + Title */}
          <View style={styles.leftSection}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Icon name="arrow-left" size={22} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.title}>Profile</Text>
          </View>
        </View>
      </View>

      {/* Profile Image */}
      <View style={styles.profileSection}>
        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: '#F97316',
            borderRadius: 60,
            borderWidth: 3,
            borderColor: '#F97316',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 48, color: '#fff' }}>{firstLetter}</Text>
        </View>
      </View>

      {/* User Information */}

      {
        res
      }
      <View style={styles.infoContainer}>
        {/* Username */}
        <View style={styles.infoItem}>
          <View style={styles.infoHeader}>
            <Icon name="user" size={20} color="#F97316" />
            <Text style={styles.infoLabel}>Username</Text>
          </View>
          <Text style={styles.infoValue}>{ResponseData?.fullName ?? null}</Text>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.infoHeader}>
            <Icon name="phone" size={20} color="#F97316" />
            <Text style={styles.infoLabel}>Mobile No</Text>
          </View>
          <Text style={styles.infoValue}>{ResponseData?.phone ?? null}</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.infoHeader}>
            <Icon name="mail" size={20} color="#F97316" />
            <Text style={styles.infoLabel}>Mobile No</Text>
          </View>
          <Text style={styles.infoValue}>{ResponseData?.email}</Text>
        </View>
        {/* Date of Birth */}
        <View style={styles.infoItem}>
          <View style={styles.infoHeader}>
            <Icon name="calendar" size={20} color="#F97316" />
            <Text style={styles.infoLabel}>Date of Birth</Text>
          </View>
          <Text style={styles.infoValue}>
            {ResponseData?.dob
              ? new Date(ResponseData.dob).toLocaleDateString()
              : null}
          </Text>
        </View>

        {/* Age */}
        <View style={styles.infoItem}>
          <View style={styles.infoHeader}>
            <Icon name="clock" size={20} color="#F97316" />
            <Text style={styles.infoLabel}>Age</Text>
          </View>
          <Text style={styles.infoValue}>{userData.age} years old</Text>
        </View>

        {/* Location */}
        <View style={styles.infoItem}>
          <View style={styles.infoHeader}>
            <Icon name="map-pin" size={20} color="#F97316" />
            <Text style={styles.infoLabel}>Location</Text>
          </View>
          <Text style={styles.infoValue}>{userData.location}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.settingsButton} onPress={handleLogout}>
          <Icon name="log-out" size={18} color="#F97316" />
          <Text style={styles.settingsButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    marginRight: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  rightButton: {
    backgroundColor: '#FFF0F0',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF0F0',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 17,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#F97316',
  },
  editButton: {
    position: 'absolute',
    bottom: 25,
    right: '35%',
    backgroundColor: '#F97316',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 20,
  },
  infoItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    marginLeft: 30,
    fontWeight: '500',
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  editProfileButton: {
    backgroundColor: '#F97316',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingsButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F97316',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  settingsButtonText: {
    color: '#F97316',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  initialCircle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
});
