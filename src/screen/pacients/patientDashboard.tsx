import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FeatureCard } from "../../components/featureCard";
import { patientDashboardStyles as styles } from "../../styles/patientdashboard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../route/appNavigator";

type DashboardNav = NativeStackNavigationProp<RootStackParamList>;

export default function PatientDashboard() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const navigation = useNavigation<DashboardNav>();

  const handleProfilePress = () => {
    navigation.navigate("PatientProfile");
  };

  const features = [
    {
      title: "Consult a Doctor",
      subtitle: "Video & Chat",
      image: { uri: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png" },
      bgColor: "#E6F7F5",
      borderColor: "#0F766E",
      navigateTo: "ConsultDoctor",
    },
    {
      title: "View Medicines",
      subtitle: "From Local Pharmacy",
      image: { uri: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png" },
      bgColor: "#FFF0E6",
      borderColor: "#EA580C",
      navigateTo: "ViewMedicines",
    },
    {
      title: "Health Records",
      subtitle: "View & Upload",
      image: { uri: "https://cdn-icons-png.flaticon.com/512/3003/3003235.png" },
      bgColor: "#F9F9F9",
      borderColor: "#4B5563",
      navigateTo: "HealthRecords",
    },
    {
      title: "AI Symptom Check",
      subtitle: "Preliminary Advice",
      image: {
        uri: "https://img.lovepik.com/png/20231124/3d-bot-ai-powered-marketing-and-notification-tools-support-technology_687740_wh1200.png",
      },
      bgColor: "#F0F4FF",
      borderColor: "#1E3A8A",
      navigateTo: "AiChecker",
    },
    {
      title: "Upcoming Appointment",
      subtitle: "Your Next Visit",
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
          <Text style={styles.title}>Sanjeevani</Text>
          <Text style={styles.subtitle}>Your Health, Our Priority</Text>
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
        {["हिंदी", "ગુજરાતી", "தமிழ்", "English"].map((lang, idx) => (
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

      {/* Feature Cards in Grid */}
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
