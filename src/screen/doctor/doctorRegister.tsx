import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../../route/appNavigator';
import { DoctorRegisterstyles as styles } from '../../styles/doctoerRegisterStyles';

type RegisterProps = NativeStackNavigationProp<RootStackParamList>;

export default function DoctorRegister() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    age: '',
    gender: 'Male',
    phone: '',
    address: '',
    hospitalName: '',
    specialization: '',
    degrees: '',
    experience: '',
    languages: ['English'],
    creditsPerMinute: '',
  });

  const navigation = useNavigation<RegisterProps>();

  const genders = ['Male', 'Female', 'Other'];
  const availableLanguages = ['English', 'हिंदी', 'ગુજરાતી', 'தமிழ்'];
  const specializations = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'Gynecology',
    'Neurology',
    'Psychiatry',
    'Other',
  ];

  const toggleLanguage = (language: string) => {
    setForm(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(lang => lang !== language)
        : [...prev.languages, language],
    }));
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.heading}>Registration</Text>

          {/* Personal Information Section */}
          <Text style={styles.sectionTitle}>Personal Information</Text>

          {/* Full Name */}
          <TextInput
            style={styles.input}
            placeholderTextColor={'#999'}
            placeholder="Full Name"
            value={form.name}
            onChangeText={name => setForm({ ...form, name })}
          />

          {/* G-mail */}
          <TextInput
            style={styles.input}
            placeholderTextColor={'#999'}
            placeholder="E-mail"
            value={form.email}
            onChangeText={email => setForm({ ...form, email })}
            autoCapitalize="none"
          />

          {/* Password */}
          <TextInput
            style={styles.input}
            placeholderTextColor={'#999'}
            placeholder="Password"
            value={form.password}
            onChangeText={password => setForm({ ...form, password })}
            secureTextEntry
          />

          {/* Confirm Password */}
          <TextInput
            style={styles.input}
            placeholderTextColor={'#999'}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChangeText={confirmPassword =>
              setForm({ ...form, confirmPassword })
            }
            secureTextEntry
          />

          {/* DOB */}
          <TextInput
            placeholderTextColor={'#999'}
            style={styles.input}
            placeholder="Date of Birth (DD/MM/YYYY)"
            value={form.dob}
            onChangeText={dob => setForm({ ...form, dob })}
          />

          {/* Age */}
          <TextInput
            placeholderTextColor={'#999'}
            style={styles.input}
            placeholder="Age"
            value={form.age}
            onChangeText={age => setForm({ ...form, age })}
            keyboardType="numeric"
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

          {/* Address */}
          <TextInput
            placeholderTextColor={'#999'}
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Address"
            value={form.address}
            multiline
            onChangeText={address => setForm({ ...form, address })}
          />

          {/* Professional Information Section */}
          <Text style={styles.sectionTitle}>Professional Information</Text>

          {/* Hospital Name */}
          <TextInput
            style={styles.input}
            placeholderTextColor={'#999'}
            placeholder="Hospital/Clinic Name"
            value={form.hospitalName}
            onChangeText={hospitalName => setForm({ ...form, hospitalName })}
          />

          {/* Specialization */}
          <Text style={styles.label}>Specialization</Text>
          <View style={styles.row}>
            {specializations.map(spec => (
              <TouchableOpacity
                key={spec}
                style={[
                  styles.optionButton,
                  form.specialization === spec && styles.optionSelected,
                ]}
                onPress={() => setForm({ ...form, specialization: spec })}
              >
                <Text
                  style={[
                    styles.optionText,
                    form.specialization === spec && styles.optionTextSelected,
                  ]}
                >
                  {spec}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Degrees */}
          <TextInput
            style={styles.input}
            placeholderTextColor={'#999'}
            placeholder="Degrees (e.g., MBBS, MD)"
            value={form.degrees}
            onChangeText={degrees => setForm({ ...form, degrees })}
          />

          {/* Experience */}
          <TextInput
            style={styles.input}
            placeholderTextColor={'#999'}
            placeholder="Years of Experience"
            value={form.experience}
            onChangeText={experience => setForm({ ...form, experience })}
            keyboardType="numeric"
          />

          {/* Languages */}
          <Text style={styles.label}>Languages</Text>
          <View style={styles.row}>
            {availableLanguages.map(lang => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.optionButton,
                  form.languages.includes(lang) && styles.optionSelected,
                ]}
                onPress={() => toggleLanguage(lang)}
              >
                <Text
                  style={[
                    styles.optionText,
                    form.languages.includes(lang) && styles.optionTextSelected,
                  ]}
                >
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Credits Per Minute */}
          <TextInput
            style={styles.input}
            placeholderTextColor={'#999'}
            placeholder="Credits Per Minute (e.g., 35)"
            value={form.creditsPerMinute}
            onChangeText={creditsPerMinute =>
              setForm({ ...form, creditsPerMinute })
            }
            keyboardType="numeric"
          />

          {/* Register Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => navigation.navigate('DoctorLayout')}
          >
            <Text style={styles.submitText}>Register as Doctor</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginLink}>
            <Text>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DocterLogin')}
            >
              <Text style={{ color: '#FF6B00', fontWeight: 'bold' }}>
                Log in to my Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Approval Notice */}
          <Text style={styles.approvalNotice}>
            📋 Note: Your registration will be reviewed and approved by our
            medical team before activation.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
