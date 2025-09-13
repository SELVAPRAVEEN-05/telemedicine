import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

export default function UserProfile() {
  const navigation = useNavigation();
  
  // Sample user data - you can replace this with actual user data from props or state
  const userData = {
    profileImage: "https://via.placeholder.com/120x120/4A90E2/FFFFFF?text=User",
    username: "john_doe",
    dateOfBirth: "1990-05-15",
    age: 34,
    location: "New York, USA"
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: userData.profileImage }} 
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editButton}>
          <Icon name="camera" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* User Information */}
      <View style={styles.infoContainer}>
        {/* Username */}
        <View style={styles.infoItem}>
          <View style={styles.infoHeader}>
            <Icon name="user" size={20} color="#4A90E2" />
            <Text style={styles.infoLabel}>Username</Text>
          </View>
          <Text style={styles.infoValue}>{userData.username}</Text>
        </View>

        {/* Date of Birth */}
        <View style={styles.infoItem}>
          <View style={styles.infoHeader}>
            <Icon name="calendar" size={20} color="#4A90E2" />
            <Text style={styles.infoLabel}>Date of Birth</Text>
          </View>
          <Text style={styles.infoValue}>{userData.dateOfBirth}</Text>
        </View>

        {/* Age */}
        <View style={styles.infoItem}>
          <View style={styles.infoHeader}>
            <Icon name="clock" size={20} color="#4A90E2" />
            <Text style={styles.infoLabel}>Age</Text>
          </View>
          <Text style={styles.infoValue}>{userData.age} years old</Text>
        </View>

        {/* Location */}
        <View style={styles.infoItem}>
          <View style={styles.infoHeader}>
            <Icon name="map-pin" size={20} color="#4A90E2" />
            <Text style={styles.infoLabel}>Location</Text>
          </View>
          <Text style={styles.infoValue}>{userData.location}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.editProfileButton}>
          <Icon name="edit-3" size={18} color="#fff" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings" size={18} color="#4A90E2" />
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa'
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop:20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginLeft: 16,
    color: '#333'
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginBottom: 20,
    position: 'relative'
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4A90E2'
  },
  editButton: {
    position: 'absolute',
    bottom: 25,
    right: '35%',
    backgroundColor: '#4A90E2',
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
    marginBottom: 20
  },
  infoItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 10
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    marginLeft: 30,
    fontWeight: '500'
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30
  },
  editProfileButton: {
    backgroundColor: '#FF6B35',
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
    borderColor: '#FF6B35'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  settingsButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  }
});