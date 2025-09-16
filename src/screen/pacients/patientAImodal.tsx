import React, { useState,useEffect } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../route/appNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Translation object
const translations: Record<string, any> = {
  English: {
    selectLanguage: "Select Language",
    upcomingAppointment: "Last Appointment",
    // appointmentDetails: "Dr. Singh - 20 Sep 2025, 10:00 AM",
    aiCheckerTitle: "AI Symptom Checker",
    aiCheckerSubtitle: "Describe your symptoms and get instant guidance from our AI doctor.",
    healthTips: "Health Tips",
    tip1: "• Drink plenty of water daily to stay hydrated.",
    tip2: "• Wash hands regularly to prevent infections.",
    tip3: "• Take short walks or light exercise to improve circulation.",
  },
  हिंदी: {
    selectLanguage: "भाषा चुनें",
    upcomingAppointment: "अंतिम नियुक्ति",
    // appointmentDetails: "डॉ. सिंह - 20 सितम्बर 2025, 10:00 AM",
    aiCheckerTitle: "एआई लक्षण चेकर",
    aiCheckerSubtitle: "अपने लक्षणों का वर्णन करें और हमारे एआई डॉक्टर से तुरंत मार्गदर्शन प्राप्त करें।",
    healthTips: "स्वास्थ्य सुझाव",
    tip1: "• हाइड्रेटेड रहने के लिए रोजाना पर्याप्त पानी पिएं।",
    tip2: "• संक्रमण से बचने के लिए नियमित रूप से हाथ धोएं।",
    tip3: "• रक्त संचार सुधारने के लिए छोटी सैर या हल्का व्यायाम करें।",
  },
 ਪੰਜਾਬੀ: {
  selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
  upcomingAppointment: "ਆਖਰੀ ਮੁਲਾਕਾਤ",
  // appointmentDetails: "ਡਾ. ਸਿੰਘ - 20 ਸਤੰਬਰ 2025, ਸਵੇਰੇ 10:00 ਵਜੇ",
  aiCheckerTitle: "ਏਆਈ ਲੱਛਣ ਚੈੱਕਰ",
  aiCheckerSubtitle: "ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਰਣਨ ਕਰੋ ਅਤੇ ਸਾਡੇ ਏਆਈ ਡਾਕਟਰ ਤੋਂ ਤੁਰੰਤ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ।",
  healthTips: "ਸਿਹਤ ਸੁਝਾਅ",
  tip1: "• ਹਾਈਡਰੇਟ ਰਹਿਣ ਲਈ ਹਰ ਰੋਜ਼ ਕਾਫ਼ੀ ਪਾਣੀ ਪੀਓ।",
  tip2: "• ਸੰਕਰਮਣ ਤੋਂ ਬਚਣ ਲਈ ਆਪਣੇ ਹੱਥ ਨਿਯਮਿਤ ਤੌਰ 'ਤੇ ਧੋਵੋ।",
  tip3: "• ਖੂਨ ਦਾ ਸੰਚਾਰ ਸੁਧਾਰਨ ਲਈ ਛੋਟੇ ਫੇਰੇ ਲਓ ਜਾਂ ਹਲਕੀ ਕਸਰਤ ਕਰੋ।",
},

  தமிழ்: {
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    upcomingAppointment: "கடைசி நேர்முகம்",
    // appointmentDetails: "டாக்டர் சிங் - 20 செப்டம்பர் 2025, காலை 10:00",
    aiCheckerTitle: "ஏ.ஐ அறிகுறி சரிபார்ப்பான்",
    aiCheckerSubtitle: "உங்கள் அறிகுறிகளை விவரித்து எங்கள் ஏ.ஐ மருத்துவரிடமிருந்து உடனடி வழிகாட்டலைப் பெறுங்கள்.",
    healthTips: "ஆரோக்கிய குறிப்புகள்",
    tip1: "• தினமும் அதிகளவு தண்ணீர் குடிக்கவும்.",
    tip2: "• தொற்றுகளைத் தடுப்பதற்காக கைகளை அடிக்கடி கழுவவும்.",
    tip3: "• இரத்த ஓட்டத்தை மேம்படுத்த சிறிய நடை அல்லது லேசான உடற்பயிற்சி செய்யவும்.",
  },
};

export default function PatientAImodal() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const navigation = useNavigation<NavigationProp>();

  // Load saved language from AsyncStorage
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('appLanguage');
        if (savedLang) {
          setSelectedLanguage(savedLang);
        }
      } catch (error) {
        console.error('Failed to load language:', error);
      }
    };
    loadLanguage();
  }, []);

  // Save selected language whenever it changes
  const handleLanguageChange = async (lang: string) => {
    try {
      setSelectedLanguage(lang);
      await AsyncStorage.setItem('appLanguage', lang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const t = translations[selectedLanguage];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.langLabel}>{t.selectLanguage}</Text>
      <View style={styles.languageRow}>
        {['हिंदी', 'ਪੰਜਾਬੀ', 'தமிழ்', 'English'].map((lang, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.langButton,
              selectedLanguage === lang && styles.langButtonSelected,
            ]}
            onPress={() => handleLanguageChange(lang)}
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
        <Text style={styles.cardTitle}>{t.upcomingAppointment}</Text>
        <Text style={styles.cardSubtitle}>Dr. Singh - 20 Sep 2025, 10:00 AM</Text>
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
            <Text style={styles.aiCardTitle}>{t.aiCheckerTitle}</Text>
            <Text style={styles.aiCardSubtitle}>{t.aiCheckerSubtitle}</Text>
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
        <Text style={styles.cardTitle}>{t.healthTips}</Text>
        <View style={styles.tipsContainer}>
          <Text style={styles.tip}>{t.tip1}</Text>
          <Text style={styles.tip}>{t.tip2}</Text>
          <Text style={styles.tip}>{t.tip3}</Text>
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