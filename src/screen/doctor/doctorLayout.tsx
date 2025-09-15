import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoctorAppointments from './doctorAppointments';
import DoctorDashboard from './doctorDashboard';

const Placeholder = ({ name }: { name: any }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Icon name="info" size={40} color="#999" />
  </View>
);

const BottomTabBar = () => {
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
});

export default BottomTabBar;
