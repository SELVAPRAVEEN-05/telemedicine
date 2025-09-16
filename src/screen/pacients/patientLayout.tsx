import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../route/appNavigator';
import HealthRecords from './healthRecords';
import PatientAImodal from './patientAImodal';
import ViewMedicines from './viewMedicines';
import ConsultDoctor from './consultDoctor';

type PatientLayout = NativeStackNavigationProp<RootStackParamList>;

export default function PatienrtLayout() {
  const navigation = useNavigation<PatientLayout>();
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: 'home' },
    { name: 'Find Your Expert', icon: 'event' },
    { name: 'Pharmacy', icon: 'local-pharmacy' },
    { name: 'Records', icon: 'folder' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <PatientAImodal />;
      case 'Find Your Expert':
        return <ConsultDoctor />;
      case 'Pharmacy':
        return <ViewMedicines />;
      case 'Records':
        return <HealthRecords />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{activeTab}</Text>
        <TouchableOpacity
          style={styles.profileAvatar}
          onPress={() => navigation.navigate('PatientProfile')}
        >
          <Text style={styles.profileAvatarText}>P</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={{ flex: 1 }}>{renderScreen()}</View>

      {/* Bottom Tabs */}
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
}

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
  screenText: { fontSize: 18, textAlign: 'center', marginTop: 20 },
});
