import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Import AsyncStorage
import { FeatureCard } from "../../components/featureCard";
import { patientDashboardStyles as styles } from "../../styles/patientdashboard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../route/appNavigator";

type DashboardNav = NativeStackNavigationProp<RootStackParamList>;

const LANGUAGE_KEY = "selectedLanguage"; 

const translations: Record<string, any> = { English: { appTitle: "Sanjeevani", appSubtitle: "Your Health, Our Priority", features: [ { title: "Consult a Doctor", subtitle: "Video & Chat" }, { title: "View Medicines", subtitle: "From Local Pharmacy" }, { title: "Health Records", subtitle: "View & Upload" }, { title: "AI Symptom Check", subtitle: "Preliminary Advice" }, { title: "Upcoming Appointment", subtitle: "Your Next Visit" }, ], }, हिंदी: { appTitle: "संजीवनी", appSubtitle: "आपका स्वास्थ्य, हमारी प्राथमिकता", features: [ { title: "डॉक्टर से परामर्श", subtitle: "वीडियो और चैट" }, { title: "दवाइयाँ देखें", subtitle: "स्थानीय फार्मेसी से" }, { title: "स्वास्थ्य रिकॉर्ड", subtitle: "देखें और अपलोड करें" }, { title: "एआई लक्षण जांच", subtitle: "प्रारंभिक सलाह" }, { title: "आगामी नियुक्ति", subtitle: "आपकी अगली मुलाकात" }, ], }, தமிழ்: { appTitle: "சஞ்சீவனி", appSubtitle: "உங்கள் ஆரோக்கியம், எங்கள் முன்னுரிமை", features: [ { title: "மருத்துவரை அணுகவும்", subtitle: "வீடியோ மற்றும் அரட்டை" }, { title: "மருந்துகளைப் பார்வையிடவும்", subtitle: "உள்ளூர் மருந்தகம்" }, { title: "சுகாதார பதிவுகள்", subtitle: "பார்வையிடவும் & பதிவேற்றவும்" }, { title: "ஏஐ அறிகுறி சோதனை", subtitle: "தொடக்க ஆலோசனை" }, { title: "வரவிருக்கும் நேர்முகம்", subtitle: "உங்கள் அடுத்த சந்திப்பு" }, ], }, ਪੰਜਾਬੀ: { appTitle: "ਸੰਜੀਵਨੀ", appSubtitle: "ਤੁਹਾਡਾ ਸਿਹਤ, ਸਾਡੀ ਪ੍ਰਾਥਮਿਕਤਾ", features: [ { title: "ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ", subtitle: "ਵੀਡੀਓ ਅਤੇ ਚੈਟ" }, { title: "ਦਵਾਈਆਂ ਵੇਖੋ", subtitle: "ਸਥਾਨਕ ਫਾਰਮੇਸੀ ਤੋਂ" }, { title: "ਸਿਹਤ ਰਿਕਾਰਡ", subtitle: "ਵੇਖੋ ਅਤੇ ਅੱਪਲੋਡ ਕਰੋ" }, { title: "ਏਆਈ ਲੱਛਣ ਚੈੱਕ", subtitle: "ਪ੍ਰਾਰੰਭਿਕ ਸਲਾਹ" }, { title: "ਅਗਲਾ ਨਿਯੁਕਤੀ ਸਮਾਂ", subtitle: "ਤੁਹਾਡੀ ਅਗਲੀ ਮੁਲਾਕਾਤ" }, ], }, };

export default function PatientDashboard() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const navigation = useNavigation<DashboardNav>();

  // Load language from AsyncStorage on mount
  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (storedLang) setSelectedLanguage(storedLang);
    };
    loadLanguage();
  }, []);

  // Save language to AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem(LANGUAGE_KEY, selectedLanguage);
  }, [selectedLanguage]);

  const handleProfilePress = () => {
    navigation.navigate("PatientProfile");
  };

  const t = translations[selectedLanguage]; // pick translation set

  const features = [
    {
      ...t.features[0],
      image: { uri: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png" },
      bgColor: "#E6F7F5",
      borderColor: "#0F766E",
      navigateTo: "ConsultDoctor",
    },
    {
      ...t.features[1],
      image: { uri: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png" },
      bgColor: "#FFF0E6",
      borderColor: "#EA580C",
      navigateTo: "ViewMedicines",
    },
    {
      ...t.features[2],
      image: { uri: "https://cdn-icons-png.flaticon.com/512/3003/3003235.png" },
      bgColor: "#F9F9F9",
      borderColor: "#4B5563",
      navigateTo: "HealthRecords",
    },
    {
      ...t.features[3],
      image: {
        uri: "https://img.lovepik.com/png/20231124/3d-bot-ai-powered-marketing-and-notification-tools-support-technology_687740_wh1200.png",
      },
      bgColor: "#F0F4FF",
      borderColor: "#1E3A8A",
      navigateTo: "AiChecker",
    },
    {
      ...t.features[4],
      image: { uri: "https://cdn-icons-png.flaticon.com/512/8732/8732782.png" },
      bgColor: "#FFF7E6",
      borderColor: "#B45309",
      navigateTo: "UpcommingEvents",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header with Profile */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>{t.appTitle}</Text>
          <Text style={styles.subtitle}>{t.appSubtitle}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileCircle}
          onPress={handleProfilePress}
        >
          <Text style={styles.profileLetter}>S</Text>
        </TouchableOpacity>
      </View>

      {/* Language Selector */}
      <Text style={styles.langLabel}>Select Language</Text>
      <View style={styles.languageRow}>
        {["हिंदी", "ਪੰਜਾਬੀ", "தமிழ்", "English"].map((lang, idx) => (
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
      <View style={styles.grid}>
        {features.map((item, idx) => (
          <FeatureCard
            key={idx}
            {...item}
            onPress={() => navigation.navigate(item.navigateTo as any)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
