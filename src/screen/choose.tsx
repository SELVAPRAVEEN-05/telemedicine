import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function RoleSelectionScreen() {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: "doctor",
      title: "Doctor",
      description: "Medical professional providing healthcare services",
      image:
        "https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg.webp",
      navigateTo: "DoctorRegister", 
    },
    {
      id: "pharmacy",
      title: "Pharmacy",
      description: "Pharmacy dispensing medications and health products",
      image:
        "https://img.freepik.com/free-photo/medicine-bottles-pills_23-2148524655.jpg?w=740",
      navigateTo: "PharmacyRegisterScreen",
    },
    {
      id: "patient",
      title: "Patient",
      description: "Individual seeking medical care and services",
      image:
        "https://www.careerstaff.com/wp-content/uploads/2024/04/how-to-improve-patient-experience-satisfaction-scores.jpg",
      navigateTo: "Register",
    },
  ];

  const handleRoleSelection = (role: any) => {
    setSelectedRole(role.id);
    // Navigate to the correct screen
    navigation.navigate(role.navigateTo as never);
  };

  const RoleCard = ({ role }: any) => (
    <TouchableOpacity
      style={[
        styles.roleCard,
        selectedRole === role.id && { borderColor: "#FF7A00" },
      ]}
      onPress={() => handleRoleSelection(role)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Image source={{ uri: role.image }} style={styles.roleImage} />
      </View>
      <View style={styles.roleInfo}>
        <Text style={styles.roleTitle}>{role.title}</Text>
        <Text style={styles.roleDescription}>{role.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to HealthApp</Text>
        <Text style={styles.subtitle}>Please select your role to continue</Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Choose the option that best describes your role
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    lineHeight: 22,
  },
  rolesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#e1e8ed",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 100,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  roleImage: { width: "100%", height: "100%" },
  roleInfo: { flex: 1 },
  roleTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#95a5a6",
    textAlign: "center",
  },
});
