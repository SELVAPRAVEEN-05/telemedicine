import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

export default function PatientDashboard() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleProfilePress = () => {
    Alert.alert('Profile Clicked', 'You can navigate to Profile Screen here.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Profile */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Sanjeevani</Text>
          <Text style={styles.subtitle}>Your Health, Our Priority</Text>
        </View>

        {/* Profile Icon */}
        <TouchableOpacity
          style={styles.profileCircle}
          onPress={handleProfilePress}
        >
          <Text style={styles.profileLetter}>P</Text>
        </TouchableOpacity>
      </View>

      {/* Language Selector */}
      <Text style={styles.langLabel}>Select Language</Text>
      <View style={styles.languageRow}>
        {['हिंदी', 'ગુજરાતી', 'தமிழ்', 'English'].map((lang, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.langButton,
              selectedLanguage === lang && styles.langButtonSelected,
            ]}
            onPress={() => setSelectedLanguage(lang)}
          >
            <Text
              style={[
                styles.langText,
                selectedLanguage === lang && styles.langTextSelected,
              ]}
            >
              {lang}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Feature Cards */}
      <View style={styles.cardContainer}>
        
        <FeatureCard
          title="Consult a Doctor"
          subtitle="Video & Chat"
          image={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
          }}
          bgColor="#E6F7F5"
          borderColor="#0F766E"
        />
        <FeatureCard
          title="Order Medicines"
          subtitle="From Local Pharmacy"
          image={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
          }}
          bgColor="#FFF0E6"
          borderColor="#EA580C"
        />
      
           <FeatureCard
          title="Health Records"
          subtitle="View & Upload"
          image={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          bgColor="#F9F9F9"
          borderColor="#4B5563"
        />
        <FeatureCard
          title="AI Symptom Check"
          subtitle="Preliminary Advice"
          image={{
            uri: 'https://cdn-icons-png.flaticon.com/512/4712/4712102.png',
          }}
          bgColor="#F0F4FF"
          borderColor="#1E3A8A"
        />
  
       
        <FeatureCard
          title="Upcoming Appointment"
          subtitle="Your Next Visit"
          image={{
            uri: 'https://cdn-icons-png.flaticon.com/512/8732/8732782.png',
          }}
          bgColor="#FFF7E6"
          borderColor="#B45309"
          isSingle
        />
      </View>
    </ScrollView>
  );
}

const FeatureCard = ({
  title,
  subtitle,
  image,
  bgColor,
  borderColor,
  isSingle,
}: any) => (
  <TouchableOpacity
    style={[
      styles.card,
      { backgroundColor: bgColor, borderColor: borderColor },
      isSingle && { width: '49%',margin:'auto' },
    ]}
  >
    <Image source={image} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 3,
    fontWeight: '500',
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileLetter: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  langLabel: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    paddingHorizontal: 5,
  },
  languageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
    gap: 5,
    paddingHorizontal: 5,
  },
  langButton: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    shadowColor: '#64748B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  langButtonSelected: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
    shadowColor: '#FF6B00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  langText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  langTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
    // gap:20,
    paddingHorizontal: 5,
    marginBottom: 30,
  },

  card: {
    width: '47%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#64748B',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 1 }],
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 18,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 20,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '500',
    lineHeight: 16,
  },
});
