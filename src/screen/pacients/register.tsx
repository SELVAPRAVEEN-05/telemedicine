import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../route/appNavigator";
import { PatientRegsterstyles as styles } from '../../styles/pacientRegister';

type RegisterProps = NativeStackNavigationProp<RootStackParamList, "Register">;

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    language: 'English',
  });

  const navigation = useNavigation<RegisterProps>();

  const genders = ['Male', 'Female', 'Other'];
  const languages = ["English","हिंदी", "ગુજરાતી", "தமிழ்"];

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.heading}>📝 Register</Text>

          {/* Full Name */}
          <TextInput
            style={styles.input}
            placeholderTextColor={'#999'}
            placeholder="Full Name"
            value={form.name}
            onChangeText={name => setForm({ ...form, name })}
          />

          {/* DOB */}
          <TextInput
            placeholderTextColor={'#999'}
            style={styles.input}
            placeholder="Date of Birth (DD/MM/YYYY)"
            value={form.dob}
            onChangeText={dob => setForm({ ...form, dob })}
          />

          {/* Gender */}
          <View style={styles.row}>
            {genders.map(g => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.optionButton,
                  form.gender === g && styles.optionSelected,
                ]}
                onPress={() => setForm({ ...form, gender: g })}
              >
                <Text
                  style={[
                    styles.optionText,
                    form.gender === g && styles.optionTextSelected,
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Phone */}
          <TextInput
            placeholderTextColor={'#999'}
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={phone => setForm({ ...form, phone })}
          />

          {/* Email */}
          <TextInput
            placeholderTextColor={'#999'}
            style={styles.input}
            placeholder="Email Address (Optional)"
            keyboardType="email-address"
            value={form.email}
            onChangeText={email => setForm({ ...form, email })}
          />

          {/* Address */}
          <TextInput
            placeholderTextColor={'#999'}
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Address / Village Name"
            value={form.address}
            multiline
            onChangeText={address => setForm({ ...form, address })}
          />

          {/* Language */}
          <View style={styles.row}>
            {languages.map(lang => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.optionButton,
                  form.language === lang && styles.optionSelected,
                ]}
                onPress={() => setForm({ ...form, language: lang })}
              >
                <Text
                  style={[
                    styles.optionText,
                    form.language === lang && styles.optionTextSelected,
                  ]}
                >
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Register */}
          <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate("PatientDashboard")}>
            <Text style={styles.submitText}>Register</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>
              Already have an account?{' '}
              <Text style={{ color: '#FF6B00', fontWeight: 'bold' }}>Log in to my Account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

