import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../route/AppNavigator";

type LandingScreenProp = NativeStackNavigationProp<RootStackParamList, "Landing">;

export default function Landing() {
  const navigation = useNavigation<LandingScreenProp>();
  const [selectedLang, setSelectedLang] = useState("en");

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "ta", label: "தமிழ்" },
    { code: "pa", label: "ਪੰਜਾਬੀ" },
  ];

  return (
    <View style={styles.container}>
      {/* Hero Illustration */}
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/telemedicine-concept-illustration_114360-9251.jpg",
        }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title & Subtitle */}
      <Text style={styles.title}>Village Health Connect</Text>
      <Text style={styles.subtitle}>
        Book doctor appointments, consult online, and stay healthy 💊
      </Text>

      {/* Language Selector */}
      <View style={styles.langContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.langButton,
              selectedLang === lang.code && styles.langSelected,
            ]}
            onPress={() => setSelectedLang(lang.code)}
          >
            <Text
              style={[
                styles.langText,
                selectedLang === lang.code && styles.langTextSelected,
              ]}
            >
              {lang.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.primaryText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.secondaryText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7F0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF6B00",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 25,
  },
  langContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "center",
  },
  langButton: {
    borderWidth: 1,
    borderColor: "#FFB366",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  langSelected: {
    backgroundColor: "#FF6B00",
  },
  langText: {
    color: "#FF6B00",
    fontWeight: "500",
  },
  langTextSelected: {
    color: "#FFF",
  },
  primaryButton: {
    backgroundColor: "#FF6B00",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 10,
    elevation: 3,
  },
  primaryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: "#FF6B00",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  secondaryText: {
    color: "#FF6B00",
    fontSize: 16,
    fontWeight: "bold",
  },
});
