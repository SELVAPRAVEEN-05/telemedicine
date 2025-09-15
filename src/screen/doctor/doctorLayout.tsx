import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../route/appNavigator';
import DoctorAppointments from './doctorAppointments';
import DoctorDashboard from './doctorDashboard';

const Placeholder = ({ name }: { name: any }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Icon name="info" size={40} color="#999" />
  </View>
);
type DocterLayout = NativeStackNavigationProp<RootStackParamList>;

const BottomTabBar = () => {
  const navigation = useNavigation<DocterLayout>();

  const [activeTab, setActiveTab] = useState('Dashboard');

  const tabs = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Appointments', icon: 'event' },
    { name: 'Available Slots', icon: 'schedule' },
    { name: 'Patients', icon: 'people' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DoctorDashboard />;
      case 'Appointments':
        return <Placeholder name="Patients" />;
      case 'Available Slots':
        return <DoctorAppointments />;
      case 'Patients':
        return <Placeholder name="Patients" />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Render the selected screen */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{activeTab}</Text>
        <TouchableOpacity
          style={styles.profileAvatar}
          onPress={() => {
            navigation.navigate('DoctorProfile');
          }}
        >
          <Text style={styles.profileAvatarText}>Dr</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>{renderScreen()}</View>

      {/* Bottom Tab Bar */}
      <View style={styles.container}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => setActiveTab(tab.name)}
              activeOpacity={0.7}
            >
              <Icon
                name={tab.icon}
                size={28}
                color={isActive ? '#fff' : '#000'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    margin: 4,
  },
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
});

export default BottomTabBar;
