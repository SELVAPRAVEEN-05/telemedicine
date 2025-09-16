import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../route/appNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PatientAImodal() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
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

      {/* Upcoming Appointment */}
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Upcoming Appointment</Text>
        <Text style={styles.cardSubtitle}>
          Dr. Singh - 20 Sep 2025, 10:00 AM
        </Text>
      </TouchableOpacity>

      {/* AI Symptom Checker */}
      <TouchableOpacity
        style={styles.aiCard}
        onPress={() => navigation.navigate('AiChecker')}
      >
        <View style={styles.aiCardContent}>
          <View style={styles.iconContainer}>
            <Icon name="medical-services" size={28} color="#FF6B35" />
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.aiCardTitle}>AI Symptom Checker</Text>
            <Text style={styles.aiCardSubtitle}>
              Describe your symptoms and get instant guidance from our AI doctor.
            </Text>
          </View>
          <Image
            source={{
              uri: 'https://t3.ftcdn.net/jpg/05/88/95/30/360_F_588953042_01Hrsog5OuZobKdMXf9GVpB6e6XiIhBa.jpg',
            }}
            style={styles.cardImage}
          />
        </View>
      </TouchableOpacity>

      {/* Health Tips */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Health Tips</Text>
        <View style={styles.tipsContainer}>
          <Text style={styles.tip}>• Drink plenty of water daily to stay hydrated.</Text>
          <Text style={styles.tip}>• Wash hands regularly to prevent infections.</Text>
          <Text style={styles.tip}>• Take short walks or light exercise to improve circulation.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: '#444' },
  aiCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 16, elevation: 5, borderWidth: 1, borderColor: '#FF6B35' },
  aiCardContent: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFECE4', alignItems: 'center', justifyContent: 'center' },
  aiCardTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 4 },
  aiCardSubtitle: { fontSize: 14, color: '#555' },
  cardImage: { width: 60, height: 60, borderRadius: 12, resizeMode: 'cover', marginLeft: 12 },
  tipsContainer: { marginTop: 8 },
  tip: { fontSize: 14, color: '#555', marginBottom: 6, lineHeight: 20 },
  langLabel: { marginTop: 10, marginBottom: 15, fontSize: 16, fontWeight: '700', color: '#1E293B', paddingHorizontal: 5 },
  languageRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30, gap: 5, paddingHorizontal: 5 },
  langButton: { borderWidth: 2, borderColor: '#E2E8F0', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 15, backgroundColor: '#ffffff', elevation: 3 },
  langButtonSelected: { backgroundColor: '#FF6B00', borderColor: '#FF6B00', elevation: 6 },
  langText: { fontSize: 14, fontWeight: '600', color: '#475569' },
  langTextSelected: { color: '#ffffff', fontWeight: '700' },
});
