import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import axios from 'axios';
import { RootStackParamList } from '../../route/appNavigator';
import { PatientRegsterstyles as styles } from '../../styles/pacientRegister';

type RegisterProps = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    language: 'English',
  });

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<RegisterProps>();

  const genders = ['Male', 'Female', 'Other'];
  const languages = ['English', 'हिंदी', 'ગુજરાતી', 'தமிழ்'];

  // 📌 API integration

  const handleRegister = async () => {
    // Basic validation
    const requiredFields = ['fullName', 'dob', 'phone'];
    const missingFields = requiredFields.filter(field => !form[field as keyof typeof form]);

    if (missingFields.length > 0) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const payload = {
      fullName: form.fullName,
      dob: form.dob,
      gender: form.gender,
      phone: form.phone,
      email: form.email,
      address: form.address,
      language: form.language,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        'https://telemedicine-server-o5tc.onrender.com/patient/register',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Registration successful 🎉', [
          {
            text: 'OK',
            onPress: () => {
              setForm({
                fullName: '',
                dob: '',
                gender: '',
                phone: '',
                email: '',
                address: '',
                language: '',
              });
              navigation.navigate('Login');
            },
          },
        ]);
      } else {
        Alert.alert('Error', response.data?.message || 'Something went wrong');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const message =
          error.response.data?.message || 'Mobile number already registered';
        Alert.alert('Error', message);
      } else {
        Alert.alert('Error', 'Failed to register. Please try again.');
      }
      console.log('Register error:', error.message);
    } finally {
      setLoading(false);
    }
  };

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
            value={form.fullName}
            onChangeText={fullName => setForm({ ...form, fullName })}
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
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => navigation.navigate('PatienrtLayout')}
          >
            <Text style={styles.submitText}>
              {loading ? 'Registering...' : 'Register'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <Text style={styles.loginLink}>
            Already have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: '#FF6B00', fontWeight: 'bold' }}>
                Log in to my Account
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
