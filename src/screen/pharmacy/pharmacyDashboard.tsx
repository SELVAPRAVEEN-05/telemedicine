import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { pharmacyStyles as styles } from '../../styles/pharmacyStyles';
import MedicineScreen from './medicineScreen';
import PatientScreen from './patientScreen';

export default function PharmacyDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const pharmacyName = 'MediCare Pharmacy';

  const tabs = [
    { name: 'Medicine', component: MedicineScreen, icon: 'medication' },
    { name: 'Patients', component: PatientScreen, icon: 'people' },
  ];

  const renderActiveScreen = () => {
    const ActiveComponent = tabs[activeTab].component;
    return <ActiveComponent />;
  };

  const getProfileLetter = () => {
    return pharmacyName.charAt(0).toUpperCase();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header with Pharmacy Name and Profile */}
      <View style={styles.header}>
        <Text style={styles.pharmacyName}>{pharmacyName}</Text>
        <TouchableOpacity style={styles.profileCircle}>
          <Text style={styles.profileLetter}>{getProfileLetter()}</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation - Moved to Top */}
      <View style={styles.topTabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.topTabItem,
              activeTab === index && styles.activeTopTabItem,
            ]}
            onPress={() => setActiveTab(index)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <Icon
                name={tab.icon}
                size={20}
                color={activeTab === index ? '#FFFFFF' : '#8E8E93'}
                style={[
                  styles.tabIcon,
                  activeTab === index && styles.activeTabIcon,
                ]}
              />
              <Text
                style={[
                  styles.topTabLabel,
                  activeTab === index && styles.activeTopTabLabel,
                ]}
              >
                {tab.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Screen Content */}
      <View style={styles.screenContent}>{renderActiveScreen()}</View>
    </View>
  );
}
